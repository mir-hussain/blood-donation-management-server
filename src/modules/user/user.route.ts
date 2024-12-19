import { Router } from "express";
import app from "../../app";
import db from "../../config/database";
import sendResponse from "../../utils/sendResponse";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
