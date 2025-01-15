import { IUser } from '../models/interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from './interfaces/user.service.interface';
import { HttpException } from '../utils/exceptions/http.exception';
import { CreateUserInput, UpdateUserInput } from '../schemas/user.schemas';
import { IPaginatedResponse } from '../repositories/interfaces/pagination.interface';

export class UserService implements IUserService {

    // Inyectamos el repositorio de usuarios
    constructor(private userRepository: UserRepository) {}

    // Implementamos el método para crear un usuario
    async createUser(userData: CreateUserInput): Promise<IUser> {

        const existingUser = await this.userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new HttpException(400, 'Email ya existe'); // Creamos una nueva instancia de HttpException con el mensaje de error ( Este viaja por mi aplicación hasta llegar al middleware de error)
        }

        const user = await this.userRepository.create(userData);
        return user;
    }

    // Implementamos el método para obtener todos los usuarios
    async getAllUsers(page: number, limit: number): Promise<IPaginatedResponse<IUser>> {
        return await this.userRepository.findAll( page, limit );
    }

    // Implementamos el método para obtener un usuario por su ID
    async getUserById(id: string): Promise<IUser | null> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new HttpException(404, 'Usuario no encontrado');
        }

        return user;
    }

    async updateUser(id: string, userData: UpdateUserInput): Promise<IUser> {

        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new HttpException(404, 'Usuario no encontrado');
        }

        // Si se está actualizando el email, verificar que no exista
        if (userData.email) {
            const existingUser = await this.userRepository.findByEmail(userData.email);
            // Si existe un usuario con el mismo email y no es el mismo usuario que se está actualizando, lanzar error
            if (existingUser && existingUser._id?.toString() !== id) {
                throw new HttpException(400, 'Email ya existe');
            }
        }

        // Actualizamos el usuario en la base de datos y retornamos el usuario actualizado
        const updatedUser = await this.userRepository.update(id, userData);
        if (!updatedUser) {
            throw new HttpException(404, 'Usuario no encontrado');
        }
        return updatedUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        const userExists = await this.userRepository.findById(id);
        if (!userExists) {
            throw new HttpException(404, 'Usuario no encontrado');
        }
        return await this.userRepository.delete(id);
    }
}
