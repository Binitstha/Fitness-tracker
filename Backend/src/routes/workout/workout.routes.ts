import { Router } from 'express';
import { authenticationMiddleware } from '../../middleware/authentication';
import { validateSchema } from '../../middleware/validateSchema';
import { workoutSchema } from '../../schemas/schemas';
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from './workout.controller';

const router = Router();

router.post('/create', authenticationMiddleware, validateSchema(workoutSchema), createWorkout);
router.get('/', authenticationMiddleware, getWorkouts);
router.delete('/delete/:id', authenticationMiddleware, deleteWorkout);
router.put('/update/:id', authenticationMiddleware, validateSchema(workoutSchema), updateWorkout);


export default router;
