import React, { useState } from 'react';
import "../styles/Signin.css";
import { NavLink } from "react-router-dom";
import signin from '../assets/signin.png';
import s from "../assets/6430773-transformed.webp";
import { Lock, Person } from '@mui/icons-material';
import { TextField, Button, InputAdornment } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import GoogleIcon from '../assets/google.svg';
import FacebookIcon from '../assets/facebook-color.svg';
import MicrosoftIcon from '../assets/microsoft.svg';

function Signin() {
  const [value, setValue] = useState({
    username: "",
    password: "",
   
  
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };


  const PostData = async (e) => {
    e.preventDefault();
    const { username, password} = value;

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        
      }),
    });

    if (res.ok) {
      // Handle successful response
      console.log("Welcome!");
    } else {
      // Handle error response
      console.error("Failed to Sign In");
    }
  };

  return (
    <div className="signindiv">
      <div className="signindiv1">
        <img src={signin} alt="SignIn" />
      </div>
      <div className="signindiv2">
        <h2>Sign In</h2>
       
        <div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Username"
            name="username"
            value={value.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              )
            }}
          />
        </div>
        
        <div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Password"
            name="password"
            type="password"
            value={value.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              )
            }}
          />
        </div>
      
        </div>
        <div className='button'>
        <Button variant="contained" color="primary" className='signinnormal' onClick={PostData}>Sign in</Button>
        </div>
        
        <div className='donothave'>
          <p>Don't have an account?  <NavLink to="/signup" >
              Sign up
            </NavLink></p>
        </div>
        <div className="divider">
          <span className="line"></span>
          <span className="or">Or, continue with</span>
          <span className="line"></span>
        </div>
        <div className="external-signup">
          <div className="icon-wrapper" onClick={() => console.log('Continue with Google')}>
            <img src={GoogleIcon} alt="Google" className="icon" />
          </div>
          <span className="separator">|</span>
          <div className="icon-wrapper" onClick={() => console.log('Continue with Facebook')}>
            <img src={FacebookIcon} alt="Facebook" className="icon" />
          </div>
          <span className="separator">|</span>
          <div className="icon-wrapper" onClick={() => console.log('Continue with Microsoft')}>
            <img src={MicrosoftIcon} alt="Microsoft" className="icon" />
          </div>
        </div>

    </div>
  );
}

export default Signin;