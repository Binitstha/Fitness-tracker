import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { workoutSchema } from "../../schemas/schemas";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { AuthenticatedRequest } from "../../middleware/authentication";

const prisma = new PrismaClient();

const getUserWorkouts = async (userId: string| undefined) => {
  return await prisma.workout.findMany({ where: { userId } });
};

export const createWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const data = req.body;

    await prisma.workout.create({
      data: {
        ...data,
        userId: req.userId,
      },
    });

    const workouts = await getUserWorkouts(req.userId);
    successResponse(res, workouts, "Workout created successfully.");
  } catch (error) {
    console.error("Error creating workout:", error);
    return serverErrorResponse(
      res,
      "An error occurred while creating the workout."
    );
  }
};

export const getWorkouts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const workouts = await getUserWorkouts(req.userId);
    successResponse(res, workouts, "Workouts retrieved successfully.");
  } catch (error) {
    console.error("Error retrieving workouts:", error);
    return serverErrorResponse(
      res,
      "An error occurred while retrieving workouts."
    );
  }
};

export const deleteWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    await prisma.workout.delete({ where: { id } });

    const workouts = await getUserWorkouts(req.userId);
    successResponse(res, workouts, "Workout deleted successfully.");
  } catch (error) {
    console.error("Error deleting workout:", error);
    return serverErrorResponse(
      res,
      "An error occurred while deleting the workout."
    );
  }
};

export const updateWorkout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { date, duration, calories, speed, effort } = req.body;
    await prisma.workout.update({
      where: { id },
      data: {
        date,
        duration,
        calories,
        speed,
        effort,
      },
    });

    const workouts = await getUserWorkouts(req.userId);
    successResponse(res, workouts, "Workout updated successfully.");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(
      res,
      "An error occurred while updating the workout."
    );
  }
};
