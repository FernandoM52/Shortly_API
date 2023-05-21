import { db } from "../database/db.connection.js";
import { createUserDB, loginDB } from "../repositories/users.repository.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  try {
    await createUserDB(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { user } = res.locals;
  try {
    const token = uuid();
    await loginDB(user, token);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getShortLinksByUser(req, res) {
  try {
    const user = res.locals.urls
    res.send(user.map(row => row.user));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  try {
    const result = await db.query(`
    SELECT "userId" AS id, users.name AS name, count(*) AS "linksCount", SUM("shortLinks"."visitCount") AS "visitCount"
      FROM "shortLinks"
      LEFT JOIN users ON users.id = "shortLinks"."userId"
      GROUP BY "userId", users.name
      ORDER BY "visitCount" DESC
      LIMIT 10;`
    )

    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
