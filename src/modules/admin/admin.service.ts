import { prisma } from "../../lib/prisma"
import { IChangeUserStatus, ICreateCategory } from "./admin.interface";

const getAllUser = async () => {
    const users = await prisma.users.findMany({
        omit:{password:true}
    })
    return users
}

const changeUserStatus = async (userId:string,payload:IChangeUserStatus) => {
    const isUserExist = await prisma.users.findUnique({
        where: { userId }
    });

    if (!isUserExist) {
        throw new Error("User not found");
    }

    if (!payload.status) {
        throw new Error("Missing required field: status");
    }

    const validStatuses = ["ACTIVE", "BANNED"];
    if (!validStatuses.includes(payload.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const user = await prisma.users.update({
        where:{
            userId
        },
        data: {
            status: payload.status
        },
        omit: { password: true }
    })
    return user
}


const getAllRental = async () => {
    const rentals = await prisma.rentalRequests.findMany({
        include: {
            property: true
        }
    });
    return rentals;
}

const createCategory = async (payLoad: ICreateCategory) => {
    const category = await prisma.categories.findFirst({
        where: {
            categoryName: { equals: payLoad.categoryName, mode: 'insensitive' }
        }
    })

    if(category){
        throw new Error("Category already exists");
    }

    const newCategory = await prisma.categories.create({
        data:payLoad
    })

    return newCategory
}

export const adminService = {
    getAllUser,
    changeUserStatus,
    getAllRental,
    createCategory
}
