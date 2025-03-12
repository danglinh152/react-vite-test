import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ManageUser from "../pages/admin/User";
import BookManager from "../pages/admin/Book";
import OrderManager from "../pages/admin/Order";
import { useAuth } from "../provider/authProvider";
import AuthPage from "../pages/auth/AuthPage";
import Adventure from "../pages/public/Adventure";
import About from "../pages/public/About";
import HomeLayout from "../pages/public/HomeLayout";
import Home from "../pages/public/Home";
import Detail from "../pages/public/Detail";
import InfoClient from "../pages/client/InfoClientPage";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { ProtectedRouteClient } from "./ProtectedRouteClient";
import Checkout from "../pages/public/Checkout";
import CheckoutNow from "../pages/public/CheckoutNow";
import Cart from "../pages/public/Cart";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      // element: <LayoutAdmin />,
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "adventure", // Remove the leading slash for child routes
          element: <Adventure />,
        },
        {
          path: "about-us", // Remove the leading slash for child routes
          element: <About />,
        },
        {
          path: "/detail/:id",
          element: <Detail />,
        },
        {
          path: "/cart",
          element: <Cart />,
        }
     
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
      element: <ProtectedRouteAdmin />,
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
      path: "/",
      // element: <LayoutAdmin />,
      element: <ProtectedRouteClient />,
      children: [
        {
          path: "information",
          element: <InfoClient />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      // element: <LayoutAdmin />,
      element: <HomeLayout />,
      children: [
        {
          path: "/check-out",
          element: <Checkout />,
        },
        {
          path: "/check-out-now/:bookId",
          element: <CheckoutNow />,
        },
      ],
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
