// src/routes/auth/auth.routes.ts
import { Router } from 'express';
import { login, register, refreshToken } from './auth.controller';
import validateSchema from '../../middleware/validateSchema';
import { refreshTokenSchema, userLoginSchema, userRegisterSchema } from '../../schemas/schemas';

const router = Router();

router.post('/register', validateSchema(userRegisterSchema), register);

router.post('/login', validateSchema(userLoginSchema), login);

router.post('/refresh-token', validateSchema(refreshTokenSchema), refreshToken);

export default router;
