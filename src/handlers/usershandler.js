import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
    );

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Fullname is required",
    });
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Username is required",
    });
  }

  if (username.includes(" ")) {
    return res.status(400).json({
      status: "fail",
      message: "Username cannot contain spaces",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Email is required",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Password is required",
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Role is required",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,
      role,
      address: null,
      phone_number: null,
      age: null,
    };

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;

  try {
    const [users] = await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: userUpdate[0],
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
