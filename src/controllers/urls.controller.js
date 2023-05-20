import { db } from "../database/db.connection.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals.session;

  try {
    const shortUrl = nanoid();
    await db.query(`
    INSERT INTO "shortLinks"("userId", "shortUrl", url)
      VALUES($1, $2, $3);`
      , [userId, shortUrl, url],
    );

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
  try {
    const { visitCount, shortUrl, url } = res.locals.url;

    await db.query(`UPDATE "shortLinks" SET "visitCount" = $1 WHERE "shortUrl" = $2;`, [visitCount + 1, shortUrl]);

    res.status(200).send("Url aberta");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteShortUrl(req, res) {
  try {
    const shortLinkOwner = res.locals.session;
    const { id, userId } = res.locals.url;

    if (shortLinkOwner.userId !== userId) return res.status(401).send({ message: "Somente usuários que criaram as urls possuem a permissão para deleta-las" });

    await db.query(`DELETE FROM "shortLinks" WHERE id = $1;`, [id]);

    res.status(204).send("Url deletada com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
