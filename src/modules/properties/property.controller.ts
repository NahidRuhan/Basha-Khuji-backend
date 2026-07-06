import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await propertyService.getAllProperty(req.query)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties fetched successfully",
        meta: result.meta,
        data: result.data
    })
    
})

export const propertyController = {
    getAllProperty
}