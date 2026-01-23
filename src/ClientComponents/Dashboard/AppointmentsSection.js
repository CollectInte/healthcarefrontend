import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { COLORS } from "../Themes";

const AppointmentsSection = () => {
  const [tab, setTab] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/appointment/appointments`,
        { withCredentials: true },
      );
      setAppointments(res.data.appointments);
    };
    fetchAppointments();
  }, []);

  const today = dayjs().startOf("day");

  const { upcoming, past } = useMemo(() => {
    const upcoming = [];
    const past = [];

    appointments.forEach((a) => {
      const date = dayjs(a.appointment_date);
      date.isBefore(today) ? past.push(a) : upcoming.push(a);
    });

    return {
      upcoming: upcoming.sort(
        (a, b) => dayjs(a.appointment_date) - dayjs(b.appointment_date),
      ),
      past: past.sort(
        (a, b) => dayjs(b.appointment_date) - dayjs(a.appointment_date),
      ),
    };
  }, [appointments]);

  const activeList = tab === 0 ? upcoming : past;
  const visibleList = activeList.slice(0, 3);

  const statusColors = {
    assigned: COLORS.primary,
    completed: COLORS.success,
    cancelled: COLORS.danger,
  };
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        flex: 1,
        borderRadius: 4,
        p: { xs: 1.5, md: 2 }, // ✅ responsive padding
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            backgroundColor: COLORS.primary,
            height: 3,
            borderRadius: 2,
            color: COLORS.primary,
          },
        }}
        sx={{
          mb: 2,
          minHeight: 36,
          width: { xs: "100%", md: "100%", lg: "auto" },
          color: COLORS.primary,

          "& .MuiTab-root": {
            fontSize: { xs: "8px", md: "14px" },
            minHeight: 36,
            fontWeight: 500,
            color: COLORS.primary,
          },

          "& .MuiTab-root.Mui-selected": {
            color: COLORS.primary, // ✅ selected tab color
          },
        }}
      >
        <Tab label="Upcoming Appointments" />
        <Tab label="Past Appointments" />
      </Tabs>

      {visibleList.length === 0 ? (
        <Typography fontSize={13} color="text.secondary">
          No appointments found
        </Typography>
      ) : (
        <Stack spacing={1.2}>
          {visibleList.map((a) => (
            <Box
              key={a.id}
              sx={{
                p: { xs: 1.2, md: 1.8 },
                borderRadius: 2,
                bgcolor: "#eaf3f3",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 1.5, md: 3 },
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                {/* Date & Time */}
                <Box sx={{ minWidth: { md: 140 } }}>
                  <Typography fontWeight={600} fontSize={13}>
                    {dayjs(a.appointment_date).format("DD MMM YYYY")}
                  </Typography>
                  <Typography fontSize={11} color="text.secondary">
                    {a.from_time} - {a.to_time}
                  </Typography>
                </Box>

                {/* Purpose */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0, // 🔑 allows wrapping
                    maxWidth: { md: "40%" },
                  }}
                >
                  <Typography fontSize={11} color="text.secondary">
                    Purpose
                  </Typography>
                  <Typography
                    fontWeight={600}
                    fontSize={13}
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {a.purpose}
                  </Typography>
                </Box>

                {/* Doctor */}
                <Box sx={{ minWidth: { md: 140 } }}>
                  <Typography fontSize={11} color="text.secondary">
                    Doctor
                  </Typography>
                  <Typography fontWeight={600} fontSize={13}>
                    {a.doctor_name}
                  </Typography>
                </Box>

                {/* Status */}
                <Box
                  sx={{
                    minWidth: { md: 120 },
                  }}
                >
                  <Typography fontSize={11} color="text.secondary">
                    Status
                  </Typography>
                  <Typography
                    sx={{
                      px: 1.6,
                      py: 0.4,
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 10,
                      color: "#fff",
                      bgcolor: statusColors[a.status] || "#9e9e9e",
                      display: "inline-block",
                    }}
                  >
                    {a.status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          size="small"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          onClick={() => navigate("/client/appointment")}
          sx={{
            fontSize: { xs: 11, md: 13 },
            textTransform: "capitalize",
            color: COLORS.primary,
          }}
        >
          See All
        </Button>
      </Box>
    </Paper>
  );
};

export default AppointmentsSection;
