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
    successResponse(res, workout, "Successfully created workout");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res, "Failed to create workout");
  }
};

export const getWorkouts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId },
    });
    successResponse(res, workouts, "Successfully retrieve workouts");
  } catch (error) {
    console.error(error);
    return serverErrorResponse(res, "Failed to create workout");
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

// export const deleteWorkout = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await prisma.workout.delete({ where: { id } });
//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete workout' });
//   }
// };
