import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './PublicRoutes';

export const router = createBrowserRouter([...publicRoutes]);
export default router;
