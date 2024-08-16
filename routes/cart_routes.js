import { Router } from "express";
import { addToCart, removeFromCart, updateCartItem } from "../controllers/cart_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

export const cartRouter = Router();


cartRouter.post("/cart/add", checkUserSession, addToCart);

cartRouter.post("/cart/remove", checkUserSession, removeFromCart);

cartRouter.post("/cart/update", checkUserSession, updateCartItem);

