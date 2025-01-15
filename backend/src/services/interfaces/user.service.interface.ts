import { IUser } from '../../models/interfaces/user.interface';
import { CreateUserInput, UpdateUserInput } from '../../schemas/user.schemas';
import { IPaginatedResponse } from '../../repositories/interfaces/pagination.interface';

export interface IUserService {
    createUser(userData: CreateUserInput): Promise<IUser>;
    getAllUsers(page?: number, limit?: number): Promise<IPaginatedResponse<IUser>>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, userData: UpdateUserInput): Promise<IUser>;
    deleteUser(id: string): Promise<boolean>;
}
