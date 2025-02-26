import { App } from "antd";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ManageUser from "../pages/User";
import BookManager from "../pages/Book";
import OrderManager from "../pages/Order";
import AuthPage from "../pages/authPage";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/admin",
      // element: <App />,
      element: <ProtectedRoute />,
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
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>home</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/auth",
      element: <AuthPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
