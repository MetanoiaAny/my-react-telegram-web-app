import { Outlet } from "react-router-dom";
import Menu from "./menu/menu";
import { Container } from "@mui/material";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#000] ">
      <div className="w-full h-full ">
        <Outlet />
      </div>
      <Container fixed sx={{ position: "fixed", bottom: 10 }}>
        <Menu />
      </Container>
    </div>
  );
}

export default AppLayout;
