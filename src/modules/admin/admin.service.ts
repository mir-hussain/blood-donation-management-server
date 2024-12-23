import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";

const createAdminInDb = async (userId: string) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const adminQuery = `INSERT INTO Admin (id) VALUES (?)`;
    const [adminResult] = await connection.query<ResultSetHeader>(adminQuery, [
      userId,
    ]);
    if (adminResult.affectedRows === 0) {
      throw new Error("Failed to insert into Admin table");
    }

    const userQuery = `UPDATE User SET role = 'admin' WHERE id = ?`;
    const [userResult] = await connection.query<ResultSetHeader>(userQuery, [
      userId,
    ]);
    if (userResult.affectedRows === 0) {
      throw new Error("Failed to update role in User table");
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getAllAdminsFromDb = async () => {
  const query = `
    SELECT User.*
    FROM Admin
    JOIN User ON Admin.id = User.id
  `;
  const [rows] = await db.query<RowDataPacket[]>(query);
  return rows;
};

const getAdminByIdFromDb = async (id: string) => {
  const query = `
    SELECT User.*
    FROM Admin
    JOIN User ON Admin.id = User.id
    WHERE Admin.id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows[0];
};

const deleteAdminFromDb = async (id: string) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Delete from Admin table
    const adminQuery = `DELETE FROM Admin WHERE id = ?`;
    const [adminResult] = await connection.query<ResultSetHeader>(adminQuery, [
      id,
    ]);
    if (adminResult.affectedRows === 0) {
      throw new Error("Failed to delete from Admin table or Admin not found");
    }

    // Update role in User table
    const userQuery = `UPDATE User SET role = 'user' WHERE id = ?`;
    const [userResult] = await connection.query<ResultSetHeader>(userQuery, [
      id,
    ]);
    if (userResult.affectedRows === 0) {
      throw new Error("Failed to update role in User table");
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const AdminService = {
  createAdminInDb,
  getAllAdminsFromDb,
  getAdminByIdFromDb,
  deleteAdminFromDb,
};
