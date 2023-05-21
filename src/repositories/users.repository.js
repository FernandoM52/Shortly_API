import { db } from "../database/db.connection.js";

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
    , [token, user.rows[0].id]);

  return result;
}
