import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentsService } from "./payments.service";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { requestId } = req.body;
    const userId = req.user?.userId as string;

    const result = await paymentsService.createPayment(userId, requestId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Payment session created successfully",
        data: result,
    });
});

const confirmPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.body;
    const userId = req.user?.userId as string;

    const result = await paymentsService.confirmPayment(userId, transactionId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment confirmed successfully",
        data: result,
    });
});

const getPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId as string;

    const result = await paymentsService.getPaymentHistory(userId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Payment history fetched successfully",
        data: result,
    });
});


const stripeWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['stripe-signature'] as string;
    
    // req.body should be a Buffer here due to express.raw() in app.ts
    await paymentsService.handleStripeWebhook(req.body, signature);

    res.json({ received: true });
});

export const paymentsController = {
    createPayment,
    confirmPayment,
    getPaymentHistory,

    stripeWebhook
};
