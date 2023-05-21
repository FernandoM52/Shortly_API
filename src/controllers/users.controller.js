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
      ORDER BY "visitCount";`
    )

    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
