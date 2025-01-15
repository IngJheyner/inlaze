import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../services/userService';
import { UserDto } from '../types/user';

interface UserFormProps {
  isEditing?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .required('El nombre es requerido')
    .matches(/^[a-zA-Z\s]*$/, 'El nombre solo puede contener letras y espacios'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
});

export const UserForm = ({ isEditing }: UserFormProps) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [error, setError] = useState('');

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userData: UserDto = {
          name: values.name,
          email: values.email,
        };

        if (isEditing && userId) {
          await userService.updateUser(userId, userData);
        } else {
          await userService.createUser(userData);
        }
        navigate('/users');
      } catch (err) {
        setError('Error al guardar el usuario');
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (isEditing && userId) {
      fetchUser(userId);
    }
  }, [isEditing, userId]);

  const fetchUser = async (userId: string) => {
    try {
      const user = await userService.getUserById(userId);
      formik.setValues({
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      setError('Error al cargar el usuario');
      console.error(err);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>
        {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              {...formik.getFieldProps('name')}
            />
          </label>
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              {...formik.getFieldProps('email')}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
          >
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/users')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
