import { Router } from "express";
import { checkUserSession } from "../middlewares/auth.js";
import { initializePayment, verifyPayment } from '../controllers/payment_controller.js';


export const paymentRouter = Router();


paymentRouter.post("/payments/initialize-payment", checkUserSession, initializePayment);


paymentRouter.get('/payments/verify-payment/:reference', checkUserSession, verifyPayment);

