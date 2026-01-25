import MainLayout from '../layouts/MainLayout';

export const protectedRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: ':',
        element: <></>,
      },
    ],
  },
];
