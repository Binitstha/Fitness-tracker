import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import multer from "multer";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const personalizeProfile = async (req: Request, res: Response) => {
  const data = req.body;
  const { weight, height, city } = data;
  const profileImage = req.file;

  try {
    if (profileImage) data.profileImage = profileImage.buffer;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user?.id,
      },
      data: data,
    });
    successResponse(res, updatedUser, "Profile updated successfully.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to update profile.");
  }
};
