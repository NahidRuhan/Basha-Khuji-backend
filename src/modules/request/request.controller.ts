import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { requestService } from "./request.services";

const createRequest = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payLoad = req.body
    const userId = req.user?.userId as string
    const result = await requestService.createRequest(userId,payLoad)

    sendResponse(res,{
        success: true,
        statusCode: 201,
        message: "Request created successfully",
        data: result,
    })
})

const getAllRequest = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.user?.userId as string
    const result = await requestService.getAllRequest(userId)

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Request fetched successfully",
        data: result,
    })
})

const getRequestById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const requestId = req.params.id as string
    const result = await requestService.getRequestById(requestId)

    sendResponse(res,{
        success: true,
        statusCode: 200,
        message: "Request fetched successfully",
        data: result,
    })
})

export const requestController = {
    createRequest,
    getAllRequest,
    getRequestById
}