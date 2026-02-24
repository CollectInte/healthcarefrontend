import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Dr. James Wilson',
    role: 'Chief Medical Officer',
    company: 'Northwest Family Clinic',
    avatar: 'JW',
    color: '#1e6fcf',
    stars: 5,
    text: 'Thinkitive transformed our practice with a custom EHR that perfectly fits our workflow. Patient satisfaction scores increased by 40% after implementation. Their team was responsive and truly understood our clinical needs.',
  },
  {
    name: 'Dr. Maria Rodriguez',
    role: 'Practice Director',
    company: 'Sunshine Pediatrics Group',
    avatar: 'MR',
    color: '#27ae60',
    stars: 5,
    text: 'The custom EHR system they built handles our complex multi-location practice seamlessly. The billing module alone has increased our collections by 30%. Highly recommend their team for any healthcare organization.',
  },
  {
    name: 'Dr. David Kim',
    role: 'Founder & CEO',
    company: 'MindWell Psychiatry',
    avatar: 'DK',
    color: '#8e44ad',
    stars: 5,
    text: 'Unlike off-the-shelf solutions, Thinkitive built exactly what we needed for behavioral health. The progress notes templates and treatment planning tools are exceptional. Best investment we have made for our practice.',
  },
];

const Testimonials = () => (
  <section className="testimonials" id="testimonials">
    <div className="container">
      <div className="section-header">
        <div className="section-label">Client Success Stories</div>
        <h2 className="section-title">What Our Clients Say About Us</h2>
        <p className="section-subtitle">Trusted by 200+ healthcare organizations nationwide</p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="testimonial-stars">
              {'★'.repeat(t.stars)}
            </div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{background: t.color}}>{t.avatar}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
                <div className="author-company">{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
