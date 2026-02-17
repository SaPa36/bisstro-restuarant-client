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
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      }
    ]

  }
]);

const Routes = () => {
  return <div></div>;
};

export default Routes;
