import React from 'react';

export default function AboutHospital() {
  return (
    <section className="about-hospital-container" id="about-hospital">
      <div className="section-header">
        <span className="section-subtitle">About Our Institution</span>
        <h2>Liberty Heart &amp; Vascular Surgery Centre</h2>
        <p className="section-description">
          We combine advanced surgical technology with clinical dedication to provide patients with excellent, personalized healthcare solutions.
        </p>
      </div>

      <p style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
        Liberty Heart &amp; Vascular Surgery Centre is a dedicated super-specialty centre for comprehensive care of all types of heart diseases, chest conditions, lung disorders and vascular diseases. Our state-of-the-art facilities and experienced clinical team are optimized to handle both routine consultations and complex surgical interventions with precision.
      </p>

      <div className="mv-cards-grid">
        <div className="mv-card">
          <div className="mv-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To provide world-class cardiac care with compassion, integrity and innovation, making high-quality thoracic and vascular surgical treatments accessible.
          </p>
        </div>

        <div className="mv-card">
          <div className="mv-icon">👁️</div>
          <h3>Our Vision</h3>
          <p>
            To be a trusted, leading super-specialty centre in heart, chest, lung, and vascular care, improving patient lives through clinical excellence and advanced treatments.
          </p>
        </div>

        <div className="mv-card">
          <div className="mv-icon">🤝</div>
          <h3>Our Motto</h3>
          <p style={{ fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)' }}>
            TRUST. CARE. PRECISION.
          </p>
          <p style={{ fontSize: '13px', marginTop: '10px' }}>
            A triad of values guiding our clinical practice and patients' treatment pathways every single day.
          </p>
        </div>
      </div>
    </section>
  );
}
