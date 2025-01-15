import { Schema, model } from 'mongoose';
import { ITask, TaskStatus } from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            minlength: [3, 'El título debe tener al menos 3 caracteres'],
            maxlength: [50, 'El título no puede exceder los 50 caracteres']
        },
        description: {
            type: String,
            required: [true, 'La descripción es requerida'],
            minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
            maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
        },
        status: {
            type: String,
            enum: Object.values(TaskStatus),
            default: TaskStatus.PENDING,
            required: [true, 'El estado es requerido']
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'El ID del usuario es requerido']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Índices para mejorar el rendimiento de las consultas
taskSchema.index({ userId: 1 });
taskSchema.index({ status: 1 });

export default model<ITask>('Task', taskSchema);
