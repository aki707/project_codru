import React from 'react';
import Video from '../assets/buy.mp4';
import "../styles/Buy.css";

const Buy = () => {
  return (
    <div className="login-page">
      <div className="overlay-bg">
        <div className="login-wrapper">
          <div className="left-section">
            <video className="background-video" autoPlay loop muted>
              <source src={Video} type="video/mp4" />
            </video>
          </div>
          <div className="right-section">
            <div className="form-container">
              <h1>Have a Great Future ahead!</h1>
              <form>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" required />
                </div>
                <div className="actions">
                  <div className="remember-me">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember Me</label>
                  </div>
                  <a href="/recovery">Recovery Password</a>
                </div>
                <button type="submit" className="login-button">Login</button>
                <button type="button" className="google-login">Sign in with Google</button>
              </form>
              <p>Don't have an account yet? <a href="/signup">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
