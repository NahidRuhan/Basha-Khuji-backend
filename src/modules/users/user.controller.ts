import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

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

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await userServices.getAllUser()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "User fetched successfully!",
        data: {user}
    })

})

export const userController = {
    registerUser,
    getAllUser
}