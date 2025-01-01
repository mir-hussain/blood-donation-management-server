import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";
import { IHospital } from "../../interface/hospital";

const createHospitalInDb = async (hospitalData: IHospital) => {
  const query = `
    INSERT INTO Hospital (name, address, city, branch, contact_number, created_by_admin_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    hospitalData.name,
    hospitalData.address,
    hospitalData.city,
    hospitalData.branch,
    hospitalData.contact_number,
    hospitalData.created_by_admin_id,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.insertId;
};

const getAllHospitalsFromDb = async () => {
  const query = `SELECT * FROM Hospital`;
  const [rows] = await db.query<RowDataPacket[]>(query);
  return rows;
};

const getHospitalByIdFromDb = async (id: string) => {
  const query = `SELECT * FROM Hospital WHERE id = ?`;
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows[0];
};

const updateHospitalInDb = async (id: string, hospitalData: IHospital) => {
  const query = `
    UPDATE Hospital
    SET name = ?, address = ?, contact_number = ?, created_by_admin_id = ?
    WHERE id = ?
  `;
  const params = [
    hospitalData.name,
    hospitalData.address,
    hospitalData.contact_number,
    hospitalData.created_by_admin_id,
    id,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};

const deleteHospitalFromDb = async (id: string) => {
  const query = `DELETE FROM Hospital WHERE id = ?`;
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0;
};

export const HospitalService = {
  createHospitalInDb,
  getAllHospitalsFromDb,
  getHospitalByIdFromDb,
  updateHospitalInDb,
  deleteHospitalFromDb,
};
