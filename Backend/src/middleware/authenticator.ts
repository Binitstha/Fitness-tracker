// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { unauthorizedResponse, validationErrorResponse } from "../utils/response.handler";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return unauthorizedResponse(res,"Access token is required");

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return validationErrorResponse(res,"Invalid access token");
//     req.user = user;
//     next();
//   });
// };
