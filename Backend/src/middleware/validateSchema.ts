import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { validationErrorResponse } from '../utils/response.handler';

export const validateSchema = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error:any) {
    validationErrorResponse(res,error)
  }
};

export const validateMultipartSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const formData = { ...req.body };

    if (req.file) {
      formData.profileImage = req.file;
    }
    if (req.files) {
      formData.files = req.files;
    }

    const result = schema.safeParse(formData);

    req.body = result.data;
    next();
  };
};
