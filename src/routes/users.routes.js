import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { loginSchema, signUpSchema } from "../schemas/auth.schema.js";
import { getRanking, getShortLinksByUser, signIn, signUp } from "../controllers/users.controller.js";
import { getUrlsByUser, validateCreateUser, validateLogin } from "../middlewares/users.middleware.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), validateCreateUser, signUp);
userRouter.post("/signin", validateSchema(loginSchema), validateLogin, signIn);
userRouter.get("/users/me", authValidation, getUrlsByUser, getShortLinksByUser);
userRouter.get("/ranking", getRanking);
export default userRouter;
