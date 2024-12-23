import { Router } from "express";
import { AuthenticationController } from "./authentication.controller";

const route = Router();

route.post("/login", AuthenticationController.login);
route.post("/register", AuthenticationController.register);

export const AuthenticationRoutes = route;
