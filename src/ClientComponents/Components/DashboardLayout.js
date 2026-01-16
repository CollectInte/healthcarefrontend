import { Box, Toolbar } from "@mui/material";
import Sidebar, { drawerWidth, drawerWidthClosed } from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { COLORS } from "../Themes";
import { red } from "@mui/material/colors";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f8f6f6" }}>
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <Box
        sx={{
          flexGrow: 1, // 👈 Takes remaining width
          width: {
            xs: "100%",
            md: `calc(100% - ${
              sidebarOpen ? drawerWidth : drawerWidthClosed
            }px)`,
          },
          transition: "width 0.3s ease",
        }}
      >
        <Topbar sidebarOpen={sidebarOpen} />

        <Box
          component="main"
          sx={{
            ml: { md: 2, xs: 0 },
            p: { xs: 2, md: 3 },
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
