'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Navigation } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    // Simulate submission
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="container">
        <div className="contact-grid">
          {/* ================= INFO COLUMN ================= */}
          <div className="contact-info-col">
            <span className="category-label" style={{ marginBottom: '8px' }}>Reach Out</span>
            <h1 className="contact-title">Contact Our Newsroom</h1>
            <p className="contact-description">
              Have a news tip, an inquiry about our editorial coverage, or feedback on our stories? Get in touch with our editorial team. If you are submitting pitch proposals, please review our Editorial Guidelines first.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <Mail size={18} className="contact-detail-icon" />
                <div>
                  <h3 className="contact-detail-label">General & Tips</h3>
                  <p className="contact-detail-value">newsroom@nepaldecodes.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <Phone size={18} className="contact-detail-icon" />
                <div>
                  <h3 className="contact-detail-label">Press & Inquiries</h3>
                  <p className="contact-detail-value">+977 1 5543210 (Mon-Fri, 9AM-5PM)</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <MapPin size={18} className="contact-detail-icon" />
                <div>
                  <h3 className="contact-detail-label">Office Address</h3>
                  <p className="contact-detail-value">
                    Nepal Decodes Editorial Office<br />
                    4th Floor, Heritage Plaza, Jhamsikhel<br />
                    Lalitpur 44600, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Vector Map Placeholder */}
            <div className="contact-map-placeholder">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="map-svg-placeholder"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                <Navigation size={14} className="contact-detail-icon" />
                Jhamsikhel, Lalitpur (27.6791° N, 85.3117° E)
              </div>
            </div>
          </div>

          {/* ================= FORM COLUMN ================= */}
          <div className="contact-form-col">
            <h2 className="contact-form-heading">Send a Message</h2>
            
            {status === 'success' && (
              <div className="contact-success-alert animate-fade-in">
                <CheckCircle size={18} />
                <span>Your message has been sent successfully. We will respond shortly.</span>
              </div>
            )}

            {status === 'error' && (
              <p style={{ color: 'var(--color-primary)', fontSize: '14px', marginBottom: '16px' }}>
                Please fill in all required fields.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="name-input">Full Name *</label>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Anil Gurung"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email-input">Email Address *</label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="anil@domain.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    required
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="subject-select">Subject of Inquiry</label>
                <select
                  id="subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-main)',
                    outline: 'none'
                  }}
                  disabled={status === 'submitting'}
                >
                  <option value="general">General Inquiry</option>
                  <option value="tips">Submit a News Tip</option>
                  <option value="pitch">Editorial Pitch / Proposal</option>
                  <option value="press">Press & Media Relations</option>
                </select>
              </div>

              <div className="contact-form-group contact-form-group-full">
                <label htmlFor="message-textarea">Message *</label>
                <textarea
                  id="message-textarea"
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  rows={6}
                  required
                  disabled={status === 'submitting'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary contact-form-submit-btn"
              >
                {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
