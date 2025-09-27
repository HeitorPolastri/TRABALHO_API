import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();


userRouter.get("/", userController.getAllUsers);

// EXERCÍCIO 2 
userRouter.get("/age-range", userController.getUsersByAgeRange);

// EXERCÍCIO 1 
userRouter.get("/:id", userController.getUserById);

// EXERCÍCIO 4
userRouter.put("/:id", userController.updateUser);

// EXERCÍCIO 7
userRouter.delete("/cleanup-inactive", userController.cleanupInactiveUsers);

userRouter.delete("/:id", userController.deleteUser);
