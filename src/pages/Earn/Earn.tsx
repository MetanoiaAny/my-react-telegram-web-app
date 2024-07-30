import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// import { ActionSheet, Button, Image } from "react-vant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import bannerImg from "@/assets/image/earnBanner.png";
import tgIcon from "@/assets/image/tg-icon.png";
import twIcon from "@/assets/image/tw-icon.png";
import pointImg from "@/assets/image/point.png";
import successImg from "@/assets/image/success.webp";

import styled from "styled-components";
import { PointShadow } from "@/components/backgroundShadow";
import { useAppSelector } from "@/redux";

import { useLocation } from "react-router-dom";
import { getTwitter } from "@/API/reuqest";

const TaskBox = styled.div`
  border-radius: 23px;
  opacity: 1;
  background: #222430;
  padding: 10px 18px;
  box-sizing: border-box;
  margin-top: 15px;
  box-shadow: 0px 4px 20px 7px rgba(0, 0, 0, 0.25);
`;

export default function Earn() {
  const taskRef = useRef<TaskModalType | null>(null);
  const { joinGroup, isfollow, token } = useAppSelector((state) => state.User);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stateParam = params.get("state");
    const codeParam = params.get("code");
    if (stateParam && codeParam) {
      sendTwitter(codeParam, stateParam);
    }
  }, [token]);

  const sendTwitter = async (code: string, state: string) => {
    console.log(token);
    
    if (token==="") return  
    try {
      const res = await getTwitter(
        {
          code,
          state,
        },
        token
      );
      console.log(res);
      if (res.code===1&& res.msg=='Success') {
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col px-[25px] text-white">
        <div className="w-full flex justify-center items-center mt-[40px]">
          <PointShadow
            $filter="blur(41px)"
            $shadowColor="rgba(247, 197, 62, 0.3)"
            className="w-[180px] h-[180px] absolute z-1"
          ></PointShadow>
          <img width="162" height="162" src={bannerImg} className="z-20" />
        </div>
        <div className="w-full">
          <p>Task List</p>
          <TaskBox
            className="flex justify-between items-center"
            onClick={() => taskRef.current?.onShow(" Join our TG channel", 0)}
          >
            <div className="flex items-center">
              <img src={tgIcon} width="40" />
              <div className="ml-3">
                <p>Join our TG channel</p>
                <div className="flex items-center ">
                  <img src={pointImg} width="25"></img>{" "}
                  <span className="mx-=2">+1000</span>
                </div>
              </div>
            </div>
            {joinGroup === 2 ? (
              <img src={successImg} className="w-[25px]" />
            ) : (
              <ArrowForwardIosIcon />
            )}
          </TaskBox>
          <TaskBox
            className="flex justify-between items-center"
            onClick={() => taskRef.current?.onShow("Follow our X account", 1)}
          >
            <div className="flex items-center">
              <img src={twIcon} width="35" />
              <div className="ml-3">
                <p>Join our TG channel</p>
                <div className="flex items-center ">
                  <img src={pointImg} width="25"></img>{" "}
                  <span className="mx-2">+1000</span>
                </div>
              </div>
            </div>
            {isfollow == 2 ? (
              <img src={successImg} className="w-[25px]" />
            ) : (
              <ArrowForwardIosIcon />
            )}
          </TaskBox>
        </div>
        {/* <div
          className="my-[20px] "
          onClick={() => taskRef.current?.onShow(" Join our TG channel", 0)}
        >
          Join our TG channel
        </div>
        <div onClick={() => taskRef.current?.onShow("Follow our X account", 1)}>
          Follow our X account{" "}
        </div> */}
      </div>
      <TaskModal ref={taskRef}></TaskModal>
    </>
  );
}

// 定义导出的方法的类型
interface TaskModalType {
  onShow: (type: string, model: number) => void;
}

const X_url =
  "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TzQtRXNRV0VjREFzZlYzYm9mQTk6MTpjaQ&redirect_uri=https%3A%2F%2Fforestbear.io%2FtwitterTon&scope=offline.access+tweet.read+users.read+follows.read+follows.write&state=0ioze5m20493ny2&code_challenge=0ioze5m20493ny2&code_challenge_method=plain";

const TaskModal = forwardRef<TaskModalType>((_, ref) => {
  const [visible, setVisible] = useState(false);
  // const onCancel = () => setVisible(false);

  const [TaskModalMsg, setTaskModalMsg] = useState("");

  const [model, setModel] = useState(0);

  const onShow = (type: string, model: number) => {
    setTaskModalMsg(type);
    console.log(model);

    setModel(model);
    setVisible(true);
  };

  //暴露 Modal 方法
  useImperativeHandle(ref, () => ({
    onShow,
  }));

  const JoinTask = () => {
    if (model === 0) {
      window.open("https://t.me/+ViIwy503S7szMmNl");
    } else {
      window.open(X_url);
    }
  };

  return (
    <Drawer
      anchor="bottom"
      open={visible}
      onClose={() => setVisible(false)}
      sx={{ "& .MuiDrawer-paper": { backgroundColor: "#000" } }}
    >
      <div className="text-white flex justify-center flex-col items-center px-10 min-h-[260px]  border border-solid border-[#fff] rounded-t-3xl shadow-gray-200">
        <div className="my-2">
          {model === 0 ? (
            <img src={tgIcon} className="w-[50px]" />
          ) : (
            <img src={twIcon} className="w-[50px]" />
          )}
        </div>
        <p className="mb-5 text-xl">{TaskModalMsg}</p>

        <Button
          variant="contained"
          onClick={JoinTask}
          sx={{ borderRadius: "10px", padding: "8px 40px", color: "#fff" }}
        >
          Join
        </Button>
      </div>
    </Drawer>
  );
});
