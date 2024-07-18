import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { AuthenticatedRequest } from "../../middleware/authentication";

const prisma = new PrismaClient();

export const personalizeProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { weight, height, city } = await req.body;
  const profileImage = req.file;

  try {
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: {
        weight,
        height,
        city,
        profileImage: profileImage?.filename, // Save the filename in your database
      },
    });

    successResponse(res, null, "Profile updated successfully");
  } catch (error) {
    serverErrorResponse(res, "failed to update the data");
  }
};
