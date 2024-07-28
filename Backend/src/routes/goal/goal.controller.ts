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

export const onGoalComplete = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { goalId } = req.body;
  // try {
  //   const goal = await prisma.goal.update({
  //     where: { id: goalId },
  //     data: { achieved: true },
  //   });

  //   const achievement = await prisma.achievement.create({
  //     data: {
  //       title: "Goal Achiever",
  //       description: `Achieved goal: ${goal.description}`,
  //       date: new Date(),
  //       goalId: goalId,
  //     },
  //   });

  //   successResponse(res, achievement, "Goal completed and achievement created");
  // } catch (error) {
  //   console.log(error);
  //   serverErrorResponse(res, "Failed to complete goal");
  // }
};

export const deleteGoal = async (req: AuthenticatedRequest, res: Response) => {
  const { goalId } = req.params;
  try {
    await prisma.goal.delete({ where: { id: goalId } });
    successResponse(res, null, "successfully deleted goal");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Error occured while deleting goal");
  }
};
