import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  node_env: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  port: process.env.PORT,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET,
};
