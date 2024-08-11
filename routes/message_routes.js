import { Router } from "express";
import { getMessages, saveMessage } from "../controllers/message_controller.js"
import { checkUserSession } from "../middlewares/auth.js";

export const messageRouter = Router();

messageRouter.get("/messages", checkUserSession, saveMessage);

messageRouter.get("/messages/history", checkUserSession, getMessages);