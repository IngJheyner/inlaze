// Principio de responsabilidad única (SRP)
// Principio de inversión de dependencias (DIP)
// - El repositorio se encarga exclusivamente de las operaciones con la base de datos
// - El repositorio depende de una interfaz, no de una implementación

import { IUser } from '../models/interfaces/user.interface';
import { IBaseRepository } from './interfaces/base.repository.interface';
import UserModel from '../models/schemas/user.schema';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schemas';
import { IPaginatedResponse } from './interfaces/pagination.interface';

export class UserRepository implements IBaseRepository<IUser, CreateUserInput, UpdateUserInput> {

    // Crear un nuevo documento en la colección de usuarios
    async create(userData: CreateUserInput): Promise<IUser> {

        const newUser = await UserModel.create({
            ...userData
        });
        return newUser.toObject(); // Convertir a objeto plano de JavaScript
    }

    // Obtener todos los documentos de la colección de usuarios
    async findAll(page: number, limit: number): Promise<IPaginatedResponse<IUser>> {

        const skip = ( page - 1 ) * limit;

        const [users, total] = await Promise.all([
            UserModel.find({ isActive: true })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            UserModel.countDocuments({ isActive: true })
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: users,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        };
    }

    // Obtener un documento de la colección de usuarios por su id
    async findById(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ _id: id, isActive: true });
    }

    // Actualizar un documento de la colección de usuarios por su id
    // - Partial<IUser> significa que solo se actualizarán los campos que se pasen en el objeto userUpdate ( permite actualizar solo algunos campos del usuario ).
    async update(id: string, userUpdate: UpdateUserInput): Promise<IUser | null> {

        return await UserModel.findByIdAndUpdate(
        id,
        { ...userUpdate },
        { new: true } //retorna el documento actualizado en lugar del original
        );

    }

    // Implementa un "soft delete" (borrado lógico)
    // - Si se desea eliminar el usuario, se puede cambiar la función a: async delete(id: string): Promise<boolean> { return !!(await UserModel.findByIdAndDelete(id)); }
    async delete(id: string): Promise<boolean> {

        const result = await UserModel.findByIdAndUpdate(
        id,
        { isActive: false }, // En lugar de eliminar el documento, se actualiza el campo isActive a false ( No suelo borrar los registros de la base de datos, prefiero desactivarlos )
        { new: true }
        );
        return !!result; // Retorna true si la actualización fue exitosa

    }

    // Método adicional específico para usuarios: buscar por email
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email, isActive: true });
    }
}
