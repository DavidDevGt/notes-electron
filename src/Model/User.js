class User {
    constructor(db) {
      this.db = db;
    }
  
    create(username, callback) {
      const sql = "INSERT INTO users (username) VALUES (?)";
      this.db.run(sql, [username], function(err) {
        callback(err, { id: this.lastID });
      });
    }
  
    findAll(callback) {
      const sql = "SELECT * FROM users";
      this.db.all(sql, [], (err, rows) => {
        callback(err, rows);
      });
    }
  
    findById(id, callback) {
      const sql = "SELECT * FROM users WHERE id = ?";
      this.db.get(sql, [id], (err, row) => {
        callback(err, row);
      });
    }
  
    update(id, username, callback) {
      const sql = "UPDATE users SET username = ? WHERE id = ?";
      this.db.run(sql, [username, id], function(err) {
        callback(err, { changes: this.changes });
      });
    }
  
    delete(id, callback) {
      const sql = "DELETE FROM users WHERE id = ?";
      this.db.run(sql, [id], function(err) {
        callback(err, { changes: this.changes });
      });
    }
  
    // Método para verificar la existencia de un usuario o crear uno nuevo
    findOrCreate(username, callback) {
      const findSql = "SELECT * FROM users WHERE username = ?";
      this.db.get(findSql, [username], (err, row) => {
        if (err) {
          callback(err);
          return;
        }
        if (row) {
          callback(null, row);
        } else {
          this.create(username, callback);
        }
      });
    }
  }
  
  module.exports = User;
  