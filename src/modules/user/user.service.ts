import db from "../../config/database";

const getAllUsersFromDb = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
  } catch (error) {
    console.error(error);
    return "Server Error";
  }
};

export const UserService = { getAllUsersFromDb };
