import React from 'react';
import doctorPhoto from '../assets/doctor.png';

export default function AboutMe() {
  return (
    <section className="doctor-profile-section" id="about-me">
      <div className="profile-layout">
        <div className="profile-image-container">
          <div className="profile-image-bg"></div>
          <img src={doctorPhoto} alt="Dr. T. Hemachandra" className="doctor-photo" />
        </div>
        <div className="profile-info">
          <span className="doctor-title">Meet Our Chief Surgeon</span>
          <h2 className="doctor-name">Dr. T. Hemachandra</h2>
          <p className="doctor-credentials">M.Ch (Cardiothoracic &amp; Vascular Surgery), DNB, MBBS, FIAGES</p>
          <p className="doctor-designation">Consultant Cardiothoracic &amp; Vascular Surgeon</p>
          <span className="doctor-tag">Founder &amp; Chief Surgeon</span>

          <div className="doctor-sections-grid">
            <div className="doc-info-block">
              <h3>Education &amp; Qualifications</h3>
              <ul>
                <li><strong>2023</strong> — M.Ch (Cardiothoracic Surgery) - NIMS, Hyderabad</li>
                <li><strong>2020</strong> — Fellow in Indian Association of Gastrointestinal Endo-Surgeons (FIAGES)</li>
                <li><strong>2014</strong> — DNB (Gen. Surgery) - Durgabai Deshmukh Hospital, Hyderabad</li>
                <li><strong>2009</strong> — Diploma in Yoga</li>
                <li><strong>2008</strong> — MBBS - SV Medical College, Tirupati</li>
              </ul>
            </div>

            <div className="doc-info-block">
              <h3>Professional Experience</h3>
              <ul>
                <li><strong>Founder &amp; Chief Surgeon</strong><br />Liberty Heart Surgery Centre, Tirupati</li>
                <li><strong>Assistant Professor</strong><br />SVRRGGH (RUIA Hospital), Tirupati</li>
                <li><strong>Assistant Professor</strong><br />SVIMS, Tirupati</li>
              </ul>
            </div>

            <div className="doc-info-block">
              <h3>My Ambition</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                To build a leading centre of excellence that provides world-class, ethical, and affordable cardiac, chest, lung, and vascular surgical care for every patient, restoring them to full health.
              </p>
            </div>

            <div className="doc-info-block">
              <h3>My Goals</h3>
              <ul style={{ paddingLeft: '5px' }}>
                <li>• Deliver outstanding clinical outcomes</li>
                <li>• Utilize advanced technology responsibly</li>
                <li>• Ensure patient safety and absolute satisfaction</li>
                <li>• Make high-quality care accessible to all</li>
              </ul>
            </div>
          </div>

          <div className="doctor-quote-box">
            "Healing hearts. Restoring lives. Building trust. This is not just my profession, it is my purpose."
            <span>— Dr. T. Hemachandra</span>
          </div>
        </div>
      </div>
    </section>
  );
}
