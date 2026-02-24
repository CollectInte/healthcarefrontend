import React from "react";
import "./WhyUs.css";

const reasons = [
  {
    icon: "/animations/Why/design.json",
    title: "Designed for Simplicity",
    desc: "CareDesk360 is built with both healthcare professionals and patients in mind. Its clean, intuitive interface ensures smooth usage without complex training.",
  },
  {
    icon: "/animations/Why/dash.json",
    title: "Centralized Healthcare Management",
    desc: "Manage patients, appointments, prescriptions, reports, billing, and staff — all from a single unified platform. No more scattered systems or manual processes.",
  },
  {
    icon: "/animations/Why/user.json",
    title: "User-Friendly for Staff & Patients",
    desc: "An intuitive interface ensures smooth navigation for healthcare providers and convenient access for patients, making daily operations faster and simpler.",
  },
  {
    icon: "/animations/Why/digital.json",
    title: "Secure Digital Records",
    desc: "Protect sensitive medical information with reliable, secure data storage and controlled access, ensuring privacy and compliance at all times.",
  },
  {
    icon: "/animations/Why/control.json",
    title: "Streamlined Administrative Control",
    desc: "Automate workflows, monitor operations, and manage resources efficiently with complete administrative oversight.",
  },
  {
   icon: "/animations/Why/fast.json",
    title: "Faster Service, Better Care",
    desc: "Reduce waiting times, improve coordination, and deliver seamless care — enhancing overall patient satisfaction.",
  },
];

const WhyUs = () => (
  <section className="why-us" id="about">
    <div className="container">
      <div className="section-header">
        <div className="section-label">Why Choose CareDesk360</div>
        <h2 className="section-title">Smarter Healthcare Starts Here</h2>
        <p className="section-subtitle">
          CareDesk360 is designed to simplify healthcare management while
          improving efficiency, accuracy, and patient satisfaction. Our platform
          brings everything you need into one secure and easy-to-use system.
        </p>
      </div>
      <div className="why-grid">
        {reasons.map((r, i) => (
          <div className="why-card" key={i}>
            <lord-icon
              src={r.icon}
              trigger="loop"
              delay="1000"
              colors="primary:#0f172a,secondary:#2563eb"
              style={{ width: "60px", height: "60px" }}
            ></lord-icon>
            <h3 className="why-title">{r.title}</h3>
            <p className="why-desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
