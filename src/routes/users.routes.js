import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { loginSchema, signUpSchema } from "../schemas/auth.schema.js";
import { getShortLinksByUser, signIn, signUp } from "../controllers/users.controller.js";


const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp);
userRouter.post("/login", validateSchema(loginSchema), signIn);
userRouter.get("/users/me", authValidation, getShortLinksByUser);

export default userRouter;
