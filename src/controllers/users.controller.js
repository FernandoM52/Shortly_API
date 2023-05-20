import { db } from "../database/db.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    if (user.rows[0]) return res.status(409).send({ message: "E-mail já cadastrado" });

    const hash = bcrypt.hashSync(password, 10);
    await db.query(`
    INSERT INTO users(name, email, password)
      VALUES($1, $2, $3);`
      , [name, email, hash]);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    if (!user.rows[0]) return res.status(404).send({ message: "Valide se preencheu os campos corretamente" });
    const { id } = user.rows[0];

    const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!isPasswordCorrect) return res.status(404).send({ message: "Valide se preencheu os campos corretamente" });

    const token = uuid();

    await db.query(`
      INSERT INTO sessions(token, "userId")
        VALUES($1, $2);`
      , [token, id]);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getShortLinksByUser(req, res) {
  const { userId } = res.locals.session;

  try {
    const result = await db.query(`
    SELECT
    json_build_object(
      'id', "shortLinks"."userId",
      'name', users.name,
      'visitCount', sum_count,
      'shortenedUrls', json_agg(
        json_build_object(
          'id', "shortLinks".id,
          'shortUrl', "shortLinks"."shortUrl",
          'url', "shortLinks".url,
          'visitCount', "shortLinks"."visitCount"
        )
      )
    )
    FROM (
      SELECT "shortLinks"."userId", sum("shortLinks"."visitCount") AS sum_count
      FROM "shortLinks"
      JOIN users ON users.id = "shortLinks"."userId"
      WHERE users.id = $1
      GROUP BY "shortLinks"."userId"
    ) AS subquery
    JOIN "shortLinks" ON "shortLinks"."userId" = subquery."userId"
    JOIN users ON users.id = "shortLinks"."userId"
    GROUP BY "shortLinks"."userId", users.name, subquery.sum_count
    ORDER BY subquery.sum_count;`
      , [userId]);

    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}



