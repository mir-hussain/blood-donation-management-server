import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { HospitalService } from "./hospital.service";
import catchAsync from "../../utils/catchAsync";

const createHospital = catchAsync(async (req: Request, res: Response) => {
  const hospitalData = req.body;
  const result = await HospitalService.createHospitalInDb(hospitalData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Hospital created successfully",
    data: { id: result },
  });
});

const getAllHospitals = catchAsync(async (req: Request, res: Response) => {
  const result = await HospitalService.getAllHospitalsFromDb(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hospitals retrieved successfully",
    data: result,
  });
});

const getHospitalById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HospitalService.getHospitalByIdFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hospital retrieved successfully",
    data: result,
  });
});

const updateHospital = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const hospitalData = req.body;
  const result = await HospitalService.updateHospitalInDb(id, hospitalData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hospital updated successfully",
    data: result,
  });
});

const deleteHospital = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HospitalService.deleteHospitalFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Hospital deleted successfully",
    data: result,
  });
});

export const HospitalController = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
};
