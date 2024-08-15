import { Router } from "express";
import { authenticationMiddleware } from "../../middleware/authentication";
import { validateSchema } from "../../middleware/validateSchema";
import { commentSchema, postSchema } from "../../schemas/schemas";
import { postComment, postContent } from "./blog.controller";
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
export default router;
