import React, { useState } from 'react';
import axios from 'axios';
import './Signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import LOGOefe from './img/LOGOefe.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://efe-travel.com/api/auth/login', formData);
      // Save token or any other data from response
      localStorage.setItem('token', response.data.token);
      // Optionally save user data
      localStorage.setItem('user', JSON.stringify(response.data.data));
      alert('Login successful!');
      navigate('/home'); // Redirect to home or dashboard page
    } catch (error) {
      console.error('There was an error logging in!', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
        <img src={LOGOefe} alt=""  className='image-logo'/>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"><i className="fa-solid fa-envelope" /> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><i className="fa-solid fa-lock" /> Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group remember-me">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="login-button">
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="additional-options">
        <p>Not have any account? <Link to="/sign-up">Sign Up</Link></p>
    
        <p><Link to="/forgot-password">Forget Password?</Link></p>
      </div>
    </div>
  );
};

export default Login;
