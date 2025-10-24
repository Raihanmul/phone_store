import * as UserService from "../services/userService.js";

export const getAllUserHandler = async (req, res, next) => {
  try {
    const response = await UserService.getAllUser();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserByIdHandler = async (req, res, next) => {
  try {
    const response = await UserService.updateUser(req.params, req.body);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
