import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede tener más de 50 caracteres')
        .regex(/^[a-zA-Z\s]*$/, 'El nombre solo puede contener letras y espacios'),

    email: z.string()
        .email('Email no válido')
        .min(5, 'El email debe tener al menos 5 caracteres')
        .max(50, 'El email no puede tener más de 50 caracteres'),

});

export const updateUserSchema = createUserSchema.partial();

// Tipos inferidos de Zod
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
