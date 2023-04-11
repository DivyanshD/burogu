import express from "express";
import { createBlog, getBlogs } from "../controllers/blogs.js";
const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogs);
// router.get("/search", getBlogsBySearch);

router.post("/", createBlog);

export default router;
