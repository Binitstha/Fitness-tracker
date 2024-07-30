import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authentication";

export const addMeal = (req: AuthenticatedRequest, res: Response) => {
  const data = req.body;
  console.log(data)
};
