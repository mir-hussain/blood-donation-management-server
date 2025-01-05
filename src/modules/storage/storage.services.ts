import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";

const createStorageInDb = async (storageData: {
  hospital_id: number;
  blood_type: string;
  quantity: number;
}) => {
  const query = `
    INSERT INTO Storage (hospital_id, blood_type, quantity)
    VALUES (?, ?, ?)
  `;
  const params = [
    storageData.hospital_id,
    storageData.blood_type,
    storageData.quantity,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.insertId;
};

const getAllStorageFromDb = async (
  filters: { hospital_id?: number; blood_type?: string } = {}
) => {
  let query = `SELECT Storage.*, Hospital.name AS hospital_name FROM Storage
               LEFT JOIN Hospital ON Storage.hospital_id = Hospital.id`;
  const params: any[] = [];
  const conditions: string[] = [];

  if (filters.hospital_id) {
    conditions.push("Storage.hospital_id = ?");
    params.push(filters.hospital_id);
  }

  if (filters.blood_type) {
    conditions.push("Storage.blood_type = ?");
    params.push(filters.blood_type);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await db.query<RowDataPacket[]>(query, params);
  return rows;
};

const getStorageByIdFromDb = async (id: number) => {
  const query = `
    SELECT Storage.*, Hospital.name AS hospital_name FROM Storage
    LEFT JOIN Hospital ON Storage.hospital_id = Hospital.id
    WHERE Storage.id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows.length > 0 ? rows[0] : null;
};

const updateStorageInDb = async (
  id: number,
  storageData: { quantity: number }
) => {
  const query = `
    UPDATE Storage
    SET quantity = ?
    WHERE id = ?
  `;
  const params = [storageData.quantity, id];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};

const deleteStorageFromDb = async (id: number) => {
  const query = `DELETE FROM Storage WHERE id = ?`;
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

const getStoragesByHospitalId = async (hospitalId: number) => {
  const query = `
    SELECT *
    FROM Storage
    WHERE hospital_id = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [hospitalId]);
  return rows;
};

export const StorageService = {
  createStorageInDb,
  getAllStorageFromDb,
  getStorageByIdFromDb,
  updateStorageInDb,
  deleteStorageFromDb,
  getStoragesByHospitalId,
};
