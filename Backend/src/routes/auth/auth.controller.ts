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
import { url } from "inspector";
import env from "../../config/env";
import { emailSender } from "../../utils/lib";

const JWT_SECRET = env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;

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

    res.cookie("Token", accessToken, {
      httpOnly: true,
    });

    successResponse(
      res,
      { accessToken, refreshToken },
      `You have successfully logged in as ${user.email}`,
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return validationErrorResponse(res, "User not found. Please check your email address and try again.");

    await emailSender(user.email, user.id);

    return successResponse(
      res,
      user.email,
     "An email with a link to reset your password has been sent.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(res, "Failed to reset password");
  }
};
