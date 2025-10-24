import express from "express";
import {
  getAllUserHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUserHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post("/", createUserHandler);
userRouter.put("/:id", updateUserByIdHandler);
userRouter.delete("/:id", deleteUserByIdHandler);

export default userRouter;
