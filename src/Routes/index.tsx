import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Components/MainLayout';
import HomePage from '../Components/HomePage';
import TestPage from '../Components/TestPage';
import CommunityPage from '../Pages/CommunityPage';
import ShopPage from '../Pages/ShopPage';
import AuctionHousePage from '../Pages/AuctionHousePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      // Nueva sección de Comunidad con sus propias sub-rutas
      {
        path: 'community',
        element: <CommunityPage />,
        // En el futuro, puedes tener un layout anidado aquí también si es necesario
        children: [
            // Puedes agregar una página de bienvenida para /community aquí si quieres
            // { index: true, element: <CommunityWelcome /> } 
        ]
      },
      {
        path: 'community/shop',
        element: <ShopPage />,
      },
      {
        path: 'community/auctions',
        element: <AuctionHousePage />,
      }
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

