import db from "../../config/database";
import { IUser } from "../../interface/user";

const getAllUsersFromDb = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return rows;
};

const createUserInDb = async (userData: IUser) => {
  const query = `
    INSERT INTO User (name, email, password, phone, dob, role, blood_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    userData.name,
    userData.email,
    userData.password,
    userData.phone,
    userData.dob,
    userData.role,
    userData.blood_type,
  ];

  const [result]: any = await db.query(query, params);
  return result.insertId;
};

export const UserService = { getAllUsersFromDb, createUserInDb };
