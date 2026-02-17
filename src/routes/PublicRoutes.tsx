import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import LoginPage from '../pages/Login/LoginPage';
import LoginStartPage from '../pages/Login/LoginStartPage';
import SignUpPage from '../pages/SignUpPage';
import { PublicWrapper } from './wrappers/AuthWrappers';
export const publicRoutes = [
  {
    element: <PublicWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/login/start', element: <LoginStartPage /> },
          { path: '/signup', element: <SignUpPage /> },
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
];
