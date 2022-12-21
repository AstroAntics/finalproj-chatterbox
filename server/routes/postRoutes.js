import express from "express";
import {getFeedPosts, getAccountPosts, addLikeToPost, removeLikeFromPost, createPost} from "../controllers/postController.js";

// Paused at 1:16:26 - go back and dbl check for more information
// Switching to FE side of things
const router = express.Router();

router.get("/", getFeedPosts);
router.get("/:accountId/posts", getAccountPosts);
router.patch("/:postId/like", addLikeToPost);
router.patch("/:postId/unlike", removeLikeFromPost);
router.post("/create/post", createPost);

export default router;