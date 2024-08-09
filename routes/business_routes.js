import { Router } from "express";
import { createBusinessProfile, deleteBusinessProfile, getBusinessProfile, updateBusinessProfile } from "../controllers/business_controller.js"
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const businessRouter = Router()

businessRouter.post("/users/business", remoteUpload.single('profilePhoto'), checkUserSession, createBusinessProfile);

businessRouter.patch("/users/business/:id", remoteUpload.single('profilePhoto'), checkUserSession, updateBusinessProfile);

businessRouter.get("/users/business/:id", remoteUpload.single('profilePhoto'), checkUserSession, getBusinessProfile);

businessRouter.delete("/users/business/:id", remoteUpload.single('profilePhoto'), checkUserSession, deleteBusinessProfile);