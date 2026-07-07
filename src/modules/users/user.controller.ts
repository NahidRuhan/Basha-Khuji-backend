import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { IUpdate } from "./user.interface";
const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payLoad = req.body

    const user = await userServices.registerUser(payLoad)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully!",
        data: {user}
    })

})

const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.userId
    const payLoad = req.body as IUpdate

    if (!userId) {
        throw new Error("Unauthorized access. Please Login!!");
    }

    const user = await userServices.updateProfile(userId, payLoad)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile updated successfully!",
        data: {user}
    })
})

export const userController = {
    registerUser,
    updateProfile
}