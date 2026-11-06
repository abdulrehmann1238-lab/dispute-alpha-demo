import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface LandingFooterProps {
  onRequestDemo: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onRequestDemo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!company.trim()) errs.company = 'Company is required';
    if (!message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <footer className="bg-navy text-white pt-20 pb-12 border-t border-navy-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Contact Form & Brand Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="lg" light showTagline={true} />
            <p className="text-xs text-white/70 leading-relaxed max-w-sm pt-2">
              Dispute Alpha is a modern, high-precision credit dispute operations platform engineered for professional credit repair organizations, compliance leaders, and specialized dispute analysts.
            </p>
            <div className="pt-2 text-xs text-white/50">
              <p>Demo Simulation Environment • Confidential Founder Preview</p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-1">
              Connect with our Solutions Team
            </h3>
            <p className="text-xs text-white/70 mb-5">
              Send an inquiry regarding our enterprise architecture, compliance workflows, or team licensing.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-white/10 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-sage mx-auto" />
                <h4 className="text-sm font-semibold text-white">Message Acknowledged</h4>
                <p className="text-xs text-white/70">
                  Thank you, <span className="font-semibold text-white">{name}</span>. In a live system, our team would reach out to {email} promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white/10 border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-sage ${
                        errors.name ? 'border-red-400' : 'border-white/10'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-300 mt-0.5">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Work Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white/10 border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-sage ${
                        errors.email ? 'border-red-400' : 'border-white/10'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-300 mt-0.5">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white/10 border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-sage ${
                        errors.company ? 'border-red-400' : 'border-white/10'
                      }`}
                    />
                    {errors.company && <p className="text-[10px] text-red-300 mt-0.5">{errors.company}</p>}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Brief description of your operational goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-3 py-2 text-xs bg-white/10 border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-sage ${
                      errors.message ? 'border-red-400' : 'border-white/10'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-300 mt-0.5">{errors.message}</p>}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-navy bg-white hover:bg-sage-light rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Transmit Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Platform</p>
            <ul className="space-y-2 text-white/70">
              <li>Client Management</li>
              <li>Credit Report Review</li>
              <li>Dispute Tracking</li>
              <li>Letter Management Studio</li>
              <li>Statutory Calendar</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Capabilities</p>
            <ul className="space-y-2 text-white/70">
              <li>Human Approval Gates</li>
              <li>Multi-Bureau Coordination</li>
              <li>Letter Template Engine</li>
              <li>Client Self-Service Portal</li>
              <li>Full Audit Logging</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Resources</p>
            <ul className="space-y-2 text-white/70">
              <li>How It Works</li>
              <li>Operational Workflows</li>
              <li>Security Philosophy</li>
              <li>Bureau Directory Reference</li>
              <li>FCRA Guidelines Overview</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Engagement</p>
            <ul className="space-y-2 text-white/70">
              <li>
                <button onClick={onRequestDemo} className="hover:text-white text-left">
                  Request a Private Demo
                </button>
              </li>
              <li>Contact Solutions Team</li>
              <li>Compliance Standards</li>
              <li>Release Notes v1.0.0</li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© 2026 Dispute Alpha Operations. All rights reserved. Interactive Demonstration Build.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>FCRA Notice</span>
            <span>Demonstration Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

