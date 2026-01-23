import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EventIcon from "@mui/icons-material/Event";
import { COLORS } from "../Themes";

const RightButtonsActions = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* ===== Card 1 ===== */}
      <Paper
        elevation={0}
        onClick={() => navigate("/client/appointment")}
        sx={{
          flex: { xs: 1, md: "unset" },
          bgcolor: COLORS.activeBg,
          borderRadius: 4,
          p: { xs: 2, md: 3 },
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: 40, md: 70 },
            height: { xs: 40, md: 70 },
            bgcolor: COLORS.primary,
            borderRadius: 100,
            mx: "auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <EventIcon sx={{ fontSize: { xs: 18, md: 40 } }} />
        </Box>

        <Typography fontWeight={450} fontSize={{ xs: 8, md: 18 }}>
          View All Appointments
        </Typography>
      </Paper>

      {/* ===== Card 2 ===== */}
      <Paper
        elevation={0}
        onClick={() => navigate("/client/documents")}
        sx={{
          flex: { xs: 1, md: "unset" },
          bgcolor: COLORS.activeBg,
          borderRadius: 4,
          p: { xs: 2, md: 3 },
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: 40, md: 70 },
            height: { xs: 40, md: 70 },
            bgcolor: COLORS.primary,
            borderRadius: 100,
            mx: "auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <UploadFileIcon sx={{ fontSize: { xs: 18, md: 40 } }} />
        </Box>

        <Typography fontWeight={450} fontSize={{ xs: 8, md: 18 }}>
          View & Upload Your Documents
        </Typography>
      </Paper>
    </Box>
  );
};

export default RightButtonsActions;
