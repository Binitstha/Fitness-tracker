import express from "express";
import multer from "multer";
import { personalizeProfile } from "./personalization.controller";
import { personalizationSchema } from "../../schemas/schemas";
// import { authenticationMiddleware } from "../../middleware/authentication";
import { validateMultipartSchema } from "../../middleware/validateSchema";
import upload from "../../config/multer.config";

const router = express.Router();

router.post(
  "/personalize",
  // authenticationMiddleware,
  upload.single("profileImage"),
  validateMultipartSchema(personalizationSchema),
  personalizeProfile
);

export default router;
