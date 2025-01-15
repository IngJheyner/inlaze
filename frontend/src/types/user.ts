export interface User {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserDto {
    name: string;
    email: string;
}
