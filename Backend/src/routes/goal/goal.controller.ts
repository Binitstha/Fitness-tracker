import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authentication";

export const addGoal = (req: AuthenticatedRequest, res: Response) => {
  const data = req.body;
};
