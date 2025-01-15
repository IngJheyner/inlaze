import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { taskService } from '../../services/taskService';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../../types/task';
import { PaginationMeta } from '../../types/common';
import { Pagination } from '../../components/Pagination';
import { TaskForm } from '../../components/TaskForm';

export const TasksPage = () => {

    const { userId } = useParams<{ userId: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const fetchTasks = useCallback(async (page: number): Promise<void> => {
        try {
            if (!userId) throw new Error('Usuario no especificado');

            const response = await taskService.getTasksByUser(userId, {
                page,
                limit: 12
            });

            setTasks(response.data);
            setMeta(response.meta);
        } catch (err) {
            setError('Error al cargar las tareas');
            console.error('Error:', err);
        }
    }, [userId]);

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage, userId, fetchTasks]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleCreateTask = async (taskData: CreateTaskDTO) => {
        try {
            await taskService.createTask(taskData);
            setShowForm(false);
            await fetchTasks(currentPage);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            setError('Error al crear la tarea');
        }
    };

    const handleUpdateTask = async (taskData: UpdateTaskDTO) => {
        try {
            if (!editingTask) return;
            await taskService.updateTask(editingTask._id, taskData);
            setShowForm(false);
            setEditingTask(null);
            await fetchTasks(currentPage);
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            setError('Error al actualizar la tarea');
        }
    };

    const handleEditClick = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            return;
        }
        try {
            await taskService.deleteTask(taskId);
            await fetchTasks(currentPage);
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            setError('Error al eliminar la tarea');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    if (error) return <div>Error: {error}</div>;
    if (!userId) return <div>Usuario no especificado</div>;

    return (
        <>
            <h1>Tareas del usuario: {tasks[0]?.userId.name}</h1>

            {!showForm && (
                <button onClick={() => setShowForm(true)}>
                    Nueva Tarea
                </button>
            )}

            {showForm && (
                <TaskForm
                    userId={userId}
                    onSubmit={{
                        create: handleCreateTask,
                        edit: handleUpdateTask
                    }}
                    onCancel={handleCloseForm}
                    initialData={editingTask}
                    mode={editingTask ? 'edit' : 'create'}
                />
            )}

            <hr />

            <div>
                {tasks.length === 0 ? (
                    <p>No hay tareas disponibles para este usuario</p>
                ) : (
                    tasks.map(task => (
                        <div key={task._id}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            <div>Estado: {task.status}</div>
                            <p>
                                Creada: {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                            <button onClick={() => handleEditClick(task)}>
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                style={{ background: 'red' }}>
                                Eliminar
                            </button>
                            <hr />
                        </div>
                    ))
                )}
            </div>

            {meta && (
                <Pagination
                    meta={meta}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};
