import { useEffect, useState } from "react";
import axios from "axios";

export default function RoleModuleManager() {
  const [selectedRole, setSelectedRole] = useState("doctor");
  const [selectedModules, setSelectedModules] = useState([]);

  const API = process.env.REACT_APP_SITE_URL;

  // 🎯 Role Modules
  const ROLE_MODULES = {
    doctor: ["appointments", "attendance", "documents", "prescriptions"],
    receptionist: ["appointments", "attendance", "documents", "bills", "clients"],
    client: ["documents", "appointments", "bills", "prescriptions"],
  };

  // 📘 Descriptions (ROLE BASED)
  const MODULE_DESCRIPTIONS = {
    receptionist: {
      appointments:
        "Manage patient bookings, update/cancel appointments and handle reviews.",
      attendance:
        "Maintain attendance, manage leave requests and view leave status of doctors",
      documents:
        "Upload and manage patient documents.",
      bills:
        "Create, edit, update bills and generate invoices.",
      clients:
        "Add new patients and can delete patient records",
    },
    doctor: {
      appointments:
        "View appointments, update status, cancel and view reviews.",
      attendance:
        "Maintain the  attendance and manage leave requests.",
      documents:
        "Upload reports, view, download and delete patient files.",
      prescriptions:
        "Create, edit, delete, download and email the prescriptions.",
    },
    client: {
      documents:
        "Upload and view reports shared by doctors.",
      appointments:
        "View own appointments, cancel bookings and give reviews.",
      bills:
        "View and download bills.",
      prescriptions:
        "View and download prescriptions.",
    },
  };

  useEffect(() => {
    fetchRoleModules(selectedRole);
  }, [selectedRole]);

  const fetchRoleModules = async (role) => {
    try {
      const res = await axios.get(`${API}/api/role-modules/${role}`, {
        withCredentials: true,
      });

      setSelectedModules(res?.data?.modules || []);
    } catch (err) {
      console.error(err);
      setSelectedModules([]);
    }
  };

  const handleToggle = async (key) => {
    let updatedModules = selectedModules.includes(key)
      ? selectedModules.filter((m) => m !== key)
      : [...selectedModules, key];

    setSelectedModules(updatedModules);

    try {
      await axios.post(
        `${API}/api/role-modules`,
        {
          role: selectedRole,
          module_keys: updatedModules,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <div style={{ width: "900px" }}>
        <h2 style={{ marginBottom: 20 }}>Role Module Access</h2>

        {/* Dropdown */}
        <div style={{ marginBottom: 25 }}>
          <label>Select Role</label>
          <br />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              marginTop: 8,
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
            <option value="client">Client</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {ROLE_MODULES[selectedRole].map((mod) => (
            <div
              key={mod}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
              }}
            >
              {/* Top Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 style={{ margin: 0, textTransform: "capitalize" }}>
                  {mod}
                </h4>

                {/* Toggle */}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(mod)}
                    onChange={() => handleToggle(mod)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "10px",
                  lineHeight: "1.4",
                }}
              >
                {MODULE_DESCRIPTIONS[selectedRole][mod]}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle CSS */}
        <style>
          {`
          .switch {
            position: relative;
            display: inline-block;
            width: 42px;
            height: 22px;
          }

          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            inset: 0;
            background-color: #ccc;
            transition: 0.3s;
            border-radius: 34px;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
          }

          input:checked + .slider {
            background-color: #3f6f7a;
          }

          input:checked + .slider:before {
            transform: translateX(20px);
          }
        `}
        </style>
      </div>
    </div>
  );
}