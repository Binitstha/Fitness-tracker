import { Router } from "express";
import { addWater, getWater } from "./water.controller";
import { authenticationMiddleware } from "../../middleware/authentication";
import { validateSchema } from "../../middleware/validateSchema";
import { waterSchema } from "../../schemas/schemas";

const router = Router();

router.post(
  "/addWater",
  authenticationMiddleware,
  validateSchema(waterSchema),
  addWater
);

router.get("/", authenticationMiddleware, getWater);

export default router;
