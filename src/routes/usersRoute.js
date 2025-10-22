import express from "express";
import {
  getAllUserHandler,
  getUserByIdHandler,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUserHandler);
userRouter.get("/users/:id", getUserByIdHandler);
// userRouter.post("/users", addUserHandler);
// userRouter.put("/users/:id", updateUserByIdHandler);
// userRouter.delete("/users/:id", deleteUserByIdHandler);

export default userRouter;
