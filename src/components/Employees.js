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

const Employees = () => {
  const [employees, setEmployees] = useState([]);
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
    qualification: "",
    date_of_joining: "",
    role: "",
    branch: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // profile photo update
  const updateProfilePhoto = async () => {
    if (!photoFile || !selectedEmployee?.id) return;

    const formData = new FormData();
    formData.append("profile_photo", photoFile);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/api/staff/update/${selectedEmployee.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Profile photo updated");
        setPreviewImage(null);
        setSelectedEmployee((prev) => ({
          ...prev,
          profile_photo: data.profile_photo,
        }));
        window.location.reload();
      }
    } catch (err) {
      console.error("Photo update error", err);
    }
  };
  // profile photo update

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
    { field: "role", headerName: "Role", flex: 1 },
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
      const response = await fetch(`${process.env.REACT_APP_URL}/api/staff/create`, {
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
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  // Adding the Employee

  const Employeedetails = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_EMPLOYEE_FETCH, {
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

  useEffect(() => {
    Employeedetails();
  }, []);

  // Deleting the Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_EMPLOYEE_DELETE}/${id}`,
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
        `${process.env.REACT_APP_SINGLEEMPLOYEE_FETCH}/${id}`,
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
        `${process.env.REACT_APP_URL}/api/staff/update/${selectedEmployee.id}`,
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
            date_of_joining: selectedEmployee.date_of_joining,
            role: selectedEmployee.role,
            qualification: selectedEmployee.qualification,
            branch: selectedEmployee.branch,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      alert("Employee updated successfully");
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
          {/* <div className="col-12 text-center">
                        <Typography variant="h5">Employees</Typography>
                    </div> */}
          <div className="col-12 text-end">
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ textTransform: "none", background: "linear-gradient(180deg, #3f6f7a, #5f9aa6)" }}
            >
              <AddIcon /> Add Employee
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
              sx={{ textAlign: "center", color: "#3f6f7a", fontWeight: 600 }}
              variant="h6"
              component="h2"
            >
              Add the Employee
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
                <TextField
                  type="text"
                  variant="standard"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  label="Qualification"
                  required
                />
                <br />
                <br />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="role"
                    label="Role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="receptionist">Receptionist</MenuItem>
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
                <TextField
                  type="text"
                  variant="standard"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  label="Branch"
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
                <TextField
                  type="date"
                  name="date_of_joining"
                  variant="standard"
                  value={formData.date_of_joining}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  label="DateofJoining"
                  required
                />
              </div>
            </div>
            <div className="col-12 pt-2 text-center">
              <Button
                variant="contained"
                onClick={submitEmployee}
                sx={{ textTransform: "none", backgroundColor: "#3f6f7a" }}
              >
                Submit
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
            <div className="col-12 text-start">
              <input
                type="file"
                accept="image/*"
                hidden
                id="profilePhotoInput"
                onChange={handlePhotoChange}
              />

              <img
                src={
                  selectedEmployee?.profile_photo
                    ? `${process.env.REACT_APP_URL}/Images/${selectedEmployee?.profile_photo}`
                    : `${process.env.REACT_APP_URL}/Images/profile.jpg`
                }
                // src={
                //   previewImage ||
                //   (selectedEmployee?.profile_photo
                //     ? `${process.env.REACT_APP_URL}/Images/${selectedEmployee.profile_photo}`
                //     : `${process.env.REACT_APP_URL}/Images/profile.jpg`)
                // }
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px solid #3f6f7a",
                }}
                onClick={() =>
                  document.getElementById("profilePhotoInput").click()
                }
              />
              <br />
              <Button
                variant="contained"
                sx={{ mt: 2, textTransform: "none", backgroundColor: "#3f6f7a" }}
                disabled={!photoFile}
                onClick={updateProfilePhoto}
              >
                Update Photo
              </Button>
            </div>

            <div className="d-flex justify-content-between pt-3">
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
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="status-label">Role</InputLabel>
                  <Select
                    labelId="status-label"
                    name="role"
                    value={selectedEmployee?.role ?? ""}
                    onChange={handleEditChange}
                  >
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="receptionist">Receptionist</MenuItem>
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
                <TextField
                  variant="standard"
                  name="branch"
                  label="Branch"
                  onChange={handleEditChange}
                  value={selectedEmployee?.branch || " "}
                />
                <br />
                <br />
                <TextField
                  variant="standard"
                  name="date_of_joining"
                  label="Date of Joining"
                  onChange={handleEditChange}
                  value={
                    selectedEmployee?.date_of_joining
                      ? selectedEmployee.date_of_joining.split("T")[0]
                      : ""
                  }
                />
                <br />
                <br />
                <TextField
                  variant="standard"
                  name="qualification"
                  label="Qualification"
                  onChange={handleEditChange}
                  value={selectedEmployee?.qualification || " "}
                />
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
    </div >
    </>
  );
};

export default Employees;
