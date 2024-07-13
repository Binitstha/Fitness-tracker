import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { validationErrorResponse } from '../utils/response.handler';

const validateSchema = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // schema.parse(req.body);
    next();
  } catch (error:any) {
    validationErrorResponse(res,error)
  }
};

export default validateSchema;
