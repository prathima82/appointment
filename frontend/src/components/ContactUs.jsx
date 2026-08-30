import React from 'react';

export default function ContactUs({ onBookClick }) {
  const trustFactors = [
    { title: "Expert Team", desc: "Highly qualified and experienced thoracic and vascular surgeons." },
    { title: "Advanced Technology", desc: "State-of-the-art operating theatres and intensive care units (ICU)." },
    { title: "Patient-Centric Care", desc: "Personalized care with empathy, safety, and transparency." },
    { title: "Affordable & Transparent", desc: "Ethical medical practice with honest and transparent billing." }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <span className="section-subtitle">Get In Touch</span>
        <h2>Communication &amp; Location</h2>
        <p className="section-description">
          Reach out to us to schedule video consultations, in-person bookings, or to ask questions.
        </p>
      </div>

      <div className="contact-layout">
        <div className="action-card-grid">
          <div className="action-card">
            <div className="action-icon-circle">💬</div>
            <div className="action-text">
              <h3>WhatsApp Video Consultation</h3>
              <p>Consult with Dr. T. Hemachandra from the comfort of your home.</p>
              <button 
                className="whatsapp-btn"
                onClick={() => window.open('https://wa.me/917032077766', '_blank')}
              >
                Start WhatsApp Video Call
              </button>
            </div>
          </div>

          <div className="action-card">
            <div className="action-icon-circle blue">📅</div>
            <div className="action-text">
              <h3>Book An Appointment</h3>
              <p>Schedule your clinic visit for an in-person cardiothoracic evaluation.</p>
              <button className="btn-primary" onClick={onBookClick} style={{ padding: '8px 20px', fontSize: '13px' }}>
                Book Appointment
              </button>
            </div>
          </div>
          
          <div className="contact-card-box">
            <div className="contact-block">
              <h3>📍 Location Coordinates</h3>
              <p>#-5-5-345/A, Sarojini Devi Layout, Sarojini Devi Road, Tirupati - 517501, A.P.</p>
            </div>
            
            <div className="contact-block">
              <h3>⏰ Clinic Schedule</h3>
              <p>Monday to Saturday: 10:00 AM – 06:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Map Container */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '15px', boxShadow: 'var(--shadow-sm)', flex: 1, minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '10px' }}>🗺️ Our Clinic Location Map</h3>
            <div style={{ backgroundColor: '#f1f5f9', border: '1px solid var(--border-color)', borderRadius: '8px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              {/* Mock Map UI */}
              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '32px' }}>📍</span>
                <h4 style={{ color: 'var(--primary-dark)', fontSize: '14px', marginTop: '5px' }}>Liberty Heart &amp; Vascular Surgery Centre</h4>
                <p style={{ fontSize: '11px', color: '#666' }}>Sarojini Devi Layout, Sarojini Devi Road, Tirupati</p>
              </div>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, background: 'radial-gradient(circle, #0c2b64 10%, transparent 10.5%), radial-gradient(circle, #0c2b64 10%, transparent 10.5%)', backgroundSize: '15px 15px', backgroundPosition: '0 0, 7.5px 7.5px' }}></div>
            </div>
          </div>

          {/* Why Choose Us Grid */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              Why Choose Liberty Heart Surgery Centre?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {trustFactors.map((factor, fIdx) => (
                <div key={fIdx} style={{ fontSize: '13px' }}>
                  <h4 style={{ color: 'var(--primary-dark)', fontSize: '14px', marginBottom: '3px' }}>• {factor.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
