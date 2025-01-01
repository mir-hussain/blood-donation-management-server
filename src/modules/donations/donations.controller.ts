import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

import catchAsync from "../../utils/catchAsync";
import { DonationService } from "./donations.services";

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const donationData = req.body;
  const result = await DonationService.createDonation(donationData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Donation created successfully",
    data: { id: result },
  });
});

const getAllDonations = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationService.getDonations(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donations retrieved successfully",
    data: result,
  });
});

const getDonationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DonationService.getDonationById(Number(id));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Donation retrieved successfully",
    data: result,
  });
});

const getDonationsForRequest = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Request ID from the route
    const donations = await DonationService.getDonationsForRequest(Number(id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Donations for the request retrieved successfully",
      data: donations,
    });
  }
);

export const DonationController = {
  getDonationsForRequest,
  createDonation,
  getAllDonations,
  getDonationById,
};
