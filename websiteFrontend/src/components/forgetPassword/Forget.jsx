import React, { useState } from 'react';
import './forget.css';

function Forget() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://efe-travel.com/api/auth/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage("email sent");

     
      } else {
        setMessage("email not send");
        //console.log('Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div className="forgot-password1">
      <div className="forget-card">
        <div className="forget-heading">
          <h3>Forgot Password</h3>
        </div>
        <div className="input-section">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button onClick={handleSubmit}>
            Submit
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Forget;
