import { Router, Request } from "express";
import { RequestController } from "./requests.controller";

const router = Router();

// Get a single request by ID
router.get("/:id", RequestController.getRequestById);

// Update a request by ID
router.put("/:id", RequestController.updateRequest);

// Delete a request by ID
router.delete("/:id", RequestController.deleteRequest);

// Create a new request
router.post("/", RequestController.createRequest);

// Get all requests with optional filters
router.get("/", RequestController.getRequests);

export const RequestRoutes = router;
