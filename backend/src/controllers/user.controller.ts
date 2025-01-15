import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    constructor(private userService: UserService) {}

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    public getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // Obtener parámetros de paginación de la query
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 3;

            // Validar que los valores sean positivos
            if (page < 1 || limit < 1) {
                res.status(400).json({
                    message: 'Los valores de page y limit deben ser números positivos',
                });
                return;
            }

            const paginatedUsers = await this.userService.getAllUsers(page, limit);
            res.json(paginatedUsers);

        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const user = await this.userService.updateUser(
                req.params.id,
                req.body
            );
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
