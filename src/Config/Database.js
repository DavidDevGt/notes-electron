const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    const dbPath = path.resolve(__dirname, "quicknotes.db");
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Database opening error:", err);
      } else {
        this.createTables();
      }
    });
  }

  createTables() {
    this.db.serialize(() => {
      this.db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                )
            `);

      this.db.run(`
            CREATE TABLE IF NOT EXISTS notebooks (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              user_id INTEGER,
              FOREIGN KEY(user_id) REFERENCES users(id)
            )`);

      this.db.run(`
            CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              created_at TEXT DEFAULT CURRENT_TIMESTAMP,
              updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
              notebook_id INTEGER,
              FOREIGN KEY(notebook_id) REFERENCES notebooks(id)
            )`);
    });
  }
}

module.exports = new Database();
