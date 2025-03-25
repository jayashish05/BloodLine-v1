import React, { useState } from 'react';
import { auth } from '../src/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './index.css';

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      // Redirect to dashboard.html in src folder
      window.location.href = './dashboard.html';
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      // Redirect to home.html in src folder
      window.location.href = './home.html';
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className={`container ${isSignUp ? 'signup-active' : ''}`}>
      <div className="header-container">
        <div className={`header login-header ${isSignUp ? 'signup-active' : ''}`}>
          <h1>Welcome Back!</h1>
          <p>Please login to your account</p>
        </div>
        <div className={`header signup-header ${isSignUp ? 'signup-active' : ''}`}>
          <h1>Create Account</h1>
          <p>Please sign up to get started</p>
        </div>
      </div>

      <div className={`form-wrapper ${isSignUp ? 'signup-active' : ''}`}>
        {/* Login Form */}
        <form className="form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {error && <p style={{color: '#e63946'}}>{error}</p>}
          <div className="forgot-password">
            <a href="#forgot">Forgot Password?</a>
          </div>
          <button type="submit" className="blood-btn">Login</button>
          <div className="toggle-button">
            <button type="button" onClick={toggleForm}>Create Account</button>
          </div>
        </form>

        {/* Sign Up Form */}
        <form className="form" onSubmit={handleSignUp}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {error && <p style={{color: '#e63946'}}>{error}</p>}
          <button type="submit" className="blood-btn">Sign Up</button>
          <div className="toggle-button">
            <button type="button" onClick={toggleForm}>Already have an account</button>
          </div>
        </form>
      </div>

      {/* Verification Container */}
      <div className="verification-container">
        <div className="verification-content">
          <h2>Verify Your Email</h2>
          <p>We've sent a verification code to your email</p>
          <input type="text" placeholder="Enter verification code" />
          <button className="blood-btn">Verify</button>
          <div className="resend-code">
            <span>Didn't receive the code? </span>
            <a href="#resend">Resend</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
