import { z } from 'zod';
import { Types } from 'mongoose';
import { TaskStatus } from '../models/interfaces/task.interface';

// Schema de Zod para validación
export const taskCreateSchema = z.object({
    title: z
        .string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(50, 'El título no puede exceder los 50 caracteres'),
    description: z
        .string()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede exceder los 500 caracteres'),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
        errorMap: () => ({ message: 'Estado de tarea inválido' })
    }),
    userId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de usuario inválido')
        .transform(val => new Types.ObjectId(val))
});

// Schema para actualización (todos los campos opcionales)
export const taskUpdateSchema = taskCreateSchema.partial();

// Tipos inferidos de Zod
export type CreateTaskInput = z.infer<typeof taskCreateSchema>;
export type UpdateTaskInput = z.infer<typeof taskUpdateSchema>;
