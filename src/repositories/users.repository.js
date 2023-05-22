import bcrypt from "bcrypt";
import { db } from "../database/db.connection.js";

export async function getUserByEmailDB(email) {
  const result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
  return result;
}

export async function createUserDB(body) {
  const { name, email, password } = body;
  const hash = bcrypt.hashSync(password, 10);

  const result = await db.query(
    `INSERT INTO users (name, email, password)
    VALUES($1, $2, $3);`,
    [name, email, hash],
  );

  return result;
}

export async function loginDB(id, token) {
  const result = await db.query(
    `INSERT INTO sessions (token, "userId")
    VALUES($1, $2);`,
    [token, id],
  );

  return result;
}

export async function getUrlsByUserDB(userId) {
  const result = await db.query(
    `SELECT users.id, users.name, SUM("shortLinks"."visitCount") AS "visitCount", JSON_AGG(
    JSON_BUILD_OBJECT(
      'id', "shortLinks".id,
      'shortUrl', "shortLinks"."shortUrl",
      'url', "shortLinks".url,
      'visitCount', "shortLinks"."visitCount"
    )) AS "shortenedUrls"
    FROM users
    JOIN "shortLinks" ON "shortLinks"."userId" = users.id
    WHERE users.id = $1
    GROUP BY users.id;`,
    [userId],
  );

  return result;
}

export async function getRankingBD() {
  const result = await db.query(
    `SELECT "userId" AS id, users.name AS name, count(*) AS "linksCount", SUM("shortLinks"."visitCount") AS "visitCount"
      FROM "shortLinks"
      LEFT JOIN users ON users.id = "shortLinks"."userId"
      GROUP BY "userId", users.name
      ORDER BY "visitCount" DESC
      LIMIT 10;`,
  );
  return result;
}
