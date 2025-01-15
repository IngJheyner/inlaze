import { ITask } from '../../models/interfaces/task.interface';
import { CreateTaskInput, UpdateTaskInput } from '../../schemas/task.schemas';
import { IPaginatedResponse } from '../../repositories/interfaces/pagination.interface';

export interface ITaskService {
    createTask(taskData: CreateTaskInput): Promise<ITask>;
    getAllTasks(page?: number, limit?: number): Promise<IPaginatedResponse<ITask>>;
    updateTask(id: string, taskData: UpdateTaskInput): Promise<ITask>;
    deleteTask(id: string): Promise<boolean>;
}
