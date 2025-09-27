import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

const postController = new PostController();


postRouter.get("/:id", postController.getPostById);


postRouter.post("/", postController.createPost);


postRouter.patch("/:id", postController.updatePostPartial);


postRouter.delete("/:id", postController.deletePost);
