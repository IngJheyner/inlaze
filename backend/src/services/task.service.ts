import { ITask } from '../models/interfaces/task.interface';
import { TaskRepository } from '../repositories/task.repository';
import { ITaskService } from './interfaces/task.service.interface';
import { HttpException } from '../utils/exceptions/http.exception';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schemas';
import { IPaginatedResponse } from '../repositories/interfaces/pagination.interface';

export class TaskService implements ITaskService {

    // Inyectamos el repositorio de usuarios
    constructor(private TaskRepository: TaskRepository) {}

    // Implementamos el método para crear una tarea
    async createTask(TaskData: CreateTaskInput): Promise<ITask> {

        const Task = await this.TaskRepository.create(TaskData);
        return Task;
    }

    // Implementamos el método para obtener todas las tareas
    async getAllTasks(page: number, limit: number): Promise<IPaginatedResponse<ITask>> {

        // Validar que los valores sean positivos
        if (page < 1 || limit < 1) {
            throw new HttpException(400, 'Los valores de page y limit deben ser positivos');
        }

        return await this.TaskRepository.findAll( page, limit );
    }

    async updateTask(id: string, TaskData: UpdateTaskInput): Promise<ITask> {

        const existingTask = await this.TaskRepository.findById(id);
        if (!existingTask) {
            throw new HttpException(404, 'Tarea no encontrada');
        }

        // Actualizamos la tarea con los nuevos datos
        const updatedTask = await this.TaskRepository.update(id, TaskData);
        if (!updatedTask) {
            throw new HttpException(404, 'Error al actualizar la tarea');
        }

        return updatedTask;
    }

    async deleteTask(id: string): Promise<boolean> {

        const TaskExists = await this.TaskRepository.findById(id);

        if (!TaskExists) {
            throw new HttpException(404, 'Tarea no encontrada');
        }

        return await this.TaskRepository.delete(id);
    }

    async taskByUserId(
        userId: string,
        options: { page?: number; limit?: number } = {}
    ): Promise<IPaginatedResponse<ITask>> {

        const tasks = await this.TaskRepository.findByUserId(userId, options);

        return tasks;
    }
}
