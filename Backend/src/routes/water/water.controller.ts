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

export const getWater = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  try {
    const waterData = await prisma.water.findMany({
      where: { userId },
      select: {
        amount: true,
        date: true,
      },
    });

    successResponse(
      res,
      waterData,
      "Successfully retrieved water data of user."
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to retrive data of water.");
  }
};

export const setGoal = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const data = req.body;

  try {
    const newData = await prisma.waterGoal.create({
      data: {
        ...data,
        userId,
      },
    });
    successResponse(res, newData, "Successfully goal set.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to set the goal.");
  }
};
