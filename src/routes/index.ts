import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthenticationRoutes } from "../modules/authentication/authentication.route";

const routes = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/authentication",
    route: AuthenticationRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

export default routes;
