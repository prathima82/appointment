import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function PatientPortal({ session, setSession, onBookNewClick }) {
  // Login State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dashboard State
  const [appointments, setAppointments] = useState([]);
  const [dashboardError, setDashboardError] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  // Fetch appointments for the logged-in patient
  const fetchAppointments = async () => {
    if (!session) return;
    setDashboardLoading(true);
    setDashboardError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/my?mobileNumber=${session.patient.mobileNumber}`, {
        headers: {
          'X-Patient-Mobile': session.patient.mobileNumber
        }
      });
      
      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      } else {
        setDashboardError(data.error || 'Failed to fetch appointments.');
      }
    } catch (err) {
      setDashboardError('Failed to fetch appointments: server connection issue.');
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAppointments();
    }
  }, [session]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobileNumber.trim() || mobileNumber.length < 10) {
      return setAuthError('Please enter a valid 10-digit mobile number.');
    }

    setLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber })
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setAuthSuccess(data.message || 'OTP sent successfully! Check the SMS Simulator widget.');
      } else {
        setAuthError(data.error || 'Login failed. Mobile number might not be registered.');
      }
    } catch (err) {
      setAuthError('Connection error. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length < 6) {
      return setAuthError('Please enter a 6-digit OTP code.');
    }

    setLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber, otpCode })
      });

      const data = await response.json();
      if (response.ok) {
        // Save session (patient object and token)
        setSession(data);
      } else {
        setAuthError(data.error || 'Verification failed. Please try again.');
      }
    } catch (err) {
      setAuthError('Connection error. Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (apptId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/${apptId}/cancel`, {
        method: 'POST',
        headers: {
          'X-Patient-Mobile': session.patient.mobileNumber
        }
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment cancelled successfully.');
        fetchAppointments(); // reload
      } else {
        alert(data.error || 'Failed to cancel appointment.');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  const handleLogout = () => {
    setSession(null);
    setMobileNumber('');
    setOtpCode('');
    setOtpSent(false);
    setAuthError(null);
    setAuthSuccess(null);
    setAppointments([]);
  };

  // Helper to parse date to display month / day clearly
  const parseDate = (dateStr) => {
    try {
      const dateObj = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        day: dateObj.getDate().toString().padStart(2, '0'),
        month: months[dateObj.getMonth()],
        year: dateObj.getFullYear()
      };
    } catch (e) {
      return { day: '00', month: 'N/A', year: '' };
    }
  };

  // 1. Dashboard View
  if (session) {
    const { patient } = session;
    return (
      <section className="portal-section">
        <div className="portal-card">
          <div className="dashboard-header">
            <div className="dashboard-patient-welcome">
              <h2>Welcome Back, {patient.name}</h2>
              <span className="patient-badge">Mobile: {patient.mobileNumber} | Age: {patient.age} ({patient.gender})</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          </div>
          
          <div className="dashboard-content">
            <div className="dashboard-appointments-section">
              <h3>Your Bookings</h3>
              
              {dashboardLoading && <p style={{ color: 'var(--text-secondary)' }}>Loading your appointments...</p>}
              {dashboardError && <div className="form-alert error">{dashboardError}</div>}
              
              {!dashboardLoading && appointments.length === 0 && (
                <div className="no-appointments-box">
                  <p>You do not have any appointments booked.</p>
                  <button className="btn-primary" onClick={onBookNewClick}>Book An Appointment Now</button>
                </div>
              )}
              
              {!dashboardLoading && appointments.length > 0 && (
                <div className="appointments-list">
                  {appointments.map((appt) => {
                    const parsed = parseDate(appt.appointmentDate);
                    return (
                      <div className="appointment-item" key={appt.id}>
                        <div className="appt-info-main">
                          <div className="appt-date-block">
                            <div className="appt-date-day">{parsed.day}</div>
                            <div className="appt-date-month">{parsed.month}</div>
                            <div style={{ fontSize: '9px', opacity: 0.8 }}>{parsed.year}</div>
                          </div>
                          <div className="appt-details-text">
                            <h4>Liberty Heart &amp; Vascular Surgery</h4>
                            <p style={{ fontWeight: 600 }}>⏰ Slot: {appt.timeSlot}</p>
                            {appt.reason && <p className="appt-reason">Reason: "{appt.reason}"</p>}
                          </div>
                        </div>

                        <div className="appt-status-cancel">
                          <span className={`status-badge ${appt.status.toLowerCase()}`}>
                            {appt.status}
                          </span>
                          {appt.status === 'BOOKED' && (
                            <button 
                              className="cancel-appt-btn"
                              onClick={() => handleCancelAppointment(appt.id)}
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. Login View
  return (
    <section className="portal-section">
      <div className="portal-card" style={{ maxWidth: '800px' }}>
        <div className="portal-login-split">
          <div className="portal-login-hero">
            <h2>Patient Portal</h2>
            <p>
              Log in using your registered mobile number and an OTP code.
            </p>
            <p style={{ marginTop: '15px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
              Note: Registration occurs automatically after booking your first appointment.
            </p>
          </div>
          <div className="portal-login-form-container">
            <h3>Login</h3>
            <p className="form-subtitle">Verify your identity to manage appointments.</p>
            
            {authError && <div className="form-alert error">{authError}</div>}
            {authSuccess && <div className="form-alert success">{authSuccess}</div>}

            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label htmlFor="loginMobile">Mobile Number</label>
                  <input 
                    type="tel" 
                    id="loginMobile"
                    className="form-input" 
                    placeholder="Enter registered mobile number"
                    value={mobileNumber}
                    maxLength="10"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="portal-submit-btn" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Request OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label htmlFor="loginOtp">Enter 6-Digit OTP</label>
                  <input 
                    type="text" 
                    id="loginOtp"
                    className="form-input otp-cell-input" 
                    placeholder="------"
                    maxLength="6"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="portal-submit-btn" disabled={loading}>
                  {loading ? 'Verifying OTP...' : 'Verify & Log In'}
                </button>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Didn't receive the SMS? </span>
                  <button type="button" className="resend-link-btn" onClick={handleSendOtp} disabled={loading}>
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
