import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSocket } from "./context/SocketContext";

export default function NotificationBell() {
  const socket = useSocket();
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const BASE_URL = process.env.REACT_APP_URL;

  // fetch unread count
  const fetchCount = async () => {
    const res = await axios.get(`${BASE_URL}/news/notifications/unread-count`, { withCredentials: true });
    setCount(res.data.count);
  };

  // fetch notifications list
  const fetchNotifications = async () => {
    const res = await axios.get(`${BASE_URL}/news/notifications`, { withCredentials: true });
    setList(res.data);
  };

  useEffect(() => {
    fetchCount();
  }, []);

 useEffect(() => {
  if (!socket) return;

  socket.on("new-notification", () => {
    fetchCount();
    fetchNotifications(); // 🔥 add this
  });

  return () => socket.off("new-notification");
}, [socket]);


  const openPopup = async (e) => {
    setAnchorEl(e.currentTarget);
    fetchNotifications();
  };

  const closePopup = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={openPopup}>
        <Badge badgeContent={count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

<Popover
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  onClose={closePopup}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // aligns below the bell
  transformOrigin={{ vertical: "top", horizontal: "right" }} // top-right inside popover
  PaperProps={{
    sx: {
      width: 350,
      position: "relative",
      p: 1,
      overflow: "visible", // allow close button to be fully visible
    },
  }}
>
  {/* Close Button */}
  <IconButton
    onClick={(e) => {
      e.stopPropagation();
      closePopup();
    }}
    size="small"
    sx={{
      position: "absolute",
      top: 4,
      right: 4,
      zIndex: 10,
      color: "grey.700",
      bgcolor: "transparent",
      "&:hover": { bgcolor: "error.main", color: "white" },
    }}
  >
    <CloseIcon fontSize="small" />
  </IconButton>

  <List sx={{ pt: 5, maxHeight: 400, overflowY: "auto" }}>
    {list.length === 0 && (
      <Typography sx={{ p: 2 }}>No notifications</Typography>
    )}
    {list.map((n) => (
      <ListItem key={n.id} alignItems="flex-start">
        <Box>
          <Typography fontWeight={n.is_read ? 400 : 700}>
            {n.title}
          </Typography>
          <Typography variant="body2">{n.message}</Typography>
        </Box>
      </ListItem>
    ))}
  </List>
</Popover>



    </>
  );
}
