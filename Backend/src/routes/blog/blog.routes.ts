import { Router } from "express";
import { authenticationMiddleware } from "../../middleware/authentication";
import { validateSchema } from "../../middleware/validateSchema";
import { commentSchema, postSchema } from "../../schemas/schemas";
import {
  deleteBlog,
  getFeaturedBlogPost,
  getLatestBlogPost,
  getSingleBlog,
  getuserBlogs,
  postComment,
  postContent,
} from "./blog.controller";
import { uploadBlog } from "../../config/multer.config";

const router = Router();

router.post(
  "/addBlog",
  authenticationMiddleware,
  uploadBlog.single("image"),
  validateSchema(postSchema),
  postContent
);

router.post(
  "/postComment",
  authenticationMiddleware,
  validateSchema(commentSchema),
  postComment
);

router.get(
  "/getFeaturedBlogPost",
  authenticationMiddleware,
  getFeaturedBlogPost
);

router.get("/getLatestBlogPost", getLatestBlogPost);

router.get("/getSingleBlog/:id", getSingleBlog);

router.delete("/deleteBlog/:id", authenticationMiddleware, deleteBlog);

router.get("/getUserBlogs", authenticationMiddleware, getuserBlogs);

export default router;
