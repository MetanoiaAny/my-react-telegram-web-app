import React from "react";
import ReactDOM from "react-dom/client";
import "./polyfills";

import WebApp from "@twa-dev/sdk";
// import eruda from "eruda";
import Root from '@/layout/Root'


import '@telegram-apps/telegram-ui/dist/styles.css';

import './mockEnv.ts';

import "./index.css";
WebApp.ready();

// eruda.init();



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
  // <Root />
);
