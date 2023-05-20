import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";
import { createShortUrl, deleteShortUrl, getUrlById, openShortUrl } from "../controllers/urls.controller.js";
import { validateReturnShortUrl, validateReturnUrl } from "../middlewares/urls.middleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, createShortUrl);
urlRouter.get("/urls/:id", validateReturnUrl, getUrlById);
urlRouter.get("/urls/open/:shortUrl", validateReturnShortUrl, openShortUrl);
urlRouter.delete("/urls/:id", authValidation, validateReturnUrl, deleteShortUrl);

export default urlRouter;
