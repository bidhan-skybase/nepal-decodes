'use client';

import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="newsletter-card">
      {status === 'success' ? (
        <div className="newsletter-success animate-fade-in">
          <CheckCircle2 size={36} className="success-icon" />
          <h4 className="success-heading">Thank you for subscribing</h4>
          <p className="success-text">
            You will now receive our weekly investigative briefs, explainers, and long-form dispatches. Welcome to Nepal Decodes.
          </p>
        </div>
      ) : (
        <div className="newsletter-form-container">
          <div className="newsletter-meta">
            <span className="newsletter-label">Weekly Dispatch</span>
            <h3 className="newsletter-heading">Understand Nepal in Depth</h3>
            <p className="newsletter-text">
              Join a community of thoughtful readers. Get our best stories, explainers, and essays delivered straight to your inbox. No clickbait, no spam.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <Mail size={16} className="newsletter-mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                className={`newsletter-input ${status === 'error' ? 'newsletter-input-error' : ''}`}
                aria-label="Email address"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary newsletter-submit-btn"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {status === 'error' && (
            <p className="newsletter-error-message">Please enter a valid email address.</p>
          )}
        </div>
      )}
    </div>
  );
}
