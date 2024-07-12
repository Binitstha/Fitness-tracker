// src/routes/auth/auth.routes.ts
import { Router } from 'express';
import { register } from './auth.controller';
import validateSchema from '../../middleware/validateSchema';
import { userSchema } from '../../schemas/schemas';

const router = Router();

router.post('/register', validateSchema(userSchema), register);

export default router;
