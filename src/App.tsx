// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { router } from "./routes";
import { queryClient } from "./lib/QueryClient";
import ToastHost from "./components/Toast/ToastHost";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastHost />
    </QueryClientProvider>
  );
}

export default App;
