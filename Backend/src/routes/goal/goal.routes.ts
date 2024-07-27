import { Router } from "express";
import { validateSchema } from "../../middleware/validateSchema";
import { goalSchema } from "../../schemas/schemas";
import { authenticationMiddleware } from "../../middleware/authentication";
import { addGoal } from "./goal.controller";

const router = Router();

router.post(
  "/addGoal",
  authenticationMiddleware,
  validateSchema(goalSchema),
  addGoal
);

export default router;