import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  useMediaQuery,
  Chip,
  Stack,
  IconButton,
  colors,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { COLORS } from "../Themes";
import AddBillModal from "../AddBillModal";
import AddClientModal from "./AddClientModal";

const Clients = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const [openAddClient, setOpenAddClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [search, setSearch] = useState("");

  // ---------------- FETCH ----------------
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/client/get`,
        {
          withCredentials: true,
        }
      );

      const list = Array.isArray(res.data?.data) ? res.data.data : [];

      setClients(list);
      setFilteredClients(list);
    } catch (err) {
      console.error("Fetch clients error:", err);
      setClients([]);
      setFilteredClients([]);
    }
  };

  // ---------------- SEARCH (SAME AS BILLS) ----------------
  useEffect(() => {
    let data = [...clients];

    if (search) {
      const text = search.toLowerCase();

      data = data.filter((c) =>
        [c.client_id, c.name, c.email, c.address, c.mobile]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(text))
      );
    }

    setFilteredClients(data);
    setPage(1);
  }, [search, clients]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);

  const paginatedClients = filteredClients.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // ---------------- STATUS COLOR ----------------

  const getStatusLabel = (status) => {
    if (status === 1 || status === "1") return "Active";
    return "Inactive";
  };

  const statusColor = (status) => {
    if (status === 1 || status === "1") return COLORS.success;
    return COLORS.textGray;
  };

  const handleReset = () => {
    setSearch("");
    setFilteredClients(clients);
    setPage(1);
  };

  return (
    <Box px={2}>
      <Box display="flex" justifyContent="flex-end" px={2}>
        <Button
          sx={{
            bgcolor: COLORS.primary,
            color: "#fff",
            mb: { xs: 1, md: "none" },
            borderRadius: 2,
            borderTopRightRadius: 60,

            height: { xs: "30px", md: "40px" },
            width: { xs: "120px", md: "239px" },
            fontSize: { xs: "10px", md: "16px" },
            textTransform: "capitalize",
          }}
          onClick={() => setOpenAddClient(true)}
        >
          Add Clients
        </Button>
      </Box>

      {/* ================= SEARCH ================= */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
          my: 2,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          label="Search clients (Name, Email, Mobile, ID...)"
          placeholder="Search anything..."
          value={search}
          sx={{ width: { xs: "100%", md: "30%" } }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          sx={{
            height: 40,
            fontSize: "12px",
            textTransform: "capitalize",
            bgcolor: COLORS.primary,
            color: "#fff",
            "&:hover": { bgcolor: COLORS.primary },
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>

      {/* ================= DESKTOP TABLE ================= */}
      {!isMobile && (
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: COLORS.activeBg,
            borderRadius: 3,
            maxHeight: 420,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: COLORS.primary,
              borderRadius: 10,
            },
          }}
        >
          <Table
            stickyHeader
            sx={{
              background: `linear-gradient(180deg, ${COLORS.activeBg} 0%,${COLORS.texWhite} 100%)`,
            }}
          >
            <TableHead>
              <TableRow sx={{ bgcolor: COLORS.primary }}>
                {[
                  "Patient ID",
                  "Patient Name",
                  "Patient Email",
                  "Address",
                  "Mobile No",
                  "Status",
                  // "Action",
                ].map((h) => (
                  <TableCell
                    align="center"
                    sx={{
                      color: COLORS.primary,
                      fontWeight: 600,
                      bgcolor: COLORS.activeBg,
                      border: `1px dashed ${COLORS.softBg}`,
                    }}
                  >
                    <Box
                      key={h}
                      align="center"
                      sx={{
                        bgcolor: COLORS.activeBg,
                        color: COLORS.primary,
                        fontWeight: 600,
                        border: `solid 2px ${COLORS.primary}`,
                        borderRadius: 40,
                      }}
                    >
                      {h}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* -------------------- Pagination ---------------------- */}
              {paginatedClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No clients found
                  </TableCell>
                </TableRow>
              )}

              {/* -------------------- Client Data ---------------------- */}
              {paginatedClients.map((c) => (
                <TableRow
                  key={c.client_id}
                  sx={{
                    "& td": {
                      border: `1px dashed ${COLORS.softBg}`,
                      fontSize: 13,
                    },
                  }}
                >
                  <TableCell align="center">{c.id}</TableCell>
                  <TableCell align="center">{c.name}</TableCell>
                  <TableCell align="center">{c.email}</TableCell>
                  <TableCell align="center" sx={{ maxWidth: 180 }}>
                    {c.address}
                  </TableCell>
                  <TableCell align="center">{c.mobile}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getStatusLabel(c.status)}
                      size="small"
                      sx={{
                        bgcolor: statusColor(c.status),
                        color: "#fff",
                      }}
                    />
                  </TableCell>
                  {/* <TableCell align="center">
                    <IconButton size="small">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ================= MOBILE CARDS ================= */}
      {/* ================= MOBILE CARDS ================= */}
      {isMobile && (
        <Box
          sx={{
            maxHeight: "65vh", // adjust as needed
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: COLORS.primary,
              borderRadius: 10,
            },
          }}
        >
          {paginatedClients.length === 0 && (
            <Paper sx={{ p: 2, textAlign: "center" }}>No clients found</Paper>
          )}

          {paginatedClients.map((c, i) => (
            <Paper
              key={c.client_id}
              sx={{
                p: 2,
                mb: 1.5,
                borderRadius: 2,
                backgroundColor:
                  i % 2 === 0 ? COLORS.activeBg : COLORS.texWhite,
              }}
            >
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={600}>Name : {c.name}</Typography>
                  <Chip
                    label={`Status: ${getStatusLabel(c.status)}`}
                    size="small"
                    sx={{
                      bgcolor: statusColor(c.status),
                      color: "#fff",
                    }}
                  />
                </Box>

                <Typography>ID : {c.id}</Typography>
                <Typography>Email : {c.email}</Typography>
                <Typography>Mobile : {c.mobile}</Typography>
                <Typography>Address : {c.address}</Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
      )}

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
      )}

      <AddClientModal
        open={openAddClient}
        onClose={() => setOpenAddClient(false)}
        onSuccess={fetchClients} // 🔁 refresh list
      />
    </Box>
  );
};

export default Clients;
