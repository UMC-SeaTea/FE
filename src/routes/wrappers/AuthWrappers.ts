import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../../constants/key';

export const ProtectedWrapper = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
  const location = useLocation();

  return token
    ? React.createElement(Outlet)
    : React.createElement(Navigate, {
        to: '/login/start',
        replace: true,
        state: { from: location },
      });
};

export const PublicWrapper = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  return token
    ? React.createElement(Navigate, { to: '/', replace: true })
    : React.createElement(Outlet);
};
