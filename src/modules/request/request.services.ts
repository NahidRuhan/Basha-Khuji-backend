import { RentalRequestStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateRequest } from "./request.interface";

const createRequest = async (userId:string,payLoad: ICreateRequest) => {

    const { propertyId, message } = payLoad;

    if (!propertyId || !message) {
        throw new Error("Missing required fields: propertyId and message are required");
    }

    const property = await prisma.properties.findUnique({
        where: { propertyId }
    });

    if (!property) {
        throw new Error("Property not found");
    }

    const existingRequest = await prisma.rentalRequests.findFirst({
        where: {
            propertyId,
            userId,
            status: RentalRequestStatus.PENDING
        }
    });

    if (existingRequest) {
        throw new Error("You already have a pending request for this property");
    }

    const createdRequest = await prisma.rentalRequests.create({
        data: {
            propertyId,
            userId,
            message
        }
    });

    return createdRequest;
}

const getAllRequest = async (userId:string) => {
    const result = await prisma.rentalRequests.findMany({
        where: {
            userId
        },
        include: {
            property: true 
        }
    })
    return result
}

const getRequestById = async (requestId:string, userId:string) => {
    const result = await prisma.rentalRequests.findFirst({
        where: {
            requestId,
            userId
        },
        include: {
            property: true
        }
    })

    if (!result) {
        throw new Error("Request not found");
    }

    return result
}

export const requestService = {
    createRequest,
    getAllRequest,
    getRequestById
}