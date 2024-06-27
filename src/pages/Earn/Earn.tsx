import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ActionSheet } from "react-vant";

export default function Earn() {
  const taskRef = useRef<TaskModalType | null>(null);

  return (
    <>
      <div className="h-full w-full flex justify-center items-center flex-col">
        <div className="my-20" onClick={() => taskRef.current?.onShow(' Join our TG channel',0)}>
          Join our TG channel
        </div>
        <div onClick={() => taskRef.current?.onShow('Follow our X account',1)} >Follow our X account </div>
      </div>
      <TaskModal ref={taskRef}></TaskModal>
    </>
  );
}

// 定义导出的方法的类型
interface TaskModalType {
  onShow: (type: string,model: number) => void;
}

const TaskModal = forwardRef<TaskModalType>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const onCancel = () => setVisible(false);

  const [TaskModalMsg, setTaskModalMsg] = useState("");

  const [model, setModel] = useState(0);

  const onShow = (type: string,model: number) => {
    setTaskModalMsg(type);
    setModel(model)
    setVisible(true);
  };

  //暴露 Modal 方法
  useImperativeHandle(ref, () => ({
    onShow,
  }));

  return (
    <ActionSheet visible={visible} onCancel={onCancel}>
      <div style={{ padding: "16px 16px 160px" }}>
        <p>{TaskModalMsg}</p>
        <div>Join</div>
      </div>
    </ActionSheet>
  );
});
