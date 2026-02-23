import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import OrderFood from "../pages/OrderFood/OrderFood/OrderFood";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Shared/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dasboard/Cart/Cart";
import AllUsers from "../pages/Dasboard/AllUsers/AllUsers";
import AddItems from "../pages/Dasboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageAllItems from "../pages/Dasboard/ManageAllItems/ManageAllItems";
import UpdateItems from "../pages/Dasboard/UpdateItems/UpdateItems";
import Payment from "../pages/Dasboard/Payment/Payment";
import PaymentHistory from "../pages/Dasboard/PaymentHistory/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/menu',
          element: <Menu></Menu>
        },
        {
          path: '/order/:category',
          element: <OrderFood></OrderFood>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },

      //admin routes
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageAllItems></ManageAllItems></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
        loader: ({params}) => fetch(`https://bisstro-restuarant-server.vercel.app/menu/${params.id}`)
      },
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ]

  }
]);

const Routes = () => {
  return <div></div>;
};

export default Routes;
