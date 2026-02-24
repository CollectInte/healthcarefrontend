import React from 'react';
import './Specialties.css';

const specialties = [
  {icon:'🏥',name:'Family Medicine'},{icon:'🧠',name:'Psychiatry & Behavioral Health'},
  {icon:'❤️',name:'Cardiology'},{icon:'🦴',name:'Orthopedics'},
  {icon:'👶',name:'Pediatrics'},{icon:'👁️',name:'Ophthalmology'},
  {icon:'🦷',name:'Dental & Oral Health'},{icon:'🧬',name:'Oncology'},
  {icon:'🤰',name:'OB/GYN'},{icon:'🧪',name:'Pathology & Lab'},
  {icon:'💆',name:'Physical Therapy'},{icon:'🦻',name:'ENT'},
  {icon:'🩺',name:'Internal Medicine'},{icon:'🧓',name:'Geriatrics'},
  {icon:'🩻',name:'Radiology'},{icon:'🫁',name:'Pulmonology'},
];

const Specialties = () => (
  <section className="specialties" id="specialties">
    <div className="container">
      <div className="section-header">
        <div className="section-label">Medical Specialties</div>
        <h2 className="section-title">Practice-Specific EHR for Every Specialty</h2>
        <p className="section-subtitle">
          Choose Your Preferred Specialty to View Our EHR System Features & Demo
        </p>
      </div>
      <div className="specialties-grid">
        {specialties.map((s, i) => (
          <div className="specialty-card" key={i}>
            <span className="specialty-icon">{s.icon}</span>
            <span className="specialty-name">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Specialties;
