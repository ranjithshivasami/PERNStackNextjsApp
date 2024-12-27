const db = require('../db');



const findUserByEmail = async (email) => {
  const query = 'SELECT id FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
};

const createUser = async (username, email, hashedPassword) => {
  const query = `
    INSERT INTO users (username, email, password, created_at)
    VALUES ($1, $2, $3, NOW()) RETURNING id
  `;
  const result = await db.query(query, [username, email, hashedPassword]);
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};
