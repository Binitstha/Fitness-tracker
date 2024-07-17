import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";
import { unauthorizedResponse } from "../utils/response.handler";

const JWT_SECRET = env.JWT_SECRET;
const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return unauthorizedResponse(
      res,
      "Access denied. Please provide the required credentials."
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return unauthorizedResponse(res, "Access denied. Invalid credentials.");
  }
};

export default authorization;
