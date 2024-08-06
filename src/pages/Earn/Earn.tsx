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
import { useAppDispatch, useAppSelector } from "@/redux";

import { useLocation } from "react-router-dom";
import { getTwitter, userInfo } from "@/API/reuqest";
import { decryptDes } from "@/utils/crypto";
import { setTwitter, setUser } from "@/redux/modules/UserInfo/User";
import { Notify } from "react-vant";

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
  const dispatch = useAppDispatch();
  const { joinGroup, isfollow, token, id, twitterCode } = useAppSelector(
    (state) => state.User
  );

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stateParam = params.get("state");
    const codeParam = params.get("code");
    if (stateParam && codeParam) {
      sendTwitter(codeParam, stateParam);
    }

    console.log(joinGroup, isfollow, token, id, twitterCode);

    // getUserInfo();
  }, [token]);

  const sendTwitter = async (code: string, state: string) => {
    if (token === "") return;
    try {
      const res = await getTwitter(
        {
          code,
          state,
        },
        token
      );

      if (res.code === 1 && res.msg == "Success") {
        dispatch(setTwitter({ twitterCode: "y" }));
        setTimeout(() => {
          getUserInfo();
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    console.log(token);

    if (token === "") return;
    try {
      const res = await userInfo(token);
      if (res.code === 1) {
        const decrypt_UserInfo = decryptDes(res.data, String(id) + "tongame");
        console.log(decrypt_UserInfo);

        const _UserInfo = JSON.parse(decrypt_UserInfo);

        dispatch(
          setUser({
            ..._UserInfo,
          })
        );
      } else {
        Notify.show({ type: "danger", message: res.msg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onTwitterCheck = async (): Promise<number> => {
    if (token === "") return 0;
    await getUserInfo();
    return 1;
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
                  <span className="mx-=2">+5000</span>
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
                  <span className="mx-2">+3000</span>
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
      <TaskModal
        ref={taskRef}
        isfollow={isfollow}
        userId={id}
        twitterCode={twitterCode}
        onCheck={onTwitterCheck}
      ></TaskModal>
    </>
  );
}

// 定义导出的方法的类型
interface TaskModalType {
  onShow: (type: string, model: number) => void;
}

interface TaskModalProps {
  twitterCode: string;
  isfollow: number;
  userId: string | number;
  onCheck: () => Promise<number>;
}

const returnUrl = (code: string | number) => {
  return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=TzQtRXNRV0VjREFzZlYzYm9mQTk6MTpjaQ&redirect_uri=https%3A%2F%2Fforestbear.io%2Foauth&scope=offline.access+tweet.read+users.read+follows.read+follows.write&state=${code}&code_challenge=0ioze5m20493ny2&code_challenge_method=plain`;
};

const TaskModal = forwardRef<TaskModalType, TaskModalProps>(
  ({ twitterCode, onCheck }, ref) => {
    const [visible, setVisible] = useState(false);
    // const onCancel = () => setVisible(false);

    const [TaskModalMsg, setTaskModalMsg] = useState("");

    const [model, setModel] = useState(0);

    const { id, isfollow } = useAppSelector((state) => state.User);

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

    const [JoinTaskCount, setJoinTaskCount] = useState(0);

    const JoinTask = async () => {
      if (isfollow == 2) {
        return;
      }

      setJoinTaskCount(1);

      if (twitterCode.length > 0 || JoinTaskCount > 0) {
        await onCheck();
        setJoinTaskCount(0);
      } else {
        console.log('id',id);
        
        window.open(returnUrl(id));
      }
    };

    const JoinGroup = () => {
      window.open("https://t.me/+ViIwy503S7szMmNl");
    };

    return (
      <Drawer
        anchor="bottom"
        open={visible}
        onClose={() => setVisible(false)}
        sx={{ "& .MuiDrawer-paper": { backgroundColor: "#000" } }}
      >
        <div className="text-white flex justify-center flex-col items-center px-10 min-h-[260px]  border-t border-solid border-[#00FFFF] rounded-t-3xl shadow-gray-200">
          <div className="my-2">
            {model === 0 ? (
              <img src={tgIcon} className="w-[50px]" />
            ) : (
              <img src={twIcon} className="w-[50px]" />
            )}
          </div>
          <p className="mb-5 text-xl">{TaskModalMsg}</p>

          {model === 0 ? (
            <Button
              variant="contained"
              onClick={JoinGroup}
              sx={{ borderRadius: "10px", padding: "8px 40px", color: "#fff" }}
            >
              Join
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={JoinTask}
              sx={{ borderRadius: "10px", padding: "8px 40px", color: "#fff" }}
            >
              {twitterCode.length > 0 || JoinTaskCount > 0 ? "check" : "Follow"}
            </Button>
          )}
        </div>
      </Drawer>
    );
  }
);
