import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ManageUser from "../pages/Admin/User";
import BookManager from "../pages/Admin/Book";
import OrderManager from "../pages/Admin/Order";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home";
import AuthPage from "../pages/Auth/AuthPage";
import Adventure from "../pages/Adventure";
import About from "../pages/About";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      // element: <LayoutAdmin />,
      element: <Home />,
      children: [
        // {
        //   index: true,
        //   element: <Home />,
        // },
        {
          path: "adventure", // Remove the leading slash for child routes
          element: <Adventure />,
        },
        {
          path: "about-us", // Remove the leading slash for child routes
          element: <About />,
        },
      ],
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
      // element: <LayoutAdmin />,
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
