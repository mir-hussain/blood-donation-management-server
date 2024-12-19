import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const routes = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});
