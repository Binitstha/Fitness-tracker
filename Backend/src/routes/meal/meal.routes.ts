import { Router } from "express";
import { authenticationMiddleware } from "../../middleware/authentication";
import { validateSchema } from "../../middleware/validateSchema";
import { addMeal } from "./meal.controller";
import { mealSchema } from "../../schemas/schemas";

const router = Router();

router.post("/addMeal", authenticationMiddleware, validateSchema(mealSchema), addMeal);

export default router;
