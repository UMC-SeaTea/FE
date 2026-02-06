import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import ToastHost from './components/Toast/ToastHost';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastHost />
    </>
  );
}

export default App;
