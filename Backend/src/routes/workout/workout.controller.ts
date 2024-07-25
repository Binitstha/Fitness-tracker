import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { workoutSchema } from "../../schemas/schemas";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";
import { AuthenticatedRequest } from "../../middleware/authentication";

const prisma = new PrismaClient();

export const createWorkout = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const data = req.body;

    const workout = await prisma.workout.create({
      data: {
        ...data,
        userId: req.userId,
      },
    });
    successResponse(res, workout, "Workout created successfully.");
  } catch (error) {
    console.error("Error creating workout:", error);
    return serverErrorResponse(res, "An error occurred while creating the workout.");
  }
};

export const getWorkouts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId },
    });
    successResponse(res, workouts, "Workouts retrieved successfully.");
  } catch (error) {
    console.error("Error retrieving workouts:", error);
    return serverErrorResponse(res, "An error occurred while retrieving workouts.");
  }
};

export const deleteWorkout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.workout.delete({ where: { id } });
    successResponse(res, null, "Workout deleted successfully.");
  } catch (error) {
    console.error("Error deleting workout:", error);
    return serverErrorResponse(res, "An error occurred while deleting the workout.");
  }
};


// export const updateWorkout = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { date, type, duration, calories } = req.body;
//     const workout = await prisma.workout.update({
//       where: { id },
//       data: {
//         date: new Date(date),
//         type,
//         duration,
//         calories,
//       },
//     });
//     res.status(200).json(workout);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update workout' });
//   }
// };