import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProductsByFarmer, updateProduct } from "../controllers/product_controller.js"
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const productRouter = Router();

productRouter.post("/products", remoteUpload.fields([
    { name: "productImages", maxCount: 10 },
 ]), 
 checkUserSession, addProduct);

 productRouter.patch("/products", remoteUpload.fields([
    { name: "productImages", maxCount: 10 },
 ]), 
 checkUserSession, updateProduct);

 productRouter.get("/products/:Id", checkUserSession, getProductById);

 productRouter.get("/farmer/products/:farmerId", checkUserSession, getProductsByFarmer);

 productRouter.delete("/products/:Id", checkUserSession, deleteProduct);
