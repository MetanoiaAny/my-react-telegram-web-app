import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WebApp from "@twa-dev/sdk";
import eruda from "eruda";
import { SDKProvider } from "@tma.js/sdk-react";
WebApp.ready();
eruda.init();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <App />
    </SDKProvider>
  </React.StrictMode>
);
