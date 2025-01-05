import express from "express";
import { StorageController } from "./storage.controller";

const router = express.Router();

router.post("/", StorageController.createStorage);
router.get("/", StorageController.getAllStorage);
router.get("/:id", StorageController.getStorageById);
router.put("/:id", StorageController.updateStorage);
router.delete("/:id", StorageController.deleteStorage);
router.get("/hospital/:hospital_id", StorageController.getStoragesByHospitalId);

export const StorageRoutes = router;
