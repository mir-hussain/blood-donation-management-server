import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post("/", AdminController.createAdmin);
router.get("/", AdminController.getAllAdmins);
router.get("/:id", AdminController.getAdminById);
router.delete("/:id", AdminController.deleteAdmin);

export const AdminRoutes = router;
