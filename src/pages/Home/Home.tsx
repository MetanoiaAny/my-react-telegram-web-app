import styled from "styled-components";

import lionsImg from "@/assets/image/lions.webp";
import gameImg from "@/assets/image/game.webp";
import { CountDown } from "react-vant";

import TokenImg from "@/assets/image/Token.webp";
import speedLine from "@/assets/image/speedLine.webp";
import RankImg from "@/assets/image/Rankimg.webp";
// import TransparentBackground from "@/assets/image/Transparent.png";

import { PointShadow, TopDivider } from "@/components/backgroundShadow";
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { onActivity_info } from "@/Ton/useContract";
import { onGetTonBalance } from "@/Ton/TonUtils";
import { useEffect, useRef } from "react";

import RankModal from "./Rank";

import "./Home.css";
import { useAppDispatch, useAppSelector } from "@/redux";
import { compareAndFormatNumber } from "@/utils/count";
import { setBalance } from "@/redux/modules/Balance/Balance";
import { useTonAddress } from "@tonconnect/ui-react";

interface StyledProps {
  $images?: string;
}

const PointsButton = styled(Button)`
  color: #fff;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) -3%,
    rgba(0, 255, 255, 0.72) 0%,
    rgba(0, 255, 255, 0.72) 30%,
    rgba(0, 255, 255, 0.72) 60%,
    rgba(0, 255, 255, 0) 131%
  );
`;

const GamePlane = styled.div<StyledProps>`
  background: url(${(props) => props.$images}) no-repeat;
  background-size: 100% 100%;
`;

const TopMenuDiv = styled.div`
  background: linear-gradient(180deg, #24234b 0%, #151716 100%);
`;

export default function Home() {
  // const navigate = useNavigate();
  const RankModalRef = useRef();
  const { TonBalance } = useAppSelector((state) => state.Balance);
  const dispatch = useAppDispatch();
  const userFriendlyAddress = useTonAddress();
  useEffect(() => {
    // Ton_get()
    // InitActivity(userFriendlyAddress);
    initUserBalance();
  }, []);



  const InitActivity = async (Address:string)=>{
    console.log('InitActivity',Address);
    
    const res = await onActivity_info(Address)
    console.log(res,'InitActivity');
    
  }


  const initUserBalance = async () => {
    if (!userFriendlyAddress) return;
    const balance = await onGetTonBalance(userFriendlyAddress);

    const _balance = compareAndFormatNumber(balance, 2);

    dispatch(setBalance(_balance));
  };

  const onRouteRank = () => {
    RankModalRef.current.onShow();
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col text-white">
      <div className="relative">
        <TopMenuDiv className="h-[80px] relative flex justify-between items-center px-4 text-xs">
          <div className="text-sm flex justify-center items-center flex-col min-w-[95px] h-full">
            <p className="text-[#999999]"> players</p>
            <TopDivider className="my-1.5"></TopDivider>
            <p>0</p>
          </div>
          <div className="text-sm flex justify-center items-center flex-col min-w-[120px] h-full">
            <p className="text-[#999999]"> My integral</p>
            <TopDivider className="my-1.5"></TopDivider>
            <p>{TonBalance}</p>
          </div>
          <div className="absolute left-[50%] ml-[-40px] bottom-[-35px]">
            <p className="text-center text-base">Lions</p>
            <img src={lionsImg} className="w-[80px] h-[80px] " alt="" />
          </div>
        </TopMenuDiv>
      </div>
      <div className="mx-[10px] border border-solid border-[#fff] border-opacity-10  flex-1 mt-[40px] flex justify-center items-center pb-5 flex-col">
        {/* <img src={gameImg} className="" alt="" />  */}
        <PointShadow
          $filter="blur(92px)"
          $shadowColor="linear-gradient(177deg, rgba(7, 229, 255, 0) -25%, #07A8FF 24%);"
          className="top-1/3 w-[200px] h-[200px] absolute z-1"
        ></PointShadow>
        <GamePlane
          $images={speedLine}
          className="w-full flex justify-center items-center flex-col pt-5 pb-5 rounded-sm"
        >
          <div>
            <p className="text-center">Time left</p>
            <CountDown
              time={60 * 60 * 1000}
              millisecond
              format="HH:mm:ss:SS"
              className=" flex justify-center items-center text-white text-base font-bold my-4"
            >
              {(timeData) => (
                <>
                  <div className="CountDown mx-2 text-white">{timeData.minutes}</div>
                  <div className="colon">:</div>
                  <div className="CountDown mx-2 text-white">{timeData.seconds}</div>
                </>
              )}
            </CountDown>
          </div>
          <GamePlane
            $images={gameImg}
            className="w-[220px] h-[350px] relative flex justify-center"
          ></GamePlane>
        </GamePlane>
        <GamePlane
          className="w-full relative flex justify-center flex-col "
        >
          <div className="justify-between flex items-center w-full px-4">
            <div></div>
            <div>
              <PointsButton
                sx={{
                  borderRadius: "20px",
                  padding: "6px 15px",
                  color: "#fff",
                }}
              >
                points betting
              </PointsButton>
            </div>
            <div></div>
          </div>
          <div className="flex justify-between items-center w-full px-2">
            <div></div>
            <div></div>
            <div className="w-[40px]" onClick={onRouteRank}>
              <img src={RankImg} alt="" />
              <p>Rank</p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 relative  w-full">
            <img src={TokenImg} className="w-[35px] " alt="" />
            <p className="text-white text-3xl">20000</p>
            <PointShadow
              $filter="blur(92px)"
              $shadowColor="linear-gradient(177deg, rgba(7, 229, 255, 0) -26%, #07A8FF 24%);"
              className=" w-[140px] h-[140px] absolute z-1"
            ></PointShadow>
          </div>
        </GamePlane>
      </div>
      <RankModal ref={RankModalRef}></RankModal>
    </div>
  );
}
