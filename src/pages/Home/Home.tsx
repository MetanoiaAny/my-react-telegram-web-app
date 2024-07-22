import styled from "styled-components";

import topBg from "@/assets/image/topBg.webp";

const GamePlane = styled.div`
  background: url(${topBg}) no-repeat;
  background-size: 100% 100%;
`;

export default function Home() {
  return (
    <div className="w-full h-full flex-1">
      <div className="relative">
        <GamePlane className="h-[80px] relative">

          
        </GamePlane>

      </div>
      <div></div>
      <div></div>
    </div>
  );
}
