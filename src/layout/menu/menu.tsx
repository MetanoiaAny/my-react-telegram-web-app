import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
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
      sx={{ position: "fixed", bottom: 10, left: '50%', marginLeft:'-47%',right: 0 ,width:"95%" ,backgroundColor:'#181A4A',borderRadius:'10px'}}
    >
      <BottomNavigationAction
        label="Home"
        value={"Home"}
        icon={<HomeIcon />}
        sx={{ color: "white" }}
      />
      <BottomNavigationAction label="Earn" value={"Earn"} icon={<HomeIcon />} sx={{ color: "white" }} />
    </BottomNavigation>
  );
};

export default Menu;
