import { useState } from "react";

const appointments = [
  {
    date: "30 Jan 2026",
    time: "10:00 - 10:15",
    purpose: "Neck Pain",
    doctor: "Barghavi",
    specialty: "Palentologist",
    status: "completed",
  },
  {
    date: "26 Jan 2026",
    time: "12:00 - 13:00",
    purpose: "Routine Checkup",
    doctor: "Pooja",
    specialty: "Neurologist",
    status: "completed",
  },
  {
    date: "26 Jan 2026",
    time: "13:00 - 14:00",
    purpose: "Headache Consultation",
    doctor: "Pooja",
    specialty: "Neurologist",
    status: "completed",
  },
];

export default function Dashboard() {
  const [tab, setTab] = useState("past");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f0f4f8" }}>
      {/* Sidebar */}
      <div style={{
        width: 220,
        background: "linear-gradient(160deg, #1a5f6e 0%, #0d4a58 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 0",
        color: "#fff",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 28,
          width: 140,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 28 }}>✚</div>
          <div style={{ fontWeight: 700, fontSize: 11, color: "#1a5f6e", letterSpacing: 2 }}>HEALTHCARE</div>
          <div style={{ fontSize: 9, color: "#999", letterSpacing: 1 }}>CREATIVE</div>
        </div>

        {/* Avatar */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 10,
          border: "2px solid rgba(255,255,255,0.3)",
        }}>RV</div>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Ram vilas</div>
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 28 }}>19/02/2026 | 17:02:39</div>

        {/* Nav */}
        {[
          { icon: "⊞", label: "Dashboard", active: true },
          { icon: "⬆", label: "Document Upload" },
          { icon: "📅", label: "Appointment" },
          { icon: "☆", label: "Reviews" },
          { icon: "☰", label: "Bills" },
          { icon: "↪", label: "Logout" },
        ].map((item) => (
          <div key={item.label} style={{
            width: "100%",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: item.active ? "rgba(255,255,255,0.15)" : "transparent",
            cursor: "pointer",
            fontSize: 14,
            borderLeft: item.active ? "3px solid #7dd8e0" : "3px solid transparent",
            transition: "all 0.2s",
          }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          background: "linear-gradient(90deg, #1a5f6e, #2d8a9e)",
          color: "#fff",
          padding: "16px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontSize: 24, fontWeight: 700 }}>Medanta- The Medicity</span>
          <div style={{
            background: "#e53935",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}>🔔</div>
        </div>

        {/* Content */}
        <div style={{ padding: 28, flex: 1 }}>
          {/* Welcome banner */}
          <div style={{
            background: "linear-gradient(135deg, #d4eef2 0%, #b8dfe6 100%)",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>Thursday, 19 February 2026</div>
              <div style={{ fontSize: 26, fontWeight: 600, color: "#222" }}>
                Good Afternoon <span style={{ color: "#1a5f6e" }}>Ram vilas</span>
              </div>
            </div>
            <div style={{ fontSize: 64 }}>👨‍⚕️</div>
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            {/* Appointments card */}
            <div style={{
              flex: 1,
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}>
              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "2px solid #eee", marginBottom: 20 }}>
                {["upcoming", "past"].map((t) => (
                  <div key={t} onClick={() => setTab(t)} style={{
                    padding: "10px 24px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: 1,
                    color: tab === t ? "#1a5f6e" : "#999",
                    borderBottom: tab === t ? "2px solid #1a5f6e" : "2px solid transparent",
                    marginBottom: -2,
                    transition: "all 0.2s",
                  }}>
                    {t === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}
                  </div>
                ))}
              </div>

              {/* Appointment rows */}
              {tab === "past" ? appointments.map((apt, i) => (
                <div key={i} style={{
                  border: "1px solid #e8f5e9",
                  borderRadius: 12,
                  padding: "16px 20px",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "#fafffe",
                }}>
                  <div style={{ minWidth: 110 }}>
                    <div style={{ fontWeight: 700, color: "#222", fontSize: 15 }}>{apt.date}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{apt.time}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>Purpose</div>
                    <div style={{ fontWeight: 600, color: "#333" }}>{apt.purpose}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>Doctor</div>
                    <div style={{ fontWeight: 600, color: "#333" }}>
                      {apt.doctor} <span style={{ color: "#888", fontWeight: 400 }}>({apt.specialty})</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>Status</div>
                    <span style={{
                      background: "#e8f5e9",
                      color: "#2e7d32",
                      border: "1px solid #a5d6a7",
                      borderRadius: 20,
                      padding: "4px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      display: "inline-block",
                    }}>completed</span>
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: "center", color: "#aaa", padding: 40, fontSize: 15 }}>
                  No upcoming appointments
                </div>
              )}

              <div style={{
                textAlign: "right",
                marginTop: 8,
                color: "#1a5f6e",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}>See All &gt;</div>
            </div>

            {/* Right side cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 220 }}>
              {[
                { icon: "📅", label: "View All Appointments" },
                { icon: "📤", label: "View & Upload Your Documents" },
              ].map((card) => (
                <div key={card.label} style={{
                  background: "#e2f0f3",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  cursor: "pointer",
                  flex: 1,
                  textAlign: "center",
                  transition: "background 0.2s",
                }}>
                  <div style={{
                    background: "#1a5f6e",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}>{card.icon}</div>
                  <div style={{ fontWeight: 600, color: "#333", fontSize: 14 }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
