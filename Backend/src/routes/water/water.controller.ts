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
    const existingGoal = await prisma.waterGoal.findUnique({ where: { userId } });

    if (existingGoal) {
      const updatedGoal = await prisma.waterGoal.update({
        where: { userId },
        data: { target: data.target, achieved: data.achieved },
      });
      return successResponse(res, updatedGoal, "Successfully updated the goal.");
    } else {
      const newData = await prisma.waterGoal.create({
        data: { ...data, userId },
      });
      return successResponse(res, newData, "Successfully set the goal.");
    }
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, "Failed to set the goal.");
  }
};

export const getGoal = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  try {
    const goalData = await prisma.waterGoal.findMany({ where: { userId } });
    return successResponse(res, goalData, "Successfully retrieved goal data.");
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, "Failed to fetch the data.");
  }
};
