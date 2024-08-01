import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authentication";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addMeal = async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body;
  const userId = req.userId;
  const date = new Date().toLocaleString();

  const { foods } = data;

  try {
    const meal = await prisma.meal.create({
      data: { ...data, foods: JSON.stringify(foods), date, userId },
    });
    successResponse(res, meal, "Meal added successfully!");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to add meal. Please try again later.");
  }
};

export const getMeal = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  try {
    const meal = await prisma.meal.findMany({
      where: { userId },
      select: {
        name: true,
        date: true,
        totalCalories: true,
        category: true,
        totalCarbs: true,
        totalFats: true,
        totalProtein: true,
      }
    });

    successResponse(res, meal, "Successfull fetched meal data.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to fetch Meal data from server");
  }
};
