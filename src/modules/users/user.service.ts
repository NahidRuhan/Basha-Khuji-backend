import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import config from "../../config"
import { IRegisterUser } from "./user.interface"
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

export const userServices = {
    registerUser,
    getAllUser
}