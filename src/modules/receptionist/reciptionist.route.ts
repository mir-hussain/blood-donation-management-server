import express from "express";
import { ReceptionistController } from "./receptionist.controller";

const router = express.Router();

router.post("/", ReceptionistController.createReceptionist);
router.get("/", ReceptionistController.getAllReceptionists);
router.get("/:id", ReceptionistController.getReceptionistById);
router.put("/:id", ReceptionistController.updateReceptionist);
router.delete("/:id", ReceptionistController.deleteReceptionist);

export const ReceptionistRoutes = router;
