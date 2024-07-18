import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();

export const personalizeProfile = async (req: Request, res: Response) => {
  const { weight, height, city } = await req.body;
  const profileImage = req.file;

  console.log(profileImage); // Logs file metadata
  console.log(req.body); // Logs other form data
  console.log(weight,height,city)

  try {
    // Handle the logic for storing the data in your database
    // For instance:
    // const user = await prisma.user.update({
    //   where: { id: req.userId },
    //   data: {
    //     weight,
    //     height,
    //     city,
    //     profileImage: profileImage?.filename, // Save the filename in your database
    //   },
    // });

    successResponse(res, null, "Profile updated successfully");
  } catch (error) {
    serverErrorResponse(res, "failed to update the data");
  }
};
