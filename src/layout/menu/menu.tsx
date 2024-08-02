import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "@/assets/icon/font1/iconfont.css";



const Select_styles =
  {
    color: 'white',
    position: 'relative',
    '&.Mui-selected': {
      color: 'white',
    },
    '&.Mui-selected::before': {
      content: '""',
      position: 'absolute',
      width:'50px',
      height: '100%',
      top: 0,
      left: '50%',
      right: 0,
      bottom: 0,
      marginLeft: '-25px',
      background: 'linear-gradient(181deg, rgba(245, 160, 255, 0) -10%, rgba(247, 183, 255, 0.1733) 27%, rgba(205, 72, 222, 0.4) 108%)',
      filter: 'blur(20px)',
    },
    '&.Mui-selected .MuiBottomNavigationAction-label': {
      fontWeight: 'bold',
    },
  }


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
    navigate(`Lions/${active}`);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => {
        changeRoute(newValue);
      }}
      sx={{
        backgroundColor: "#181A4A",
        borderRadius: "10px",
        maxWidth: "1100px",
        border: "1px solid #36386D",
        transition: "all 0.5s ease",
      }}
    >
      <BottomNavigationAction
        label="Home"
        value={"Home"}
        icon={<HomeIcon />}
        sx={Select_styles}
      />
      <BottomNavigationAction
        label="Earn"
        value={"Earn"}
        icon={<span className="iconfont  icon-svg_coins"></span>}
        sx={Select_styles}
      />
      <BottomNavigationAction
        label="Earn"
        value={"Wallet"}
        icon={<AccountBalanceWalletIcon />}
        sx={Select_styles}
      />
    </BottomNavigation>
  );
};

export default Menu;
