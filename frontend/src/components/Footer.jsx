import React from 'react';
import logo from '../assets/logo.png';

export default function Footer({ onNavClick }) {
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo-title">
            <img src={logo} alt="Liberty Logo" className="footer-logo" />
            <h2>LIBERTY HEART SURGERY</h2>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>
            A dedicated super specialty centre providing world-class surgical solutions for cardiac, thoracic, lung, and vascular disorders.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--accent-gold)', fontWeight: '600' }}>
            TRUST • CARE • PRECISION
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><button onClick={() => onNavClick('home')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Home</button></li>
            <li><button onClick={() => onNavClick('about-hospital')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>About Hospital</button></li>
            <li><button onClick={() => onNavClick('about-me')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>About Me</button></li>
            <li><button onClick={() => onNavClick('services')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Services</button></li>
            <li><button onClick={() => onNavClick('portal')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}>Patient Portal</button></li>
          </ul>
        </div>

        <div className="footer-col" id="contact-info">
          <h3>Contact Details</h3>
          <ul style={{ gap: '12px' }}>
            <li>
              <strong>📍 Location:</strong><br />
              Opp. Ashalatha Hospital, 2nd Line,<br />
              Reddy &amp; Reddy Colony, Tirupati - 517501
            </li>
            <li>
              <strong>📞 Phone:</strong> 7032077766
            </li>
            <li>
              <strong>✉️ Email:</strong> care@libertyheartsurgery.com
            </li>
            <li>
              <strong>⏰ Working Hours:</strong><br />
              Mon - Sat: 10:00 AM - 6:00 PM (Sunday Closed)
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Liberty Heart &amp; Vascular Surgery Centre. All Rights Reserved.</p>
        <p>Built with React &amp; Spring Boot</p>
      </div>
    </footer>
  );
}
