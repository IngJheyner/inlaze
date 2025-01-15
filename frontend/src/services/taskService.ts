import api from './api';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';
import { PaginatedResponse, PaginationParams } from '../types/common';

export const taskService = {

    getTasksByUser: async (userId: string, params?: PaginationParams): Promise<PaginatedResponse<Task>> => {
        try {
            const response = await api.get<PaginatedResponse<Task>>(`/tasks/${userId}/user`, {
                params: {
                    page: params?.page,
                    limit: params?.limit
                }
            });

            return response.data;

        } catch (error) {

            console.error('Error en userService.getUsers:', error);
            throw error;

        }
    },

    createTask: async (taskData: CreateTaskDTO): Promise<Task> => {
        const response = await api.post<Task>('/tasks', taskData);
        return response.data;
    },

    updateTask: async (taskId: string, taskData: UpdateTaskDTO): Promise<Task> => {
        try {
            const response = await api.put<Task>(`/tasks/${taskId}`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error en taskService.updateTask:', error);
            throw error;
        }
    },

    deleteTask: async (taskId: string): Promise<void> => {
        try {
            await api.delete(`/tasks/${taskId}`);
        } catch (error) {
            console.error('Error en taskService.deleteTask:', error);
            throw error;
        }
    }
};
