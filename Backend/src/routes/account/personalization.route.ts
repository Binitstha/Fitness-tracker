// src/routes/account/personalization.route.ts

import { Router } from "express";
import { personalizeProfile } from "./personalization.controller";
import validateSchema from "../../middleware/validateSchema";
import { personalizationSchema } from "../../schemas/schemas";
import auth from "../../middleware/authorization";

const router = Router();

router.post(
  "/personalize",
  auth,
  validateSchema(personalizationSchema),
  personalizeProfile
);

export default router;
