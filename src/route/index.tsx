import AppLayout from "@/layout/AppLayout";
import { FC, lazy } from "react";

import { useRoutes, RouteObject, Navigate } from "react-router-dom";

// import Home from '@/pages/Home/Home'
// import Earn from '@/pages/Earn/Earn'
// import Wallet from '@/pages/Wallet/Wallet'

const lazyLoad = (moduleAddress: string) => 
  lazy(() => import(`@/pages/${moduleAddress}/${moduleAddress}.tsx`));


const Home = lazyLoad("Home");
const Earn = lazyLoad("Earn");
const Wallet = lazyLoad("Wallet");

const routers: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        index: true, // This will match the root path and render Home
        element: <Home />,
      },
      {
        path: "Home",
        element: <Home></Home>,
      },
      {
        path: "Earn",
        element: <Earn></Earn>,
      },
      {
        path: "Wallet",
        element: <Wallet></Wallet>,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routers);
  return element;
};

export default RenderRouter;
