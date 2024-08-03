import { Router } from "express";
import { addWater, getGoal, getWater, setGoal } from "./water.controller";
import { authenticationMiddleware } from "../../middleware/authentication";
import { validateSchema } from "../../middleware/validateSchema";
import { waterGoalSchema, waterSchema } from "../../schemas/schemas";

const router = Router();

router.post(
  "/addWater",
  authenticationMiddleware,
  validateSchema(waterSchema),
  addWater
);

router.get("/", authenticationMiddleware, getWater);

router.post(
  "/setGoal:id",
  authenticationMiddleware,
  validateSchema(waterGoalSchema),
  setGoal
);
router.get('/getGoal', authenticationMiddleware, getGoal)

export default router;
