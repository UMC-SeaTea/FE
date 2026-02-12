import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/Login/LoginPage';
import LoginStartPage from '../pages/Login/LoginStartPage';
import SignUpPage from '../pages/SignUpPage';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/login/start', element: <LoginStartPage /> },
      { path: '/signup', element: <SignUpPage /> },
    ],
  },
];
