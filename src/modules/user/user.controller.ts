import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
};
