import express from "express";
import { isValidInputForLoginMiddleware, isValidInputForNewUserMiddleware } from "../Middlewares/ValidInputMiddleware.js";
import { checkEmailExistsMiddleware, hashPasswordMiddleware } from "../Middlewares/UserMiddleware.js";
import { createUserController, loginController } from "../Controllers/UserControllers.js";

const app = express.Router();

// API: Create a new user
app.post("/createUser", isValidInputForNewUserMiddleware, checkEmailExistsMiddleware, hashPasswordMiddleware, createUserController);

// API: Create a new user
app.post("/loginUser", isValidInputForLoginMiddleware, loginController);

export {app as userRoutes};