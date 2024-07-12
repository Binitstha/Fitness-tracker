// src/routes/auth/auth.controller.ts
import { Request, Response } from "express";
import prisma from "../../database/prisma";
import { userSchema } from "../../schemas/schemas";
import bcrypt from "bcrypt";
import {
  serverErrorResponse,
  successResponse,
} from "../../utils/response.handler";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...parsedData,
        password: hashedPassword,
      },
    });

    successResponse(res, newUser, "user registered successfully", 200);
  } catch (error) {
    console.log(error)
    serverErrorResponse(res, "error while registering user", 500);
  }
};
