import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { landlordService } from "./landlord.service";

const createProperty = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{

    const payLoad = req.body
    const userId = req.user?.userId as string

    const result = await landlordService.createProperty(userId,payLoad)

    sendResponse(res,{
      success: true,
      statusCode: 201,
      message: "Property created successfully",
      data: result,
    })

})

const updateProperty = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{

    const payLoad = req.body
    const userId = req.user?.userId as string
    const {propertyId} = req.params

    const result = await landlordService.updateProperty(userId,propertyId as string,payLoad)

    sendResponse(res,{
      success: true,
      statusCode: 200,
      message: "Property updated successfully",
      data: result,
    })

})

const deleteProperty = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{

    const userId = req.user?.userId as string
    const {propertyId} = req.params

    const result = await landlordService.deleteProperty(userId,propertyId as string)

    sendResponse(res,{
      success: true,
      statusCode: 200,
      message: "Property deleted successfully",
      data: result,
    })

})

const getAllRequest = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const userId = req.user?.userId as string
    const result = await landlordService.getAllRequest(userId)
    sendResponse(res,{
      success: true,
      statusCode: 200,
      message: "Request fetched successfully",
      data: result,
    })
})  

const updateRequest = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const {requestId} = req.params
  const userId = req.user?.userId as string
  const payload = req.body
  const result = await landlordService.updateRequest(requestId as string,userId,payload)

  sendResponse(res,{
    success: true,
    statusCode: 200,
    message: "Request updated successfully",
    data: result,
  })
})

const getMyProperties = catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const userId = req.user?.userId as string
    const result = await landlordService.getMyProperties(userId)
    sendResponse(res,{
      success: true,
      statusCode: 200,
      message: "Properties fetched successfully",
      data: result,
    })
})

export const landlordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllRequest,
    updateRequest,
    getMyProperties
}