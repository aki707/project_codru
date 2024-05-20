import React, { useState } from 'react';
import "../styles/Signup.css";
import s from "../assets/6430773-transformed.webp";
import { Email, Lock, Phone, Person } from '@mui/icons-material';
import { TextField, Checkbox, Button, InputAdornment } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import GoogleIcon from '../assets/google.svg';
import FacebookIcon from '../assets/facebook-color.svg';
import MicrosoftIcon from '../assets/microsoft.svg';

function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    username: "",
    dob: "",
    declaration: false
  });
  const [click, handleClick] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setValue((prevValue) => ({
      ...prevValue,
      declaration: e.target.checked
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword, username, dob, declaration } = value;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
        username,
        dob,
        declaration
      }),
    });

    if (res.ok) {
      // Handle successful response
      console.log("User registered successfully");
    } else {
      // Handle error response
      console.error("Failed to register user");
    }
  };

  return (
    <div className="signupdiv">
      <div className="signupdiv1">
        <img src={s} alt="Signup" />
      </div>
      <div className="signupdiv2">
        <h2>Sign Up</h2>
        <div>
          <TextField
            className="text"
            fullWidth
            variant="outlined"
            placeholder="Full Name"
            name="name"
            value={value.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
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
            placeholder="Email ID"
            name="email"
            type="email"
            value={value.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
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
        <div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Re-enter Password"
            name="cpassword"
            type="password"
            value={value.cpassword}
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
        <div>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Phone Number"
            name="phone"
            type="tel"
            value={value.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            name="dob"
            helperText={click && "Fill in your date of birth."}
            type="date"
            value={value.dob}
            onChange={handleChange}
            onFocus={() => handleClick(true)}
            onBlur={() => handleClick(false)}
          />
        </div>
        <div className="terms">
          <Checkbox
            name="declaration"
            checked={value.declaration}
            onChange={handleCheckboxChange}
          />
          <p>I've read and agree with Terms of Service and our Privacy Policy.</p>
        </div>
        <Button variant="contained" color="primary" className='signupnormal' onClick={PostData}>Sign up</Button>
        <div>
          <p>Already have an account? <a href="#">Sign in</a></p>
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
    </div>
  );
}

export default Signup;
