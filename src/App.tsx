import "./App.css";
import RenderRouter from "@/route/index";
// import { AppRoot } from "@telegram-apps/telegram-ui";
// import { bindMiniAppCSSVars, useLaunchParams, useMiniApp, useThemeParams } from "@tma.js/sdk-react";
// import { useEffect } from "react";
// import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import { HashRouter } from "react-router-dom";
function App() {

  console.log(1);
  
  
  // const initData = useInitData();
  // const initDataRaw = useLaunchParams();
  // useEffect(() => {
  //   console.log(initData);
  //   console.log(initDataRaw);
  // }, [])
  
  return (
    <>
      {/* <AppRoot
        appearance={miniApp.isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      > */}
        <HashRouter>
          <RenderRouter />
        </HashRouter>
      {/* </AppRoot> */}
    </>
  );
}

export default App;
