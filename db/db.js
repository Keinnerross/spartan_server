const mysql = require("mysql2/promise");
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = require("../config/config");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

module.exports = pool;
