import { CreateUserInput, UpdateUserInput } from '../../schemas/user.schemas';

export interface IUser extends CreateUserInput {
    _id?: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type IUserUpdate = UpdateUserInput;