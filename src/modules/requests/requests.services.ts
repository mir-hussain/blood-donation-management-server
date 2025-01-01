import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../config/database";

const createRequest = async (requestData: any) => {
  const query = `
    INSERT INTO Requests
    (user_id, blood_type_requested, hospital_id, quantity_requested, status, request_date, is_public_request, location, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query<ResultSetHeader>(query, [
    requestData.user_id,
    requestData.blood_type_requested,
    requestData.hospital_id || null, // Null for public requests
    requestData.quantity_requested,
    requestData.status || "pending", // Default status is "pending"
    requestData.request_date,
    requestData.is_public_request || true, // Default is true (public)
    requestData.location, // Location is required
    requestData.city,
  ]);

  return result.insertId; // Return the ID of the created request
};

const getRequests = async (filters: any = {}) => {
  let query = `
        SELECT
            Requests.*,
            JSON_OBJECT(
                'id', User.id,
                'name', User.name,
                'email', User.email,
                'phone', User.phone,
                'dob', User.dob,
                'role', User.role,
                'blood_type', User.blood_type,
                'last_donated', User.last_donated
            ) AS user
        FROM Requests
        LEFT JOIN User ON Requests.user_id = User.id
    `;
  const params: any[] = [];

  if (Object.keys(filters).length > 0) {
    const conditions = [];
    if (filters.user_id) {
      conditions.push("user_id = ?");
      params.push(filters.user_id);
    }
    if (filters.hospital_id) {
      conditions.push("hospital_id = ?");
      params.push(filters.hospital_id);
    }
    if (filters.is_public_request !== undefined) {
      conditions.push("is_public_request = ?");
      params.push(filters.is_public_request);
    }
    if (filters.location) {
      conditions.push("location = ?");
      params.push(filters.location);
    }
    if (filters.city) {
      conditions.push("city LIKE ?");
      params.push(`%${filters.city}%`);
    }
    if (filters.blood_type_requested !== undefined) {
      conditions.push("blood_type_requested = ?");
      params.push(filters.blood_type_requested);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
  }

  const [rows] = await db.query(query, params);
  return rows;
};

const getRequestById = async (id: number) => {
  const query = "SELECT * FROM Requests WHERE id = ?";
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  if (rows.length === 0) {
    throw new Error("Request not found");
  }
  return rows[0];
};

const updateRequest = async (id: number, updateData: any) => {
  const query = `
    UPDATE Requests
    SET blood_type_requested = ?, hospital_id = ?, quantity_requested = ?,
        status = ?, request_date = ?, is_public_request = ?, location = ?, city = ?
    WHERE id = ?
  `;
  const [result] = await db.query<ResultSetHeader>(query, [
    updateData.blood_type_requested,
    updateData.hospital_id || null,
    updateData.quantity_requested,
    updateData.status,
    updateData.request_date,
    updateData.is_public_request,
    updateData.location,
    updateData.city,
    id,
  ]);
  return result.affectedRows > 0; // Return true if the update was successful
};

const deleteRequest = async (id: number) => {
  const query = "DELETE FROM Requests WHERE id = ?";
  const [result] = await db.query<ResultSetHeader>(query, [id]);
  return result.affectedRows > 0; // Return true if deleted
};

export const RequestService = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
