export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDTO {
    title: string;
    description: string;
    status: 'pending';
    userId: string;
}

export interface UpdateTaskDTO {
    title: string;
    description: string;
    status: TaskStatus;
    userId: string;
}
