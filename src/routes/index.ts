import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';
import { protectedRoutes } from './ProtectedRoutes';

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
]);
