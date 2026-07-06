import { Router } from "express";
import { propertyController } from "./property.controller";

const router = Router()

router.get("/", propertyController.getAllProperty)
router.get("/category", propertyController.getCategory)
router.get("/:propertyId", propertyController.getSingleProperty)

export const propertyRoutes = router

// TODO: Need partial search in get all 