import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
    UsersPage,
    CreateUserPage,
    EditUserPage,
    TasksPage
}
from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><div>Sistema lista de tareas de usuario TODO</div></Layout>
  },
  {
    path: '/users',
    element: <Layout><UsersPage /></Layout>
  },
  {
    path: '/user/:userId/tasks',
    element: <Layout><TasksPage /></Layout>
  },
  {
    path: '/users/create',
    element: <Layout><CreateUserPage /></Layout>
  },
  {
    path: '/users/:userId/edit',
    element: <Layout><EditUserPage /></Layout>
  },
  {
    path: '*',
    element: <Layout><div>404 - Página no encontrada</div></Layout>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
