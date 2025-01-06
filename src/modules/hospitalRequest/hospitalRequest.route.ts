import express from "express";
import { HospitalRequestsController } from "./hospitalRequest.controller";

const router = express.Router();

router.post("/", HospitalRequestsController.createHospitalRequest);
router.get("/:hospitalId", HospitalRequestsController.getAllHospitalRequests);
router.get(
  "/:hospitalId/:requestId",
  HospitalRequestsController.getHospitalRequestById
);
router.put("/:requestId", HospitalRequestsController.updateHospitalRequest);
router.delete("/:requestId", HospitalRequestsController.deleteHospitalRequest);

export const HospitalRequestsRoutes = router;
