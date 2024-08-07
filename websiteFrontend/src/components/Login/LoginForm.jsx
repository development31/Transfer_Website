import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import './LoginForm.css';
import LOGOefe from './img/LOGOefe.jpg'; // Import the logo

const LoginForm = () => {
  const [loginData, setData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://efe-travel.com/api/auth/login", { // Changed to http
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (res.ok) {
        const responseData = await res.json();

        login(responseData.token);
        const userId = responseData.data._id;
        const token = responseData.token;

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);

        setData({ email: "", password: "" });
        navigate('/');
        setMessage('Login successful');
      } else {
        setMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error("Error", error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-section">
      <div className='login'>
        <div className="main">
          <Link to='/'>
            <img src={LOGOefe} alt="" className='img-logo' />
          </Link>
          <h3>Welcome to EFE Travel</h3>
          <form onSubmit={handleSubmit}>
            <div className='input-text'>
              <div className='input-info'>
                <label htmlFor="email"><i className="fa-solid fa-envelope"></i> &nbsp; Email</label>
                <input
                  type="text"
                  name='email'
                  value={loginData.email}
                  placeholder="Enter Email"
                  onChange={handleInput}
                  style={{ textDecoration: "green", color: "black", width: "100%", margin: "0 " }}
                />
              </div>
              <div className='input-info'>
                <label htmlFor="password"><i className="fa-solid fa-lock"></i> &nbsp; Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  placeholder="Enter Password"
                  onChange={handleInput}
                  style={{ textDecoration: "green", color: "black", width: "100%", margin: "0" }}
                />
              </div>
            </div>
            <div className="wrap">
              <button type="submit">
                Login
              </button>
            </div>
          </form>
          {message && <div className="message">{message}</div>}
          <div className="forget-section" style={{ textDecoration: "green" }}>
            <Link to="/Forget" style={{ color: "black" }}>Forgot Password?</Link>
            <Link to="/Register" style={{ color: "#4a90e2" }}>Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
