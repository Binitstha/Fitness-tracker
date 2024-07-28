import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/authentication";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

const prisma = new PrismaClient();

export const addGoal = async (req: AuthenticatedRequest, res: Response) => {
  const { description, targetDate, targetCalories } = req.body;
  const userId = req.userId;

  if (userId) {
    try {
      const prevGoal = await prisma.goal.findFirst({
        where: { userId },
      });

      if (prevGoal) {
        await prisma.goal.delete({ where: { id: prevGoal.id } });
      }

      const newGoal = await prisma.goal.create({
        data: {
          description,
          targetDate,
          targetCalories,
          currentCalories: 0,
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

export const goalData = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  try {
    const goal = await prisma.goal.findFirst({
      where: { userId },
    });

    if (!goal) {
      return serverErrorResponse(res, "No goal found for the user.");
    }

    successResponse(res, goal, "Goal fetched successfully");
  } catch (error) {
    console.error("Error fetching goal:", error);
    serverErrorResponse(res, "An error occurred while fetching the goal.");
  }
};

export const updateGoal = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { description, targetDate, targetCalories } = req.body;

    const updateGoal = await prisma.goal.update({
      where: { id },
      data: {
        description,
        targetDate,
        targetCalories,
      },
    });
    successResponse(res, updateGoal, "Goal is successfully updated");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to update the goal");
  }
};
