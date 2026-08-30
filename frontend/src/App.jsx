import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutHospital from './components/AboutHospital';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import BookAppointmentModal from './components/BookAppointmentModal';
import PatientPortal from './components/PatientPortal';
import SmsSimulatorWidget from './components/SmsSimulatorWidget';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [patientSession, setPatientSession] = useState(null);

  // If appointment booking is successful, redirect to portal tab so they can test logging in
  const handleBookingSuccess = (mobileNumber) => {
    // We could pre-fill the mobile number or just transition to portal view
    setTimeout(() => {
      setActiveTab('portal');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleBookClick = () => {
    setIsBookModalOpen(true);
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (tab !== 'portal') {
      setTimeout(() => {
        const element = document.getElementById(tab);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="app-container">
      {/* Brand header and Navigation bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBookClick={handleBookClick} 
        patientSession={patientSession}
      />

      {/* Main Content Layout */}
      <main>
        {activeTab === 'portal' ? (
          <PatientPortal 
            session={patientSession} 
            setSession={setPatientSession}
            onBookNewClick={handleBookClick}
          />
        ) : (
          <>
            <HeroSection 
              onBookClick={handleBookClick} 
              onAboutMeClick={() => handleNavClick('about-me')} 
            />
            <AboutHospital />
            <AboutMe />
            <Services />
            <ContactUs onBookClick={handleBookClick} />
          </>
        )}
      </main>

      {/* Footer Details */}
      <Footer onNavClick={handleNavClick} />

      {/* Booking Dialog Modal */}
      <BookAppointmentModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Floating Developer SMS Console Widget */}
      <SmsSimulatorWidget />
    </div>
  );
}

// Inline Footer component wrapper for App.jsx to use since we created Footer.jsx separately
function Footer({ onNavClick }) {
  const year = new Date().getFullYear();
  return (
    <footer id="contact">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo-title">
            <div style={{ fontSize: '24px' }}>🏥</div>
            <h2 style={{ fontSize: '16px', color: 'white' }}>LIBERTY HEART SURGERY</h2>
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
            A dedicated super specialty centre providing world-class surgical solutions for cardiac, thoracic, lung, and vascular disorders.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--accent-gold)', fontWeight: '600' }}>
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

        <div className="footer-col">
          <h3>Contact Details</h3>
          <ul style={{ gap: '10px', fontSize: '13px' }}>
            <li>
              <strong>📍 Location:</strong><br />
              #-5-5-345/A, Sarojini Devi Layout,<br />
              Sarojini Devi Road, Tirupati - 517501, A.P.
            </li>
            <li>
              <strong>📞 Phone:</strong> 7032077766
            </li>
            <li>
              <strong>✉️ Email:</strong> care@libertyheartsurgery.com
            </li>
            <li>
              <strong>⏰ Working Hours:</strong><br />
              Mon - Sat: 10:00 AM - 06:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Liberty Heart &amp; Vascular Surgery Centre. All Rights Reserved.</p>
        <p>Built with React &amp; Spring Boot</p>
      </div>
    </footer>
  );
}

export default App;
