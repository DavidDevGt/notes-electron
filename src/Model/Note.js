class Note {
  constructor(db) {
    this.db = db;
  }

  // Create
  create(title, content, notebook_id, callback) {
    const sql =
      "INSERT INTO notes (title, content, notebook_id) VALUES (?, ?, ?)";
    this.db.run(sql, [title, content, notebook_id], function (err) {
      callback(err, { id: this.lastID });
    });
  }

  // Read
  findAll(callback) {
    const sql = "SELECT * FROM notes";
    this.db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }

  findById(id, callback) {
    const sql = "SELECT * FROM notes  WHERE id = ?";
    this.db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  }

  // Update
  update(id, title, content, callback) {
    const sql =
      "UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    this.db.run(sql, [title, content, id], function (err) {
      callback(err, { changes: this.changes });
    });
  }

  // Delete
  delete(id, callback) {
    const sql = "DELETE FROM notes WHERE id = ?";
    this.db.run(sql, [id], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Note;
