import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Modal from '@mui/material/Modal';
import axios from "axios";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '0px solid ',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const LeaveRequest = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [staffList, setStaffList] = useState([]);


    const [filters, setFilters] = useState({
        staff_name: "",
        status: "",
        leave_type: "",
        start_date: null,
        end_date: null,
    });
    const [updatingId, setUpdatingId] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleReset = () => {
        setFilters({
            staff_name: "",
            status: "",
            leave_type: "",
            start_date: null,
            end_date: null,
        });
    };

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

    // Initial load
    useEffect(() => {
        fetchStaff();
    }, []);


    const fetchLeaves = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_STAFFLEAVEREQUEST_FETCH, {
                withCredentials: true,
            });

            setData(res.data.data);
            setFilteredData(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    useEffect(() => {
        let temp = [...data];

        if (filters.staff_name) {
            temp = temp.filter((item) =>
                item.staff_name
                    ?.toLowerCase()
                    .includes(filters.staff_name.toLowerCase())
            );
        }

        if (filters.status) {
            temp = temp.filter((item) => item.status === filters.status);
        }

        if (filters.leave_type) {
            temp = temp.filter((item) => item.leave_type === filters.leave_type);
        }

        if (filters.start_date) {
            temp = temp.filter((item) =>
                dayjs(item.start_date).isAfter(filters.start_date.subtract(1, "day"))
            );
        }

        if (filters.end_date) {
            temp = temp.filter((item) =>
                dayjs(item.end_date).isBefore(filters.end_date.add(1, "day"))
            );
        }

        setFilteredData(temp);
    }, [filters, data]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            setUpdatingId(id);

            // 🔥 Call ADMIN leave update API
            const res = await axios.put(
                `${process.env.REACT_APP_STAFFLEAVEREQUEST_UPDATE}/${id}`,
                {
                    status: newStatus, // must be "Approved" or "Rejected"
                },
                {
                    withCredentials: true,
                }
            );

            if (!res.data.success) {
                throw new Error(res.data.message || "Update failed");
            }

            // ✅ Optimistic UI update
            setFilteredData((prev) =>
                prev.map((row) =>
                    row.id === id ? { ...row, status: newStatus } : row
                )
            );

            setData((prev) =>
                prev.map((row) =>
                    row.id === id ? { ...row, status: newStatus } : row
                )
            );
        } catch (error) {
            console.error("Status update failed", error);

            alert(
                error?.response?.data?.message ||
                "Failed to update leave status"
            );
        } finally {
            setUpdatingId(null);
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 pt-3 text-end">
                        <Box >

                            {/* Filters */}
                            <Paper sx={{ p: 2, mb: 3 }}>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                    {/* Staff */}
                                    <TextField
                                        select
                                        label="Staff"
                                        size="small"
                                        value={filters.staff_name}
                                        onChange={(e) =>
                                            setFilters({ ...filters, staff_name: e.target.value })
                                        }
                                        sx={{ minWidth: 200 }}
                                    >
                                        <MenuItem value="">All Staff</MenuItem>
                                        {staffList.map((staff) => (
                                            <MenuItem key={staff.id} value={staff.name}>
                                                {staff.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        select
                                        label="Status"
                                        size="small"
                                        value={filters.status}
                                        onChange={(e) =>
                                            setFilters({ ...filters, status: e.target.value })
                                        }
                                        sx={{ width: 180 }}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Approved">Approved</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </TextField>

                                    <TextField
                                        select
                                        label="Leave Type"
                                        size="small"
                                        value={filters.leave_type}
                                        onChange={(e) =>
                                            setFilters({ ...filters, leave_type: e.target.value })
                                        }
                                        sx={{ width: 180 }}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="Casual">Casual</MenuItem>
                                        <MenuItem value="Sick">Sick</MenuItem>
                                        <MenuItem value="Paid">Paid</MenuItem>
                                    </TextField>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="From Date"
                                            value={filters.start_date}
                                            onChange={(newValue) =>
                                                setFilters({ ...filters, start_date: newValue })
                                            }
                                            slotProps={{
                                                textField: {
                                                    size: "small",   // ✅ THIS is required
                                                },
                                            }}
                                        />

                                        <DatePicker
                                            label="To Date"
                                            value={filters.end_date}
                                            onChange={(newValue) =>
                                                setFilters({ ...filters, end_date: newValue })
                                            }
                                            slotProps={{
                                                textField: {
                                                    size: "small",   // ✅ THIS is required
                                                },
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <Stack mt={2} direction="row" spacing={2} justifyContent="flex-end">
                                    <Button variant="outlined" size="small" sx={{ backgroundColor: "#3f6f7a", color: "white", textTransform: "none" }} onClick={handleReset}>
                                        <RestoreIcon /> Reset
                                    </Button>
                                </Stack>
                            </Paper>

                            {/* Table */}
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
                                            {["Staff", "Leave Type", "From", "To", "Status", "Reason"].map(
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
                                        {filteredData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No records found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredData.map((row) => (
                                                <>

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
                                                            {row.leave_type}
                                                        </TableCell>

                                                        <TableCell>{dayjs(row.start_date).format("DD MMM YYYY")}</TableCell>


                                                        {/* Column shaded */}
                                                        <TableCell sx={{ backgroundColor: "#D6E9E8" }}>
                                                            {dayjs(row.end_date).format("DD MMM YYYY")}
                                                        </TableCell>

                                                        <TableCell>
                                                            <TextField
                                                                select
                                                                size="small"
                                                                value={row.status}
                                                                disabled={updatingId === row.id}
                                                                onChange={(e) => handleStatusChange(row.id, e.target.value)}
                                                                sx={{
                                                                    minWidth: 120,
                                                                    "& .MuiSelect-select": {
                                                                        color:
                                                                            row.status === "Approved"
                                                                                ? "green"
                                                                                : row.status === "Rejected"
                                                                                    ? "red"
                                                                                    : "orange",
                                                                        fontWeight: 100,
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem value="Pending">Pending</MenuItem>
                                                                <MenuItem value="Approved">Approved</MenuItem>
                                                                <MenuItem value="Rejected">Rejected</MenuItem>
                                                            </TextField>
                                                        </TableCell>
                                                        <TableCell sx={{ backgroundColor: "#D6E9E8" }}>
                                                            {row.reason}
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LeaveRequest;