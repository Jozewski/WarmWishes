import Database from "better-sqlite3"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new Database(path.join(__dirname, "warmwishes.db"))

db.pragma("foreign_keys = ON")

function getColumnNames(tableName) {
  return db.prepare(`PRAGMA table_info(${tableName})`).all().map((column) => column.name)
}

function ensureColumn(tableName, columnName, definition) {
  const columns = getColumnNames(tableName)
  if (!columns.includes(columnName)) {
    db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`)
  }
}

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT DEFAULT '',
      lastName TEXT DEFAULT '',
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS user_roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      role TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_user_roles_userId ON user_roles(userId);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS user_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      token TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_user_tokens_userId ON user_tokens(userId);
    CREATE INDEX IF NOT EXISTS idx_user_tokens_token ON user_tokens(token);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectName TEXT DEFAULT '',
      projectDescription TEXT DEFAULT '',
      projectType TEXT,
      startDate TEXT DEFAULT '',
      endDate TEXT DEFAULT '',
      status TEXT,
      userEmail TEXT,
      userFirstName TEXT,
      userLastName TEXT,
      userUsername TEXT,
      userRoles TEXT DEFAULT '[]',
      donationSummaryTotalItems INTEGER DEFAULT 0,
      donationSummaryLastUpdated DATETIME,
      donationSummaryDescription TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_projects_userEmail ON projects(userEmail);
    CREATE INDEX IF NOT EXISTS idx_projects_projectName ON projects(projectName);
  `)

  ensureColumn("projects", "userRoles", "TEXT DEFAULT '[]'")

  db.exec(`
    CREATE TABLE IF NOT EXISTS project_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      task TEXT,
      taskName TEXT,
      taskDescription TEXT DEFAULT '',
      startDate TEXT DEFAULT '',
      endDate TEXT DEFAULT '',
      status TEXT DEFAULT '',
      hoursEstimated REAL,
      hoursWorked REAL,
      roles TEXT DEFAULT '[]',
      users TEXT DEFAULT '[]',
      taskOrder INTEGER DEFAULT 0,
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_project_tasks_projectId ON project_tasks(projectId);
  `)

  ensureColumn("project_tasks", "task", "TEXT")
  ensureColumn("project_tasks", "taskName", "TEXT")
  ensureColumn("project_tasks", "taskDescription", "TEXT DEFAULT ''")
  ensureColumn("project_tasks", "startDate", "TEXT DEFAULT ''")
  ensureColumn("project_tasks", "endDate", "TEXT DEFAULT ''")
  ensureColumn("project_tasks", "status", "TEXT DEFAULT ''")
  ensureColumn("project_tasks", "hoursEstimated", "REAL")
  ensureColumn("project_tasks", "hoursWorked", "REAL")
  ensureColumn("project_tasks", "roles", "TEXT DEFAULT '[]'")
  ensureColumn("project_tasks", "users", "TEXT DEFAULT '[]'")
  ensureColumn("project_tasks", "taskOrder", "INTEGER DEFAULT 0")

  db.exec(`
    CREATE TABLE IF NOT EXISTS project_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      username TEXT,
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_project_users_projectId ON project_users(projectId);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS project_user_roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectUserId INTEGER NOT NULL,
      role TEXT NOT NULL,
      FOREIGN KEY (projectUserId) REFERENCES project_users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_project_user_roles_projectUserId ON project_user_roles(projectUserId);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      donatedItem TEXT DEFAULT '',
      numberOfItems INTEGER DEFAULT 0,
      category TEXT DEFAULT '',
      dateReceived DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_donations_projectId ON donations(projectId);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS datasets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectName TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_datasets_projectName ON datasets(projectName);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS dataset_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      datasetId INTEGER NOT NULL,
      image TEXT,
      description TEXT,
      weekly INTEGER,
      monthly INTEGER,
      quarterly INTEGER,
      current INTEGER,
      goal INTEGER,
      lastUpdate TEXT,
      FOREIGN KEY (datasetId) REFERENCES datasets(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_dataset_items_datasetId ON dataset_items(datasetId);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT DEFAULT '',
      lastName TEXT DEFAULT '',
      email TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      projectType TEXT DEFAULT '',
      message TEXT DEFAULT '',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS builders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectType TEXT NOT NULL,
      roles TEXT DEFAULT '[]',
      tasks TEXT DEFAULT '[]',
      userFirstName TEXT DEFAULT '',
      userLastName TEXT DEFAULT '',
      userEmail TEXT DEFAULT '',
      userUsername TEXT DEFAULT '',
      userRoles TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_builders_projectType ON builders(projectType);
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId INTEGER NOT NULL,
      projectName TEXT DEFAULT '',
      senderId TEXT DEFAULT '',
      senderName TEXT NOT NULL,
      messageType TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      isRead INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_messages_projectId ON messages(projectId);
    CREATE INDEX IF NOT EXISTS idx_messages_createdAt ON messages(createdAt);
  `)

  const taskColumns = getColumnNames("project_tasks")
  if (taskColumns.includes("task")) {
    db.exec(`
      UPDATE project_tasks
      SET taskName = COALESCE(NULLIF(taskName, ''), task)
      WHERE taskName IS NULL OR taskName = '';
    `)
  }

  db.exec(`
    UPDATE project_tasks SET roles = '[]' WHERE roles IS NULL OR roles = '';
    UPDATE project_tasks SET users = '[]' WHERE users IS NULL OR users = '';
    UPDATE projects SET userRoles = '[]' WHERE userRoles IS NULL OR userRoles = '';
    UPDATE builders SET roles = '[]' WHERE roles IS NULL OR roles = '';
    UPDATE builders SET tasks = '[]' WHERE tasks IS NULL OR tasks = '';
    UPDATE builders SET userRoles = '[]' WHERE userRoles IS NULL OR userRoles = '';
  `)

  console.log("✓ SQLite database schema initialized successfully")
}

export default db
