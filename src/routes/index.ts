import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthenticationRoutes } from "../modules/authentication/authentication.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { HospitalRoutes } from "../modules/hospital/hospital.route";
import { RequestRoutes } from "../modules/requests/requests.router";
import { DonationRoutes } from "../modules/donations/donations.router";

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
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/hospital",
    route: HospitalRoutes,
  },
  {
    path: "/request",
    route: RequestRoutes,
  },
  {
    path: "/donation",
    route: DonationRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

export default routes;
