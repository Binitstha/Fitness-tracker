import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/authentication";
import { Response } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();

export const postContent = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.userId;
  const data = req.body;
  try {
    const newPost = await prisma.post.create({ data: data });
    successResponse(res, newPost, "Blog successfully posted.");
  } catch (err) {
    console.log(err);
    serverErrorResponse(res, "Error occured while posting.");
  }
};

export const postComment = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.userId;
  const data = req.body;
  try {
    const newPost = await prisma.comment.create({ data: data });
    successResponse(res, newPost, "Comment successfully posted.");
  } catch (err) {
    console.log(err);
    serverErrorResponse(res, "Error occured while posting comment.");
  }
};
