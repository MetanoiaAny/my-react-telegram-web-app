import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import WebApp from "@twa-dev/sdk";
import eruda from "eruda";
import Root from '@/layout/Root'



WebApp.ready();
eruda.init();



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
