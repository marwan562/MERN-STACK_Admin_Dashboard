import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../../store/hooks";
import { useGetUserByIdQuery } from "../../store/Api/UserApi";

const DashboardLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useAppSelector((state) => state.global.userId)
  const {data} = useGetUserByIdQuery(userId)
  return (
    <div className="app">
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
        user={data}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
           user={data}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default DashboardLayout;
