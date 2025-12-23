import React, { useState } from 'react';
import logo1 from "../assets/images/logo1.svg";
import VideoPlayer from './VideoPlayer'; 
import logo from '../assets/images/favicon.ico';
import CustomDropdown from './CustomDropdown';

// SVG Icon Components
const NameIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CompanyIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 7v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
  </svg>
);

const StatusIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ClockIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-10 5L2 7"></path>
  </svg>
);

// REPLACE WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqH1_6qS4P9h-72vmw2Nvj_6SkddbiH6KGu6iqjAKJgEzyERT4Q3VCJVIIDnjra30H/exec';

export default function AuditForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    msmeStatus: '',
    employees: '',
    timeline: '',
    mobile: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Dropdown options
  const msmeOptions = [
    { value: 'registered', label: 'Registered' },
    { value: 'not-registered', label: 'Not Registered' },
    { value: 'in-process', label: 'In Process' }
  ];

  const employeeOptions = [
    { value: '1-10', label: '1-10' },
    { value: '11-50', label: '11-50' },
    { value: '51-100', label: '51-100' },
    { value: '100+', label: '100+' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (1 month)' },
    { value: 'short', label: 'Short-term (1-3 months)' },
    { value: 'medium', label: 'Medium-term (3-6 months)' },
    { value: 'long', label: 'Long-term (6+ months)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required');
      return false;
    }
    if (!formData.company.trim()) {
      setErrorMessage('Company Name is required');
      return false;
    }
    if (!formData.msmeStatus) {
      setErrorMessage('MSME Registration Status is required');
      return false;
    }
    if (!formData.employees) {
      setErrorMessage('Number of Employees is required');
      return false;
    }
    if (!formData.timeline) {
      setErrorMessage('Readiness Timeline is required');
      return false;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 10) {
      setErrorMessage('Valid Mobile Number is required (minimum 10 digits)');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Valid Email is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Form Data:', formData);
      
      setSuccessMessage('Thank you! Your request has been submitted. Redirecting to Troudz...');
      setFormData({
        fullName: '',
        company: '',
        msmeStatus: '',
        employees: '',
        timeline: '',
        mobile: '',
        email: '',
      });

      setTimeout(() => {
        window.location.href = 'https://troudz.com';
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="form-background-accent"></div>
      
      <div className="form-wrapper">
        <div className="form-content">
          {/* Left Side - Hero Section */}
          <div className="form-hero">
            <div className="hero-content">
              <div className="brand-section">
                <img src={logo1} alt="Tamil Nadu Logo" className="troudz-logo"/>
                <p className="brand-tagline">Built by Tamil minds, crafted for Tamil Nadu.</p>
              </div>
              
              <div className="hero-text-content">
                <div className="hero-badge">AI-Powered Analysis</div>
                <h1 className="hero-title">Digital Transformation Audit</h1>
                <p className="hero-description">
                  Get a comprehensive assessment of your business readiness for digital transformation. Our expert team will guide you through the journey.
                </p>
                <div className="hero-features">
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Expert Analysis</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Actionable Insights</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Custom Roadmap</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player Component */}
            <VideoPlayer 
              videoId="EaKihYESXvw" 
              buttonText="Watch Our Story" 
            />

            <div className="right-bottom-text">Powered by</div>
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <div className="form-input-wrapper">
                  <NameIcon />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your full name"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Company Name <span className="required">*</span>
                </label>
                <div className="form-input-wrapper">
                  <CompanyIcon />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your company"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Custom Dropdown for MSME Status */}
              <CustomDropdown
                id="msmeStatus"
                name="msmeStatus"
                value={formData.msmeStatus}
                onChange={handleInputChange}
                options={msmeOptions}
                icon={StatusIcon}
                label="MSME Registration"
                required={true}
                disabled={isLoading}
                placeholder="Select Status"
              />

              {/* Custom Dropdown for Employees */}
              <CustomDropdown
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                options={employeeOptions}
                icon={UsersIcon}
                label="Number of Employees"
                required={true}
                disabled={isLoading}
                placeholder="Select Range"
              />

              {/* Custom Dropdown for Timeline */}
              <CustomDropdown
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                options={timelineOptions}
                icon={ClockIcon}
                label="Readiness Timeline"
                required={true}
                disabled={isLoading}
                placeholder="Select Timeline"
              />

              <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <div className="form-input-wrapper">
                  <PhoneIcon />
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+91 98765 43210"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="required">*</span>
                </label>
                <div className="form-input-wrapper">
                  <EmailIcon />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="alert alert-error">
                  <span className="alert-icon">⚠</span>
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success">
                  <span className="alert-icon">✓</span>
                  {successMessage}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Start Your Audit'
                )}
              </button>

              <p className="form-footer">
                We respect your privacy. Your data is secure and confidential.
              </p>
            </div>
            <div className="left-bottom-text"><img src={logo} alt="Logo" /> Troudz AI Labs</div>
          </div>
        </div>
        
        {/* Mobile Footer */}
        <div className="mobile-footer">
          Powered by <img src={logo} alt="Logo" /> Troudz AI Labs
        </div>
      </div>
    </div>
  );
}