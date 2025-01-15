import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';

export class TaskController {
    constructor(private TaskService: TaskService) {}

    public createTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const Task = await this.TaskService.createTask(req.body);
            res.status(201).json(Task);
        } catch (error) {
            next(error);
        }
    };

    public getAllTasks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // Obtener parámetros de paginación de la query
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 3;

            const paginatedTasks = await this.TaskService.getAllTasks(page, limit);

            res.json(paginatedTasks);

        } catch (error) {
            next(error);
        }
    };

    public updateTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const Task = await this.TaskService.updateTask(
                req.params.id,
                req.body
            );
            res.json(Task);
        } catch (error) {
            next(error);
        }
    };

    public deleteTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await this.TaskService.deleteTask(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    public getTaskByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = req.params.userId;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const paginatedTasks = await this.TaskService.taskByUserId(userId, {
                page,
                limit
            });

            res.json(paginatedTasks);
        } catch (error) {
            next(error);
        }
    };
}
