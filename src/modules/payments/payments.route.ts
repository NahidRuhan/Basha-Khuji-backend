import express from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { paymentsController } from "./payments.controller";

const router = express.Router();

router.post("/create", auth(UserRole.TENANT), paymentsController.createPayment);
router.post("/confirm", auth(UserRole.TENANT), paymentsController.confirmPayment);
router.get("/", auth(UserRole.TENANT), paymentsController.getPaymentHistory);


export const paymentsRoute = router;
