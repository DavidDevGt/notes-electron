class Notebook {
    constructor(db) {
      this.db = db;
    }
  
    // Create
    create(name, user_id, callback) {
      const sql = "INSERT INTO notebooks (name, user_id) VALUES (?, ?)";
      this.db.run(sql, [name, user_id], function(err) {
        callback(err, { id: this.lastID });
      });
    }
  
    // Read
    findAll(callback) {
      const sql = "SELECT * FROM notebooks";
      this.db.all(sql, [], (err, rows) => {
        callback(err, rows);
      });
    }
  
    findById(id, callback) {
      const sql = "SELECT * FROM notebooks WHERE id = ?";
      this.db.get(sql, [id], (err, row) => {
        callback(err, row);
      });
    }
  
    // Update
    update(id, name, callback) {
      const sql = "UPDATE notebooks SET name = ? WHERE id = ?";
      this.db.run(sql, [name, id], function(err) {
        callback(err, { changes: this.changes });
      });
    }
  
    // Delete
    delete(id, callback) {
        // Primero eliminamos todas las notas asociadas al notebook
        const deleteNotesSql = "DELETE FROM notes WHERE notebook_id = ?";
        this.db.run(deleteNotesSql, [id], (err, row) => {
          if (err) {
            callback(err);
            return;
          }
          // Después eliminamos el notebook
          const deleteNotebookSql = "DELETE FROM notebooks WHERE id = ?";
          this.db.run(deleteNotebookSql, [id], function(err) {
            callback(err, { changes: this.changes });
          });
        });
      }
  }
  
  module.exports = Notebook;
  