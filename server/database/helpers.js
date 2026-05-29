import db from "./db.js"

function parseJson(value, fallback = []) {
  if (value === null || value === undefined || value === "") {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    return fallback
  }
}

function stringifyJson(value, fallback) {
  if (value === undefined) {
    return JSON.stringify(fallback)
  }

  return JSON.stringify(value)
}

function normalizeString(value, fallback = "") {
  return typeof value === "string" ? value : fallback
}

function normalizeNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const parsedValue = Number(value)
  return Number.isFinite(parsedValue) ? parsedValue : null
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (value === null || value === undefined) {
    return []
  }

  return [value]
}

function normalizeRoles(roles) {
  if (!Array.isArray(roles)) {
    return []
  }

  return roles
    .map((role) => (typeof role === "string" ? role.trim() : ""))
    .filter(Boolean)
}

function normalizeUser(user = {}) {
  return {
    firstName: normalizeString(user.firstName),
    lastName: normalizeString(user.lastName),
    email: normalizeString(user.email),
    username: normalizeString(user.username),
    roles: normalizeRoles(user.roles),
  }
}

function normalizeTaskUsers(users) {
  if (!Array.isArray(users)) {
    return []
  }

  return users.map((user) => normalizeUser(user))
}

function normalizeTask(task) {
  if (typeof task === "string") {
    return {
      taskName: task,
      taskDescription: "",
      startDate: "",
      endDate: "",
      status: "",
      hoursEstimated: null,
      hoursWorked: null,
      roles: [],
      users: [],
    }
  }

  const safeTask = task || {}

  return {
    taskName: normalizeString(safeTask.taskName ?? safeTask.task),
    taskDescription: normalizeString(safeTask.taskDescription),
    startDate: normalizeString(safeTask.startDate),
    endDate: normalizeString(safeTask.endDate),
    status: normalizeString(safeTask.status),
    hoursEstimated: normalizeNumber(safeTask.hoursEstimated),
    hoursWorked: normalizeNumber(safeTask.hoursWorked),
    roles: normalizeRoles(safeTask.roles),
    users: normalizeTaskUsers(safeTask.users),
  }
}

function mapTaskRow(row) {
  return {
    _id: row.id,
    taskName: row.taskName || row.task || "",
    taskDescription: row.taskDescription || "",
    startDate: row.startDate || "",
    endDate: row.endDate || "",
    status: row.status || "",
    hoursEstimated: row.hoursEstimated ?? "",
    hoursWorked: row.hoursWorked ?? "",
    roles: parseJson(row.roles, []),
    users: parseJson(row.users, []),
  }
}

function mapProjectUserRow(row, roles) {
  return {
    firstName: row.firstName || "",
    lastName: row.lastName || "",
    email: row.email || "",
    username: row.username || "",
    roles: roles || [],
  }
}

function mapBuilderRow(row) {
  return {
    id: row.id,
    projectType: row.projectType || "",
    roles: parseJson(row.roles, []),
    tasks: parseJson(row.tasks, []).map((task) => {
      if (typeof task === "string") {
        return { taskName: task }
      }

      return {
        taskName: normalizeString(task?.taskName ?? task?.task),
      }
    }),
    user: {
      firstName: row.userFirstName || "",
      lastName: row.userLastName || "",
      email: row.userEmail || "",
      username: row.userUsername || "",
      roles: parseJson(row.userRoles, []),
    },
  }
}

function mapMessageRow(row) {
  return {
    id: row.id,
    projectId: row.projectId,
    projectName: row.projectName || "",
    senderId: row.senderId || "",
    senderName: row.senderName || "",
    messageType: row.messageType || "",
    content: row.content || "",
    createdAt: row.createdAt,
    isRead: Boolean(row.isRead),
  }
}

function ensureProjectExists(projectId) {
  const project = db.prepare("SELECT id FROM projects WHERE id = ?").get(projectId)
  if (!project) {
    throw new Error(`Project ${projectId} not found`)
  }
}

function getNextTaskOrder(projectId) {
  const row = db
    .prepare("SELECT COALESCE(MAX(taskOrder), -1) AS taskOrder FROM project_tasks WHERE projectId = ?")
    .get(projectId)

  return (row?.taskOrder ?? -1) + 1
}

function insertTask(projectId, task, taskOrder) {
  const normalizedTask = normalizeTask(task)

  const result = db
    .prepare(
      `INSERT INTO project_tasks (
        projectId,
        task,
        taskName,
        taskDescription,
        startDate,
        endDate,
        status,
        hoursEstimated,
        hoursWorked,
        roles,
        users,
        taskOrder
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      projectId,
      normalizedTask.taskName,
      normalizedTask.taskName,
      normalizedTask.taskDescription,
      normalizedTask.startDate,
      normalizedTask.endDate,
      normalizedTask.status,
      normalizedTask.hoursEstimated,
      normalizedTask.hoursWorked,
      stringifyJson(normalizedTask.roles, []),
      stringifyJson(normalizedTask.users, []),
      taskOrder
    )

  return getProjectTaskById(projectId, result.lastInsertRowid)
}

function getProjectTaskRow(projectId, taskId) {
  return db
    .prepare("SELECT * FROM project_tasks WHERE id = ? AND projectId = ?")
    .get(taskId, projectId)
}

function getProjectTaskById(projectId, taskId) {
  const task = getProjectTaskRow(projectId, taskId)
  return task ? mapTaskRow(task) : null
}

function findProjectTaskIdByOrder(projectId, taskOrder) {
  if (!Number.isInteger(taskOrder)) {
    return null
  }

  const task = db
    .prepare("SELECT id FROM project_tasks WHERE projectId = ? AND taskOrder = ?")
    .get(projectId, taskOrder)

  return task?.id ?? null
}

function mapUser(row, roles = [], tokens = []) {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    username: row.username,
    password: row.password,
    roles,
    token: tokens,
  }
}

function getUserRoles(userId) {
  return db
    .prepare("SELECT role FROM user_roles WHERE userId = ?")
    .all(userId)
    .map((role) => role.role)
}

function getUserTokens(userId) {
  return db
    .prepare("SELECT token FROM user_tokens WHERE userId = ? ORDER BY id ASC")
    .all(userId)
    .map((row) => row.token)
}

function mapProject(projectRow, taskRows, projectUsers, donations) {
  return {
    id: projectRow.id,
    projectName: projectRow.projectName,
    projectDescription: projectRow.projectDescription || "",
    projectType: projectRow.projectType || "",
    startDate: projectRow.startDate || "",
    endDate: projectRow.endDate || "",
    status: projectRow.status || "",
    user: {
      firstName: projectRow.userFirstName || "",
      lastName: projectRow.userLastName || "",
      email: projectRow.userEmail || "",
      username: projectRow.userUsername || "",
      roles: parseJson(projectRow.userRoles, []),
    },
    tasks: taskRows.map(mapTaskRow),
    users: projectUsers,
    donationSummary: {
      totalItems: projectRow.donationSummaryTotalItems || 0,
      lastUpdated: projectRow.donationSummaryLastUpdated || null,
      description: projectRow.donationSummaryDescription || "",
    },
    donations,
    createdAt: projectRow.createdAt,
  }
}

export function createUser(firstNameOrUser, lastName, email, username, password, roles = []) {
  const user =
    typeof firstNameOrUser === "object" && firstNameOrUser !== null
      ? {
          firstName: normalizeString(firstNameOrUser.firstName),
          lastName: normalizeString(firstNameOrUser.lastName),
          email: normalizeString(firstNameOrUser.email),
          username: normalizeString(firstNameOrUser.username),
          password: normalizeString(firstNameOrUser.password),
          roles: normalizeRoles(firstNameOrUser.roles),
        }
      : {
          firstName: normalizeString(firstNameOrUser),
          lastName: normalizeString(lastName),
          email: normalizeString(email),
          username: normalizeString(username),
          password: normalizeString(password),
          roles: normalizeRoles(roles),
        }

  const transaction = db.transaction(() => {
    const result = db
      .prepare(
        "INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)"
      )
      .run(user.firstName, user.lastName, user.email, user.username, user.password)

    const userId = result.lastInsertRowid

    if (user.roles.length > 0) {
      const roleInsert = db.prepare("INSERT INTO user_roles (userId, role) VALUES (?, ?)")
      user.roles.forEach((role) => roleInsert.run(userId, role))
    }

    return userId
  })

  transaction()
  return getUserByEmail(user.email)
}

export function getUserByEmail(email) {
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email)
  if (!user) {
    return null
  }

  return mapUser(user, getUserRoles(user.id), getUserTokens(user.id))
}

export function getUserByUsername(username) {
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username)
  if (!user) {
    return null
  }

  return mapUser(user, getUserRoles(user.id), getUserTokens(user.id))
}

export function getUsersByEmail(email) {
  const users = db.prepare("SELECT * FROM users WHERE email = ?").all(email)
  return users.map((user) => mapUser(user, getUserRoles(user.id), getUserTokens(user.id)))
}

export function getAllUsers() {
  const users = db.prepare("SELECT * FROM users ORDER BY firstName ASC, lastName ASC, id ASC").all()
  return users.map((user) => mapUser(user, getUserRoles(user.id), getUserTokens(user.id)))
}

export function createRefreshToken(userId, token) {
  const result = db
    .prepare("INSERT INTO user_tokens (userId, token) VALUES (?, ?)")
    .run(userId, token)

  return {
    id: result.lastInsertRowid,
    userId,
    token,
  }
}

export function getRefreshToken(token) {
  return db.prepare("SELECT * FROM user_tokens WHERE token = ?").get(token)
}

export function deleteRefreshToken(token) {
  return db.prepare("DELETE FROM user_tokens WHERE token = ?").run(token)
}

export function updateUser(userId, updates = {}) {
  const existingUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId)
  if (!existingUser) {
    return null
  }

  const nextRoles = updates.roles ? normalizeRoles(updates.roles) : getUserRoles(userId)
  const nextTokens = updates.token ? toArray(updates.token).filter(Boolean) : getUserTokens(userId)

  db.prepare(
    `UPDATE users
     SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?
     WHERE id = ?`
  ).run(
    updates.firstName ?? existingUser.firstName,
    updates.lastName ?? existingUser.lastName,
    updates.email ?? existingUser.email,
    updates.username ?? existingUser.username,
    updates.password ?? existingUser.password,
    userId
  )

  if (updates.roles) {
    db.prepare("DELETE FROM user_roles WHERE userId = ?").run(userId)
    const insertRole = db.prepare("INSERT INTO user_roles (userId, role) VALUES (?, ?)")
    nextRoles.forEach((role) => {
      insertRole.run(userId, role)
    })
  }

  if (updates.token) {
    db.prepare("DELETE FROM user_tokens WHERE userId = ?").run(userId)
    const insertToken = db.prepare("INSERT INTO user_tokens (userId, token) VALUES (?, ?)")
    nextTokens.forEach((token) => {
      insertToken.run(userId, token)
    })
  }

  return mapUser(
    db.prepare("SELECT * FROM users WHERE id = ?").get(userId),
    getUserRoles(userId),
    getUserTokens(userId)
  )
}

export function createProject(projectData) {
  const transaction = db.transaction(() => {
    const user = normalizeUser(projectData.user)
    const donationSummary = projectData.donationSummary || {}

    const result = db
      .prepare(
        `INSERT INTO projects (
          projectName,
          projectDescription,
          projectType,
          startDate,
          endDate,
          status,
          userEmail,
          userFirstName,
          userLastName,
          userUsername,
          userRoles,
          donationSummaryTotalItems,
          donationSummaryLastUpdated,
          donationSummaryDescription
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        normalizeString(projectData.projectName),
        normalizeString(projectData.projectDescription),
        normalizeString(projectData.projectType),
        normalizeString(projectData.startDate),
        normalizeString(projectData.endDate),
        normalizeString(projectData.status),
        user.email,
        user.firstName,
        user.lastName,
        user.username,
        stringifyJson(user.roles, []),
        normalizeNumber(donationSummary.totalItems) ?? 0,
        donationSummary.lastUpdated || null,
        normalizeString(donationSummary.description)
      )

    const projectId = result.lastInsertRowid

    if (Array.isArray(projectData.tasks)) {
      projectData.tasks.forEach((task, index) => {
        insertTask(projectId, task, index)
      })
    }

    if (Array.isArray(projectData.users)) {
      projectData.users.forEach((projectUser) => {
        const normalizedProjectUser = normalizeUser(projectUser)
        const userResult = db
          .prepare(
            "INSERT INTO project_users (projectId, firstName, lastName, email, username) VALUES (?, ?, ?, ?, ?)"
          )
          .run(
            projectId,
            normalizedProjectUser.firstName,
            normalizedProjectUser.lastName,
            normalizedProjectUser.email,
            normalizedProjectUser.username
          )

        const roleInsert = db.prepare(
          "INSERT INTO project_user_roles (projectUserId, role) VALUES (?, ?)"
        )

        normalizedProjectUser.roles.forEach((role) => {
          roleInsert.run(userResult.lastInsertRowid, role)
        })
      })
    }

    if (Array.isArray(projectData.donations)) {
      const donationInsert = db.prepare(
        "INSERT INTO donations (projectId, donatedItem, numberOfItems, category, dateReceived) VALUES (?, ?, ?, ?, ?)"
      )

      projectData.donations.forEach((donation) => {
        donationInsert.run(
          projectId,
          normalizeString(donation.donatedItem),
          normalizeNumber(donation.numberOfItems) ?? 0,
          normalizeString(donation.category),
          donation.dateReceived || new Date().toISOString()
        )
      })
    }

    return projectId
  })

  const projectId = transaction()
  return getProjectById(projectId)
}

export function getProjectById(projectId) {
  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(projectId)
  if (!project) {
    return null
  }

  const taskRows = db
    .prepare("SELECT * FROM project_tasks WHERE projectId = ? ORDER BY taskOrder ASC, id ASC")
    .all(projectId)

  const userRows = db.prepare("SELECT * FROM project_users WHERE projectId = ?").all(projectId)
  const projectUsers = userRows.map((user) => {
    const roles = db
      .prepare("SELECT role FROM project_user_roles WHERE projectUserId = ?")
      .all(user.id)
      .map((role) => role.role)

    return mapProjectUserRow(user, roles)
  })

  const donations = db.prepare("SELECT * FROM donations WHERE projectId = ?").all(projectId)

  return mapProject(project, taskRows, projectUsers, donations)
}

export function getProjectsByEmail(email) {
  const projects = db.prepare("SELECT id FROM projects WHERE userEmail = ?").all(email)
  return projects.map((project) => getProjectById(project.id))
}

export function updateProject(projectId, updates) {
  ensureProjectExists(projectId)

  const existingProject = getProjectById(projectId)
  const nextUser = updates.user ? normalizeUser(updates.user) : existingProject.user
  const nextDonationSummary = {
    ...existingProject.donationSummary,
    ...(updates.donationSummary || {}),
  }

  db.prepare(
    `UPDATE projects
     SET projectName = ?,
         projectDescription = ?,
         projectType = ?,
         startDate = ?,
         endDate = ?,
         status = ?,
         userEmail = ?,
         userFirstName = ?,
         userLastName = ?,
         userUsername = ?,
         userRoles = ?,
         donationSummaryTotalItems = ?,
         donationSummaryLastUpdated = ?,
         donationSummaryDescription = ?
     WHERE id = ?`
  ).run(
    updates.projectName ?? existingProject.projectName,
    updates.projectDescription ?? existingProject.projectDescription,
    updates.projectType ?? existingProject.projectType,
    updates.startDate ?? existingProject.startDate,
    updates.endDate ?? existingProject.endDate,
    updates.status ?? existingProject.status,
    nextUser.email,
    nextUser.firstName,
    nextUser.lastName,
    nextUser.username,
    stringifyJson(nextUser.roles, []),
    normalizeNumber(nextDonationSummary.totalItems) ?? 0,
    nextDonationSummary.lastUpdated ?? null,
    nextDonationSummary.description ?? "",
    projectId
  )

  return getProjectById(projectId)
}

export function createProjectTask(projectId, task) {
  ensureProjectExists(projectId)
  const taskOrder = getNextTaskOrder(projectId)
  return insertTask(projectId, task, taskOrder)
}

export function updateProjectTask(projectId, taskId, taskUpdates = {}, taskIndex = null) {
  ensureProjectExists(projectId)

  let resolvedTaskId = taskId ? Number(taskId) : null

  if (!resolvedTaskId) {
    resolvedTaskId = findProjectTaskIdByOrder(projectId, Number.isInteger(taskIndex) ? taskIndex : null)
  }

  if (!resolvedTaskId) {
    return null
  }

  const existingTask = getProjectTaskRow(projectId, resolvedTaskId)
  if (!existingTask) {
    return null
  }

  const normalizedTask = normalizeTask({
    taskName: taskUpdates.taskName ?? existingTask.taskName ?? existingTask.task,
    taskDescription: taskUpdates.taskDescription ?? existingTask.taskDescription,
    startDate: taskUpdates.startDate ?? existingTask.startDate,
    endDate: taskUpdates.endDate ?? existingTask.endDate,
    status: taskUpdates.status ?? existingTask.status,
    hoursEstimated: taskUpdates.hoursEstimated ?? existingTask.hoursEstimated,
    hoursWorked: taskUpdates.hoursWorked ?? existingTask.hoursWorked,
    roles: taskUpdates.roles ?? parseJson(existingTask.roles, []),
    users: taskUpdates.users ?? parseJson(existingTask.users, []),
  })

  db.prepare(
    `UPDATE project_tasks
     SET task = ?,
         taskName = ?,
         taskDescription = ?,
         startDate = ?,
         endDate = ?,
         status = ?,
         hoursEstimated = ?,
         hoursWorked = ?,
         roles = ?,
         users = ?
     WHERE id = ? AND projectId = ?`
  ).run(
    normalizedTask.taskName,
    normalizedTask.taskName,
    normalizedTask.taskDescription,
    normalizedTask.startDate,
    normalizedTask.endDate,
    normalizedTask.status,
    normalizedTask.hoursEstimated,
    normalizedTask.hoursWorked,
    stringifyJson(normalizedTask.roles, []),
    stringifyJson(normalizedTask.users, []),
    resolvedTaskId,
    projectId
  )

  return getProjectTaskById(projectId, resolvedTaskId)
}

export function deleteProjectTask(projectId, taskId, taskIndex = null) {
  ensureProjectExists(projectId)

  let resolvedTaskId = taskId ? Number(taskId) : null

  if (!resolvedTaskId) {
    resolvedTaskId = findProjectTaskIdByOrder(projectId, Number.isInteger(taskIndex) ? taskIndex : null)
  }

  if (!resolvedTaskId) {
    return false
  }

  const result = db
    .prepare("DELETE FROM project_tasks WHERE id = ? AND projectId = ?")
    .run(resolvedTaskId, projectId)

  return result.changes > 0
}

export function addUserToProject(projectId, userType, user) {
  ensureProjectExists(projectId)

  const normalizedUser = normalizeUser(user)
  const combinedRoles = [...new Set([...normalizedUser.roles, normalizeString(userType).trim()].filter(Boolean))]

  const result = db
    .prepare(
      "INSERT INTO project_users (projectId, firstName, lastName, email, username) VALUES (?, ?, ?, ?, ?)"
    )
    .run(
      projectId,
      normalizedUser.firstName,
      normalizedUser.lastName,
      normalizedUser.email,
      normalizedUser.username
    )

  const roleInsert = db.prepare("INSERT INTO project_user_roles (projectUserId, role) VALUES (?, ?)")
  combinedRoles.forEach((role) => {
    roleInsert.run(result.lastInsertRowid, role)
  })

  return getProjectById(projectId)
}

export function updateProjectDonationSummary(projectId, donationSummary) {
  const project = getProjectById(projectId)
  if (!project) {
    return null
  }

  db.prepare(
    `UPDATE projects
     SET donationSummaryTotalItems = ?, donationSummaryLastUpdated = ?, donationSummaryDescription = ?
     WHERE id = ?`
  ).run(
    normalizeNumber(donationSummary.totalItems) ?? 0,
    donationSummary.lastUpdated || new Date().toISOString(),
    normalizeString(donationSummary.description),
    projectId
  )

  return getProjectById(projectId)
}

export function createDataset(projectNameOrDataset, data) {
  const dataset =
    typeof projectNameOrDataset === "object" && projectNameOrDataset !== null
      ? {
          projectName: normalizeString(projectNameOrDataset.projectName),
          items: Array.isArray(projectNameOrDataset.items)
            ? projectNameOrDataset.items
            : Array.isArray(projectNameOrDataset.data)
              ? projectNameOrDataset.data
              : [],
        }
      : {
          projectName: normalizeString(projectNameOrDataset),
          items: Array.isArray(data) ? data : [],
        }

  const transaction = db.transaction(() => {
    const result = db
      .prepare("INSERT INTO datasets (projectName) VALUES (?)")
      .run(dataset.projectName)

    const datasetId = result.lastInsertRowid

    const itemInsert = db.prepare(
      `INSERT INTO dataset_items
       (datasetId, image, description, weekly, monthly, quarterly, current, goal, lastUpdate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )

    if (Array.isArray(dataset.items)) {
      dataset.items.forEach((item) => {
        itemInsert.run(
          datasetId,
          item.image || null,
          item.description || null,
          normalizeNumber(item.weekly) ?? 0,
          normalizeNumber(item.monthly) ?? 0,
          normalizeNumber(item.quarterly) ?? 0,
          normalizeNumber(item.current) ?? 0,
          normalizeNumber(item.goal) ?? 0,
          item.lastUpdate || null
        )
      })
    }

    return datasetId
  })

  const datasetId = transaction()
  return getDatasetById(datasetId)
}

export function getDatasetById(datasetId) {
  const dataset = db.prepare("SELECT * FROM datasets WHERE id = ?").get(datasetId)
  if (!dataset) {
    return null
  }

  const data = db
    .prepare("SELECT * FROM dataset_items WHERE datasetId = ? ORDER BY id ASC")
    .all(datasetId)
    .map((item) => ({
      image: item.image,
      description: item.description,
      weekly: item.weekly,
      monthly: item.monthly,
      quarterly: item.quarterly,
      current: item.current,
      goal: item.goal,
      lastUpdate: item.lastUpdate,
    }))

  return {
    id: dataset.id,
    projectName: dataset.projectName,
    data,
    items: data,
    createdAt: dataset.createdAt,
  }
}

export function getDatasetsByProjectName(projectName) {
  const datasets = db.prepare("SELECT id FROM datasets WHERE projectName = ?").all(projectName)
  return datasets.map((dataset) => getDatasetById(dataset.id))
}

export function getDatasetByProjectName(projectName) {
  const dataset = db
    .prepare("SELECT id FROM datasets WHERE LOWER(projectName) = LOWER(?) ORDER BY id ASC LIMIT 1")
    .get(projectName)

  return dataset ? getDatasetById(dataset.id) : null
}

export function getAllDatasets() {
  const datasets = db.prepare("SELECT id FROM datasets ORDER BY projectName ASC, id ASC").all()
  return datasets.map((dataset) => getDatasetById(dataset.id))
}

export function updateDataset(datasetId, updates = {}) {
  const existingDataset = getDatasetById(datasetId)
  if (!existingDataset) {
    return null
  }

  const nextProjectName = updates.projectName ?? existingDataset.projectName
  const nextItems = Array.isArray(updates.items)
    ? updates.items
    : Array.isArray(updates.data)
      ? updates.data
      : existingDataset.items

  const transaction = db.transaction(() => {
    db.prepare("UPDATE datasets SET projectName = ? WHERE id = ?").run(nextProjectName, datasetId)
    db.prepare("DELETE FROM dataset_items WHERE datasetId = ?").run(datasetId)

    const itemInsert = db.prepare(
      `INSERT INTO dataset_items
       (datasetId, image, description, weekly, monthly, quarterly, current, goal, lastUpdate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )

    nextItems.forEach((item) => {
      itemInsert.run(
        datasetId,
        item.image || null,
        item.description || null,
        normalizeNumber(item.weekly) ?? 0,
        normalizeNumber(item.monthly) ?? 0,
        normalizeNumber(item.quarterly) ?? 0,
        normalizeNumber(item.current) ?? 0,
        normalizeNumber(item.goal) ?? 0,
        item.lastUpdate || null
      )
    })
  })

  transaction()
  return getDatasetById(datasetId)
}

export function createContact(firstName, lastName, email, phone, projectType, message) {
  const result = db
    .prepare(
      "INSERT INTO contacts (firstName, lastName, email, phone, projectType, message) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(firstName, lastName, email, phone, projectType, message)

  return {
    id: result.lastInsertRowid,
    firstName,
    lastName,
    email,
    phone,
    projectType,
    message,
  }
}

export function getContactsByEmail(email) {
  return db.prepare("SELECT * FROM contacts WHERE email = ?").all(email)
}

export function getAllContacts() {
  return db.prepare("SELECT * FROM contacts ORDER BY createdAt DESC, id DESC").all()
}

export function addDonationsToProject(projectId, donations = []) {
  ensureProjectExists(projectId)

  const insertDonation = db.prepare(
    "INSERT INTO donations (projectId, donatedItem, numberOfItems, category, dateReceived) VALUES (?, ?, ?, ?, ?)"
  )

  donations.forEach((donation) => {
    insertDonation.run(
      projectId,
      normalizeString(donation.donatedItem),
      normalizeNumber(donation.numberOfItems) ?? 0,
      normalizeString(donation.category),
      donation.dateReceived || new Date().toISOString()
    )
  })

  return getProjectById(projectId)
}

export function createBuilder(builderData) {
  const builder = builderData || {}
  const user = normalizeUser(builder.user)
  const roles = normalizeRoles(builder.roles)
  const tasks = Array.isArray(builder.tasks)
    ? builder.tasks.map((task) => {
        if (typeof task === "string") {
          return { taskName: task }
        }

        return { taskName: normalizeString(task?.taskName ?? task?.task) }
      })
    : []

  const result = db
    .prepare(
      `INSERT INTO builders (
        projectType,
        roles,
        tasks,
        userFirstName,
        userLastName,
        userEmail,
        userUsername,
        userRoles
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      normalizeString(builder.projectType),
      stringifyJson(roles, []),
      stringifyJson(tasks, []),
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      stringifyJson(user.roles, [])
    )

  const row = db.prepare("SELECT * FROM builders WHERE id = ?").get(result.lastInsertRowid)
  return mapBuilderRow(row)
}

export function getAllBuilders() {
  return db.prepare("SELECT * FROM builders ORDER BY projectType ASC, id ASC").all().map(mapBuilderRow)
}

export function createMessage(messageData) {
  const result = db
    .prepare(
      `INSERT INTO messages (
        projectId,
        projectName,
        senderId,
        senderName,
        messageType,
        content,
        createdAt,
        isRead
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      Number(messageData.projectId),
      normalizeString(messageData.projectName),
      normalizeString(messageData.senderId),
      normalizeString(messageData.senderName),
      normalizeString(messageData.messageType),
      normalizeString(messageData.content),
      messageData.createdAt || new Date().toISOString(),
      messageData.isRead ? 1 : 0
    )

  const row = db.prepare("SELECT * FROM messages WHERE id = ?").get(result.lastInsertRowid)
  return mapMessageRow(row)
}

export function getAllMessages() {
  return db.prepare("SELECT * FROM messages ORDER BY datetime(createdAt) DESC, id DESC").all().map(mapMessageRow)
}

export function getMessagesByProjectId(projectId) {
  return db
    .prepare("SELECT * FROM messages WHERE projectId = ? ORDER BY datetime(createdAt) ASC, id ASC")
    .all(projectId)
    .map(mapMessageRow)
}
