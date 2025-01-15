// Principio de responsabilidad única (SRP)
// Principio de inversión de dependencias (DIP)
// - El repositorio se encarga exclusivamente de las operaciones con la base de datos
// - El repositorio depende de una interfaz, no de una implementación

import { ITask } from '../models/interfaces/task.interface';
import { IBaseRepository } from './interfaces/base.repository.interface';
import TaskModel from '../models/schemas/task.schema';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/task.schemas';
import { IPaginatedResponse } from './interfaces/pagination.interface';

export class TaskRepository implements IBaseRepository<ITask, CreateTaskInput, UpdateTaskInput> {

    // Crear un nuevo documento en la colección de tareas
    async create(TaskData: CreateTaskInput): Promise<ITask> {

        const newTask = await TaskModel.create({
            ...TaskData
        });
        return newTask.toObject(); // Convertir a objeto plano de JavaScript
    }

    // Obtener todos los documentos de la colección de tareas
    async findAll(page: number, limit: number): Promise<IPaginatedResponse<ITask>> {

        const skip = ( page - 1 ) * limit;

        const [tasks, total] = await Promise.all([
            TaskModel.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            TaskModel.countDocuments({ isActive: true })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: tasks,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        };
    }

    // Obtener un documento de la colección de tareas por su id
    async findById(id: string): Promise<ITask | null> {
        return await TaskModel.findOne({ _id: id });
    }

    // Actualizar un documento de la colección de tareas por su id
    async update(id: string, taskUpdate: UpdateTaskInput): Promise<ITask | null> {

        return await TaskModel.findByIdAndUpdate(
        id,
        { ...taskUpdate },
        { new: true } //retorna el documento actualizado en lugar del original
        );

    }

    // Eliminar un documento de la colección de tareas por su id
    async delete(id: string): Promise<boolean> {

        const result = await TaskModel.deleteOne({ _id: id });
        return !!result; // Retorna true si la actualización fue exitosa

    }

    // Método para obtener todas las tareas de un usuario ( Completado en la clase )
    async findByUserId(
            userId: string,
            options: {
                page?: number;
                limit?: number;
            } = {}
        ): Promise<IPaginatedResponse<ITask>> {

        const {
            page = 1,
            limit = 10
        } = options;

        const skip = ( page - 1 ) * limit;

        const [tasks, total] = await Promise.all([
            TaskModel.find({ userId })
                .populate('userId', 'name email')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            TaskModel.countDocuments({ userId, isActive: true })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: tasks,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        };
    }
}
