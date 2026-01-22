import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import NotificationBell from '../NotificationBell';

export default function Topbar({ sidebarOpen, company }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sidebarWidth = sidebarOpen ? 240 : 70;

  return (
    <AppBar
      position="sticky"

      elevation={0}
      sx={{
        backgroundColor: "#437986",

        /* ✅ MOBILE: full width, DESKTOP: reduced */
        width: {
          xs: sidebarWidth,
          md: `calc(124% - ${sidebarWidth}px - 60px)`,
        },

        /* ✅ desktop spacing */
        ml: {

          md: 3,
        },

        mt: {
          xs: 0,
          md: "17px",
        },

        borderRadius: {
          xs: 0,
          md: "15px",
        },

        transition: "all 0.3s ease",
        zIndex: theme.zIndex.drawer - 1,
      }}
    >


      <Toolbar
        sx={{
          px: { xs: 2, sm: 3 },
          minHeight: 64,
          display: "flex",
        }}
      >
        {/* LEFT SECTION */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pl: { xs: 2 }
          }}
        >
      <Typography fontWeight={700}>
  {company?.company_name || "Company"}
</Typography>
        </Box>

        {/* RIGHT SECTION (NOTIFICATIONS) */}
        <Box
          sx={{
            marginLeft: "auto", // ✅ pushes icons to the right
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
<NotificationBell />


        </Box>
      </Toolbar>
    </AppBar>
  );
}
