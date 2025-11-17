import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidations.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

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
  const validated = validate(createUserSchema, request);

  const { fullname, username, email, password, role } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, hashedPassword, role]
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
  const validated = validate(updateUserSchema, request);

  const { id } = params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

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
