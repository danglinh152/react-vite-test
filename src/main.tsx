import React from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./provider/authProvider.tsx";
import Routes from "./routes/index.tsx";
import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ManageUser from "./pages/user.tsx";
// import BookManager from "./pages/book.tsx";
// import OrderManager from "./pages/order.tsx";
// import Login from "./pages/login.tsx"; // Ensure you import the Login component
// import AuthPage from "./components/authPage.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LayoutAdmin />,
//     children: [
//       {
//         index: true,
//         element: <ManageUser />,
//       },
//       {
//         path: "book", // Remove the leading slash for child routes
//         element: <BookManager />,
//       },
//       {
//         path: "order", // Remove the leading slash for child routes
//         element: <OrderManager />,
//       },
//     ],
//   },
//   {
//     path: "/auth",
//     element: <AuthPage />,
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Routes />
  </AuthProvider>
);
