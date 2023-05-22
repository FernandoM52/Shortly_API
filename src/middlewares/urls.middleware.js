import { getShortUrlBD, getUrlByIdBD } from "../repositories/urls.repository.js";

export async function validateReturnUrl(req, res, next) {
  const url = await getUrlByIdBD(req.params);
  if (!url.rows[0]) return res.status(404).send({ message: "Url não existe" });

  res.locals.url = url.rows[0];
  next();
}

export async function validateReturnShortUrl(req, res, next) {
  const url = await getShortUrlBD(req.params);
  if (!url.rows[0]) return res.status(404).send({ message: "Url não existe" });

  res.locals.url = url.rows[0];
  next();
}
