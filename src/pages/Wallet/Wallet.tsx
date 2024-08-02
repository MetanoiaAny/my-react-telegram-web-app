// import { Button } from "@mui/material";
// import styled from "styled-components";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import { truncateAddress } from "@/utils/tool";
import { useEffect, useState } from "react";
import { onGetTonBalance } from "@/Ton/TonUtils";
import { compareAndFormatNumber } from "@/utils/count";
import { useAppDispatch } from "@/redux/index";
import { setBalance } from "@/redux/modules/Balance/Balance";
// const ConnectButton = styled(Button)`
//   border-radius: 20px;
//   padding: 6px 25px;
//   color: #fff;
//   background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) -3%, rgba(0, 255, 255, 0.72) 0%, rgba(0, 255, 255, 0.72) 30%, rgba(0, 255, 255, 0.72) 60%, rgba(0, 255, 255, 0) 131%);
// `

const Wallet = () => {
  const dispatch = useAppDispatch();
  const userFriendlyAddress = useTonAddress();
  // const rawAddress = useTonAddress(false);
  const [userAddress, setUserAddress] = useState("");
  const wallet = useTonWallet();

  const [TonBalance, setTonBalance] = useState("-");

  useEffect(() => {
    setUserAddress(userFriendlyAddress);
    getBalance();
  }, [userFriendlyAddress]);

  useEffect(() => {}, []);

  const getBalance = async () => {
    if (!userFriendlyAddress) return;
    const balance = await onGetTonBalance(userFriendlyAddress);

    const _balance = compareAndFormatNumber(balance, 2);
    setTonBalance(_balance);
    dispatch(setBalance(_balance));
    // dis
    // setBalance
  };

  // console.log('userFriendlyAddress',userFriendlyAddress);
  // console.log('rawAddress',rawAddress);

  return (
    <div className="w-full h-screen px-8 py-8 flex justify-around items-center flex-col">
      {userAddress ? (
        <>
          <div className="w-full h-full text-white">
            <p className="mt-[60px] text-3xl font-bold">Wallet</p>
            <div className="flex justify-center items-center my-8">
              <TonConnectButton />
            </div>
            <div>My Ton Balance: {TonBalance}</div>
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-white text-base text-center">
              connect your wallet to access upcoming crypto features. Our team
              is Working hard to bring them to you soon!
            </p>
            {/* <p className="text-white">{ truncateAddress(userFriendlyAddress)}</p> */}
            {/* <p className="text-white">{rawAddress}</p> */}
          </div>
          <TonConnectButton />
        </>
      )}
    </div>
  );
};

export default Wallet;
