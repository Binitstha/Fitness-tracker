// src/routes/auth/auth.controller.ts
import { Request, Response } from "express";
import prisma from "../../database/prisma";
import bcrypt from "bcrypt";
import {
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  validationErrorResponse,
} from "../../utils/response.handler";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    successResponse(res, newUser, "user registered successfully", 200);
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "error while registering user", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return notFoundResponse(res, "Invalid email or password");

    const accessToken = jwt.sign(
      { userId: user.id, userEmail: user.email },
      JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, userEmail: user.email },
      REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    successResponse(
      res,
      { accessToken, refreshToken },
      "User logged in successfully",
      200
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Error while loggin in");
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!storedToken)
      return validationErrorResponse(res, "Invalid refresh token");

    const user = await prisma.user.findUnique({
      where: {
        id: storedToken.userId,
      },
    });

    if (!user) return validationErrorResponse(res, "User not found");

    const newAccessToken = jwt.sign(
      { userId: user.id, UserEmail: user.email },
      JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    successResponse(
      res,
      { accessToken: newAccessToken },
      "Token refresh successfully",
      200
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Error refreshing token");
  }
};
