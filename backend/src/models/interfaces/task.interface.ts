import { Types } from "mongoose";
import { CreateTaskInput, UpdateTaskInput } from "../../schemas/task.schemas";

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export interface ITask extends CreateTaskInput {
    _id?: string;
    title: string;
    description: string;
    status: TaskStatus;
    userId: Types.ObjectId;  // ID del usuario asignado
    createdAt?: Date;
    updatedAt?: Date;
}

export type ITaskUpdate = UpdateTaskInput;
