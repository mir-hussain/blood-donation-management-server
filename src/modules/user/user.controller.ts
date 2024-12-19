import { Request, Response } from "express";
import db from "../../config/database";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
};

export const UserController = {
  getAllUsers,
};
