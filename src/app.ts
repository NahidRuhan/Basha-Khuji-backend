import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middleware/globalErrorhandler";
import { landlordRoutes } from "./modules/landlord/landlord.route";
import { propertyRoutes } from "./modules/properties/property.route";
import { requestRoutes } from "./modules/request/request.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { paymentsRoute } from "./modules/payments/payments.route";
import { reviewsRoute } from "./modules/reviews/reviews.route";
import { notFound } from "./middleware/notFound";

import { paymentsController } from "./modules/payments/payments.controller";

const app: Application = express();
app.use(cors({
    origin: config.app_url,
    credentials: true,
}));

app.post("/api/payments/webhook", express.raw({ type: 'application/json' }), paymentsController.stripeWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Basha Khuji API",
        version: "1.0.0",
        endpoints: {
            users: "/api/user",
            auth: "/api/auth",
            landlord: "/api/landlord",
            properties: "/api/properties",
            requests: "/api/requests",
            admin: "/api/admin",
            payments: "/api/payments",
            reviews: "/api/reviews"
        }
    });
})

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/landlord",landlordRoutes)
app.use("/api/properties",propertyRoutes)
app.use("/api/requests",requestRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/payments",paymentsRoute)
app.use("/api/reviews",reviewsRoute)

app.use(notFound);
app.use(globalErrorHandler);

export default app;