import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import '@/assets/icon/font1/iconfont.css'

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname.split("/")[2]);
  // const [defaultValue] = useState(location.pathname.split("/")[2]);
  // const changeRoute = (active: number | string) => {
  //   navigate(`/Lions/${active}`);
  // };
  // useEffect(() => "Home", []);

  const changeRoute = (active: string) => {
    setValue(active);
    navigate(`/Lions/${active}`);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        changeRoute(newValue);
      }}
      sx={{ backgroundColor:'#181A4A',borderRadius:'10px',maxWidth:'1100px'}}
    >
      <BottomNavigationAction
        label="Home"
        value={"Home"}
        icon={<HomeIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction label="Earn" value={"Earn"} icon={
        <span className="iconfont  icon-svg_coins"></span>
      } sx={{ color: "white" }} />
      <BottomNavigationAction label="Earn" value={"Wallet"} icon={<AccountBalanceWalletIcon />} sx={{ color: "white" }} />
    </BottomNavigation>
  );
};

export default Menu;
