import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { COLORS } from "../Themes";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationBell from '../../NotificationBell';

export default function Topbar() {
  const [companyName, setCompanyName] = useState("");
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/company-info`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setCompanyName(res.data.data.company_name);
        }
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };

    fetchCompanyInfo();
  }, []);
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: COLORS.primary,
        width: { xs: "100%", md: "92%" },
        borderRadius: { xs: 0, md: 2 },
        mt: { xs: 0, md: 3 },
        ml: { xs: 0, md: 6 },
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 30 },
            color: COLORS.texWhite,
            fontWeight: "bold",
          }}
        >
          {companyName}
        </Typography>

        <Box sx={{ marginLeft: "auto" }}>
         <NotificationBell />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
