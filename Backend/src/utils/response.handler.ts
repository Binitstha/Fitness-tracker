import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Success",
  statusCode = 200
) => {
  res.status(statusCode).json({ status: "success", message, data });
};

export const serverErrorResponse = (
  res: Response,
  message = "Server Error",
  statusCode = 500
) => {
  res.status(statusCode).json({ status: "erroasdasr", message });
};

export const validationErrorResponse = (
  res: Response,
  message: string,
  statusCode = 400
) => {
  res.status(statusCode).json({ status: "error", message });
};

export const notFoundResponse = (
  res: Response,
  message = "Not Found",
  statusCode = 404
) => {
  res.status(statusCode).json({ status: "error", message });
};

export const unauthorizedResponse = (
  res: Response,
  message = "Unauthorized",
  statusCode = 401
) => {
  res.status(statusCode).json({ status: "error", message });
};