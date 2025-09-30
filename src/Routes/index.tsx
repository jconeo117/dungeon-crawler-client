import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../Pages/HomePage.tsx';
import LoginPage from '../Pages/LoginPage.tsx';
import RegisterPage from '../Pages/RegisterPage.tsx';
import App from '../App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App será el layout principal
    children: [
      {
        index: true, // Esta es la ruta por defecto ('/')
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      // Aquí añadiremos más rutas después (como /auctions)
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};