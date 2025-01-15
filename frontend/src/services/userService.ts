import api from './api';
import { User, UserDto } from '../types/user';
import { PaginationParams, PaginatedResponse } from '../types/common';

export const userService = {

    // Obtener todos los usuarios
    getUsers: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
        try {
        const response = await api.get<PaginatedResponse<User>>('/users', {
            params: {
            page: params?.page || 1,
            limit: params?.limit || 10
            }
        });

        return response.data;
        } catch (error) {
        console.error('Error en userService.getUsers:', error);
        throw error;
        }
    },

    // Obtener un usuario por su ID
    getUserById: async (id: string): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    // Crear un nuevo usuario
    createUser: async(userData: UserDto): Promise<User> => {

        const response = await api.post<User>('/users', userData);
        return response.data;

    },

    // Actualizar un usuario existente
    updateUser: async(id: string, userData: UserDto): Promise<User> => {
        const response = await api.put<User>(`/users/${id}`, userData);
        return response.data;
    },

    // Eliminar un usuario ( Se desactiva )
    deleteUser: async(id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    }
};
