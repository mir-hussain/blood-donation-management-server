import express from "express";
import { HospitalController } from "./hospital.controller";

const router = express.Router();

router.post("/", HospitalController.createHospital);
router.get("/", HospitalController.getAllHospitals);
router.get("/:id", HospitalController.getHospitalById);
router.put("/:id", HospitalController.updateHospital);
router.delete("/:id", HospitalController.deleteHospital);

export const HospitalRoutes = router;
