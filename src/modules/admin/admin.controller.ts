import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = await adminService.getAllUser()

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "User fetched successfully!",
        data: {user}
    })

})

const changeUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.params
    const payload = req.body

    const user = await adminService.changeUserStatus(userId as string,payload)

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "User status changed successfully!",
        data: {user}
    })

})



const getAllRental = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rentals = await adminService.getAllRental()

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Rental requests fetched successfully!",
        data: {rentals}
    })
})

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await adminService.createCategory(req.body)

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Category created successfully!",
        data: {category}
    })
})

export const adminController = {
    getAllUser,
    changeUserStatus,
    getAllRental,
    createCategory
}