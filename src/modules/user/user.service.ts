import config from "../../config";
import db from "../../config/database";
import { IUser } from "../../interface/user";
import bcrypt from "bcrypt";

const getAllUsersFromDb = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return rows;
};

export const UserService = { getAllUsersFromDb };
