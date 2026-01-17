import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import LoginStartPage from '../pages/Login/LoginStartPage';
import MapPage from '../pages/Map/MapPage';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/explore', element: <></> },
      { path: '/mypage', element: <></> },
      { path: '/diagnosis', element: <></> },
      { path: '/login', element : <LoginPage/>},
      { path: '/loginstart', element: <LoginStartPage/>},

    ],
  },
];
