import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export default function BookAppointmentModal({ isOpen, onClose, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    age: '',
    gender: '',
    appointmentDate: '',
    timeSlot: '',
    reason: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validations
    if (!formData.name.trim()) return setError('Please enter patient name.');
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      setLoading(false);
      return setError('Please enter a valid 10-digit mobile number.');
    }
    if (!formData.age || parseInt(formData.age) <= 0) {
      setLoading(false);
      return setError('Please enter a valid age.');
    }
    if (!formData.gender) {
      setLoading(false);
      return setError('Please select a gender.');
    }
    if (!formData.appointmentDate) {
      setLoading(false);
      return setError('Please select an appointment date.');
    }
    if (!formData.timeSlot) {
      setLoading(false);
      return setError('Please select a time slot.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          mobileNumber: formData.mobileNumber,
          age: parseInt(formData.age),
          gender: formData.gender,
          appointmentDate: formData.appointmentDate,
          timeSlot: formData.timeSlot,
          reason: formData.reason
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessData(data);
        if (onBookingSuccess) {
          onBookingSuccess(formData.mobileNumber);
        }
      } else {
        setError(data.error || 'Failed to book appointment. Please try again.');
      }
    } catch (err) {
      setError('Server connection error. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    // Reset state
    setFormData({
      name: '',
      mobileNumber: '',
      age: '',
      gender: '',
      appointmentDate: '',
      timeSlot: '',
      reason: ''
    });
    setSuccessData(null);
    onClose();
  };

  // Get today's date formatted as YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM"
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content-container">
        <div className="modal-header">
          <h2>{successData ? 'Appointment Confirmed!' : 'Book An Appointment'}</h2>
          <button className="close-modal-btn" onClick={successData ? handleCloseSuccess : onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {successData ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ fontSize: '50px', color: 'var(--accent-green)', marginBottom: '15px' }}>✓</div>
              <h3 style={{ color: 'var(--primary-dark)', marginBottom: '10px' }}>Thank You, {successData.patient.name}!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                Your appointment has been successfully scheduled for <strong>{successData.appointmentDate}</strong> at <strong>{successData.timeSlot}</strong>.
              </p>
              
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', textAlign: 'left', marginBottom: '25px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '15px' }}>Patient Portal Access:</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Since you've booked an appointment, you are now registered in our system. You can log in to the <strong>Patient Portal</strong> at any time to:
                </p>
                <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <li>• View upcoming &amp; historical appointments</li>
                  <li>• Cancel or reschedule active bookings</li>
                  <li>• Manage patient profile details</li>
                </ul>
                <p style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '600', marginTop: '12px' }}>
                  Use mobile number <strong>{successData.patient.mobileNumber}</strong> and the OTP code received via SMS to log in.
                </p>
              </div>

              <button className="btn-primary" onClick={handleCloseSuccess} style={{ width: '100%' }}>
                Go back to Homepage
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="form-alert error">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Patient Full Name *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  className="form-input" 
                  placeholder="e.g. John Doe"
                  value={formData.name} 
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number *</label>
                  <input 
                    type="tel" 
                    id="mobileNumber"
                    name="mobileNumber" 
                    className="form-input" 
                    placeholder="e.g. 9876543210"
                    maxLength="10"
                    value={formData.mobileNumber} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input 
                      type="number" 
                      id="age"
                      name="age" 
                      className="form-input" 
                      placeholder="Age"
                      min="1"
                      max="125"
                      value={formData.age} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select 
                      id="gender"
                      name="gender" 
                      className="form-input"
                      value={formData.gender} 
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="appointmentDate">Preferred Date *</label>
                  <input 
                    type="date" 
                    id="appointmentDate"
                    name="appointmentDate" 
                    className="form-input" 
                    min={todayStr}
                    value={formData.appointmentDate} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timeSlot">Preferred Time Slot *</label>
                  <select 
                    id="timeSlot"
                    name="timeSlot" 
                    className="form-input"
                    value={formData.timeSlot} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Visit / Symptoms</label>
                <textarea 
                  id="reason"
                  name="reason" 
                  className="form-input" 
                  rows="3" 
                  placeholder="e.g. Regular cardiac checkup, chest discomfort"
                  value={formData.reason} 
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="portal-submit-btn" disabled={loading}>
                {loading ? 'Processing booking...' : 'Confirm Appointment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
