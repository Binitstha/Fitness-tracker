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
import env from "../../config/env";
import { emailSender } from "../../utils/lib";
import { AuthenticatedRequest } from "../../middleware/authentication";

const JWT_SECRET = env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { email } = data;

    const userExist = await prisma.user.findFirst({ where: { email } });

    if (userExist)
      return validationErrorResponse(
        res,
        "A user with this email already exists. Please use a different email address."
      );

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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return notFoundResponse(res, "Invalid email or password");
    }

    const accessToken = jwt.sign(
      { userId: user.id, userEmail: user.email },
      JWT_SECRET as string,
      { expiresIn: "3d" }
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
    });

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
      `You have successfully logged in as ${user.email}`
    );
  } catch (error) {
    console.error("Login error:", error);
    serverErrorResponse(res, "Error while logging in");
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

    if (!user) {
      return validationErrorResponse(
        res,
        "No account found with that email address. Please check and try again."
      );
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await emailSender(user.email, token);

    return successResponse(
      res,
      {},
      "An email with instructions to reset your password has been sent. Please check your inbox."
    );
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "An error occurred while processing your request. Please try again later."
    );
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, token } = req.body;

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const userId = (decode as { userId: string }).userId;
    const userEmail = (decode as { email: string }).email;

    if (!userId) {
      return validationErrorResponse(
        res,
        "Invalid or expired token. Please request a new password reset."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: userId,
        email: userEmail,
      },
      data: { password: hashedPassword },
    });

    return successResponse(
      res,
      {},
      "Your password has been reset successfully. You can now log in with your new password."
    );
  } catch (error) {
    console.log(error);
    serverErrorResponse(
      res,
      "An error occurred while resetting your password. Please try again later."
    );
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await prisma.refreshToken.deleteMany({
      where: {
        userId: req.userId,
      },
    });

    res.clearCookie("token", {
      httpOnly: true,
    });

    successResponse(res, null, "You have been successfully logged out.");
  } catch (error) {
    console.log(error);
    serverErrorResponse(
      res,
      "An error occurred while logging out. Please try again later."
    );
  }
};
