import { useState, useEffect } from 'react';
import { CreateTaskDTO, UpdateTaskDTO, TaskStatus, Task } from '../types/task';

interface TaskFormProps {
    userId: string;
    onSubmit: {
        create: (data: CreateTaskDTO) => Promise<void>;
        edit: (data: UpdateTaskDTO) => Promise<void>;
    };
    onCancel: () => void;
    initialData?: Task | null; // Para modo edición
    mode?: 'create' | 'edit';
}
interface FormErrors {
    title?: string;
    description?: string;
}

const STATUS_OPTIONS: Record<TaskStatus, string> = {
    pending: 'Pendiente',
    in_progress: 'En Progreso',
    completed: 'Completada'
};

export const TaskForm = ({
    userId,
    onSubmit,
    onCancel,
    initialData,
    mode = 'create'
}: TaskFormProps) => {
    const [formData, setFormData] = useState<CreateTaskDTO | UpdateTaskDTO>({
        title: '',
        description: '',
        status: 'pending',
        userId: userId
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // 3. Agregamos useEffect para cargar datos iniciales en modo edición
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                status: initialData.status,
                userId: userId
            });
        }
    }, [initialData, userId, mode]);

    const isFormValid = (): boolean => {
        return formData.title.trim().length >= 3 &&
               formData.title.trim().length <= 50 &&
               formData.description.trim().length >= 10 &&
               formData.description.trim().length <= 500;
    };

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'title':
                if (!value.trim()) return 'El título es requerido';
                if (value.length < 3) return 'El título debe tener al menos 3 caracteres';
                if (value.length > 50) return 'El título no puede exceder 50 caracteres';
                return '';

            case 'description':
                if (!value.trim()) return 'La descripción es requerida';
                if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres';
                if (value.length > 500) return 'La descripción no puede exceder 500 caracteres';
                return '';

            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setIsDirty(true);

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        setIsSubmitting(true);
        try {
            if (mode === 'create') {
                const CreateData: CreateTaskDTO = {
                    ...formData,
                    status: 'pending'
                };
                await onSubmit.create(CreateData);
                // Solo resetear el formulario si estamos creando
                setFormData({ title: '', description: '', status: 'pending', userId });
            }
            else {
                const updateData: UpdateTaskDTO = {
                    ...formData,
                    status: formData.status as TaskStatus
                };
                await onSubmit.edit(updateData);
            }
            setIsDirty(false);
            setErrors({});
        } catch (error) {
            console.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'} la tarea:`, error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (isDirty) {
            if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
                onCancel();
            }
        } else {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label htmlFor="title">
                    Título *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                {errors.title && (
                    <p style={{ color: 'red' }}>{errors.title}</p>
                )}
            </div>

            <div>
                <label htmlFor="description">
                    Descripción *
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                />
                {errors.description && (
                    <p style={{ color: 'red' }}>{errors.description}</p>
                )}
            </div>

            {mode === 'edit' && (
                <div>
                    <label htmlFor="status">
                        Estado
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        {Object.entries(STATUS_OPTIONS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                >
                    {isSubmitting
                        ? `${mode === 'create' ? 'Creando' : 'Actualizando'}...`
                        : `${mode === 'create' ? 'Crear' : 'Actualizar'} Tarea`}
                </button>
            </div>
        </form>
    );
};
