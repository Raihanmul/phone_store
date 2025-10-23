import express from "express";
import {
  getAllUserHandler,
  getUserByIdHandler,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUserHandler);
userRouter.get("/users/:id", getUserByIdHandler);

export default userRouter;
