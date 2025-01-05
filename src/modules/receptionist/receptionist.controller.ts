import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ReceptionistService } from "./receptionist.service";
import catchAsync from "../../utils/catchAsync";

const createReceptionist = catchAsync(async (req: Request, res: Response) => {
  const receptionistData = req.body;
  const result = await ReceptionistService.createReceptionistInDb(
    receptionistData
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Receptionist created successfully",
    data: { id: result },
  });
});

const getAllReceptionists = catchAsync(async (req: Request, res: Response) => {
  const result = await ReceptionistService.getAllReceptionistsFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Receptionists retrieved successfully",
    data: result,
  });
});

const getReceptionistById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReceptionistService.getReceptionistByIdFromDb(
    Number(id)
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Receptionist retrieved successfully",
    data: result,
  });
});

const updateReceptionist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { assigned_hospital_id } = req.body;
  const result = await ReceptionistService.updateReceptionistInDb(
    Number(id),
    assigned_hospital_id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Receptionist updated successfully",
    data: result,
  });
});

const deleteReceptionist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReceptionistService.deleteReceptionistFromDb(Number(id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Receptionist deleted successfully",
    data: result,
  });
});

export const ReceptionistController = {
  createReceptionist,
  getAllReceptionists,
  getReceptionistById,
  updateReceptionist,
  deleteReceptionist,
};
