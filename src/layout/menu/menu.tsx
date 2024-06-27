import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabbar } from "react-vant";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultValue, setDefaultValue] = useState(
    location.pathname.split("/")[2]
  );
  const changeRoute = (active: number | string) => {
    navigate(`/Lions/${active}`);
  };
  // useEffect(() => "Home", []);

  return (
    <div className="demo-tabbar">
      <Tabbar onChange={changeRoute} defaultValue={defaultValue}>
        <Tabbar.Item name={"Home"}>Fight</Tabbar.Item>
        <Tabbar.Item name={"Earn"}>Earn</Tabbar.Item>
      </Tabbar>
    </div>
  );
};

export default Menu;
