import config from "../../config";
import db from "../../config/database";
import { IUser } from "../../interface/user";
import bcrypt from "bcrypt";

const getAllUsersFromDb = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return rows;
};

const createUserInDb = async (userData: IUser) => {
  const query = `
    INSERT INTO User (name, email, password, phone, dob, role, blood_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  console.log(config.salt_rounds);

  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.salt_rounds)
  );

  const params = [
    userData.name,
    userData.email,
    hashedPassword,
    userData.phone,
    userData.dob,
    userData.role,
    userData.blood_type,
  ];

  const [result]: any = await db.query(query, params);
  return result.insertId;
};

export const UserService = { getAllUsersFromDb, createUserInDb };
