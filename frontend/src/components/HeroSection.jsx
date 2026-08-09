import React from 'react';

export default function HeroSection({ onBookClick, onAboutMeClick }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-tagline">Expert Care • Compassionate Hearts</span>
        <h2>Advanced Heart, Chest, Lung &amp; Vascular Care</h2>
        <p className="hero-description">
          Liberty Heart &amp; Vascular Surgery Centre is a dedicated super-specialty centre providing comprehensive care for all types of heart diseases, chest conditions, lung disorders, and vascular diseases. We combine advanced surgical technology with clinical excellence to deliver the best outcomes for our patients.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onBookClick}>
            Book Appointment
          </button>
          <button className="btn-secondary" onClick={onAboutMeClick}>
            Meet Our Surgeon
          </button>
        </div>
      </div>
      <div className="hero-graphic">
        <svg viewBox="0 0 200 200" className="heart-pulse-svg">
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4b4b" />
              <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
          </defs>
          {/* Pulsing Heart Shape */}
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            transform="scale(7.5) translate(2, 1.5)"
            fill="url(#heartGrad)"
          />
          {/* ECG Line Overlay */}
          <path 
            d="M30 110 L70 110 L80 90 L90 130 L100 100 L108 115 L115 110 L170 110" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="3.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
