import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import LoginStartPage from '../pages/Login/LoginStartPage';
import MapDetailPage from '../pages/Map/MapDetailPage';
import MapPage from '../pages/Map/MapPage';
import SpaceRecommend from '../pages/SpaceRecommend';

export const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/map', element: <MapPage /> },
      { path: '/map/:sid', element: <MapDetailPage /> },
      { path: '/explore', element: <></> },
      { path: '/mypage', element: <></> },
      { path: '/diagnosis', element: <></> },
      { path: '/login', element : <LoginPage/>},
      { path: '/loginstart', element: <LoginStartPage/>},
      { path: '/recommend', element: <SpaceRecommend /> },
    ],
  },
];
