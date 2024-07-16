// src/routes/auth/auth.routes.ts
import { Router } from 'express';
import { login, register, refreshToken, forgotPassword, resetPassword } from './auth.controller';
import validateSchema from '../../middleware/validateSchema';
import { forgetPasswordSchema, refreshTokenSchema, resetPasswordSchema, userLoginSchema, userRegisterSchema } from '../../schemas/schemas';

const router = Router();

router.post('/register', validateSchema(userRegisterSchema), register);

router.post('/login', validateSchema(userLoginSchema), login);

router.post('/refresh-token', validateSchema(refreshTokenSchema), refreshToken);

router.post('/forgotPassword', validateSchema(forgetPasswordSchema), forgotPassword);

router.post('/resetPassword', validateSchema(resetPasswordSchema), resetPassword)

export default router;
