import express from "express";
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from "../controllers/postController.js";
import { validatePost } from "../middleware/validateRequest.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPostBySlug);
router.post("/", validatePost, createPost);
router.put("/:slug", updatePost);
router.delete("/:slug", deletePost);

export default router;
