import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { User } from '../../types/user';
import { PaginationMeta } from '../../types/common';
import { Pagination } from '../../components/Pagination';

export const UsersPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;

    const fetchUsers = async (page: number) => {
        try {
            const response = await userService.getUsers({
            page,
            limit: ITEMS_PER_PAGE
        });
            setUsers(response.data);
            setMeta(response.meta);
        } catch (err) {
            setError('Error al cargar usuarios');
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleViewTasks = (userId: string) => {
        navigate(`/user/${userId}/tasks`);
    };

    const handleCreateUser = () => {
        navigate('/users/create');
    };

    const handleEditUser = (userId: string) => {
        navigate(`/users/${userId}/edit`);
    };

    const handleDeleteUser = async (taskId: string) => {
        if (!window.confirm('Sera eliminado de la lista de usuarios, pero permanecerá en la base de datos como desactivado, ¿Desea continuar?')) {
            return;
        }
        try {
            await userService.deleteUser(taskId);
            await fetchUsers(currentPage);
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            setError('Error al eliminar el usuario.');
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (users.length === 0) return <div>No hay usuarios disponibles</div>;

    return <>
        <div style={{ paddingInline: '20px' }}>
            <h1 style={{ marginBottom: '0' }}>Usuarios</h1>
            <small>(Agregar mas de 3 para probar la paginacion)</small><br /><br />
            <button
            onClick={handleCreateUser}>
                Crear Usuario
            </button>
            <hr />
            <div>
                {users.map(user => (
                    <div key={user._id}
                    style={{ borderBottom: '1px dashed #ccc', padding: '10px', margin: '10px 0' }}>
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button
                            onClick={() => handleViewTasks(user._id)}
                        >
                            Ver Tareas
                        </button>
                        <button
                        onClick={() => handleEditUser(user._id)}>
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteUser(user._id)}
                            style={{ background: 'red' }}
                        >
                            Eliminar
                        </button>

                    </div>
                ))}
            </div>

            {meta && (
                <Pagination
                meta={meta}
                onPageChange={handlePageChange}
                />
            )}
        </div>
    </>;
};
