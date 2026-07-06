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

const getSingleProperty = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {propertyId} = req.params
    const result = await propertyService.getSingleProperty(propertyId as string)
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Property fetched successfully",
        data: result
    })
})

const getCategory = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result = await propertyService.getCategory()
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Category fetched successfully",
        data: result
    })
})

export const propertyController = {
    getAllProperty,
    getSingleProperty,
    getCategory
}