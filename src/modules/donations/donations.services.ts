import { RowDataPacket } from "mysql2";
import db from "../../config/database";

const createDonation = async (data: any) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Insert donation into Donations table
    const donationQuery = `
      INSERT INTO Donations (
        user_id, hospital_id, blood_type, donation_date, quantity_donated
      ) VALUES (?, ?, ?, ?, ?)
    `;
    const [donationResult]: any = await connection.query(donationQuery, [
      data.user_id,
      data.hospital_id,
      data.blood_type,
      data.donation_date,
      data.quantity_donated,
    ]);
    const donationId = donationResult.insertId;

    // Update the user's last donation date
    const updateUserQuery = `UPDATE User SET last_donated = ? WHERE id = ?`;
    await connection.query(updateUserQuery, [data.donation_date, data.user_id]);

    // If the donation is tied to a request, insert into Request_Donations table
    if (data.request_id) {
      const requestDonationQuery = `
        INSERT INTO Request_Donations (request_id, donation_id, quantity_donated)
        VALUES (?, ?, ?)
      `;
      await connection.query(requestDonationQuery, [
        data.request_id,
        donationId,
        data.quantity_donated,
      ]);
    }

    await connection.commit();
    return donationId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getDonations = async (filters: any) => {
  let query = `SELECT * FROM Donations WHERE 1=1`;
  const params: any[] = [];

  if (filters.user_id) {
    query += ` AND user_id = ?`;
    params.push(filters.user_id);
  }
  if (filters.blood_type) {
    query += ` AND blood_type = ?`;
    params.push(filters.blood_type);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

const getDonationById = async (id: number) => {
  const query = `SELECT * FROM Donations WHERE id = ?`;
  const [rows] = await db.query<RowDataPacket[]>(query, [id]);
  return rows[0];
};

const getDonationsForRequest = async (requestId: number) => {
  const query = `
    SELECT
      rd.id AS request_donation_id,
      d.id AS donation_id,
      d.user_id,
      u.name AS user_name,
      u.email AS user_email,
      u.phone AS user_phone,
      d.hospital_id,
      d.blood_type,
      d.donation_date,
      rd.quantity_donated
    FROM Request_Donations rd
    INNER JOIN Donations d ON rd.donation_id = d.id
    INNER JOIN User u ON d.user_id = u.id
    WHERE rd.request_id = ?
  `;
  const [rows]: any = await db.query(query, [requestId]);
  return rows;
};

export const DonationService = {
  getDonationsForRequest,
  createDonation,
  getDonations,
  getDonationById,
};
