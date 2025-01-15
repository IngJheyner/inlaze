import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { HttpException } from '../utils/exceptions/http.exception';

export const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error: any) {
            const message = error.errors?.map((e: any) => e.message).join(', ');
            next(new HttpException(400, message || 'Datos de entrada inválidos'));
        }
    };
};
