import { IPaginatedResponse } from './pagination.interface';

// La implementación de IBaseRepository permite reutilizar la estructura en otros repositorios ( TareaRepository ) sin tener que repetir el código.
export interface IBaseRepository<T, CreateInput, UpdateInput> { // <T> es un tipo genérico que permite reutilizar esta interfaz con diferentes modelos.
    create(item: CreateInput): Promise<T>;
    update(id: string, item: UpdateInput): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<T | null>;
    findAll(page?: number, limit?: number): Promise<IPaginatedResponse<T>>;
}