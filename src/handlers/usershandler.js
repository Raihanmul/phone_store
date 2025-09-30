import { pool } from "../config/db.js";

const formatUser = (user) => ({
  id: user.id,
  fullname: user.fullname,
  username: user.username,
  email: user.email,
  role: user.role,
  address: user.address ?? null,
  phone_number: user.phone_number ?? null,
  age: user.age ?? null,
});

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");

    const formattedUsers = users.map((u) => formatUser(u));

    res.status(200).json({
      status: "success",
      data: formattedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE id=?", [id]);

    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const formattedUser = formatUser(users[0]);

    res.status(200).json({
      status: "success",
      data: formattedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
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
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
