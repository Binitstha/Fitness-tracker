import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { unauthorizedResponse } from "../utils/response.handler";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const JWT_SECRET = env.JWT_SECRET;

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return unauthorizedResponse(
      res,
      "Access unauthorized. Please log in again."
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as AuthenticatedRequest).userId = decoded.userId;
    next();
  } catch (err) {
    console.log("Token verification failed:", err);
    return unauthorizedResponse(
      res,
      "Session expired or invalid token. Please log in again."
    );
  }
};
