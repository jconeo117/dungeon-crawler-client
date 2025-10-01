import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Components/MainLayout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Dashboard from '../Pages/Dashboard';
import CharacterPage from '../Pages/CharacterPage';
import InventoryPage from '../Pages/InventoryPage';
import ShopPage from '../Pages/ShopPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'character',
        element: <CharacterPage/>,
      },
      {
        path: 'inventory',
        element: <InventoryPage/>,
      },
      {
        path: 'shop',
        element: <ShopPage/>,
      },
      {
        path: 'auctions',
        element: <div>Auctions Page</div>,
      },
      {
        path: 'dungeons',
        element: <div>Dungeons Page</div>,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};