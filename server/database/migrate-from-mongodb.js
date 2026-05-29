import "dotenv/config"
import { MongoClient } from "mongodb"
import db, { initializeDatabase } from "./db.js"
import {
  createBuilder,
  createContact,
  createDataset,
  createMessage,
  createProject,
  createRefreshToken,
  createUser,
  getUserByEmail,
} from "./helpers.js"

const SQLITE_DELETE_ORDER = [
  "messages",
  "builders",
  "dataset_items",
  "datasets",
  "donations",
  "project_user_roles",
  "project_users",
  "project_tasks",
  "projects",
  "user_tokens",
  "user_roles",
  "users",
  "contacts",
]

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (value === null || value === undefined) {
    return []
  }

  return [value]
}

function toSafeString(value) {
  if (value === null || value === undefined) {
    return ""
  }

  if (typeof value === "string") {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value)
  }

  if (typeof value?.toISOString === "function") {
    return value.toISOString()
  }

  return String(value)
}

function toSafeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return 0
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toProjectPayload(project) {
  return {
    projectName: toSafeString(project.projectName),
    projectDescription: toSafeString(project.projectDescription),
    projectType: toSafeString(project.projectType),
    startDate: toSafeString(project.startDate),
    endDate: toSafeString(project.endDate),
    status: toSafeString(project.status),
    tasks: Array.isArray(project.tasks) ? project.tasks : [],
    users: Array.isArray(project.users) ? project.users : [],
    donations: Array.isArray(project.donations)
      ? project.donations.map((donation) => ({
          donatedItem: toSafeString(donation?.donatedItem),
          numberOfItems: toSafeNumber(donation?.numberOfItems),
          category: toSafeString(donation?.category),
          dateReceived: toSafeString(donation?.dateReceived),
        }))
      : [],
    user: project.user
      ? {
          firstName: toSafeString(project.user.firstName),
          lastName: toSafeString(project.user.lastName),
          email: toSafeString(project.user.email),
          username: toSafeString(project.user.username),
          roles: Array.isArray(project.user.roles) ? project.user.roles.map(toSafeString) : [],
        }
      : {},
    donationSummary: project.donationSummary
      ? {
          totalItems: toSafeNumber(project.donationSummary.totalItems),
          lastUpdated: toSafeString(project.donationSummary.lastUpdated),
          description: toSafeString(project.donationSummary.description),
        }
      : {},
  }
}

async function findCollection(database, candidates, options = {}) {
  const collections = await database.listCollections().toArray()
  const collectionNames = new Map(
    collections.map((collection) => [collection.name.toLowerCase(), collection.name])
  )

  for (const candidate of candidates) {
    const matchedName = collectionNames.get(candidate.toLowerCase())
    if (matchedName) {
      return database.collection(matchedName)
    }
  }

  if (options.required === false) {
    return null
  }

  throw new Error(`Could not find MongoDB collection matching any of: ${candidates.join(", ")}`)
}

function clearSqliteData() {
  const transaction = db.transaction(() => {
    SQLITE_DELETE_ORDER.forEach((tableName) => {
      db.prepare(`DELETE FROM ${tableName}`).run()
    })
  })

  transaction()
}

async function migrate() {
  const mongoUrl = process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI

  if (!mongoUrl) {
    throw new Error("Set MONGODB_CONNECTION_STRING or MONGODB_URI before running the migration")
  }

  const client = new MongoClient(mongoUrl)

  try {
    console.log("Starting migration from MongoDB to SQLite...\n")
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("✓ Connected to MongoDB\n")

    const database = process.env.MONGODB_DATABASE
      ? client.db(process.env.MONGODB_DATABASE)
      : client.db()

    console.log("Initializing SQLite database...")
    initializeDatabase()
    clearSqliteData()
    console.log("✓ SQLite database initialized and cleared\n")

    const usersCollection = await findCollection(database, ["users", "user"])
    const projectsCollection = await findCollection(database, ["projects", "project"])
    const datasetsCollection = await findCollection(
      database,
      ["datasets", "dataset", "dataSets", "dataSet"],
      { required: false }
    )
    const contactsCollection = await findCollection(database, ["contacts", "contact"], {
      required: false,
    })
    const buildersCollection = await findCollection(database, ["builders", "builder"], {
      required: false,
    })
    const messagesCollection = await findCollection(database, ["messages", "message"], {
      required: false,
    })

    console.log("Migrating users...")
    const users = await usersCollection.find({}).toArray()
    let userCount = 0

    for (const user of users) {
      try {
        createUser(
          user.firstName || "",
          user.lastName || "",
          user.email,
          user.username,
          user.password,
          Array.isArray(user.roles) ? user.roles : []
        )

        const createdUser = getUserByEmail(user.email)
        toArray(user.token).forEach((token) => {
          if (createdUser?.id && token) {
            createRefreshToken(createdUser.id, token)
          }
        })

        userCount += 1
      } catch (error) {
        console.error(`  ✗ Failed to migrate user ${user.email}:`, error.message)
      }
    }

    console.log(`✓ Migrated ${userCount} users\n`)

    console.log("Migrating projects...")
    const projects = await projectsCollection.find({}).toArray()
    let projectCount = 0
    const projectIdMap = new Map()

    for (const project of projects) {
      try {
        const createdProject = createProject(toProjectPayload(project))
        projectIdMap.set(String(project._id), createdProject.id)
        projectCount += 1
      } catch (error) {
        console.error(`  ✗ Failed to migrate project ${project.projectName}:`, error.message)
      }
    }

    console.log(`✓ Migrated ${projectCount} projects\n`)

    console.log("Migrating datasets...")
    let datasetCount = 0
    if (datasetsCollection) {
      const datasets = await datasetsCollection.find({}).toArray()

      for (const dataset of datasets) {
        try {
          createDataset(dataset.projectName || "", dataset.items || dataset.data || [])
          datasetCount += 1
        } catch (error) {
          console.error(`  ✗ Failed to migrate dataset ${dataset.projectName}:`, error.message)
        }
      }
    }

    console.log(`✓ Migrated ${datasetCount} datasets\n`)

    console.log("Migrating contacts...")
    let contactCount = 0
    if (contactsCollection) {
      const contacts = await contactsCollection.find({}).toArray()

      for (const contact of contacts) {
        try {
          createContact(
            contact.firstName || "",
            contact.lastName || "",
            contact.email || "",
            contact.phone || "",
            contact.projectType || "",
            contact.message || ""
          )
          contactCount += 1
        } catch (error) {
          console.error(`  ✗ Failed to migrate contact ${contact.email}:`, error.message)
        }
      }
    }

    console.log(`✓ Migrated ${contactCount} contacts\n`)

    console.log("Migrating builders...")
    let builderCount = 0
    if (buildersCollection) {
      const builders = await buildersCollection.find({}).toArray()

      for (const builder of builders) {
        try {
          createBuilder(builder)
          builderCount += 1
        } catch (error) {
          console.error(`  ✗ Failed to migrate builder ${builder.projectType}:`, error.message)
        }
      }
    }

    console.log(`✓ Migrated ${builderCount} builders\n`)

    console.log("Migrating messages...")
    let messageCount = 0
    let skippedMessageCount = 0
    if (messagesCollection) {
      const messages = await messagesCollection.find({}).toArray()

      for (const message of messages) {
        try {
          const sqliteProjectId =
            projectIdMap.get(String(message.projectId)) ??
            db
              .prepare("SELECT id FROM projects WHERE projectName = ? LIMIT 1")
              .get(message.projectName || "")?.id

          if (!sqliteProjectId) {
            skippedMessageCount += 1
            console.error(
              `  ✗ Skipped message for project ${message.projectId}: project mapping not found`
            )
            continue
          }

          createMessage({
            projectId: sqliteProjectId,
            projectName: message.projectName || "",
            senderId: message.senderId || "",
            senderName: message.senderName || "",
            messageType: message.messageType || "",
            content: message.content || "",
            createdAt: message.createdAt
              ? new Date(message.createdAt).toISOString()
              : new Date().toISOString(),
            isRead: Boolean(message.isRead),
          })

          messageCount += 1
        } catch (error) {
          console.error(`  ✗ Failed to migrate message ${message._id}:`, error.message)
        }
      }
    }

    console.log(`✓ Migrated ${messageCount} messages`)
    if (skippedMessageCount > 0) {
      console.log(`! Skipped ${skippedMessageCount} messages with no matching project`)
    }
    console.log("")

    console.log("Migration Summary:")
    console.log(`  Users: ${userCount}`)
    console.log(`  Projects: ${projectCount}`)
    console.log(`  Datasets: ${datasetCount}`)
    console.log(`  Contacts: ${contactCount}`)
    console.log(`  Builders: ${builderCount}`)
    console.log(`  Messages: ${messageCount}`)
    if (skippedMessageCount > 0) {
      console.log(`  Skipped messages: ${skippedMessageCount}`)
    }
    console.log("\n✓ Migration completed successfully!")
  } finally {
    await client.close()
  }
}

migrate().catch((error) => {
  console.error("\n✗ Migration failed:", error)
  process.exit(1)
})
