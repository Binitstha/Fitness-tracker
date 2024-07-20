// src/routes/auth/auth.routes.ts
import { Router } from "express";
import {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
  logout,
} from "./auth.controller";
import { validateSchema } from "../../middleware/validateSchema";
import {
  forgetPasswordSchema,
  refreshTokenSchema,
  resetPasswordSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../../schemas/schemas";
import { authenticationMiddleware } from "../../middleware/authentication";

const router = Router();

router.post("/register", validateSchema(userRegisterSchema), register);

router.post("/login", validateSchema(userLoginSchema), login);

router.post("/refresh-token", validateSchema(refreshTokenSchema), refreshToken);

router.post(
  "/forgotPassword",
  validateSchema(forgetPasswordSchema),
  forgotPassword
);

router.post(
  "/resetPassword",
  validateSchema(resetPasswordSchema),
  resetPassword
);

router.post("/logOut", authenticationMiddleware, logout);


export default router;
