import React from 'react';
import logo from '../assets/logo.png';

export default function Header({ activeTab, setActiveTab, onBookClick, patientSession }) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    // If it's a home section, we want to scroll to it
    if (['home', 'about-hospital', 'about-me', 'services', 'contact'].includes(tab)) {
      setTimeout(() => {
        const element = document.getElementById(tab);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="top-brand-bar">
        <div className="brand-left">
          <img src={logo} alt="Liberty Heart & Vascular Surgery Logo" className="hospital-logo" />
          <div className="brand-title-group">
            <h1>LIBERTY HEART &amp; VASCULAR SURGERY CENTRE</h1>
            <span>
              <span className="trust">Trust</span> • <span className="care">Care</span> • <span className="precision">Precision</span>
            </span>
          </div>
        </div>
        <div className="brand-contact-info">
          <div className="contact-item">
            <span className="contact-label">Call Us</span>
            <span className="contact-value">7032077766</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Email Support</span>
            <span className="contact-value">care@libertyheartsurgery.com</span>
          </div>
        </div>
      </div>

      <header>
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <button 
                className={activeTab === 'home' ? 'active' : ''} 
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'about-hospital' ? 'active' : ''} 
                onClick={() => handleNavClick('about-hospital')}
              >
                About Hospital
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'about-me' ? 'active' : ''} 
                onClick={() => handleNavClick('about-me')}
              >
                About Me
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'services' ? 'active' : ''} 
                onClick={() => handleNavClick('services')}
              >
                Services
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'contact' ? 'active' : ''} 
                onClick={() => handleNavClick('contact')}
              >
                Contact Us
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'portal' ? 'active' : ''} 
                onClick={() => handleNavClick('portal')}
              >
                {patientSession ? 'My Dashboard' : 'Patient Portal'}
              </button>
            </li>
          </ul>

          <button className="book-btn" onClick={onBookClick}>
            Book Appointment
          </button>
        </div>
      </header>
    </>
  );
}
