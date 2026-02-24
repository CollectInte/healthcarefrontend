import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Contactmodal from "./Contactmodal";
import logo from '../../images/caredesk360.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate=useNavigate();

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="/" className="navbar-logo">
          <div className="logo-icon"><img src={logo} style={{width:"40px",height:"40px"}} alt="logo"/></div>
          <span className="logo-text">CareDesk360</span>
        </a>

        <ul className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          <li>
            <a href="#services">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#plans">Pricing</a>
          </li>
          <li>
            <a href="#about">Why Us</a>
          </li>

          {/* Mobile Buttons */}
          <li className="mobile-buttons">
            <a
              style={{ color: "white" }}
              onClick={() => setOpen(true)}
              className="btn-primary full"
            >
              Get Started
            </a>
            <button
              onClick={() => navigate('/login')}
              className="btn-outline full"
            >
              Login
            </button>
          </li>
        </ul>

        <div className="navbar-actions">
          <a onClick={() => setOpen(true)} className="btn-primary">
            Get Started
          </a>
        </div>
        <div className="navbar-actions">
          <button
              onClick={() => navigate('/login')}
              className="btn-outline"
            >
              Login
            </button>
        </div>

        <button
          className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <Contactmodal open={open} handleClose={() => setOpen(false)} />
    </nav>
  );
};

export default Navbar;
