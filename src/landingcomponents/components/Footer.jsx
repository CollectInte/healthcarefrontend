import React, { useState } from "react";
import "./Footer.css";
import Contactmodal from "./Contactmodal";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 600,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [tcopen, setTcopen] = useState(false);
  const [ppopen, setPpopen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleTcClose = () => setTcopen(false);
  const handlePpClose = () => setPpopen(false);

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
                href="https://www.linkedin.com/company/109917971/admin/dashboard/"
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
                href="https://www.instagram.com/ridgeveda/"
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
                href="https://www.facebook.com/profile.php?id=61583992647403"
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

              <a href="https://x.com/RidgeVeda18911" className="social-link">
                <lord-icon
                  src="/animations/social/x.json"
                  trigger="loop"
                  delay="2000"
                  // colors="primary:#ffffff"
                  style={{ width: "38px", height: "38px" }}
                ></lord-icon>
              </a>

              <a
                href="https://youtube.com/@ridgeveda?si=_hHhDZqjtCmKOiti"
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
                <li>
                  <a style={{ color: "inherit", cursor: "pointer" }} onClick={() => setTcopen(true)}>
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a style={{ color: "inherit", cursor: "pointer" }} onClick={() => setPpopen(true)}>
                    Privacy Policy
                  </a>
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

      {/* Terms and conditions */}
      <Modal
        open={tcopen}
        onClose={handleTcClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Typography variant="h4" gutterBottom>
              TERMS & CONDITIONS
            </Typography>

            <Button variant="text" onClick={handleTcClose} style={{ position: 'absolute', top: 10, right: 10, textTransform: "none", color: "red" }}>
              <CloseIcon /> Close
            </Button>
          </div>
          <Typography variant="h6" gutterBottom>
            CareDesk360 – Clinic & Healthcare Management Platform
          </Typography>

          <Typography variant="body1" gutterBottom>
            Effective Date: 26 May 2026
          </Typography>

          <Typography variant="body1" paragraph>
            These Terms & Conditions (“Terms”, “Agreement”) govern the access,
            subscription, usage, licensing, and operation of CareDesk360, a proprietary
            healthcare technology product owned and operated by Ridgeveda Solutions
            Private Limited (“Company”, “Ridgeveda”, “we”, “our”, or “us”).
          </Typography>

          <Typography variant="body1" paragraph>
            By accessing, registering, subscribing to, or using CareDesk360, the clinic,
            hospital, healthcare institution, doctor, administrator, consultant,
            employee, representative, or authorized user (“User”) acknowledges that they
            have read, understood, and agreed to be legally bound by these Terms.
          </Typography>

          <Typography variant="body1" paragraph>
            If the User does not agree to these Terms, the User must immediately
            discontinue usage of the Platform.
          </Typography>

          <Typography variant="h5" gutterBottom>
            1. DEFINITIONS
          </Typography>

          <Typography variant="body1" paragraph>
            For the purposes of this Agreement:
          </Typography>

          <Typography variant="body1" paragraph>
            “Platform” refers to CareDesk360, including its software systems, dashboards,
            mobile applications, APIs, websites, communication systems, and associated
            digital services.
          </Typography>

          <Typography variant="body1" paragraph>
            “Company” refers to Ridgeveda Solutions Private Limited.
          </Typography>

          <Typography variant="body1" paragraph>
            “User” refers to any clinic, hospital, healthcare institution, doctor,
            employee, consultant, staff member, or authorized representative using the
            Platform.
          </Typography>

          <Typography variant="body1" paragraph>
            “Services” refers to all operational, administrative, technical, software,
            automation, reporting, and healthcare management functionalities offered
            through CareDesk360.
          </Typography>

          <Typography variant="body1" paragraph>
            “Data” refers to all information uploaded, processed, stored, or generated
            through the Platform.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. NATURE OF SERVICES
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 is a healthcare operations and clinic management software
            platform intended to assist healthcare institutions with:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">appointment management</Typography>
            </li>
            <li>
              <Typography variant="body1">clinic operations</Typography>
            </li>
            <li>
              <Typography variant="body1">patient workflow management</Typography>
            </li>
            <li>
              <Typography variant="body1">billing and invoicing</Typography>
            </li>
            <li>
              <Typography variant="body1">inventory management</Typography>
            </li>
            <li>
              <Typography variant="body1">staff and consultant management</Typography>
            </li>
            <li>
              <Typography variant="body1">reporting systems</Typography>
            </li>
            <li>
              <Typography variant="body1">payroll administration</Typography>
            </li>
            <li>
              <Typography variant="body1">healthcare business operations</Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            The Platform functions strictly as a software and technology infrastructure
            provider.
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 does not:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                provide medical consultation
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                participate in diagnosis or treatment
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                guarantee medical outcomes
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                supervise healthcare professionals
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                assume responsibility for patient care decisions
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            All medical responsibility remains solely with the healthcare provider.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. ELIGIBILITY
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                they possess legal authority to enter into this Agreement
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                all information provided is accurate and lawful
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                they shall comply with all applicable laws and regulations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                they are authorized to act on behalf of the clinic or organization where
                applicable
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Unauthorized use of the Platform is strictly prohibited.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. ACCOUNT ACCESS & SECURITY
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                maintaining confidentiality of login credentials
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                restricting unauthorized access
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                safeguarding passwords and authentication systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                monitoring user activity within their organization
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                ensuring lawful internal usage of the Platform
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Any activity conducted through authorized accounts shall be deemed the
            responsibility of the respective User.
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 shall not be liable for losses arising from credential misuse,
            unauthorized access, or negligence by Users.
          </Typography>

          <Typography variant="h5" gutterBottom>
            5. DATA OWNERSHIP
          </Typography>

          <Typography variant="body1" paragraph>
            All patient records, clinic information, operational records, healthcare
            documentation, reports, prescriptions, and uploaded materials remain the
            exclusive property of the respective healthcare institution or User.
          </Typography>

          <Typography variant="body1" paragraph>
            Ridgeveda Solutions Private Limited does not claim ownership over User or
            patient data stored within the Platform.
          </Typography>

          <Typography variant="body1" paragraph>
            The Company acts solely as a technology service provider and data processor.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. PATIENT DATA & CONFIDENTIALITY
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 maintains strict confidentiality obligations regarding
            healthcare-related information.
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                Patient data shall not be sold, rented, traded, or commercially exploited
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Patient information shall not be used for marketing or advertising
                purposes
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Access to patient records shall remain restricted and controlled
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Any technical-access requirement shall remain limited, confidential,
                monitored, and purpose-specific
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Users remain solely responsible for:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                obtaining patient consent where legally required
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                ensuring lawful data collection
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                complying with healthcare privacy regulations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                maintaining regulatory compliance within their jurisdiction
              </Typography>
            </li>
          </ul>
          <Typography variant="h5" gutterBottom>
            7. LICENSE & PERMITTED USE
          </Typography>

          <Typography variant="body1" paragraph>
            Subject to compliance with these Terms, CareDesk360 grants the User a
            limited, non-transferable, non-exclusive, revocable license to access and
            use the Platform for legitimate healthcare operational purposes.
          </Typography>

          <Typography variant="body1" paragraph>
            The User shall not:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                copy, replicate, or redistribute the Platform
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                reverse engineer or decompile the software
              </Typography>
            </li>
            <li>
              <Typography variant="body1">create derivative works</Typography>
            </li>
            <li>
              <Typography variant="body1">
                sublicense or commercially resell the Platform
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                attempt unauthorized access to infrastructure
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                interfere with system security
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                misuse APIs, databases, or operational workflows
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Any unauthorized usage may result in immediate suspension, legal action, or
            termination.
          </Typography>

          <Typography variant="h5" gutterBottom>
            8. SUBSCRIPTION, BILLING & PAYMENT TERMS
          </Typography>

          <Typography variant="body1" paragraph>
            By subscribing to CareDesk360, the User expressly agrees to the following
            commercial conditions:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                All payments are final and legally non-refundable
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Subscription fees once paid cannot be revoked, reversed, disputed, or
                refunded
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Partial usage, dissatisfaction, operational interruptions, or non-usage
                shall not constitute grounds for refund
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Subscription access remains subject to timely payment obligations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Failure to renew subscriptions may result in suspension or termination of
                services
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Pricing structures, service scope, and commercial terms may be revised by
                the Company with prior notice
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                The User expressly waives chargeback or refund claims except where
                required under applicable law
              </Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            9. SERVICE AVAILABILITY
          </Typography>

          <Typography variant="body1" paragraph>
            While CareDesk360 endeavors to maintain uninterrupted access, the Company
            does not guarantee:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">uninterrupted uptime</Typography>
            </li>
            <li>
              <Typography variant="body1">error-free operation</Typography>
            </li>
            <li>
              <Typography variant="body1">
                permanent service availability
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                compatibility with all external systems or devices
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Temporary interruptions may occur due to:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">maintenance</Typography>
            </li>
            <li>
              <Typography variant="body1">upgrades</Typography>
            </li>
            <li>
              <Typography variant="body1">cybersecurity events</Typography>
            </li>
            <li>
              <Typography variant="body1">server failures</Typography>
            </li>
            <li>
              <Typography variant="body1">
                third-party infrastructure disruptions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">force majeure events</Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            10. THIRD-PARTY SERVICES
          </Typography>

          <Typography variant="body1" paragraph>
            The Platform may integrate with or utilize third-party services including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">payment gateways</Typography>
            </li>
            <li>
              <Typography variant="body1">cloud hosting systems</Typography>
            </li>
            <li>
              <Typography variant="body1">communication providers</Typography>
            </li>
            <li>
              <Typography variant="body1">analytics systems</Typography>
            </li>
            <li>
              <Typography variant="body1">infrastructure vendors</Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            CareDesk360 shall not be liable for interruptions, losses, breaches, or
            damages attributable to third-party providers beyond reasonable control.
          </Typography>

          <Typography variant="h5" gutterBottom>
            11. INTELLECTUAL PROPERTY RIGHTS
          </Typography>

          <Typography variant="body1" paragraph>
            All intellectual property associated with CareDesk360, including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">software architecture</Typography>
            </li>
            <li>
              <Typography variant="body1">source code</Typography>
            </li>
            <li>
              <Typography variant="body1">workflows</Typography>
            </li>
            <li>
              <Typography variant="body1">dashboards</Typography>
            </li>
            <li>
              <Typography variant="body1">UI/UX structures</Typography>
            </li>
            <li>
              <Typography variant="body1">branding</Typography>
            </li>
            <li>
              <Typography variant="body1">business methodologies</Typography>
            </li>
            <li>
              <Typography variant="body1">operational systems</Typography>
            </li>
            <li>
              <Typography variant="body1">
                proprietary documentation
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            shall remain the exclusive property of Ridgeveda Solutions Private Limited.
          </Typography>

          <Typography variant="body1" paragraph>
            Nothing within these Terms transfers ownership rights to the User.
          </Typography>

          <Typography variant="body1" paragraph>
            Unauthorized reproduction, copying, resale, or commercial exploitation is
            strictly prohibited.
          </Typography>

          <Typography variant="h5" gutterBottom>
            12. PROHIBITED ACTIVITIES
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                upload unlawful or fraudulent information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">misuse patient records</Typography>
            </li>
            <li>
              <Typography variant="body1">
                violate healthcare regulations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                attempt hacking or unauthorized access
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                disrupt Platform operations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                transmit malware or harmful code
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                use the Platform for unlawful purposes
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                interfere with system security mechanisms
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Violation may result in immediate account suspension and legal proceedings.
          </Typography>

          <Typography variant="h5" gutterBottom>
            13. LIMITATION OF LIABILITY
          </Typography>

          <Typography variant="body1" paragraph>
            To the maximum extent permissible under applicable law, CareDesk360 and
            Ridgeveda Solutions Private Limited shall not be liable for:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                medical negligence by healthcare providers
              </Typography>
            </li>
            <li>
              <Typography variant="body1">treatment outcomes</Typography>
            </li>
            <li>
              <Typography variant="body1">patient disputes</Typography>
            </li>
            <li>
              <Typography variant="body1">
                loss of profits or business opportunities
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                indirect or consequential damages
              </Typography>
            </li>
            <li>
              <Typography variant="body1">cyberattacks</Typography>
            </li>
            <li>
              <Typography variant="body1">
                infrastructure failures
              </Typography>
            </li>
            <li>
              <Typography variant="body1">internet interruptions</Typography>
            </li>
            <li>
              <Typography variant="body1">
                unauthorized access caused by User negligence
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                data corruption caused by external systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">force majeure events</Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            In all circumstances, aggregate liability shall not exceed the subscription
            fees paid by the User during the preceding three (3) months.
          </Typography>

          <Typography variant="h5" gutterBottom>
            14. INDEMNIFICATION
          </Typography>

          <Typography variant="body1" paragraph>
            The User agrees to indemnify, defend, and hold harmless CareDesk360 and
            Ridgeveda Solutions Private Limited from any claims, liabilities, damages,
            penalties, losses, or legal expenses arising from:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                violation of these Terms
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                unlawful use of the Platform
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                healthcare regulatory violations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">patient disputes</Typography>
            </li>
            <li>
              <Typography variant="body1">data misuse</Typography>
            </li>
            <li>
              <Typography variant="body1">negligence</Typography>
            </li>
            <li>
              <Typography variant="body1">
                unauthorized activities conducted by the User
              </Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            15. TERMINATION & SUSPENSION
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 reserves the absolute right to suspend, restrict, or terminate
            access without prior notice where:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">payment defaults occur</Typography>
            </li>
            <li>
              <Typography variant="body1">
                unlawful activities are detected
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                cybersecurity threats arise
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                misuse of the Platform occurs
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                operational integrity is threatened
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Termination shall not affect accrued payment obligations or legal remedies
            available to the Company.
          </Typography>

          <Typography variant="h5" gutterBottom>
            16. FORCE MAJEURE
          </Typography>

          <Typography variant="body1" paragraph>
            The Company shall not be liable for failure or delay in performance caused by
            circumstances beyond reasonable control, including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">natural disasters</Typography>
            </li>
            <li>
              <Typography variant="body1">cyberattacks</Typography>
            </li>
            <li>
              <Typography variant="body1">war</Typography>
            </li>
            <li>
              <Typography variant="body1">
                governmental restrictions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">internet outages</Typography>
            </li>
            <li>
              <Typography variant="body1">
                infrastructure failures
              </Typography>
            </li>
            <li>
              <Typography variant="body1">labor disputes</Typography>
            </li>
            <li>
              <Typography variant="body1">force majeure events</Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            17. MODIFICATION OF TERMS
          </Typography>

          <Typography variant="body1" paragraph>
            Ridgeveda Solutions Private Limited reserves the unilateral right to revise,
            amend, or modify these Terms at any time.
          </Typography>

          <Typography variant="body1" paragraph>
            Continued use of the Platform following modifications shall constitute
            acceptance of the revised Terms.
          </Typography>

          <Typography variant="h5" gutterBottom>
            18. GOVERNING LAW & JURISDICTION
          </Typography>

          <Typography variant="body1" paragraph>
            These Terms shall be governed and interpreted in accordance with the laws of
            India.
          </Typography>

          <Typography variant="body1" paragraph>
            Any disputes arising out of or relating to these Terms shall be subject to
            the exclusive jurisdiction of the competent courts located in Hyderabad,
            Telangana, India.
          </Typography>

          <Typography variant="h5" gutterBottom>
            19. CONTACT INFORMATION
          </Typography>

          <Typography variant="body1" paragraph>
            Legal & Compliance Department
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 – A Product of Ridgeveda Solutions Private Limited
          </Typography>

          <Typography variant="body1" paragraph>
            Email: caredesk360@gmail.com
          </Typography>

          <Typography variant="body1" paragraph>
            Website: <a href="https://caredesk360.com" target="_blank" rel="noopener noreferrer">
              https://caredesk360.com
            </a>
          </Typography>
        </Box>
      </Modal>

      {/* Privacy Policy */}
      <Modal
        open={ppopen}
        onClose={handlePpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Typography variant="h4" gutterBottom>
              PRIVACY POLICY
            </Typography>

            <Button variant="text" onClick={handlePpClose} style={{ position: 'absolute', top: 10, right: 10, textTransform: "none", color: "red" }}>
              <CloseIcon /> Close
            </Button>
          </div>

          <Typography variant="h6" gutterBottom>
            CareDesk360 – Clinic & Healthcare Management Platform
          </Typography>

          <Typography variant="body1" gutterBottom>
            Effective Date: 26 May 2026
          </Typography>

          <Typography variant="body1" paragraph>
            This Privacy Policy (“Policy”) governs the collection, processing, storage,
            protection, disclosure, and use of information by CareDesk360, a product and
            proprietary healthcare technology platform owned, operated, and managed by
            Ridgeveda Solutions Private Limited (“Company”, “Ridgeveda”, “we”, “our”, or
            “us”), in connection with its healthcare software products, clinic management
            systems, applications, APIs, websites, communication systems, and associated
            digital services.
          </Typography>

          <Typography variant="body1" paragraph>
            By accessing, subscribing to, registering with, or using CareDesk360, the
            clinic, hospital, healthcare institution, doctor, consultant, employee,
            administrator, or authorized representative (“User”) acknowledges,
            understands, and agrees to the terms, obligations, and legal conditions set
            forth herein.
          </Typography>

          <Typography variant="h5" gutterBottom>
            1. COMPANY INFORMATION
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 is a proprietary healthcare technology product developed, owned,
            licensed, and operated by:
          </Typography>

          <Typography variant="body1" paragraph>
            Ridgeveda Solutions Private Limited
          </Typography>

          <Typography variant="body1" paragraph>
            India
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 functions as a secure digital clinic and healthcare management
            platform intended to support healthcare institutions through operational
            automation, workflow digitization, patient management systems, appointment
            scheduling, billing systems, reporting tools, inventory management, and
            administrative healthcare infrastructure.
          </Typography>

          <Typography variant="h5" gutterBottom>
            2. LEGAL STATUS OF CAREDESK360
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 operates strictly as a software technology platform and
            infrastructure provider.
          </Typography>

          <Typography variant="body1" paragraph>
            The Platform does not:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">provide medical advice</Typography>
            </li>
            <li>
              <Typography variant="body1">practice medicine</Typography>
            </li>
            <li>
              <Typography variant="body1">
                interfere with clinical decision-making
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                guarantee medical outcomes
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                own patient healthcare records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                assume responsibility for diagnosis or treatment decisions
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            All clinical responsibility, healthcare judgment, treatment decisions,
            prescriptions, and patient care obligations remain solely with the respective
            healthcare provider, clinic, hospital, or licensed medical practitioner.
          </Typography>

          <Typography variant="h5" gutterBottom>
            3. DATA PRIVACY & CONFIDENTIALITY COMMITMENT
          </Typography>

          <Typography variant="body1" paragraph>
            Ridgeveda Solutions Private Limited recognizes the highly confidential nature
            of healthcare and patient-related information and is committed to maintaining
            strict privacy, confidentiality, and cybersecurity standards.
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 follows industry-standard privacy and security principles,
            including operational alignment with:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                GDPR (General Data Protection Regulation) principles
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                confidentiality obligations applicable to healthcare systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                data minimization standards
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                controlled-access frameworks
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                commercially reasonable cybersecurity practices
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            The Company maintains a strict policy against unauthorized commercial usage of
            patient information.
          </Typography>

          <Typography variant="h5" gutterBottom>
            4. INFORMATION COLLECTED
          </Typography>

          <Typography variant="body1" paragraph>
            The Platform may collect and process information including, but not limited
            to:
          </Typography>

          <Typography variant="h6" gutterBottom>
            A. Clinic & Organizational Information
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">Clinic or hospital name</Typography>
            </li>
            <li>
              <Typography variant="body1">
                Business registration details
              </Typography>
            </li>
            <li>
              <Typography variant="body1">GST and billing information</Typography>
            </li>
            <li>
              <Typography variant="body1">
                Administrative contact details
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Branch and operational information
              </Typography>
            </li>
          </ul>

          <Typography variant="h6" gutterBottom>
            B. Healthcare Operational Data
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                Appointment scheduling records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Billing and invoicing data
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Prescription workflows
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Staff and consultant management data
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Inventory and medicine records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Operational reports and analytics
              </Typography>
            </li>
          </ul>

          <Typography variant="h6" gutterBottom>
            C. Patient-Related Information
          </Typography>

          <Typography variant="body1" paragraph>
            Authorized healthcare providers may independently upload patient-related
            information into the Platform, including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                patient identification details
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                consultation records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">prescriptions</Typography>
            </li>
            <li>
              <Typography variant="body1">
                appointment histories
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                diagnostic references
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                healthcare documentation
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Such information is uploaded solely under the authority and responsibility of
            the respective healthcare institution or practitioner.
          </Typography>

          <Typography variant="h6" gutterBottom>
            D. Technical & Security Information
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">IP addresses</Typography>
            </li>
            <li>
              <Typography variant="body1">
                browser and device information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">login timestamps</Typography>
            </li>
            <li>
              <Typography variant="body1">audit trails</Typography>
            </li>
            <li>
              <Typography variant="body1">activity logs</Typography>
            </li>
            <li>
              <Typography variant="body1">
                security monitoring information
              </Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            5. OWNERSHIP OF DATA
          </Typography>

          <Typography variant="body1" paragraph>
            All clinic records, operational data, patient information, healthcare
            documents, reports, prescriptions, and uploaded materials remain the
            exclusive property and confidential information of the respective healthcare
            provider or institution.
          </Typography>

          <Typography variant="body1" paragraph>
            Neither CareDesk360 nor Ridgeveda Solutions Private Limited claims ownership
            over:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                patient medical records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                clinic operational information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                medical documentation
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                healthcare reports stored within the Platform
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            The Company acts solely as a secure technology processor and infrastructure
            provider.
          </Typography>

          <Typography variant="h5" gutterBottom>
            6. STRICT NON-USE OF PATIENT DATA
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 and Ridgeveda Solutions Private Limited maintain a strict policy
            prohibiting unauthorized access, usage, sale, exploitation, or disclosure of
            patient-related information.
          </Typography>

          <Typography variant="body1" paragraph>
            Accordingly:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                Patient data shall not be sold, rented, traded, or commercially exploited
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Patient records shall not be used for marketing, advertising, profiling,
                or promotional activities
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Internal personnel are prohibited from unauthorized access to medical
                records
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Data access, if required for technical support purposes, shall remain
                limited, confidential, monitored, and purpose-specific
              </Typography>
            </li>
          </ul>
          <Typography variant="h5" gutterBottom>
            7. DATA SECURITY & CYBER PROTECTION
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 implements commercially reasonable and industry-standard
            safeguards designed to protect data processed through the Platform.
          </Typography>

          <Typography variant="body1" paragraph>
            Security measures may include:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                encrypted communications
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                secure cloud infrastructure
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                role-based access controls
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                authentication and authorization protocols
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                restricted database access
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                backup systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                firewall and monitoring systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                periodic security assessments
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            While the Company adopts strict security practices, Users acknowledge that no
            digital infrastructure or internet-based system can guarantee absolute
            security.
          </Typography>

          <Typography variant="body1" paragraph>
            Accordingly, CareDesk360 and Ridgeveda Solutions Private Limited disclaim
            liability for cyber incidents, unauthorized intrusions, infrastructure
            failures, or security breaches occurring beyond commercially reasonable
            control.
          </Typography>

          <Typography variant="h5" gutterBottom>
            8. GDPR & DATA PROTECTION PRINCIPLES
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 endeavors to maintain operational alignment with internationally
            recognized data protection principles, including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                lawful processing
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                transparency
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                purpose limitation
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                confidentiality
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                integrity
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                accountability standards
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Healthcare providers using the Platform remain independently responsible for:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                obtaining legally required patient consents
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                maintaining lawful grounds for data processing
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                complying with healthcare and privacy regulations applicable within their
                jurisdiction
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                ensuring the legitimacy of uploaded information
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            The Company shall not be liable for regulatory violations attributable to the
            User or healthcare institution.
          </Typography>

          <Typography variant="h5" gutterBottom>
            9. USER RESPONSIBILITIES
          </Typography>

          <Typography variant="body1" paragraph>
            Users agree and undertake to:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                maintain confidentiality of access credentials
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                restrict unauthorized access
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                comply with applicable laws and regulations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                upload only lawfully obtained information
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                maintain necessary patient consent obligations
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                avoid misuse or unlawful extraction of system data
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                preserve operational security practices
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            The User shall remain solely responsible for all activities conducted through
            its authorized accounts.
          </Typography>

          <Typography variant="h5" gutterBottom>
            10. THIRD-PARTY SERVICES & INFRASTRUCTURE
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 may utilize trusted third-party service providers including:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                cloud hosting vendors
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                payment gateways
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                analytics systems
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                communication providers
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                cybersecurity infrastructure partners
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Such integrations are implemented solely for operational continuity and
            service delivery purposes.
          </Typography>

          <Typography variant="body1" paragraph>
            The Company shall not be liable for interruptions, losses, or failures
            attributable to third-party infrastructure providers beyond reasonable
            control.
          </Typography>

          <Typography variant="h5" gutterBottom>
            11. SUBSCRIPTION, BILLING & NON-REFUND POLICY
          </Typography>

          <Typography variant="body1" paragraph>
            By subscribing to CareDesk360, the User expressly acknowledges and agrees
            that:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                All subscription fees and payments are final and legally non-refundable
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Subscription payments once processed cannot be revoked, reversed,
                disputed, or refunded
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Partial usage, dissatisfaction, operational changes, non-usage, or
                business closure shall not constitute grounds for refund
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Failure to renew subscriptions may result in suspension or restriction of
                Platform access
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                The Company reserves the right to modify pricing structures,
                subscription plans, and commercial terms with prior notice
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                The User expressly waives any chargeback, reversal, or refund claims
                except where mandatorily required under applicable law
              </Typography>
            </li>
          </ul>

          <Typography variant="h5" gutterBottom>
            12. LIMITATION OF LIABILITY
          </Typography>

          <Typography variant="body1" paragraph>
            To the maximum extent permissible under applicable law, CareDesk360 and
            Ridgeveda Solutions Private Limited shall not be liable for:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                indirect or consequential damages
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                medical negligence by healthcare providers
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                unauthorized access caused by User negligence
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                cyberattacks or external security breaches
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                operational interruptions
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                internet failures
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                third-party infrastructure failures
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                force majeure events
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                regulatory non-compliance by Users
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            In all circumstances, aggregate liability, if any, shall not exceed the
            subscription fees paid by the User during the preceding three (3) Years.
          </Typography>
          <Typography variant="h5" gutterBottom>
            13. INTELLECTUAL PROPERTY & CONFIDENTIALITY
          </Typography>

          <Typography variant="body1" paragraph>
            All software systems, workflows, dashboards, business methodologies,
            operational structures, source materials, designs, and proprietary
            technologies associated with CareDesk360 constitute the exclusive
            intellectual property of Ridgeveda Solutions Private Limited.
          </Typography>

          <Typography variant="body1" paragraph>
            Unauthorized copying, reverse engineering, resale, sublicensing,
            duplication, or commercial exploitation is strictly prohibited.
          </Typography>

          <Typography variant="h5" gutterBottom>
            14. TERMINATION OF ACCESS
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 reserves the absolute right to suspend or terminate access to the
            Platform without prior notice where:
          </Typography>

          <ul>
            <li>
              <Typography variant="body1">
                unlawful activity is detected
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                payment defaults occur
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                security threats arise
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                misuse of the Platform is identified
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                actions threaten operational integrity or cybersecurity stability
              </Typography>
            </li>
          </ul>

          <Typography variant="body1" paragraph>
            Termination shall not affect accrued payment obligations or legal remedies
            available to the Company.
          </Typography>

          <Typography variant="h5" gutterBottom>
            15. POLICY MODIFICATIONS
          </Typography>

          <Typography variant="body1" paragraph>
            Ridgeveda Solutions Private Limited reserves the unilateral right to amend,
            revise, update, or modify this Privacy Policy at any time.
          </Typography>

          <Typography variant="body1" paragraph>
            Continued use of the Platform following such modifications shall constitute
            deemed acceptance of the revised Policy.
          </Typography>

          <Typography variant="h5" gutterBottom>
            16. GOVERNING LAW & JURISDICTION
          </Typography>

          <Typography variant="body1" paragraph>
            This Policy shall be governed and interpreted in accordance with the laws of
            India.
          </Typography>

          <Typography variant="body1" paragraph>
            Any disputes arising out of or relating to this Policy shall be subject to
            the exclusive jurisdiction of the competent courts located in Hyderabad,
            Telangana, India.
          </Typography>

          <Typography variant="h5" gutterBottom>
            17. CONTACT INFORMATION
          </Typography>

          <Typography variant="body1" paragraph>
            For legal, compliance, privacy, or security-related communications:
          </Typography>

          <Typography variant="body1" paragraph>
            Legal & Compliance Department
          </Typography>

          <Typography variant="body1" paragraph>
            CareDesk360 – A Product of Ridgeveda Solutions Private Limited
          </Typography>

          <Typography variant="body1" paragraph>
            Email: caredesk360@gmail.com
          </Typography>

          <Typography variant="body1" paragraph>
            Website: <a href="https://caredesk360.com" target="_blank" rel="noopener noreferrer">
              https://caredesk360.com
            </a>
          </Typography>
        </Box>
      </Modal>
    </footer>
  );
};

export default Footer;
