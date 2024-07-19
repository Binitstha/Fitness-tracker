import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  notFoundResponse,
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { AuthenticatedRequest } from "../../middleware/authentication";

const prisma = new PrismaClient();

export const personalizeProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
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

export const getUserDetails = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userDetail = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!userDetail) {
      return notFoundResponse(res, "User not found");
    }

    const { id, password, ...result } = userDetail;

    successResponse(res, result, "User details retrieved successfully");
  } catch (error) {
    console.error("Failed to fetch the user data:", error);
    serverErrorResponse(res, "Failed to fetch user data");
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await prisma.refreshToken.deleteMany({
      where: {
        userId: req.userId,
      },
    });

    res.clearCookie("token", {
      httpOnly: true,
    });

    successResponse(res, null, "You have been successfully logged out.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "An error occurred while logging out. Please try again later.");
  }
};
