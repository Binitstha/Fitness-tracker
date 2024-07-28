import { Router } from "express";
import { validateSchema } from "../../middleware/validateSchema";
import { goalSchema } from "../../schemas/schemas";
import { authenticationMiddleware } from "../../middleware/authentication";
import { addGoal, goalData, updateGoal } from "./goal.controller";

const router = Router();

router.post(
  "/addGoal",
  authenticationMiddleware,
  validateSchema(goalSchema),
  addGoal
);
router.get("/goal", authenticationMiddleware, goalData);
router.put("/updateGoal/:id", authenticationMiddleware, updateGoal);

export default router;
