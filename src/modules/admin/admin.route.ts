import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router()

router.get("/users",auth(UserRole.ADMIN),adminController.getAllUser)
router.patch("/users/:userId",auth(UserRole.ADMIN),adminController.changeUserStatus)
router.get("/rentals",auth(UserRole.ADMIN),adminController.getAllRental)
router.post("/categories",auth(UserRole.ADMIN),adminController.createCategory)



export const adminRoutes = router   