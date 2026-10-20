const bcrypt = require("bcrypt");
const pool = require("../config/db");

const getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email FROM users");
    res.json({ message: "Returning list of users", users: rows });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );
    res.status(201).json({
      message: "User created",
      userId: result.insertId,
      user: { id: result.insertId, name, email },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      userId,
    ]);
    res.json({
      message: `User with ID ${userId} updated`,
      updatedUser: { id: userId, name, email },
    });
  } catch (err) {
    next(err);
  }
};

const partialUpdateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const fields = req.body;

    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const values = [...Object.values(fields), userId];

    await pool.query(`UPDATE users SET ${setClause} WHERE id = ?`, values);
    res.json({
      message: `User with ID ${userId} partially updated`,
      partialUpdate: fields,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ message: `User with ID ${userId} deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
};
