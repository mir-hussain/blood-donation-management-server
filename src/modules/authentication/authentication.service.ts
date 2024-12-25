import db from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { RowDataPacket } from "mysql2";
import { IUser } from "../../interface/user";

const loginUser = async (email: string, password: string) => {
  console.log(email, password);
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );
  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = rows[0];

  console.log(user);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  console.log(isPasswordValid);

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    config.jwt_secret as string,
    { expiresIn: "1w" }
  );

  console.log(token);

  return token;
};

const registerUser = async (userData: IUser) => {
  const query = `
    INSERT INTO User (name, email, password, phone, dob, role, blood_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  console.log(config.salt_rounds);

  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.salt_rounds)
  );

  const params = [
    userData.name,
    userData.email,
    hashedPassword,
    userData.phone,
    userData.dob,
    userData.role,
    userData.blood_type,
  ];

  const [result]: any = await db.query(query, params);
  return result.insertId;
};

export const AuthenticationService = { loginUser, registerUser };
