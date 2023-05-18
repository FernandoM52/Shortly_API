import { Router } from "express";
import userRouter from "./users.routes";

const router = Router();
router.use(userRouter);

export default router;
