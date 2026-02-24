import React, { useState } from "react";
import "./Footer.css";
import Contactmodal from "./Contactmodal";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-top-inner">
          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span style={{ fontWeight: 800 }}>CareDesk360</span>
            </div>

            <p>
              CareDesk360 is a healthcare management software designed for
              clinics, hospitals, and medical practitioners. It simplifies
              patient records, appointments, staff coordination, and operational
              workflows to ensure smooth, efficient, and quality healthcare
              delivery.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.linkedin.com/company/110922098/admin/dashboard/"
                className="social-link"
              >
                <lord-icon
                  src="/animations/social/in.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>
              <a
                href="https://www.instagram.com/caredesk360/"
                className="social-link"
              >
                <lord-icon
                  src="/animations/social/insta.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61585598232626"
                className="social-link"
              >
                <lord-icon
                  src="/animations/social/face.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>

              <a href="https://x.com/caredesk360" className="social-link">
                <lord-icon
                  src="/animations/social/x.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>

              <a
                href="https://www.youtube.com/channel/UCCHgm9uIKkEMZH8cklyYkFQ"
                className="social-link"
              >
                <lord-icon
                  src="/animations/social/youtube.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>
            </div>
          </div>

          {/* LINKS SECTION */}
          <div className="footer-links">
            {/* COMPANY */}
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#plans">Pricing</a>
                </li>
                <li>
                  <a onClick={() => setOpen(true)} href="#about">
                    Why CareDesk360
                  </a>
                </li>
                <li>
                  <a>Support & Help</a>
                </li>
              </ul>
            </div>

            {/* USEFUL LINKS */}
            <div className="footer-col">
              <h4>Useful links</h4>
              <ul>
                <li>
                  <a href="https://caredesk360.com/" target="_blank">
                    Login
                  </a>
                </li>
                <li>
                  <a onClick={() => setOpen(true)}>Signup</a>
                </li>
                <li>
                  <a href="#contact">Free Demo</a>
                </li>
                <li>
                  <a onClick={() => setOpen(true)}>Contact Us</a>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div className="footer-col">
              <h4>Get in touch</h4>
              <ul>
                {/* <li>Call</li> */}
                <a href="tel:+918977108950">
                  <li>📞 +91 8977108950</li>
                </a>
                {/* <li>Email</li> */}
                <a href="mailto:info@ridgeveda.com">
                  <li>✉️ info@ridgeveda.com</li>
                </a>
              </ul>

              <div style={{ marginTop: "15px" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  style={{ width: "140px" }}
                />
                <p style={{ fontSize: "12px", marginTop: "5px" }}>
                  coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} Ridgeveda Solutions Private Limited.
            All rights reserved
          </p>
        </div>
      </div>
      <Contactmodal open={open} handleClose={() => setOpen(false)} />
    </footer>
  );
};

export default Footer;
