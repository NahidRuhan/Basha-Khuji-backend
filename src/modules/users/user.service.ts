import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import config from "../../config"
import { IRegisterUser, IUpdate } from "./user.interface"
import { UserRole } from "../../../generated/prisma/enums"
export const registerUser = async (payLoad:IRegisterUser) => {

    const { userName, email, password, role, profileImage } = payLoad

    if (role !== UserRole.LANDLORD && role !== UserRole.TENANT) {
        throw new Error("Invalid role selected. You can only register as TENANT or LANDLORD.")
    }

    const doesUserExist = await prisma.users.findUnique({
        where:{
            email
        }
    })

    if(doesUserExist){
        throw new Error("This email already exists")
    }

    const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.users.create({
        data: {
            userName,
            email,
            password: hashedPassword,
            role,
            profileImage
        }
    })

    const user = await prisma.users.findUnique({
        where: { userId: createdUser.userId, email: createdUser.email },
        omit: { password: true },
    });

    return user;
}

const getAllUser = async () => {
    const users = await prisma.users.findMany({
        omit:{password:true}
    })
    return users
}

const updateProfile = async (userId: string, payLoad: IUpdate) => {
    const {userName,profileImage,phoneNumber,occupation,address} = payLoad

    const user = await prisma.users.findUnique({
        where: { userId },
        select: { userId: true, email: true },
    });

    if (!user) {
        throw new Error("User not found!");
    }

    const updatedUser = await prisma.users.update({
        where: { userId },
        data: {
            userName,
            profileImage,
            phoneNumber,
            occupation,
            address
        },
        omit: { password: true },
    });

    return updatedUser;
};

export const userServices = {
    registerUser,
    getAllUser,
    updateProfile
}