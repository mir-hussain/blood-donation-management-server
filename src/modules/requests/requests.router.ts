import { Router, Request } from "express";
import { RequestController } from "./requests.controller";

const router = Router();

router.get("/:id", RequestController.getRequestById);
router.put("/:id", RequestController.updateRequest);
router.delete("/:id", RequestController.deleteRequest);
router.post("/", RequestController.createRequest);
router.get("/", RequestController.getRequests);

export const RequestRoutes = router;
