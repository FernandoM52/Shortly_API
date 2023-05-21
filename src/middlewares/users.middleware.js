import { getUserByEmailDB, loginDB } from "../repositories/users.repository.js";
import bcrypt from "bcrypt";

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
    const user = await getUserByEmailDB(email);
    if (!user.rows[0]) return res.status(404).send({ message: "Valide se preencheu os campos corretamente" });

    const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!isPasswordCorrect) return res.status(404).send({ message: "Valide se preencheu os campos corretamente" });

    res.locals.user = user;

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
