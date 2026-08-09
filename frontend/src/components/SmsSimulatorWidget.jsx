import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function SmsSimulatorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mock-sms/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        
        // If the inbox is closed and new messages arrived, increment unread badge
        if (!isOpen && data.length > lastMessageCount) {
          setUnreadCount(prev => prev + (data.length - lastMessageCount));
        }
        setLastMessageCount(data.length);
      }
    } catch (err) {
      console.warn('SMS Simulator offline: backend not running yet.', err.message);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchMessages();

    // Poll every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [isOpen, lastMessageCount]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0); // clear badge when opened
    }
  };

  const handleClear = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mock-sms/clear`, {
        method: 'POST'
      });
      if (response.ok) {
        setMessages([]);
        setLastMessageCount(0);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error clearing messages', err);
    }
  };

  const copyOtp = (text, msgId) => {
    const otpRegex = /\b\d{6}\b/;
    const match = text.match(otpRegex);
    if (match) {
      const otp = match[0];
      navigator.clipboard.writeText(otp).then(() => {
        setCopiedId(msgId);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="sms-simulator-widget">
      {isOpen && (
        <div className="phone-mockup-container">
          <div className="phone-speaker"></div>
          <div className="phone-screen">
            <div className="phone-header">
              <span>Liberty Sim</span>
              <span>12:00 PM</span>
              <span>🔋 99%</span>
            </div>
            <div className="phone-title-bar">
              <h4>SMS Gateway</h4>
              <p>Developer Simulator Console</p>
            </div>
            
            {messages.length === 0 ? (
              <div className="no-sms-view">
                <div className="no-sms-icon">💬</div>
                <p>No SMS messages yet.</p>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '10px' }}>
                  Book an appointment or request a login OTP to see messages here.
                </p>
              </div>
            ) : (
              <div className="sms-inbox">
                {messages.map((msg, index) => {
                  const hasOtp = /\b\d{6}\b/.test(msg.message);
                  return (
                    <div className="sms-bubble" key={index}>
                      <div style={{ fontWeight: '700', fontSize: '11px', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                        To: {msg.mobileNumber}
                      </div>
                      <div>{msg.message}</div>
                      <div className="sms-bubble-meta">
                        <span>{formatTime(msg.timestamp)}</span>
                        {hasOtp && (
                          <button 
                            className={`sms-bubble-copy ${copiedId === index ? 'copied' : ''}`}
                            onClick={() => copyOtp(msg.message, index)}
                          >
                            {copiedId === index ? '✓ Copied' : 'Copy OTP'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="phone-actions-footer">
              {messages.length > 0 && (
                <button className="clear-sms-btn" onClick={handleClear}>
                  Clear All Messages
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button className="sms-toggle-btn" onClick={handleToggle} title="Open SMS Gateway Console">
        📱
        {unreadCount > 0 && <span className="sms-badge-count">{unreadCount}</span>}
      </button>
    </div>
  );
}
