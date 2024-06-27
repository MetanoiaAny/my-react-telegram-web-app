import "./App.css";
import RenderRouter from "@/route/index";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { bindMiniAppCSSVars, bindThemeParamsCSSVars, bindViewportCSSVars, useMiniApp, useThemeParams, useViewport } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import { HashRouter } from "react-router-dom";
function App() {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  const initData = useInitData();
  const initDataRaw = useLaunchParams();
  useEffect(() => {
    console.log(initData);
    console.log(initDataRaw);
  }, []);

  return (
    <>
      <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      >
        <HashRouter>
          <RenderRouter />
        </HashRouter>
      </AppRoot>
    </>
  );
}

export default App;
