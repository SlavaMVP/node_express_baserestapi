const mysql = require("mysql2");
require("dotenv").config();

const { DB_USER, DB_PASS, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: "localhost",
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
});

module.exports = pool.promise();
