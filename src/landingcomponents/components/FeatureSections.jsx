import React from "react";
import "./FeatureSections.css";

const MockScheduler = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-title">📅 Dashboard / Appointment</span>
    </div>

    <div className="appointment-layout">
      {/* Right Side - Static Calendar Card */}
      <div className="appointment-popup">
        <div className="popup-left">
          <h4>Select Date</h4>
          <div className="calendar-box">
            <div className="month">June</div>
            <div className="days-grid">
              {[...Array(30)].map((_, i) => (
                <div key={i} className={`day ${i === 18 ? "active-day" : ""}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="popup-right">
          <h4>Appointment Details</h4>
          <div className="form-field" />
          <div className="form-field" />
          <div className="form-field large" />
          <div className="submit-btn">Submit</div>
        </div>
      </div>
    </div>
  </div>
);

const MockDocuments = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-title">📂 Dashboard / Documents</span>
    </div>

    <div className="documents-layout">
      {/* LEFT SIDE - 2x2 GRID */}
      <div className="documents-left-grid">
        {[
          { title: "Prescription", date: "Dec 18, 2025" },
          { title: "Lab Report", date: "Dec 15, 2025" },
          { title: "X-Ray Report", date: "Dec 12, 2025" },
          { title: "Invoice Copy", date: "Dec 10, 2025" },
        ].map((doc, i) => (
          <div className="doc-card" key={i}>
            <div className="doc-icon">📁</div>
            <div className="doc-title">{doc.title}</div>
            <div className="doc-date">{doc.date}</div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - Upload */}
      <div className="documents-right">
        <div className="upload-box">
          <div className="upload-icon">📂</div>
          <p>Drop your documents or</p>
          <span className="browse-link">Click to browse</span>
        </div>

        <div className="file-input-mock">
          <div className="file-line"></div>
          <div className="file-label">File Name</div>
        </div>

        <div className="upload-btn">Upload File</div>
      </div>
    </div>
  </div>
);


const MockDigitalPrescription = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-title">💊 Dashboard / Digital Prescriptions</span>
    </div>

    <div className="prescription-layout">
      
      {/* LEFT SIDE */}
      <div className="prescription-left">

        {/* Summary */}
        <div className="prescription-summary">
          <div className="rx-card">
            <div className="rx-count">24</div>
            <div className="rx-label">Total Prescriptions</div>
          </div>

          <div className="rx-card">
            <div className="rx-count">06</div>
            <div className="rx-label">Pending Review</div>
          </div>
        </div>

        {/* Table */}
        <div className="rx-table">
          <div className="rx-head">
            <span>Patient</span>
            <span>Medication</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {[
            { name: "Rahul", med: "Aspirin", date: "18/12/25", status: "Issued" },
            { name: "Arjun", med: "Celecoxib", date: "17/12/25", status: "Pending" },
            { name: "Ajay", med: "Zenox", date: "30/11/25", status: "Issued" },
            { name: "Rupa", med: "Ibuprofen", date: "16/12/25", status: "Issued" },
          ].map((rx, i) => (
            <div className="rx-row" key={i}>
              <span>{rx.name}</span>
              <span>{rx.med}</span>
              <span>{rx.date}</span>
              <span className={`rx-badge ${rx.status.toLowerCase()}`}>
                {rx.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - Create Prescription */}
      <div className="prescription-right">
        <div className="form-title">Create Prescription</div>

        <div className="rx-input" />
        <div className="rx-input" />
        <div className="rx-input large" />
        <div className="rx-input" />

        <div className="rx-submit">Generate Prescription</div>
      </div>
    </div>
  </div>
);

// const MockDigitalPrescription = () => (
//   <div className="prescription-print">

//     {/* Header */}
//     <div className="print-header">
//       <div className="clinic-logo">🏥</div>
//       <div className="clinic-info">
//         <h2>Hospital</h2>
//         <p>Branch: Hyderabad</p>
//       </div>
//       <div className="clinic-contact">
//         <p>📞 9000889999</p>
//         <p>✉ demo@mail.com</p>
//         <p>demo</p>
//       </div>
//     </div>

//     {/* Patient Info */}
//     <div className="patient-info">
//       <div>
//         <span className="info-label">PATIENT</span>
//         <p><strong>BSR</strong></p>
//         <p>ID: 316882331</p>
//       </div>
//       <div>
//         <span className="info-label">DOCTOR</span>
//         <p><strong>Dr. Roopa Sirigade</strong></p>
//         <p>(Gynecologist)</p>
//         <p>MBBS, FRCS</p>
//       </div>
//       <div>
//         <span className="info-label">DATE</span>
//         <p><strong>20 February 2026</strong></p>
//       </div>
//     </div>

//     {/* Medicines */}
//     <div className="section">
//       <h3>MEDICINES</h3>
//       <table className="print-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Medicine</th>
//             <th>Type</th>
//             <th>Strength</th>
//             <th>When</th>
//             <th>Duration</th>
//             <th>Notes</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Paracetamol</td>
//             <td>Tablet</td>
//             <td>500mg</td>
//             <td>Morning/Night</td>
//             <td>3 Days</td>
//             <td>For fever</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Azithromycin</td>
//             <td>Tablet</td>
//             <td>250mg</td>
//             <td>Morning</td>
//             <td>3 Days</td>
//             <td>Antibiotic course</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//     {/* Tests */}
//     <div className="section">
//       <h3>TESTS</h3>
//       <table className="print-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Test</th>
//             <th>Type</th>
//             <th>Notes</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>CT Scan</td>
//             <td>Scan</td>
//             <td>Follow instructions</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Urine Test</td>
//             <td>Lab Test</td>
//             <td>Detect infection</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>

//   </div>
// );

const MockBilling = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-title">💰 Billing & Claims</span>
    </div>
    <div className="billing-rows">
      {[
        {
          id: "BI - 1245",
          appid: "AppID - 1711",
          sub: "10,000",
          tax: "10%",
          total: "Amout - 11,000",
          date: "18/12/25",
          status: "Completed",
        },
        {
          id: "BI - 1246",
          appid: "AppID - 1542",
          sub: "8,500",
          tax: "10%",
          total: "Amout - 9,350",
          date: "19/12/25",
          status: "Completed",
        },
        {
          id: "BI - 1247",
          appid: "AppID - 2129",
          sub: "12,000",
          tax: "10%",
          total: "Amout - 13,200",
          date: "20/12/25",
          status: "Pending",
        },
        {
          id: "BI - 1248",
          appid: "AppID- 1365",
          sub: "6,000",
          tax: "10%",
          total: "Amout - 6,600",
          date: "21/12/25",
          status: "Completed",
        },
        {
          id: "BI - 1256",
          appid: "AppID - 1252",
          sub: "16,000",
          tax: "10%",
          total: "Amout - 17,600",
          date: "24/12/25",
          status: "Completed",
        },
        {
          id: "BI - 1295",
          appid: "AppID - 2119",
          sub: "21,000",
          tax: "10%",
          total: "Amout - 23,200",
          date: "31/12/25",
          status: "Pending",
        },
      ].map((r, i) => (
        <div className="billing-row" key={i}>
          <span className="bill-id">{r.id}</span>
          <span className="bill-id">{r.appid}</span>
          <span className="bill-amount">{r.total}</span>
          <span>{r.date}</span>
          <span className={`status-badge status-${r.status.toLowerCase()}`}>
            {r.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);


const MockAttendance = () => (
  <div className="mock-ui">
    <div className="mock-header">
      <span className="mock-title">📊 Dashboard / Attendance</span>
    </div>

    <div className="attendance-wrapper">
      {/* Date Badge */}
      <div className="attendance-date">Mon, 16 January 2026</div>

      {/* Summary Cards */}
      <div className="attendance-summary">
        <div className="summary-card">
          <div className="summary-circle"></div>
          <div>
            <div className="summary-label">Present</div>
            <div className="summary-value">08</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-circle absent"></div>
          <div>
            <div className="summary-label">Absent</div>
            <div className="summary-value">05</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="attendance-table">
        <div className="attendance-head">
          <span>Doctor Name</span>
          <span>Attendance</span>
          <span>Check In</span>
          <span>Check Out</span>
        </div>

        {[
          {
            name: "John Wick",
            status: "Present",
            in: "09:00 AM",
            out: "05:00 PM",
          },
          {
            name: "Sarah Lee",
            status: "Absent",
            in: "10:00 AM",
            out: "06:00 PM",
          },
          {
            name: "Mike Ross",
            status: "Present",
            in: "09:15 AM",
            out: "05:10 PM",
          },
          {
            name: "Anna Kim",
            status: "Present",
            in: "08:55 AM",
            out: "05:00 PM",
          },
        ].map((row, i) => (
          <div className="attendance-row" key={i}>
            <span>{row.name}</span>
            <span className={`att-badge ${row.status.toLowerCase()}`}>
              {row.status}
            </span>
            <span>{row.in}</span>
            <span>{row.out}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
const sections = [
  {
    id: "Patient Appointment Scheduling",
    tag: "Patient Appointment Scheduling",
    title: "Convenient appointment management for patients and providers.",
    bullets: [
      "Patients can book appointments easily",
      "Real-time availability tracking",
      "Reduced waiting time",
    ],
    Visual: MockScheduler,
    tagline: "Better scheduling means better patient experience.",

    reverse: true,
  },
  {
    id: "Digital Document Management System",
    tag: "Digital Document Management System",
    title: "Keep all medical and operational documents in one secure location.",
    bullets: [
      " Patient reports and medical history",
      "Lab results and diagnostic files",
      "Prescriptions and treatment records",
      "Administrative documents",
    ],
    Visual: MockDocuments,
    tagline: "Everything is organized and accessible when you need it.",

    reverse: false,
  },
  {
    id: "Digital Prescriptions",
    tag: "Digital Prescriptions",
    title: "Create and manage prescriptions efficiently.",
    bullets: [
      "Generate electronic prescriptions",
      "Access medication history",
      "Reduce manual errors",
      "Easy sharing with patients",
      "Faster consultation workflow",
    ],
    Visual: MockDigitalPrescription,
    tagline: "Simple, accurate, and paperless prescribing.",
    reverse: true,
  },
  {
    id: "Smart Billing System",
    tag: "Smart Billing System",
    title: "Simplify financial management with automated billing.",
    bullets: [
      " Generate patient invoices instantly",
      "Track payments",
      "Billing history and reports",
      "Transparent transaction records",
      "Efficient financial tracking",
    ],
    Visual: MockBilling,

    tagline: "Improve accuracy and save administrative time.",
    reverse: false,
  },
  {
    id: "Simplify Workforce Management",
    tag: "Staff Attendance Tracking",
    title:
      "Track staff attendance, and working hours in real time from one centralized dashboard.",
    bullets: [
      "Real-time staff attendance monitoring",
      "Check-in and check-out tracking",
      "Shift and schedule management",
      "Leave and absence tracking",
      "Automated attendance records",
    ],
    Visual: MockAttendance,
    reverse: true,
  },
];

const FeatureSections = () => (
  <div id="features">
    {sections.map((sec) => {
      const Visual = sec.Visual;
      return (
        <section
          className={`feature-section ${sec.reverse ? "reverse" : ""}`}
          key={sec.id}
          id={sec.id}
        >
          <div className="container feature-inner">
            <div className="feature-content">
              <div className="section-label">{sec.tag}</div>
              <h2 className="section-title">{sec.title}</h2>
              <ul className="feature-bullets">
                {sec.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="bullet-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-visual">
              <Visual />
            </div>
          </div>
        </section>
      );
    })}
  </div>
);

export default FeatureSections;
