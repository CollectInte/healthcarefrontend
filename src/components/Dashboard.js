import { useEffect, useState } from "react";
import StaffServiceAnalytics from "./StaffServiceAnalytics";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Paper,
    Divider,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import ReceiptIcon from "@mui/icons-material/Receipt";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon }) => (
    <Card
        sx={{
            width: "100%",
            height: "100%",
        }}
    >
        <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
                {icon}
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight={600}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export default function Dashboard() {
    const [staffCount, setStaffCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [appointments, setAppointments] = useState([]);
    const [billsCount, setBillsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [staffs, setStaffs] = useState([]);
    const [clients, setClients] = useState([]);
    const [bills, setBills] = useState([]);
    const [attendance, setAttendance] = useState([]);

    const navigate = useNavigate();
    const today = dayjs().format("YYYY-MM-DD");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [
                staffRes,
                clientRes,
                appointmentRes,
                billsRes,
                attendanceRes,
            ] = await Promise.all([
                fetch(process.env.REACT_APP_EMPLOYEE_FETCH, { credentials: "include" }),
                fetch(process.env.REACT_APP_CLIENT_FETCH, { credentials: "include" }),
                fetch(`${process.env.REACT_APP_ADMINAPPOINTMENT_FETCH}?date=${today}`, {
                    credentials: "include",
                }),
                fetch(process.env.REACT_APP_BILL_FETCH, { credentials: "include" }),
                fetch(`${process.env.REACT_APP_ATTENDANCE_DATEFETCH}?date=${today}`,
                    { credentials: "include" }
                )
            ]);

            const staffData = await staffRes.json();
            const clientData = await clientRes.json();
            const appointmentData = await appointmentRes.json();
            const billsData = await billsRes.json();
            const attendanceData = await attendanceRes.json();

            setStaffCount(staffData.count || 0);
            setClientCount(clientData.data?.length || 0);
            setAppointments(appointmentData || []);
            setBillsCount(billsData.length || 0);
            setStaffs(staffData.data || []);
            setClients(clientData.data || []);
            setBills(billsData || []);
            setAttendance(attendanceData.data || []);
        } catch (error) {
            console.error("Dashboard load error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box height="70vh" display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} mt={1}>
            {/* ================= TOP STATS ================= */}
            <Grid container spacing={2} alignItems="stretch">
                <Grid item size={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                    <StatCard
                        title="Total Staff"
                        value={staffCount}
                        icon={<PeopleIcon color="primary" fontSize="large" />}
                    />
                </Grid>
                <Grid item size={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                    <StatCard
                        title="Clients"
                        value={clientCount}
                        icon={<PersonIcon color="secondary" fontSize="large" />}
                    />
                </Grid>
                <Grid item size={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                    <StatCard
                        title="Today's Appointments"
                        value={appointments.length}
                        icon={<EventIcon sx={{ color: "#673AB7" }} fontSize="large" />}
                    />
                </Grid>
                <Grid item size={3} sm={6} md={3} lg={3} xl={3} xxl={3}>
                    <StatCard
                        title="Bills"
                        value={billsCount}
                        icon={<ReceiptIcon color="success" fontSize="large" />}
                    />
                </Grid>
            </Grid>

            {/* ================= TODAY'S APPOINTMENTS ================= */}
            <Grid container spacing={2} mt={1}>
                <Grid item size={6} md={6}>
                    <Paper sx={{ mt: 3, p: 2 }}>
                        <Typography variant="h6" mb={1} sx={{ color: "#673AB7" }}>
                            Today’s Appointments
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {appointments.length === 0 ? (
                            <Typography color="text.secondary">
                                No appointments for today
                            </Typography>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#1976d2" }}>Time</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {appointments.slice(0, 5).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.from_time} - {row.to_time}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        <Button size="small" sx={{ mt: 2 }} onClick={() =>
                            navigate("/AdminDashboard", {
                                state: { content: "Appointments" }
                            })
                        }>
                            View All Appointments
                        </Button>
                    </Paper>
                </Grid>
                <Grid item size={6} md={6}>
                    <Paper sx={{ p: 2, mt: 3 }}>
                        <Typography variant="h6" mb={1} sx={{ color: "#673AB7" }}>
                            Today’s Attendance
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {loading ? (
                            <Box textAlign="center" py={3}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : attendance.length === 0 ? (
                            <Typography color="text.secondary">
                                No attendance marked today
                            </Typography>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#1976d2" }}>Staff ID</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Clock In</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Clock Out</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {attendance.slice(0, 5).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.staff_id}</TableCell>
                                            <TableCell>{row.clock_in || "-"}</TableCell>
                                            <TableCell>{row.clock_out || "-"}</TableCell>
                                            <TableCell>{row.status || "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        <Button
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={() =>
                                navigate("/AdminDashboard", {
                                    state: { content: "Attendance" }
                                })}
                        >
                            View All Attendance
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            {/* Staff Service Analytics */}
            <StaffServiceAnalytics />
            {/* Staff Service Analytics */}
            {/* ================= STAFF + CLIENTS ================= */}
            <Grid container spacing={2} mt={1}>
                <Grid item size={6} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" mb={1} sx={{ color: "#673AB7" }}>
                            Staff Overview
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* <Typography color="text.secondary" mb={1}>
                            Total Staff: {staffCount}
                        </Typography> */}

                        {staffs.length === 0 ? (
                            <Typography color="text.secondary">
                                No staff found
                            </Typography>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#1976d2" }}>Name</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Email</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {staffs.slice(0, 4).map((staff) => (
                                        <TableRow key={staff.id}>
                                            <TableCell>{staff.name}</TableCell>
                                            <TableCell>{staff.email}</TableCell>
                                            <TableCell sx={{ color: staff.status ? "#216c24ff" : "#f44336" }}>
                                                {staff.status ? "Active" : "Inactive"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {staffs.length > 0 && (
                            <Button size="small" sx={{ mt: 2 }}
                                onClick={() =>
                                    navigate("/AdminDashboard", {
                                        state: { content: "Employees" }
                                    })}>
                                View All Staff
                            </Button>
                        )}
                    </Paper>
                </Grid>


                <Grid item size={6} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" mb={1} sx={{ color: "#673AB7" }}>
                            Clients Snapshot
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* <Typography color="text.secondary" mb={1}>
                            Total Clients: {clientCount}
                        </Typography> */}

                        {clients.length === 0 ? (
                            <Typography color="text.secondary">
                                No clients found
                            </Typography>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#1976d2" }}>Name</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Email</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Phone</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {clients.slice(0, 4).map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>{client.name}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                            <TableCell>{client.mobile || "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {clients.length > 0 && (
                            <Button size="small" sx={{ mt: 2 }}
                                onClick={() =>
                                    navigate("/AdminDashboard", {
                                        state: { content: "Clients" }
                                    })}>
                                View All Clients
                            </Button>
                        )}
                    </Paper>
                </Grid>

            </Grid>

            {/* ================= BILLING + NOTIFICATIONS ================= */}
            <Grid container spacing={2} mt={1}>
                <Grid item size={6} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" mb={1}>
                            Billing Summary
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* <Typography color="text.secondary" mb={1}>
                            Total Bills: {billsCount}
                        </Typography> */}

                        {bills.length === 0 ? (
                            <Typography color="text.secondary">
                                No bills found
                            </Typography>
                        ) : (
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: "#1976d2" }}>Bill #</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Due Date</TableCell>
                                        <TableCell sx={{ color: "#1976d2" }}>Status</TableCell>
                                        <TableCell align="right" sx={{ color: "#1976d2" }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {bills.slice(0, 4).map((bill) => (
                                        <TableRow key={bill.id}>
                                            <TableCell>#{bill.id}</TableCell>
                                            <TableCell>
                                                {dayjs(bill.due_date).format("DD MMM YYYY")}
                                            </TableCell>
                                            <TableCell sx={{ color: bill.bill_status === "Paid" ? "#216c24ff" : "#f44336" }}>
                                                {bill.bill_status}
                                            </TableCell>
                                            <TableCell align="right">
                                                ₹{bill.total_amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {bills.length > 0 && (
                            <Button size="small" sx={{ mt: 2 }}
                                onClick={() =>
                                    navigate("/AdminDashboard", {
                                        state: { content: "Bills" }
                                    })}>
                                View All Bills
                            </Button>
                        )}
                    </Paper>
                </Grid>

                <Grid item size={6} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" mb={1} sx={{ color: "#673AB7" }}>
                            Notifications
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography color="text.secondary">
                            Send notifications to staff or clients
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={() =>
                            navigate("/AdminDashboard", {
                                state: { content: "Notifications" }
                            })}>
                            Send Notification
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
