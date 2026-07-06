import { Router } from "express";
import { requestController } from "./request.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/",auth(UserRole.TENANT),requestController.createRequest)
router.get("/",auth(UserRole.TENANT),requestController.getAllRequest)
router.get("/:id",auth(UserRole.TENANT),requestController.getRequestById)



export const requestRoutes = router;