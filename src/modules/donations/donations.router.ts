import { Router } from "express";
import { DonationController } from "./donations.controller";

const router = Router();

router.post("/", DonationController.createDonation);
router.get("/", DonationController.getAllDonations);
router.get("/:id", DonationController.getDonationById);
router.get("/:id/responses", DonationController.getDonationsForRequest);

export const DonationRoutes = router;
