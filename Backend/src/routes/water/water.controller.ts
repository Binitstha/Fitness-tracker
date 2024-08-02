import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authentication";
import { PrismaClient } from "@prisma/client";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();
export const addWater = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const data = req.body;
  try {
    const newData = await prisma.water.create({
      data: {
        ...data,
        userId,
      },
    });
    successResponse(res, newData, "Succesfully added water.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to store the data of water.");
  }
};

export const getWater = () => {};
