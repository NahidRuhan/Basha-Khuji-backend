import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router()

router.post("/register",userController.registerUser)
router.patch("/my-profile",auth(UserRole.TENANT,UserRole.LANDLORD,UserRole.ADMIN),userController.updateProfile)


export const userRoutes = router;