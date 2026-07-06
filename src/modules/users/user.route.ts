import { Router } from "express";
import { userController } from "./user.controller";


const router = Router()

router.post("/register",userController.registerUser)

// TODO: Update profile 

export const userRoutes = router;