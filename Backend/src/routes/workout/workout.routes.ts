import { Router } from 'express';
import { authenticationMiddleware } from '../../middleware/authentication';
import { validateSchema } from '../../middleware/validateSchema';
import { workoutSchema } from '../../schemas/schemas';
import { createWorkout } from './workout.controller';

const router = Router();

router.post('/create', authenticationMiddleware, validateSchema(workoutSchema), createWorkout);
// router.get('/', authenticationMiddleware, getWorkouts);
// router.put('/update/:id', authenticationMiddleware, validateSchema(workoutSchema), updateWorkout);
// router.delete('/delete/:id', authenticationMiddleware, deleteWorkout);

export default router;
