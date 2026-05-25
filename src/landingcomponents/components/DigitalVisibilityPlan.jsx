// DigitalVisibilityPlan.jsx
import React from "react";
import "./Comparison.css";

const DigitalVisibilityPlan = () => {
  return (
    <div className="plan-container">
      {/* Header */}
      <div className="plan-header">
        <div className="line"></div>
        <div>
          <h2>DIGITAL VISIBILITY PLAN</h2>
          <h4>
            ₹50,000 <span>+ GST</span>
          </h4>
          <p>Per Annum</p>
          <p>Website + Clinic/Hospital Management Software</p>
        </div>
        <div className="line"></div>
      </div>

      {/* Main Content */}
      <div className="content-grid">
        {/* Left Card */}
        <div className="content-card">
          <div className="card-header">
            <div>
              <h3><lord-icon
                  src="/animations/social/computer.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px",paddingTop:"10px" }}
                ></lord-icon>WHAT’S INCLUDED</h3>
              <p>Everything you need to grow digitally & efficiently.</p>
            </div>
          </div>

          <div className="card-header">
            <h4>1. WEBSITE</h4>
            <ul className="plan-features">
              <li>Professional, Mobile-Friendly Website</li>
              <li>SEO-Optimized Pages</li>
              <li>Contact Forms & Click-to-Call</li>
              <li>Google Maps Integration</li>
              <li>SSL Certificate & Basic Security</li>
              <li>Website Hosting & Maintenance</li>
            </ul>
          </div>

          <div className="card-header">
            <h4>2. CLINIC/HOSPITAL MANAGEMENT SOFTWARE</h4>
            <ul className="plan-features">
              <li>Appointment Scheduling</li>
              <li>Patient Registration & Records</li>
              <li>OPD Management</li>
              <li>Billing & Invoicing</li>
              <li>Prescription Management</li>
              <li>Inventory Management</li>
              <li>Staff & Role Management</li>
              <li>Reports & Analytics Dashboard</li>
            </ul>
          </div>
        </div>

        {/* Right Card */}
        <div className="content-card">
          <div className="card-header">
            <div>
              <h3><lord-icon
                  src="/animations/social/marketing.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px",paddingTop:"8px" }}
                ></lord-icon>DIGITAL VISIBILITY & MARKETING</h3>
              <p>Get discovered, build trust and attract more patients.</p>
            </div>
          </div>

          <div className="card-header">
            <h4>3. PROFILE OPTIMIZATION & MANAGEMENT</h4>
            <ul className="plan-features">
              <li>Google My Business (GMB)</li>
              <li>Website</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>YouTube</li>
            </ul>
          </div>

          <div className="card-header">
            <h4>4. CONTENT & MARKETING</h4>
            <ul className="plan-features">
              <li>Design of 12 Creatives for Social Media Every Month</li>
              <li>1 Ad Campaign Management Per Month</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default DigitalVisibilityPlan;