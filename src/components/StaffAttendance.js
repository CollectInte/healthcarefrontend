import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Paper,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    MenuItem,
    CircularProgress,
    Button
} from "@mui/material";

import {
    LocalizationProvider,
    TimePicker
} from "@mui/x-date-pickers";
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LeaveRequest from "./LeaveRequest";


const StaffAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [clockIn, setClockIn] = useState(
        attendance?.clock_in ? dayjs(attendance.clock_in, "HH:mm:ss") : null
    );
    const [clockOut, setClockOut] = useState(
        attendance?.clock_out ? dayjs(attendance.clock_out, "HH:mm:ss") : null
    );

    const onEditClose = () => {
        setEditOpen(false);
        setSelectedAttendance(null);
        setClockIn(null);
        setClockOut(null);
    }


    const MONTHS = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];


    // Default = current month
    const [filters, setFilters] = useState({
        month: dayjs().month() + 1,
        year: dayjs().year(),
        staffId: "",
    });

    // 🔹 Fetch staff list
    const fetchStaff = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_EMPLOYEE_FETCH, {
                withCredentials: true,
            });
            setStaffList(res.data.data);
        } catch (err) {
            console.error("Staff list error:", err);
        }
    };

    // 🔹 Fetch attendance
    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await axios.get(process.env.REACT_APP_STAFFATTENDANCE_FETCH, {
                params: {
                    month: filters.month,
                    year: filters.year,
                    staff_id: filters.staffId || undefined,
                },
                withCredentials: true,
            });

            setAttendance(res.data.data);
        } catch (err) {
            console.error("Attendance fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchStaff();
    }, []);

    // Refetch on filter change
    useEffect(() => {
        fetchAttendance();
    }, [filters]);

    // Edit Attendance
    const handleUpdate = async () => {
        if (!clockIn || !clockOut) {
            alert("Clock in and clock out are required");
            return;
        }

        setLoading(true);
        try {
            await axios.put(
                `${process.env.REACT_APP_STAFFATTENDANCE_UPDATE}/${selectedAttendance.id}`,
                {
                    clock_in: clockIn.format("HH:mm:ss"),
                    clock_out: clockOut.format("HH:mm:ss"),
                },
                { withCredentials: true }
            );
            fetchAttendance();
            onEditClose();
        } catch (err) {
            console.error("Update error", err);
            alert(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };
    //   Edit Attendance

    return (
        <>
            <Paper sx={{ p: 3, mt: 1 }}>
                <Typography variant="h6" mb={2}>
                    Monthly Attendance
                </Typography>

                {/* FILTERS */}
                <Box display="flex" gap={2} mb={3} flexWrap="wrap">
                    {/* Month */}
                    <TextField
                        select
                        label="Month"
                        size="small"
                        value={filters.month}
                        onChange={(e) =>
                            setFilters({ ...filters, month: e.target.value })
                        }
                        sx={{ minWidth: 150 }}
                    >
                        {MONTHS.map((m, i) => (
                            <MenuItem key={i} value={i + 1}>
                                {m}
                            </MenuItem>
                        ))}

                    </TextField>

                    {/* Year */}
                    <TextField
                        label="Year"
                        size="small"
                        type="number"
                        value={filters.year}
                        onChange={(e) =>
                            setFilters({ ...filters, year: e.target.value })
                        }
                        sx={{ width: 120 }}
                    />

                    {/* Staff */}
                    <TextField
                        select
                        label="Staff"
                        size="small"
                        value={filters.staffId}
                        onChange={(e) =>
                            setFilters({ ...filters, staffId: e.target.value })
                        }
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">All Staff</MenuItem>
                        {staffList.map((staff) => (
                            <MenuItem key={staff.id} value={staff.id}>
                                {staff.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                {/* TABLE */}
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : attendance.length === 0 ? (
                    <Typography color="text.secondary">
                        No attendance records found
                    </Typography>
                ) : (
                    <TableContainer
                        sx={{
                            maxHeight: 620,          // 🔥 Fixed height (adjust as needed)
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                        }}
                    >
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    {["Staff Name", "Date", "Check In", "Check Out", "Status", "Actions"].map(
                                        (head) => (
                                            <TableCell
                                                key={head}
                                                align="center"
                                                sx={{
                                                    backgroundColor: "#0F7C82",
                                                    color: "#fff",
                                                    fontWeight: 600,
                                                    height: 36,
                                                }}
                                            >
                                                {head}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {attendance.map((row) => (
                                    <>
                                        {/* <TableRow key={row.id}>
                                            <TableCell>{row.staff_name}</TableCell>
                                            <TableCell>
                                                {dayjs(row.date).format("DD MMM YYYY")}
                                            </TableCell>
                                            <TableCell>{row.clock_in || "-"}</TableCell>
                                            <TableCell>{row.clock_out || "-"}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell><Button variant="contained" onClick={() => {
                                                setSelectedAttendance(row);
                                                setEditOpen(true);
                                            }} sx={{ backgroundColor: "#3f6f7a", textTransform: "none" }} size="small"><EditIcon fontSize="10px" /> Edit</Button></TableCell>
                                        </TableRow> */}
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                "& td": {
                                                    borderBottom: "1px dashed #7FB7BC",
                                                    height: 36,
                                                    textAlign: "center",
                                                },
                                            }}
                                        >
                                            <TableCell>{row.staff_name}</TableCell>

                                            {/* Column shaded */}
                                            <TableCell sx={{ backgroundColor: "#D6E9E8" }}>
                                                {dayjs(row.date).format("DD MMM YYYY")}
                                            </TableCell>

                                            <TableCell>{row.clock_in || "-"}</TableCell>


                                            {/* Column shaded */}
                                            <TableCell sx={{ backgroundColor: "#D6E9E8" }}>
                                                {row.clock_out || "-"}
                                            </TableCell>

                                            <TableCell>
                                                {row.status}
                                            </TableCell>

                                            <TableCell>
                                                <Button variant="contained" onClick={() => {
                                                setSelectedAttendance(row);
                                                setEditOpen(true);
                                            }} sx={{ backgroundColor: "#3f6f7a", textTransform: "none" }} size="small"><EditIcon fontSize="10px" /> Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
            {/* Modal for edition */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Dialog open={editOpen} onClose={onEditClose} fullWidth maxWidth="sm" sx={{ borderRadius: "20px" }}>
                    <DialogTitle>Update Attendance</DialogTitle>

                    <DialogContent>
                        <Box display="flex" gap={2} mt={2}>
                            <TimePicker
                                label="Clock In"
                                value={clockIn}
                                onChange={(v) => setClockIn(v)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />

                            <TimePicker
                                label="Clock Out"
                                value={clockOut}
                                onChange={(v) => setClockOut(v)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                        </Box>

                        <Typography mt={2} color="text.secondary">
                            Total hours & status will be calculated automatically
                        </Typography>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={onEditClose} sx={{ borderColor: "#3f6f7a", color: "#3f6f7a" }}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleUpdate}
                            disabled={loading}
                            sx={{ backgroundColor: "#3f6f7a" }}
                        >
                            {loading ? <CircularProgress size={22} /> : "Update"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
            {/* Modal for edition */}
        </>
    );
};

export default StaffAttendance;
