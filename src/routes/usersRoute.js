import express from "express";
import {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from "../handlers/usershandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUserByIdHandler);
userRouter.post("/users", addUserHandler);
userRouter.put("/users/:id", updateUserByIdHandler);

export default userRouter;
