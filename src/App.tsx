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

import { SM2Key, encrypt, decryptDes } from "./utils/crypto";
import { InitUser } from "./API/reuqest";
import { hooks } from "react-vant";
import { Notify } from "react-vant";
import {setUser} from '@/redux/modules/UserInfo/User'
import {useAppDispatch} from '@/redux/index'

function App() {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  const dispatch = useAppDispatch();

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
  // useEffect(() => {
  //   console.log("initData", initData);
  //   // console.log(JSON.stringify(initData));

  //   console.log(
  //     "initDataRaw",
  //     "query_id=AAHiXs0pAwAAAOJezSnfKrqI&user=%7B%22id%22%3A7143775970%2C%22first_name%22%3A%22outcast%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22fragile173%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721960570&hash=bfea77e8c969e92bb6a26fdf49fe92a831534fef73e7963cf510e3252c8f67e7"
  //   );

  //   if (initDataRaw && initDataRaw.initDataRaw) {
  //     Init(initDataRaw.initDataRaw);
  //   }
  // }, []);

  hooks.useMount(() => {
    // console.log(initData?.user?.id,);
    console.log(initData?.user);
    

    if (initDataRaw && initDataRaw.initDataRaw  && initData?.user?.id !== undefined) {
      Init(initDataRaw.initDataRaw, initData?.user?.id);
    }
  });

  const Init = async (initData: string, UserId: number) => {
    // const _initData =initData

    // const KeyId = String(UserId);


    const KeyId = '7143775970'
    const _initData =
      "query_id=AAHiXs0pAwAAAOJezSmVUkzQ&user=%7B%22id%22%3A7143775970%2C%22first_name%22%3A%22outcast%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22fragile173%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721960645&hash=06770c3a68fc69be88b9e65ea30de8df41a11d4752c9a955e732954d5eac2f26"

    const content = {
      // initData: initData,
      initData: _initData,
      recommender: "",
    };
    const data = encrypt(SM2Key, JSON.stringify(content));
    const res = await InitUser({
      content: data,
    });
    try {
      if (res.code == 1) {
        const decrypt_UserInfo = decryptDes(res.data, KeyId);
        const _UserInfo = JSON.parse(decrypt_UserInfo)
        console.log({
          ..._UserInfo,
          // id:UserId
        });
        
        dispatch(setUser({
          ..._UserInfo,
          id:UserId
        }))
      } else {
        Notify.show({ type: "danger", message: res.msg });
      }
    } catch (error) {
      console.log(error);
    }


  };

  return (
    <>
      <Container fixed sx={{ paddingLeft: 0, paddingRight: 0 }}>
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
