import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManageUser from "./pages/user.tsx";
import BookManager from "./pages/book.tsx";
import OrderManager from "./pages/order.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ManageUser />,
      },
      {
        path: "/book",
        element: <BookManager />,
      },
      {
        path: "/order",
        element: <OrderManager />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
