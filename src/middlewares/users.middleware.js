import bcrypt from "bcrypt";
import { getUrlsByUserDB, getUserByEmailDB } from "../repositories/users.repository.js";

export async function validateCreateUser(req, res, next) {
  const { email } = req.body;

  try {
    const user = await getUserByEmailDB(email);
    if (user.rows[0]) return res.status(409).send({ message: "E-mail já cadastrado" });

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const { rows: user, rowCount: userExist } = await getUserByEmailDB(email);
    if (!userExist) return res.status(401).send({ message: "Valide se preencheu os campos corretamente" });

    const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordCorrect) return res.status(401).send({ message: "Valide se preencheu os campos corretamente" });

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUrlsByUser(req, res, next) {
  const { userId } = res.locals.session;

  try {
    const urls = await getUrlsByUserDB(userId);

    res.locals.urls = urls.rows[0];
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
