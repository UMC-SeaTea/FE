import React from 'react';
import HomePage from '../pages/HomePage';
import { ProtectedWrapper } from './wrappers/AuthWrappers';

export const protectedRoutes = [
  {
    element: React.createElement(ProtectedWrapper),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
];
