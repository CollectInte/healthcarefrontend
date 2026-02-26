import React, { useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [tab, setTab] = useState("past");

  const appointments = [
    {
      date: "30 Jan 2026",
      time: "01:00 - 2:00",
      purpose: "Neck Pain",
      doctor: "Barghavi",
      // specialty: "Neurologist",
      status: "Completed",
    },
    // {
    //   date: "26 Jan 2026",
    //   time: "12:00 - 13:00",
    //   purpose: "hello",
    //   doctor: "Pooja",
    //   specialty: "Neurologist",
    //   status: "Completed",
    // },
    // { date: "26 Jan 2026", time: "13:00 - 14:00", purpose: "w",                      doctor: "Pooja",    specialty: "Neurologist",   status: "cancelled" },
  ];

  <div className="dash-sidebar">
    <div className="dash-nav-item active">📊 Dashboard</div>
    <div className="dash-nav-item">👤 Patients</div>
    <div className="dash-nav-item">📅 Appointments</div>
    <div className="dash-nav-item">💊 Prescriptions</div>
    <div className="dash-nav-item">💰 Billing</div>
    <div className="dash-nav-item">📋 Reports</div>
  </div>;

  return (
    <section className="hero" id="services">
      <div className="container hero-inner">
        {/* ── LEFT CONTENT ── */}
        <div className="hero-content">
          {/* <div className="hero-badge">⭐ #1 Rated EHR Development Company</div> */}
          <h1 className="hero-title">
            <span style={{ color: "#1a6fce" }}> CareDesk360</span> - Smart
            Healthcare Management Made Simple
          </h1>
          <p className="hero-subtitle">
            All-in-one digital platform for hospitals, clinics, and healthcare
            providers to manage patients, appointments, prescriptions, and
            billing — seamlessly.
          </p>
          <div className="hero-ratings">
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span>Centralized patient management</span>
            </div>
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span> Easy appointment scheduling</span>
            </div>
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span> Digital prescriptions & reports</span>
            </div>
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span> Smart billing & administration</span>
            </div>
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span> Branding & Marketing</span>
            </div>
            <div className="rating-badge">
              <span className="stars">✔</span>
              <span> Content Creation</span>
            </div>
          </div>
          <p className="strip-title">
            Take full control of your healthcare operations — anytime, anywhere.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              👉 Get a Free Demo
            </a>
          </div>
        </div>

        {/* ── RIGHT: EXACT DASHBOARD AS IN IMAGE ── */}
        <div className="hero-visual">
          <div className="browser-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <div className="url-bar">
              https://caredesk360.com/patient/dashboard
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "'Segoe UI', sans-serif",
              background: "#f0f4f8",
            }}
          >
            {/* Sidebar */}
            <div
              style={{
                width: 150,
                background: "linear-gradient(160deg, #1a6fce 0%, #165aa7 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 0 0",
                color: "#fff",
                flexShrink: 0,
                borderBottomRightRadius: 0,
              }}
            >
              {/* Logo */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "10px 14px 8px",
                  marginBottom: 22,
                  width: 140,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 26, color: "#1a6fce", lineHeight: 1 }}>
                  ✚
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 10,
                    color: "#1a6fce",
                    letterSpacing: 2,
                    marginTop: 2,
                  }}
                >
                  HEALTHCARE
                </div>
              </div>

              {/* Avatar */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 8,
                  border: "2px solid rgba(255,255,255,0.35)",
                }}
              >
                PN
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Patient Name</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 24 }}>
                19/02/2026 | 17:02:39
              </div>

              {/* Nav */}
              {[
                { icon: "📊", label: "Dashboard", active: true },
                { icon: "📄", label: "Document Upload" },
                { icon: "📅", label: "Appointment" },
                { icon: "⭐", label: "Reviews" },
                { icon: "💰", label: "Bills" },
                { icon: "🚪", label: "Logout" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    width: "100%",
                    padding: "8px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: item.active
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    cursor: "pointer",
                    fontSize: 11,
                    borderLeft: item.active
                      ? "3px solid #7dd8e0"
                      : "3px solid transparent",
                    color: item.active ? "#fff" : "rgba(255,255,255,0.7)",
                    fontWeight: item.active ? 600 : 400,
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Main */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              {/* Topbar */}
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #1a6fce  0%, #165aa7 100%)",
                  color: "#fff",
                  padding: "15px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  Hospital HealthCare
                </span>
                <div style={{ position: "relative", cursor: "pointer" }}>
                  <span style={{ fontSize: 20 }}>🔔</span>
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -8,
                      background: "#e53935",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      borderRadius: 10,
                      padding: "1px 5px",
                      lineHeight: 1.5,
                    }}
                  >
                    16
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "16px", flex: 1 }}>
                {/* Welcome Banner */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #cdd2ec 0%, #b5c1e0 100%)",
                    borderRadius: 14,
                    padding: "22px 28px",
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#1a6fce",
                        marginBottom: 4,
                      }}
                    >
                      Thursday, 19 February 2026
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#1a2e32",
                      }}
                    >
                      Good Afternoon{" "}
                      <span style={{ color: "#1a6fce" }}>Patient Jack</span>
                    </div>
                  </div>
                  <div style={{ userSelect: "none" }}>
                    <lord-icon
                      src="/animations/hero.json" // put your json file inside public folder
                      trigger="loop"
                      delay="2000"
                      colors="primary:#1a6fce"
                      style={{ width: "90px", height: "90px" }}
                    ></lord-icon>
                  </div>
                </div>

                {/* Bottom row */}
                <div style={{ display: "flex", gap: 14 }}>
                  {/* Appointments card */}
                  <div
                    style={{
                      flex: 1,
                      background: "#fff",
                      borderRadius: 14,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      overflow: "hidden",
                      minWidth: 0,
                    }}
                  >
                    {/* Tabs */}
                    <div
                      style={{
                        display: "flex",
                        borderBottom: "2px solid #eef0f3",
                      }}
                    >
                      {["upcoming", "past"].map((t) => (
                        <div
                          key={t}
                          onClick={() => setTab(t)}
                          style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "13px 8px",
                            cursor: "pointer",
                            textTransform: "uppercase",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: 0.8,
                            color: tab === t ? "#1a2e32" : "#9aa5b4",
                            borderBottom:
                              tab === t
                                ? "2px solid #1a2e32"
                                : "2px solid transparent",
                            marginBottom: -2,
                            transition: "all 0.2s",
                          }}
                        >
                          {t === "upcoming"
                            ? "Upcoming Appointments"
                            : "Past Appointments"}
                        </div>
                      ))}
                    </div>

                    {/* Rows */}
                    <div style={{ padding: "8px 6px 8px" }}>
                      {tab === "past" ? (
                        appointments.map((apt, i) => (
                          <div
                            key={i}
                            style={{
                              border: "1px solid #eef0f3",
                              borderRadius: 10,
                              padding: "13px 16px",
                              marginBottom: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              background: "#fff",
                              flexWrap: "wrap",
                            }}
                          >
                            {/* LEFT SIDE: Date + Purpose */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 40,
                                minWidth: 250,
                              }}
                            >
                              {/* Date */}
                              <div>
                                <div style={{ fontSize: 11, color: "#9aa5b4" }}>
                                  Date
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>
                                  {apt.date}
                                </div>
                              </div>

                              {/* Purpose */}
                              <div>
                                <div style={{ fontSize: 11, color: "#9aa5b4" }}>
                                  Purpose
                                </div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>
                                  {apt.purpose}
                                </div>
                              </div>
                            </div>

                            {/* RIGHT SIDE: Doctor + Status */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 40,
                                minWidth: 250,
                              }}
                            >
                              {/* Doctor */}
                              <div>
                                <div style={{ fontSize: 11, color: "#9aa5b4" }}>
                                  Doctor
                                </div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>
                                  {apt.doctor}
                                </div>
                              </div>

                              {/* Status */}
                              <div>
                                <div style={{ fontSize: 11, color: "#9aa5b4" }}>
                                  Status
                                </div>
                                <span
                                  style={{
                                    background: "#35e535",
                                    color: "#fff",
                                    borderRadius: 20,
                                    padding: "4px 14px",
                                    fontSize: 11,
                                    fontWeight: 700,
                                  }}
                                >
                                  {apt.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            color: "#b0bec5",
                            padding: 30,
                            fontSize: 13,
                          }}
                        >
                          No upcoming appointments
                        </div>
                      )}
                      <div
                        style={{
                          textAlign: "right",
                          padding: "4px 0 6px",
                          color: "#1a6fce",
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        See All &gt;
                      </div>
                    </div>
                  </div>

                  {/* Right cards */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      width: 160,
                      flexShrink: 0,
                    }}
                  >
                    {[
                      { icon: "📅", label: "View All Appointments" },
                      { icon: "📤", label: "View & Upload Your Documents" },
                    ].map((card) => (
                      <div
                        key={card.label}
                        style={{
                          background: "#cdd2ec",
                          borderRadius: 14,
                          padding: "5px 14px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          cursor: "pointer",
                          flex: 1,
                          textAlign: "center",
                          transition: "background 0.2s",
                        }}
                      >
                        <div
                          style={{
                            background: "#1a6fce",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                          }}
                        >
                          {card.icon}
                        </div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#1a2e32",
                            fontSize: 13,
                            lineHeight: 1.4,
                          }}
                        >
                          {card.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
