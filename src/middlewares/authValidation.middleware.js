import { db } from "../database/db.connection.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const session = await db.query("select * from sessions where token = $1", [token]);
    if (!session.rowCount) return res.sendStatus(401);
    res.locals.session = session.rows[0];

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
