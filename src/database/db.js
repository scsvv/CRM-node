const sqlite3 = require('sqlite3').verbose();

// Создаем новую базу данных или открываем существующую
const db = new sqlite3.Database('./users.db');

// Создаем таблицу пользователей, если она не существует
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'User'
)`);

module.exports = db;