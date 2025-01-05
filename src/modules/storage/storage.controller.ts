import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StorageService } from "./storage.services";

const createStorage = catchAsync(async (req: Request, res: Response) => {
  const storageData = req.body;
  const result = await StorageService.createStorageInDb(storageData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Storage created successfully",
    data: { id: result },
  });
});

const getAllStorage = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;
  const result = await StorageService.getAllStorageFromDb(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Storages retrieved successfully",
    data: result,
  });
});

const getStorageById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StorageService.getStorageByIdFromDb(Number(id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Storage retrieved successfully",
    data: result,
  });
});

const updateStorage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const storageData = req.body;
  const result = await StorageService.updateStorageInDb(
    Number(id),
    storageData
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Storage updated successfully",
    data: result,
  });
});

const deleteStorage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StorageService.deleteStorageFromDb(Number(id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Storage deleted successfully",
    data: result,
  });
});

const getStoragesByHospitalId = catchAsync(
  async (req: Request, res: Response) => {
    const { hospital_id } = req.params;
    const result = await StorageService.getStoragesByHospitalId(
      Number(hospital_id)
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Storages retrieved successfully",
      data: result,
    });
  }
);

export const StorageController = {
  createStorage,
  getAllStorage,
  getStorageById,
  updateStorage,
  deleteStorage,
  getStoragesByHospitalId,
};
