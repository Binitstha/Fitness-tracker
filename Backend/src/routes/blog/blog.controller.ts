import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/authentication";
import { Response } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();

export const postContent = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content, category, tags } = req.body;
  const id = req.userId;
  const image = req.file;

  if (id) {
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          category,
          postTags: tags,
          image: image?.filename,
          authorId: id,
        },
      });
      successResponse(res, newPost, "Blog successfully posted.");
    } catch (err) {
      console.log(err);
      serverErrorResponse(res, "Error occurred while posting.");
    }
  }
};

export const postComment = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.userId;
  const { content, postId } = req.body;
  if (id) {
    try {
      const newComment = await prisma.comment.create({
        data: {
          content,
          postId,
          authorId: id,
        },
      });
      successResponse(res, newComment, "Comment successfully posted.");
    } catch (err) {
      console.log(err);
      serverErrorResponse(res, "Error occurred while posting comment.");
    }
  }
};
