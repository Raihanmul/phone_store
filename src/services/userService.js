import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );

  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

export const createUser = async (request) => {
  const { fullname, username, email, password, role } = request;

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, password, role]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address: null,
    phone_number: null,
    age: null,
  };

  return newUser;
};

export const updateUser = async (params, request) => {
  const { id } = params;
  const { fullname, username, email, role, address, phone_number, age } =
    request;
  await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
    [fullname, username, email, role, address, phone_number, age, id]
  );
  const [userUpdate] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );
  return userUpdate[0];
};

export const deleteUser = async (id) => {
  const [deleteUser] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (deleteUser.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return;
};
