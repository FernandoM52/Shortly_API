import { db } from "../database/db.connection.js";

export async function validateReturnUrl(req, res, next) {
  const { id } = req.params;

  const url = await db.query(`SELECT * FROM "shortLinks" WHERE id = $1;`, [id]);
  if (!url.rows[0]) return res.status(404).send({ message: "Url não existe" });

  res.locals.url = url.rows[0];

  next();
}

export async function validateReturnShortUrl(req, res, next) {
  const { shortUrl } = req.params;

  const url = await db.query(`SELECT * FROM "shortLinks" WHERE "shortUrl" = $1;`, [shortUrl]);
  if (!url.rows[0]) return res.status(404).send({ message: "Url não existe" });

  res.locals.url = url.rows[0];

  next();
}

export async function getUrlsByUser(req, res, next) {
  const { userId } = res.locals.session;

  const result = await db.query(`
    SELECT
    json_build_object(
      'id', "shortLinks"."userId",
      'name', users.name,
      'visitCount', SUM("shortLinks"."visitCount"),
      'shortenedUrls', json_agg(
        json_build_object(
          'id', "shortLinks".id,
          'shortUrl', "shortLinks"."shortUrl",
          'url', "shortLinks".url,
          'visitCount', "shortLinks"."visitCount"
        )
      )
    ) AS user
    FROM "shortLinks"
    JOIN users ON users.id = "shortLinks"."userId"
    WHERE "shortLinks"."userId" = $1
    GROUP BY "shortLinks"."userId", users.name
    ORDER BY SUM("shortLinks"."visitCount");`
    , [userId]);

  res.locals.urls = result.rows;
  next();
}
