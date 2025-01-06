import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

import catchAsync from "../../utils/catchAsync";
import { HospitalRequestsService } from "./hospitalRequest.service";

const createHospitalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const requestData = req.body;
    const result = await HospitalRequestsService.createRequestInDb(requestData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Hospital request created successfully",
      data: { id: result },
    });
  }
);

const getAllHospitalRequests = catchAsync(
  async (req: Request, res: Response) => {
    const { hospitalId } = req.params;
    const result = await HospitalRequestsService.getAllRequestsFromDb(
      hospitalId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Hospital requests retrieved successfully",
      data: result,
    });
  }
);

const getHospitalRequestById = catchAsync(
  async (req: Request, res: Response) => {
    const { hospitalId, requestId } = req.params;
    const result = await HospitalRequestsService.getRequestByIdFromDb(
      hospitalId,
      requestId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Hospital request retrieved successfully",
      data: result,
    });
  }
);

const updateHospitalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const requestData = req.body;
    const result = await HospitalRequestsService.updateRequestInDb(
      requestId,
      requestData
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Hospital request updated successfully",
      data: result,
    });
  }
);

const deleteHospitalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const result = await HospitalRequestsService.deleteRequestFromDb(requestId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Hospital request deleted successfully",
      data: result,
    });
  }
);

export const HospitalRequestsController = {
  createHospitalRequest,
  getAllHospitalRequests,
  getHospitalRequestById,
  updateHospitalRequest,
  deleteHospitalRequest,
};
