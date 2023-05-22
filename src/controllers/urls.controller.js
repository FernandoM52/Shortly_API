import { nanoid } from "nanoid";
import { createShortUrlDB, deleteShortUrlDB, updateVisitCountShortUrl } from "../repositories/urls.repository.js";

export async function createShortUrl(req, res) {
  const { userId } = res.locals.session;

  try {
    const shortUrl = nanoid();
    await createShortUrlDB(req.body, userId, shortUrl);
    res.status(201).send({ id: userId, shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlById(req, res) {
  const { id, shortUrl, url, visitCount } = res.locals.url;

  try {
    res.send({ id, shortUrl, url, visitCount });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function openShortUrl(req, res) {
  const { visitCount, shortUrl, url } = res.locals.url;

  try {
    await updateVisitCountShortUrl(visitCount + 1, shortUrl);
    res.redirect(url);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteShortUrl(req, res) {
  const shortLinkOwner = res.locals.session;
  const { id, userId } = res.locals.url;
  if (shortLinkOwner.userId !== userId) return res.status(401).send({ message: "Somente usuários que criaram as urls possuem a permissão para deleta-las" });

  try {
    await deleteShortUrlDB(id);
    res.status(204).send("Url deletada com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
