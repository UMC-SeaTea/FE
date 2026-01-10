import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      // {path: '', element: </>},
    ],
  },
];
