import { Request, Response } from "express";
import { RequestService } from "./requests.services";

const createRequest = async (req: Request, res: Response) => {
  try {
    const requestData = req.body;
    const requestId = await RequestService.createRequest(requestData);
    res
      .status(201)
      .json({ message: "Request created successfully", id: requestId });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getRequests = async (req: Request, res: Response) => {
  try {
    const filters = req.query; // Example: ?user_id=1&is_public_request=true
    const requests = await RequestService.getRequests(filters);
    res.status(200).json(requests);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await RequestService.getRequestById(Number(id));
    res.status(200).json(request);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const updateRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const success = await RequestService.updateRequest(Number(id), updateData);
    if (success) {
      res.status(200).json({ message: "Request updated successfully" });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await RequestService.deleteRequest(Number(id));
    if (success) {
      res.status(200).json({ message: "Request deleted successfully" });
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const RequestController = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
