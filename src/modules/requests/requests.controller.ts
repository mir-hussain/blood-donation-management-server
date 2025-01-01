import { Request, Response } from "express";
import { RequestService } from "./requests.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createRequest = catchAsync(async (req: Request, res: Response) => {
  const requestData = req.body;
  const requestId = await RequestService.createRequest(requestData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Request created successfully",
    data: { id: requestId },
  });
});

const getRequests = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query; // Example: ?user_id=1&is_public_request=true
  const requests = await RequestService.getRequests(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Requests retrieved successfully",
    data: requests,
  });
});

const getRequestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const request = await RequestService.getRequestById(Number(id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Request retrieved successfully",
    data: request,
  });
});

const updateRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const success = await RequestService.updateRequest(Number(id), updateData);
  if (success) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Request updated successfully",
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Request not found",
      data: null,
    });
  }
});

const deleteRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await RequestService.deleteRequest(Number(id));
  if (success) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Request deleted successfully",
      data: null,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Request not found",
      data: null,
    });
  }
});

export const RequestController = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
