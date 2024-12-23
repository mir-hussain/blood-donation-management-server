import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthenticationService } from "./authentication.service";
import sendResponse from "../../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthenticationService.loginUser(
    req.body.email,
    req.body.password
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthenticationService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const AuthenticationController = {
  login,
  register,
};
