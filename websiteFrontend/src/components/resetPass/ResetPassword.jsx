import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Reset.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); 

  useEffect(() => {
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('Invalid or missing token');
      return;
    }

    try {
      const response = await fetch('https://efe-travel.com/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Invalid token or something went wrong');
      }
    } catch (error) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-card">
        <div className="reset-heading">
          <h3>Reset Password</h3>
        </div>
        <div className="reset-section">  
        
          <form onSubmit={handleSubmit}>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              Submit
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
