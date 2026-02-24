import React from "react";
import "./FeaturesStrip.css";

const features = [
  { animation: "/animations/wired-gradient-970-video-conference-hover-pinch.json", label: "Scheduling" },
  { animation: "/animations/patient.json", label: "Patient Portal" },
  { animation: "/animations/documents.json", label: "Documnets" },
  { animation: "/animations/prescription.json", label: "e-Prescribing" },
  { animation: "/animations/billing.json", label: "Medical Billing" },
  { animation: "/animations/admin.json", label: "Admin Portal" },
];

const FeaturesStrip = () => (
  <section className="features-strip" id="features">
    <div className="container">
      <p className="strip-title">
        Everything You Need From Scheduling to Admin Portal 
      </p>
<a href="../../public/animations/wired-gradient-970-video-conference-hover-pinch.json"></a>
      <div className="strip-grid">
        {features.map((f, i) => (
          <div className="strip-item" key={i}>
            <lord-icon
              src={f.animation}
              trigger="loop"
              delay="1000"
              colors="primary:#0f172a,secondary:#2563eb"
              style={{ width: "60px", height: "60px" }}
            ></lord-icon>

            <span className="strip-label">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesStrip;
