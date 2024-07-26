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
// import {encrypt,PKey} from '@/utils/encrypt'
import {InitUser} from '@/API/reuqest'
import { SM2Key, encrypt } from "./utils/crypto";




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
    console.log('initData',initData);
    // console.log(JSON.stringify(initData));

    console.log('initDataRaw',initDataRaw);

    if (initDataRaw && initDataRaw.initDataRaw) {
      Init(initDataRaw.initDataRaw);
    }


  }, []);

const Init = async(initData:string)=>{
  const content = {
    initData:initData,
    recommender:''
  }

  const data = encrypt(SM2Key,JSON.stringify(content))

  console.log(data);
  
  // const res = await InitUser({
  //   content:JSON.stringify(content)
  // })

  // try {
  //   console.log(res);
    
  // } catch (error) {
  //   console.log(error);
    
  // }


  // console.log(content);
  

  // const data = encrypt(PKey,JSON.stringify(content))
  // console.log(data);
  

  // const keys = generateKeyPair();
  // console.log(keys);
}
  


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
