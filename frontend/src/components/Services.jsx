import React from 'react';

export default function Services() {
  const servicesData = [
    {
      title: "Heart Surgery",
      icon: "❤️",
      procedures: [
        "Bypass Surgery (CABG)",
        "Valve Repair & Replacement",
        "Congenital Heart Surgery",
        "Minimally Invasive Cardiac Surgery"
      ]
    },
    {
      title: "Chest Surgery",
      icon: "🫁",
      procedures: [
        "Lung Cancer Surgery",
        "Pleural Disorders & Effusion",
        "Thoracic Trauma Management",
        "Mediastinal Surgery"
      ]
    },
    {
      title: "Lung Surgery",
      icon: "💨",
      procedures: [
        "Lobectomy & Pneumonectomy",
        "Segmentectomy & Wedge Resection",
        "Endoscopic Lung Surgery",
        "Lung Biopsy"
      ]
    },
    {
      title: "Vascular Surgery",
      icon: "🩸",
      procedures: [
        "Aortic Aneurysm Repair",
        "Peripheral Artery Bypass",
        "Carotid Endarterectomy",
        "Varicose Veins Treatment"
      ]
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <span className="section-subtitle">Our Clinical Offerings</span>
        <h2>Our Specialty Services</h2>
        <p className="section-description">
          We offer a comprehensive range of surgical interventions delivered with precision, care, and advanced surgical equipment.
        </p>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <ul>
              {service.procedures.map((proc, pIdx) => (
                <li key={pIdx}>{proc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
