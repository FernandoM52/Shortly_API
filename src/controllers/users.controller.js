import { v4 as uuid } from "uuid";
import { createUserDB, getRankingBD, loginDB } from "../repositories/users.repository.js";

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
    await loginDB(user[0].id, token);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getShortLinksByUser(req, res) {
  try {
    const userUrls = res.locals.urls;
    res.send(userUrls);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await getRankingBD();
    res.send(ranking.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
