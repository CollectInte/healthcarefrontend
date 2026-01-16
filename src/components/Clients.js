import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const Clients = () => {
  const [employees, setEmployees] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [singleopen, setSingleopen] = React.useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    status: 1,
    blood_group: "",
    gender: "",
    dob: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleeditOpen = () => setSingleopen(true);
  const handleeditClose = () => setSingleopen(false);

  const formatDate = (date) => (date ? date.split("T")[0] : "");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={() => handleIdClick(params.value)}
        >
          {params.row.id}
        </Button>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile", width: 140 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === 1 ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {params.value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    { field: "address", headerName: "Address", width: 140 },
    {
      field: "actions",
      headerName: "Action",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const filteredRows = employees.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // Adding the Employee
  const submitEmployee = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CLIENT_CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit");
      }
      setFormData("");
      Employeedetails();
      handleClose();
      // console.log("Employee created:", result);
      alert("Client added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  // Adding the Employee

  const Employeedetails = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CLIENT_FETCH, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }

      const data = await response.json();
      // console.log("Employee details:", data);
      setEmployees(data.data);
      return data; // return if needed
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const fetchBusinessTypes = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BUSINESSDETAILS_FETCH,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      setBusinessTypes(result.data || []);
    } catch (error) {
      console.error("Failed to fetch business types", error);
    }
  };

  useEffect(() => {
    Employeedetails();
    fetchBusinessTypes();
  }, []);

  // Deleting the Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/client/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      // 🔴 Remove row from state
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };
  // Deleting the Employee

  // Editing the Employee
  const handleIdClick = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SINGLECLIENT_FETCH}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (!response.ok) {
        alert("some error Occured");
      }
      setSelectedEmployee(result.data);
      handleeditOpen();
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SINGLECLIENT_UPDATE}/${selectedEmployee.id}`,
        {
          method: "PUT", // or POST based on backend
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            mobile: selectedEmployee.mobile,
            address: selectedEmployee.address,
            status: selectedEmployee.status,
            gender: selectedEmployee.gender,
            blood_group: selectedEmployee.blood_group,
            dob: selectedEmployee.dob,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert("Client updated successfully");
      handleeditClose();
      Employeedetails();
    } catch (error) {
      alert(error.message);
    }
  };

  // Editing the Employee

  return (
    <>
      <div className="container-fluid" style={{ marginTop: "10px" }}>
        <div className="row">
          <div className="col-12 text-end">
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ textTransform: "none", background: "linear-gradient(180deg, #3f6f7a, #5f9aa6)" }}
            >
              <AddIcon /> Add Client
            </Button>
          </div>
          <Box
            sx={{
              width: "100%",
              height: { xs: 400, sm: 500, md: 441 }, // responsive height
              overflowX: "auto", // allows horizontal scroll on small screens
              mt: 2,
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: { paginationModel: { pageSize: 6, page: 0 } },
              }}
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#3f6f7a",
                  fontWeight: 600,
                },
              }}
              disableRowSelectionOnClick
            />
            </Box>
            {/* Employee Addition modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  sx={{ textAlign: "center" }}
                  variant="h6"
                  component="h2"
                >
                  Add the Client/Patient
                </Typography>
                {/* CLOSE ICON */}
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#6b7280",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <br />
                <div className="d-flex justify-content-between">
                  <div>
                    <TextField
                      type="text"
                      name="name"
                      variant="standard"
                      value={formData.name}
                      onChange={handleChange}
                      label="Name"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="password"
                      name="password"
                      variant="standard"
                      value={formData.password}
                      onChange={handleChange}
                      label="Password"
                      required
                    />
                    <br />
                    <br />
                    <FormControl variant="standard" fullWidth required>
                      <InputLabel id="business-type-label">
                        Blood Group
                      </InputLabel>

                      <Select
                        labelId="business-type-label"
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>

                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>

                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>

                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>

                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="gender"
                        label="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField
                      type="text"
                      variant="outlined"
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      type="email"
                      variant="standard"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      label="Email"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="number"
                      variant="standard"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      label="Mobile"
                      required
                    />
                    <br />
                    <br />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="status"
                        label="Status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <InputLabel htmlFor="dob">Date of Birth</InputLabel>
                    <TextField
                      type="date"
                      variant="outlined"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    <br />

                  </div>
                </div>
                <div className="col-12 pt-4 text-center">
                  <Button
                    variant="contained"
                    onClick={submitEmployee}
                    sx={{ textTransform: "none", backgroundColor: "#3f6f7a" }}
                  >
                    Add Client
                  </Button>
                </div>
              </Box>
            </Modal>
            {/* Employee Addition modal */}

            {/* Employee editing */}
            <Modal
              open={singleopen}
              onClose={handleeditClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="d-flex justify-content-between">
                  <div>
                    <TextField
                      variant="standard"
                      name="name"
                      label="Name"
                      onChange={handleEditChange}
                      value={selectedEmployee?.name || " "}
                    />
                    <br />
                    <br />
                    <TextField
                      variant="standard"
                      name="email"
                      label="Email"
                      onChange={handleEditChange}
                      value={selectedEmployee?.email || " "}
                    />
                    <br />
                    <br />
                    <TextField
                      variant="standard"
                      name="mobile"
                      label="Mobile"
                      onChange={handleEditChange}
                      value={selectedEmployee?.mobile || " "}
                    />
                    <br />
                    <br />
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        name="status"
                        value={selectedEmployee?.status ?? ""}
                        onChange={handleEditChange}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="gender"
                        label="Gender"
                        value={selectedEmployee?.gender || ""}
                        onChange={handleEditChange}
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      variant="standard"
                      name="address"
                      label="Address"
                      onChange={handleEditChange}
                      value={selectedEmployee?.address || " "}
                      multiline
                      rows={3}
                    />
                    <br />
                    <br />
                    <InputLabel htmlFor="dob">Date of Birth</InputLabel>
                    <TextField
                      type="date"
                      variant="outlined"
                      name="dob"
                      value={selectedEmployee?.dob || ""}
                      onChange={handleEditChange}
                    />
                    <br />
                    <br />
                    <FormControl variant="standard" fullWidth required>
                      <InputLabel id="business-type-label">
                        Blood Group
                      </InputLabel>

                      <Select
                        labelId="business-type-label"
                        name="blood_group"
                        value={selectedEmployee?.blood_group || ""}
                        onChange={handleEditChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>

                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>

                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>

                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>

                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-12 text-end">
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "#3f6f7a",
                      borderColor: "#3f6f7a",
                    }}
                    onClick={handleeditClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    sx={{
                      textTransform: "none",
                      marginLeft: "10px",
                      backgroundColor: "#3f6f7a",
                    }}
                  >
                    Update
                  </Button>
                </div>
              </Box>
            </Modal>
            {/* Employee Editing */}
        </div>
      </div>
    </>
  );
};

export default Clients;
