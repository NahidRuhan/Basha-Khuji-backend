import { Router } from "express";
import { propertyController } from "./property.controller";

const router = Router()

router.get("/", propertyController.getAllProperty)

export const propertyRoutes = router