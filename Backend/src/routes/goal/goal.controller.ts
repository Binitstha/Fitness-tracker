import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/authentication";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();

export const addGoal = async (req: AuthenticatedRequest, res: Response) => {
  const { description, targetDate, targetCalories, currentCalories } = req.body;
  const userId = req.userId;

  if (userId) {
    try {
      const newGoal = await prisma.goal.create({
        data: {
          description,
          targetDate,
          targetCalories,
          currentCalories,
          userId,
        },
      });

      successResponse(res, newGoal, "Goal added successfully");
    } catch (error) {
      console.error("Error creating goal:", error);
      serverErrorResponse(res, "An error occurred while creating the workout.");
    }
  } else {
    serverErrorResponse(res, "User is empty try again");
  }
};
