const db = require('../database/db');

class User {
  static create(user) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (name, email, username, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)`,
        [user.name, user.email, user.username, user.password, user.phone, user.role],
        function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE username = ?`, [username], (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  static update(id, updates) {
    return new Promise((resolve, reject) => {
      const { name, email, username, phone } = updates;
      db.run(
        `UPDATE users SET name = ?, email = ?, username = ?, phone = ? WHERE id = ?`,
        [name, email, username, phone, id],
        function (error) {
          if (error) {
            reject(error);
          } else {
            resolve(this.changes);
          }
        }
      );
    });
  }

  static updatePassword(id, password) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE users SET password = ? WHERE id = ?`, [password, id], function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE id = ?`, [id], function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = User;