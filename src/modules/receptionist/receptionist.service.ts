import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";

const createReceptionistInDb = async (receptionistData: {
  id: number;
  assigned_hospital_id: number | null;
}) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert into the Receptionist table
    const receptionistQuery = `
      INSERT INTO Receptionist (id, assigned_hospital_id)
      VALUES (?, ?)
    `;
    const [receptionistResult] = await connection.query<ResultSetHeader>(
      receptionistQuery,
      [receptionistData.id, receptionistData.assigned_hospital_id]
    );

    if (receptionistResult.affectedRows === 0) {
      throw new Error("Failed to insert into Receptionist table");
    }

    // Update the role in the User table
    const userQuery = `UPDATE User SET role = 'receptionist' WHERE id = ?`;
    const [userResult] = await connection.query<ResultSetHeader>(userQuery, [
      receptionistData.id,
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

const getAllReceptionistsFromDb = async () => {
  const query = `
    SELECT Receptionist.*, JSON_OBJECT(
      'id', User.id,
      'name', User.name,
      'email', User.email,
      'phone', User.phone,
      'role', User.role
    ) AS user
    FROM Receptionist
    LEFT JOIN User ON Receptionist.id = User.id
  `;
  const [rows] = await db.query<RowDataPacket[]>(query);

  // Parse the JSON object for the user
  return rows.map((row: any) => ({
    ...row,
    user: row.user ? JSON.parse(row.user) : null,
  }));
};

const getReceptionistByIdFromDb = async (id: number) => {
  const query = `
    SELECT Receptionist.*, JSON_OBJECT(
      'id', User.id,
      'name', User.name,
      'email', User.email,
      'phone', User.phone,
      'role', User.role
    ) AS user
    FROM Receptionist
    LEFT JOIN User ON Receptionist.id = User.id
    WHERE Receptionist.id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows.length > 0
    ? { ...rows[0], user: JSON.parse(rows[0].user) }
    : null;
};

const updateReceptionistInDb = async (
  id: number,
  assigned_hospital_id: number | null
) => {
  const query = `
    UPDATE Receptionist
    SET assigned_hospital_id = ?
    WHERE id = ?
  `;
  const [result] = await db.query<ResultSetHeader>(query, [
    assigned_hospital_id,
    id,
  ]);
  return result.affectedRows > 0;
};

const deleteReceptionistFromDb = async (id: number) => {
  const query = `DELETE FROM Receptionist WHERE id = ?`;
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

export const ReceptionistService = {
  createReceptionistInDb,
  getAllReceptionistsFromDb,
  getReceptionistByIdFromDb,
  updateReceptionistInDb,
  deleteReceptionistFromDb,
};
