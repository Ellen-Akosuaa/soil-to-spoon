import { Router } from "express";
import { createFarmerProfile, deleteFarmerProfile, getFarmerProfile, updateFarmerProfile } from "../controllers/farmers_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const farmerRouter = Router();

farmerRouter.post("/users/farmers", remoteUpload.fields([
        { name: "profilePhoto", maxCount: 1 },
        { name: "farmImages", maxCount: 10 },
     ]), 
     checkUserSession, createFarmerProfile);

farmerRouter.patch("/users/farmers/:Id",remoteUpload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "farmImages", maxCount: 10 },
 ]), 
 checkUserSession, updateFarmerProfile);

farmerRouter.get("/users/farmers/:Id", checkUserSession, getFarmerProfile);

farmerRouter.delete("/users/farmers/:Id", checkUserSession, deleteFarmerProfile);