import { ResultSetHeader, RowDataPacket } from "mysql2";
import config from "../../config";
import db from "../../config/database";
import { IUser } from "../../interface/user";
import bcrypt from "bcrypt";

const getAllUsersFromDb = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return rows;
};

const getUserByIdFromDb = async (id: string) => {
  const query = "SELECT * FROM User WHERE id = ?";
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows[0];
};

const updateUserInDb = async (id: string, userData: IUser) => {
  const query = `
    UPDATE User
    SET name = ?, email = ?, phone = ?, dob = ?, role = ?, blood_type = ?
    WHERE id = ?
  `;
  const params = [
    userData.name,
    userData.email,
    userData.phone,
    userData.dob,
    userData.role,
    userData.blood_type,
    id,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};

const deleteUserFromDb = async (id: string) => {
  const query = "DELETE FROM User WHERE id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

export const UserService = {
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
  deleteUserFromDb,
};
