import db from "../../config/database";

const getAllUsersFromDb = async () => {
  const [rows] = await db.query("SELECT * FROM user");
  return rows;
};

export const UserService = { getAllUsersFromDb };
