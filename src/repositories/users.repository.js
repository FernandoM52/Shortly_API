import { db } from "../database/db.connection.js";
import bcrypt from "bcrypt";

export async function getUserByEmailDB(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
  return result;
}

export async function createUserDB(body) {
  const { name, email, password, confirmPassword } = body;
  const hash = bcrypt.hashSync(password, 10);

  const result = await db.query(`
  INSERT INTO users (name, email, password)
    VALUES($1, $2, $3);`
    , [name, email, hash]);

  return result;
}

export async function loginDB(user, token) {
  const result = await db.query(`
  INSERT INTO sessions (token, "userId")
    VALUES($1, $2);`
    , [token, user[0].id]);

  return result;
}

export async function getUrlsByUserDB(userId) {
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

  return result;
}

export async function getRankingBD() {
  const result = await db.query(`
    SELECT "userId" AS id, users.name AS name, count(*) AS "linksCount", SUM("shortLinks"."visitCount") AS "visitCount"
      FROM "shortLinks"
      LEFT JOIN users ON users.id = "shortLinks"."userId"
      GROUP BY "userId", users.name
      ORDER BY "visitCount" DESC
      LIMIT 10;`
  );

  return result;
}
