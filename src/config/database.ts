import mysql2 from "mysql2";
import config from ".";

const db = mysql2
  .createPool({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
  })
  .promise();

export default db;
