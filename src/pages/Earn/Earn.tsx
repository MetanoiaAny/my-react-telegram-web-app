import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ActionSheet, Button, Image } from "react-vant";

import bannerImg from "@/assets/image/earnBanner.png";
import tgIcon from "@/assets/image/tg-icon.png";
import twIcon from "@/assets/image/tw-icon.png";
import pointImg from "@/assets/image/point.png";

import styled from "styled-components";

import { Arrow } from '@react-vant/icons';

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

  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col px-[25px]">
        <div className="w-full flex justify-center items-center mt-[40px]">
          <Image width="162" height="162" src={bannerImg} />
        </div>
        <div className="w-full">
          <p>Task List</p>
          <TaskBox className="flex justify-between items-center"  onClick={() => taskRef.current?.onShow(" Join our TG channel", 0)}>
            <div className="flex items-center">
              <Image src={tgIcon} width='40' />
              <div className="ml-3">
                <p>Join our TG channel</p>
                <div className="flex items-center " >
                  <Image src={pointImg} width='25' ></Image>+ 1000
                </div>
              </div>
            </div>
            <Arrow />
          </TaskBox>
          <TaskBox className="flex justify-between items-center" onClick={() => taskRef.current?.onShow("Follow our X account", 1)}>
            <div className="flex items-center">
              <Image src={twIcon} width='35'    />
              <div className="ml-3">
                <p>Join our TG channel</p>
                <div className="flex items-center ">
                  <Image src={pointImg} width='25' ></Image>+ 1000
                </div>
              </div>
            </div>
            <Arrow />
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

const TaskModal = forwardRef<TaskModalType>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => setVisible(false);

  const [TaskModalMsg, setTaskModalMsg] = useState("");

  const [model, setModel] = useState(0);

  const onShow = (type: string, model: number) => {
    setTaskModalMsg(type);
    setModel(model);
    setVisible(true);
  };

  //暴露 Modal 方法
  useImperativeHandle(ref, () => ({
    onShow,
  }));

  const JoinTask = () => {
    if (model === 0) {
      // window.open("https://t.me/LionsClub");
    } else {
      // window.open("https://twitter.com/LionsClubX");
    }
  };

  return (
    <ActionSheet visible={visible} onCancel={onCancel}>
      <div style={{ padding: "16px 16px 160px" }}>
        <p>{TaskModalMsg}</p>

        <Button type="primary" round onClick={JoinTask}>
          Join
        </Button>
      </div>
    </ActionSheet>
  );
});
