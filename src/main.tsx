import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ManageUser from "./pages/user.tsx";
import BookManager from "./pages/book.tsx";
import OrderManager from "./pages/order.tsx";
import Login from "./pages/login.tsx"; // Ensure you import the Login component

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
        path: "book", // Remove the leading slash for child routes
        element: <BookManager />,
      },
      {
        path: "order", // Remove the leading slash for child routes
        element: <OrderManager />,
      },
    ],
  },
  {
    path: "/login", // Define /login as a separate route
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
