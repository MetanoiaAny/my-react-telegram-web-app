import "./App.css";
import RenderRouter from "@/route/index";
import { AppRoot } from "@telegram-apps/telegram-ui";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@tma.js/sdk-react";
import { useEffect } from "react";
import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import { HashRouter } from "react-router-dom";

import Container from "@mui/material/Container";
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
    console.log(JSON.stringify(initData));

    console.log(initDataRaw);
  }, []);

  return (
    <>
      <Container fixed sx={{ paddingLeft:0, paddingRight:0 }} >
        
          <AppRoot
            appearance={"dark"}
            platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
          >
            <HashRouter>
              <RenderRouter />
            </HashRouter>
          </AppRoot>
        
      </Container>
    </>
  );
}

export default App;
