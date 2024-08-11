import {Router} from "express";
import { getUsers, login, logout, signup, token} from "../controllers/user_controller.js"; 

export const userRouter = Router();


userRouter.get("/users",getUsers );

userRouter.post("/users/auth/session/login", login);

userRouter.post("/users/auth/token/login", token);

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/logout", logout);

