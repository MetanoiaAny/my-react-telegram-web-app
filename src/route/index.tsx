import AppLayout from "@/layout/AppLayout";
import { FC } from "react";

import { useRoutes, RouteObject,Navigate } from "react-router-dom";


import Home from '@/pages/Home/Home'
import Earn from '@/pages/Earn/Earn'
import Wallet from '@/pages/Wallet/Wallet'


const routers: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/Lions/Home"></Navigate>,
  },
  {
    path: "/Lions",
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: "Home",
        element: <Home></Home>,
      },
      {
        path: "Earn",
        element: <Earn></Earn>,
      },{
        path: "Wallet",
        element: <Wallet></Wallet>,
      }
    ],
  }
]


const RenderRouter: FC = () => {
  const element = useRoutes(routers);
  return element;
};

export default RenderRouter;
