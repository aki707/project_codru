import React, { useState } from 'react';
import "../styles/Signup.css";
import s from "../assets/6430773-transformed.webp";
import { Email, Lock, Phone, Person } from '@mui/icons-material';
import { TextField, Checkbox, Button, InputAdornment } from '@mui/material';

function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    username: "",
    dob: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
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
            fullWidth
            variant="outlined"
            label="Full Name"
            name="name"
            value={value.name}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Email ID"
            name="email"
            type="email"
            value={value.email}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Password"
            name="password"
            type="password"
            value={value.password}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Re-enter Password"
            name="cpassword"
            type="password"
            value={value.cpassword}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Phone Number"
            name="phone"
            type="tel"
            value={value.phone}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Username"
            name="username"
            value={value.username}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
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
            label="Date of Birth"
            name="dob"
            type="date"
            value={value.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="terms">
          <Checkbox name="terms" />
          <p>I've read and agree with Terms of Service and our Privacy Policy</p>
        </div>
        <Button variant="contained" color="primary" className='signupnormal'>Sign up</Button>
        <div className="external-signup">
          <Button variant="contained" className="google">Sign up with Google</Button>
          <Button variant="contained" className="facebook">Sign up with Facebook</Button>
        </div>
        <div>
          <p>Already have an account? <a href="#">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
