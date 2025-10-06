import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import TestPage from '../Components/TestPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path:'test',
    element: <TestPage/>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};