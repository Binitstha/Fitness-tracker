import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/authentication";
import { Response } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { log } from "console";

const prisma = new PrismaClient();

export const postContent = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content, category, tags } = req.body;
  const id = req.userId;
  const image = req.file;

  console.log(image);
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

export const getBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const blogData = await prisma.post.findMany();

    successResponse(res, blogData, "Blogs fetched successfully.");
  } catch (e) {
    console.log(e);
    serverErrorResponse(res, "Error occurred while fetching blogs.");
  }
};

export const getLatestBlogPost = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const blogData = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    successResponse(res, blogData, "Blogs fetched successfully.");
  } catch (e) {
    console.log(e);
    serverErrorResponse(res, "Error occurred while fetching blogs.");
  }
};

export const getSingleBlog = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    const blogData = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    successResponse(res, blogData, "Single Blog data fetched successfully");
  } catch (e) {
    console.error(e);
    serverErrorResponse(res, "Error occured while fetching Single blog.");
  }
};

export const getFeaturedBlogPost = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const categories = ["Workout", "Nutrition", "Wellness", "Fitness Tips"];
  const featuresBlogs = [];

  try {
    for (const category of categories) {
      const blogData = await prisma.post.findMany({
        where: { category },
        take: 2,
      });

      featuresBlogs.push(...blogData);
    }
    successResponse(res, featuresBlogs, "Featured blogs fetched successfully");
  } catch (e) {
    console.log(e);
    serverErrorResponse(res, "Error occrured while fetching featured blogs");
  }
};

export const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({ where: { id } });

    successResponse(res, "Succesfully blog deleted.");
  } catch (e) {
    console.log(e);
    serverErrorResponse(res, "Error occured while delete blog.");
  }
};

export const getuserBlogs = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { userId } = req;

  try {
    const blogsData = await prisma.post.findMany({
      where: { authorId: userId },
    });

    successResponse(res, blogsData, "Users blogs successfully fetched");
  } catch (e) {
    serverErrorResponse(res, "Error occured while fetching users blogs");
    console.log(e);
  }
};
