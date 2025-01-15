import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/exceptions/http.exception';

export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const status = error.status || 500;
    const message = error.message || 'Algo salió mal';

    res.status(status).json({
        status,
        message,
        timestamp: new Date(),
        path: req.path,
        method: req.method
    });
};
