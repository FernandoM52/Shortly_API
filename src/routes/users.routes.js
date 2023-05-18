import { Router } from "express";
import validateSchema from "../middlewares/validateSchema";
import { loginSchema, signUpSchema } from "../schemas/auth.schema";
import { signIn, signUp } from "../controllers/users";

const userRouter = Router();

userRouter.post("/signup", validateSchema(signUpSchema), signUp);
userRouter.post("/login", validateSchema(loginSchema), signIn);

export default userRouter;
