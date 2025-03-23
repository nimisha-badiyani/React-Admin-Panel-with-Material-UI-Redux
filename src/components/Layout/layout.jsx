import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isSidebarOpen ? "240px" : "60px", // Sidebar width based on open state
          transition: "width 0.3s ease", // Smooth transition on width change
          position: "fixed", // Sidebar is fixed, so the content will be adjusted accordingly
        }}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s", // Smooth transition when toggling
          marginLeft: isSidebarOpen ? "240px" : "60px", // Adjust margin based on sidebar state
        }}
      >
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
            marginTop: "64px",
            background: "#acacac14",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
