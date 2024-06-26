import { Tabbar } from "react-vant";

const Menu = () => {
  return (
    <div className="demo-tabbar">
      <Tabbar>
        <Tabbar.Item>Fight</Tabbar.Item>
        <Tabbar.Item>Earn</Tabbar.Item>
        <Tabbar.Item>Wallet</Tabbar.Item>
      </Tabbar>
    </div>
  );
};

export default Menu;
