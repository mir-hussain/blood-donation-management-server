import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
