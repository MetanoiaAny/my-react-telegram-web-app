import styled from "styled-components";

import lionsImg from "@/assets/image/lions.webp";
import gameImg from "@/assets/image/game.webp";
import { CountDown } from "react-vant";

import TokenImg from "@/assets/image/Token.webp";
import speedLine from '@/assets/image/speedLine.webp'

import { PointShadow } from "@/components/backgroundShadow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onContract } from "@/Ton/useContract";
import { useEffect } from "react";

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
  const navigate = useNavigate();



  useEffect(() => {
    // Ton_get()
    onContract()
  }, []);

  const onRouteRank = () => {
    navigate("/Lions/Rank");
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col text-white">
      <div className="relative">
        <TopMenuDiv className="h-[80px] relative flex justify-between items-center px-4 text-xs">
          <div>
            <p>X players</p>
          </div>
          <div>
            <p>My integral</p>
          </div>
          <div className="absolute left-[50%] ml-[-40px] bottom-[-35px]">
            <img src={lionsImg} className="w-[80px] h-[80px] " alt="" />
            <p className="text-center">Lions</p>
          </div>
        </TopMenuDiv>
      </div>
      <div className="mx-[10px] border border-solid border-[#fff] border-opacity-10  flex-1 mt-[40px] flex justify-center items-center pb-5 flex-col">
        {/* <img src={gameImg} className="" alt="" />  */}
        <PointShadow
          $filter="blur(92px)"
          $shadowColor="linear-gradient(177deg, rgba(7, 229, 255, 0) -25%, #07A8FF 24%);"
          className="top-1/4 w-[200px] h-[200px] absolute z-1"
        ></PointShadow>
        <GamePlane $images={speedLine} className="w-full flex justify-center items-center flex-col pt-5 pb-5">
          <div>
            <p className="text-center">Time left</p>
            <CountDown
              time={30 * 60 * 60 * 1000}
              millisecond
              format="HH:mm:ss:SS"
              className=" flex justify-center items-center text-white text-3xl"
            >
              {(timeData) => (
                <>
                  <span className="block mx-2">{timeData.hours}</span>
                  <span className="colon">:</span>
                  <span className="block mx-2">{timeData.minutes}</span>
                  <span className="colon">:</span>
                  <span className="block mx-2">{timeData.seconds}</span>
                </>
              )}
            </CountDown>
          </div>
          <GamePlane
            $images={gameImg}
            className="w-[220px] h-[350px] relative flex justify-center"
          ></GamePlane>
        </GamePlane>
        <div className="justify-between flex items-center w-full px-4">
          <div className="w-[40px]"></div>
          <div>
            <PointsButton
              sx={{ borderRadius: "20px", padding: "6px 20px", color: "#fff" }}
            >
              points betting
            </PointsButton>
          </div>
          <div className="w-[40px]" onClick={onRouteRank}>
            <p>Rank</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 relative overflow-hidden w-full">
          <img src={TokenImg} className="w-[35px] " alt="" />
          <p className="text-white text-3xl">20000</p>
          <PointShadow
          $filter="blur(92px)"
          $shadowColor="linear-gradient(177deg, rgba(7, 229, 255, 0) -26%, #07A8FF 24%);"
          className=" w-[150px] h-[150px] absolute z-1"
        ></PointShadow>
        </div>
      </div>
    </div>
  );
}
