// import { Button } from "@mui/material";
// import styled from "styled-components";
import {TonConnectButton,useTonAddress} from "@tonconnect/ui-react";

// const ConnectButton = styled(Button)`
//   border-radius: 20px;
//   padding: 6px 25px;
//   color: #fff;
//   background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) -3%, rgba(0, 255, 255, 0.72) 0%, rgba(0, 255, 255, 0.72) 30%, rgba(0, 255, 255, 0.72) 60%, rgba(0, 255, 255, 0) 131%);
// ` 


const Wallet = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    <div className="w-full h-screen px-8 py-8 flex justify-around items-center flex-col">
        <div></div>
      <div>
        <p className="text-white text-base text-center">
          connect your wallet to access upcoming crypto features. Our team is
          Working hard to bring them to you soon!
        </p>
        <p className="text-white">{userFriendlyAddress}</p>
        <p className="text-white">{rawAddress}</p>
      </div>
      <TonConnectButton />
    </div>
  );
};

export default Wallet;
