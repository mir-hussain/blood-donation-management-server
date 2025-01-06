import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";
import { IHospitalRequest } from "../../interface/hospital";

const createRequestInDb = async (requestData: IHospitalRequest) => {
  const query = `
    INSERT INTO Hospital_Requests (hospital_id, blood_type_requested, quantity_requested, reason, status, request_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    requestData.hospital_id,
    requestData.blood_type_requested,
    requestData.quantity_requested,
    requestData.reason,
    requestData.status || "pending",
    requestData.request_date,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.insertId;
};

const getAllRequestsFromDb = async (hospitalId: string) => {
  const query = `SELECT * FROM Hospital_Requests WHERE hospital_id = ?`;
  const [rows] = await db.query<RowDataPacket[]>(query, [hospitalId]);
  return rows;
};

const getRequestByIdFromDb = async (hospitalId: string, requestId: string) => {
  const query = `SELECT * FROM Hospital_Requests WHERE hospital_id = ? AND id = ?`;
  const [rows] = await db.query<RowDataPacket[]>(query, [
    hospitalId,
    requestId,
  ]);
  return rows[0];
};

const updateRequestInDb = async (
  requestId: string,
  requestData: IHospitalRequest
) => {
  const query = `
    UPDATE Hospital_Requests
    SET blood_type_requested = ?, quantity_requested = ?, reason = ?, status = ?, request_date = ?
    WHERE id = ?
  `;
  const params = [
    requestData.blood_type_requested,
    requestData.quantity_requested,
    requestData.reason,
    requestData.status,
    requestData.request_date,
    requestId,
  ];

  const [result] = await db.query<ResultSetHeader>(query, params);
  return result.affectedRows > 0;
};

const deleteRequestFromDb = async (requestId: string) => {
  const query = `DELETE FROM Hospital_Requests WHERE id = ?`;
  const [result] = await db.query<ResultSetHeader>(query, [requestId]);
  return result.affectedRows > 0;
};

export const HospitalRequestsService = {
  createRequestInDb,
  getAllRequestsFromDb,
  getRequestByIdFromDb,
  updateRequestInDb,
  deleteRequestFromDb,
};
