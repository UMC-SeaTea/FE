import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import ToastHost from './components/Toast/ToastHost';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/QueryClient';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastHost />
      </QueryClientProvider>
    </>
  );
}

export default App;
