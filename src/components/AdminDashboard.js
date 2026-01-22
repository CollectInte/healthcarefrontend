
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Employees from './Employees';
import Clients from './Clients';
import AdminProfile from './AdminProfile';
import Appointments from './Appointments';
import StaffAttendance from './StaffAttendance';
import LeaveRequest from './LeaveRequest';
import AdminReviews from './AdminReviews';
import AdminBills from './AdminBills';
import SendNotification from './UpdatedNotifications';
import PaymentsTable from './Payments';
import Passwordrepository from './Passwordrepository';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import logo from '../images/RVlogo.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import ContactsIcon from '@mui/icons-material/Contacts';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import GroupsIcon from '@mui/icons-material/Groups';
import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ServiceRequest from './ServiceRequest';
import Dashboard from './Dashboard';
import ClientsCards from './ClientsCards';
import NotificationListener from "../NotificationListener";
import NotificationBell from '../NotificationBell';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




export default function AdminDashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('Home'); // State to manage the displayed content
  const [apiResponse, setApiResponse] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const profileopen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await fetch(process.env.REACT_APP_LOGOUT, {
        method: "POST",
        credentials: "include", // 🔴 REQUIRED
      });
      localStorage.clear(); // optional (admin_id, role, etc.)
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.content) {
      setContent(location.state.content);
    }
  }, [location.state]);
  useEffect(() => {
    fetch(process.env.REACT_APP_DOCUMENTS_ADMINFETCH, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setApiResponse(data));
  }, []);

  const companyfetch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/admin/get/${localStorage.getItem("adminId")}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      localStorage.setItem("companyName", data.data.company_name);
      localStorage.setItem("companyLogo", data.data.company_logo);
    } catch (error) {
      console.error("Error fetching company name:", error);
    }
  };

  useEffect(() => {
    companyfetch();
  }, []);

  const companyName = localStorage.getItem("companyName");
  const companyLogo = localStorage.getItem("companyLogo");

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: "500px",
    overflowY: 'auto',
  };

  const ProfileName = localStorage.getItem("adminName");
  const drawerWidth = 250;




  return (
    <>

      {/*  ADMIN SOCKET NOTIFICATIONS */}
      <NotificationListener />
      <Box sx={{ display: 'flex', backgroundColor: "#f7f5f5" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            ml: `${drawerWidth}px`,
            mt: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            px: 3,
          }}
        >
          {/* LEFT BOX – IMAGE / LOGO */}
          <Box
            sx={{
              width: "17%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Box
              component="img"
              src={`${process.env.REACT_APP_URL}/Images/${companyLogo}`}   // 🔁 replace with your image
              alt="Logo"
              sx={{
                width:200,
                height: 100,
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          </Box>

          {/* RIGHT BOX – HEADER CONTENT */}
          <Box
            sx={{
              width: "83%",
              backgroundColor: "#3f6f7a",
              borderRadius: "16px",
              px: 3,
              py: 1.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Toolbar disableGutters sx={{ width: "100%" }}>
              {/* LEFT – Company Name */}
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: 600, ml: 2 }}
              >
                {companyName}
              </Typography>

              {/* RIGHT – Notification + Profile */}
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pr: 2,
                }}
              >
                <IconButton
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  <NotificationBell  setAdminContent={setContent} />
                </IconButton>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  onClick={handleClick}
                  sx={{
                    cursor: "pointer",
                    px: 1.5,
                    py: 0.8,
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#5f9aa6" },
                  }}
                >
                  <Avatar sx={{ bgcolor: "#5f9aa6", width: 38, height: 38 }}>
                    {ProfileName?.charAt(0)}
                  </Avatar>

                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography variant="subtitle1" color="#fff" fontWeight={600}>
                      {ProfileName}
                    </Typography>
                    <Typography variant="caption" color="#fff">
                      {today}
                    </Typography>
                  </Box>
                </Stack>

                <Menu
                  anchorEl={anchorEl}
                  open={profileopen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={() => { setContent("Profile"); handleClose(); }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={() => { handleLogout(); handleClose(); }}
                    sx={{ color: "error.main" }}
                  >
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Box>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                background: 'linear-gradient(180deg, #3f6f7a, #5f9aa6)',
                color: '#fff',
                borderTopRightRadius: '40px',
                borderBottomRightRadius: '40px',
                marginTop: '140px',
                paddingTop: 1,
              },
            }}
          >
            {/* <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider /> */}
            <List>
              {['Home', 'Employees', 'Clients', 'Documents', 'Profile'].map((text) => {
                // Define the icon mapping
                const iconMapping = {
                  Home: <HomeIcon />,
                  Employees: <BadgeIcon />,
                  Clients: <GroupsIcon />,
                  Documents: <ArticleIcon />,
                  Profile: <ContactEmergencyIcon />,
                };

                return (
                  <ListItem key={text} disablePadding sx={{ marginTop: "5px" }}>
                    <ListItemButton
                      onClick={() => setContent(text)} // Update content on click
                      sx={{
                        maxHeight: 38,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: content === text ? '#5f9aa6' : 'transparent', // Change background color
                        color: content === text ? '#fff' : 'inherit',
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: '#fff', minWidth: 36 }}
                      >
                        {iconMapping[text]} {/* Render icon based on text */}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
              {/* <hr /> */}
              {['Appointments', 'Attendance', 'Leave Requests', 'Reviews', 'Bills', 'Notifications'].map((text) => {
                // Define the icon mapping
                const iconMapping = {
                  Appointments: <CalendarMonthIcon />,
                  Attendance: <PendingActionsIcon />,
                  'Leave Requests': <DirectionsRunIcon />,
                  Reviews: <ReviewsIcon />,
                  Bills: <ReceiptIcon />,
                  Notifications: <ContactSupportIcon />,
                };

                return (
                  <ListItem key={text} disablePadding >
                    <ListItemButton
                      onClick={() => setContent(text)} // Update content on click
                      sx={{
                        maxHeight: 38,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: content === text ? '#5f9aa6' : 'transparent', // Change background color
                        color: content === text ? 'white' : 'inherit',
                      }}
                    >
                      <ListItemIcon
                          sx={{ color: '#fff', minWidth: 36 }}
                      >
                        {iconMapping[text]} {/* Render icon based on text */}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: 14,
            mr: 3,
            ml: 3,
            backgroundColor: "#f7f5f5"
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              p:2,
              minHeight: '80vh',
            }}
          >
            <Typography variant="h6" sx={{ color: 'black', fontWeight: 600 }}>
              Dashboard / {content}
            </Typography>

            {/* Conditionally render content based on the state */}
            {content === 'Home' && (
              <>
                <Dashboard />
              </>
            )}
            {content === 'Employees' && (
              <>
                <Employees />
              </>
            )}
            {content === 'Clients' && (
              <>
                <Clients />
              </>
            )}
            {/* {content === 'ServiceRequest' &&
              (
                <>
                  <ServiceRequest />
                </>
              )} */}
            {content === 'Documents' &&
              (
                <>
                  <ClientsCards data={apiResponse} />
                </>
              )}
            {content === 'Profile' &&
              (
                <>
                  <AdminProfile />
                </>
              )}
            {/* {content === 'PasswordRepository' &&
              (
                <>
                  <Passwordrepository />
                </>
              )} */}

              {content === 'Leave Requests' &&
              (
                <>
                  <LeaveRequest />
                </>
              )}

            {content === 'Appointments' &&
              (
                <>
                  <Appointments />
                </>
              )}
            {content === 'Attendance' &&
              (
                <>
                  <StaffAttendance />
                </>
              )
            }
            {content === 'Reviews' && (
              <>
                <AdminReviews />
              </>
            )}
            {content === 'Bills' && (
              <>
                <AdminBills />
              </>
            )}
            {/* {content === 'Payments' && (
              <>
                <PaymentsTable />
              </>
            )} */}
            {content === 'Notifications' && (
              <>
                <SendNotification />
              </>
            )}
          </Box>
        </Box>
      </Box >
    </>
  );
}


