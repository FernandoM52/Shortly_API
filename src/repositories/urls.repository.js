import { db } from "../database/db.connection.js";

export async function createShortUrlDB(body, userId, shortUrl) {
  const { url } = body;

  await db.query(
    `INSERT INTO "shortLinks"("userId", "shortUrl", url)
      VALUES($1, $2, $3);`,
    [userId, shortUrl, url],
  );
}

export async function getUrlByIdBD(params) {
  const { id } = params;

  const result = await db.query(`SELECT * FROM "shortLinks" WHERE id = $1;`, [id]);
  return result;
}

export async function getShortUrlBD(params) {
  const { shortUrl } = params;

  const result = await db.query(`SELECT * FROM "shortLinks" WHERE "shortUrl" = $1;`, [shortUrl]);
  return result;
}

export async function updateVisitCountShortUrl(visitCount, shortUrl) {
  const result = await db.query(`UPDATE "shortLinks" SET "visitCount" = $1 WHERE "shortUrl" = $2;`, [visitCount, shortUrl]);
  return result;
}

export async function deleteShortUrlDB(id) {
  const result = await db.query(`DELETE FROM "shortLinks" WHERE id = $1;`, [id]);
  return result;
}
