import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthenticationRoutes } from "../modules/authentication/authentication.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { HospitalRoutes } from "../modules/hospital/hospital.route";
import { RequestRoutes } from "../modules/requests/requests.router";
import { DonationRoutes } from "../modules/donations/donations.router";
import { ReceptionistRoutes } from "../modules/receptionist/reciptionist.route";
import { StorageRoutes } from "../modules/storage/storage.route";
import { HospitalRequestsRoutes } from "../modules/hospitalRequest/hospitalRequest.route";

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
  {
    path: "/receptionist",
    route: ReceptionistRoutes,
  },
  {
    path: "/storage",
    route: StorageRoutes,
  },
  {
    path: "/hospital-request",
    route: HospitalRequestsRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

export default routes;
