import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Signup.css";
import s from "../assets/6430773-transformed.webp";
import { Email, Lock, Phone, Person } from "@mui/icons-material";
import {
  TextField,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogContent,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook-color.svg";
import MicrosoftIcon from "../assets/microsoft.svg";
import { MuiOtpInput } from "mui-one-time-password-input";

function matchIsString(text) {
  return typeof text === "string";
}

function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = matchIsString(text);
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}

const validateChar = (value, index) => {
  return matchIsNumeric(value);
};

function Signup() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    username: "",
    dob: "",
    role: "Student",
    declaration: false,
    otp: "",
    isEmailVerified: false,
  });

  const [click, handleClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
      ...(name === "email" && { isEmailVerified: false }),
    }));
  };

  const handleOtpChange = (otp) => {
    setValue((prevValue) => ({
      ...prevValue,
      otp: otp,
    }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      role: value,
    }));
  };

  const handleComplete = (finalValue) => {
    handleOtpVerification(finalValue);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: checked,
    }));
  };

  const handleEmailVerification = async () => {
    const res = await fetch("/api/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value.email }),
    });

    if (res.ok) {
      console.log("Success");
      setOpen(true);
      setTimer(60);
      setValue((prevValue) => ({ ...prevValue, otp: "" }));
    } else {
      console.error("Retry");
    }
  };

  const handleOtpVerification = async (finalValue) => {
    console.log(finalValue);

    const res = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value.email, otp: finalValue }),
    });

    if (res.ok) {
      console.log("Email verified successfully");
      setValue((prevValue) => ({
        ...prevValue,
        isEmailVerified: true,
      }));
      setOpen(false);
    } else {
      console.error("Failed to verify OTP");
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      password,
      cpassword,
      username,
      dob,
      role,
      declaration,
      isEmailVerified,
    } = value;

    if (!isEmailVerified) {
      return console.error("Please verify your email before proceeding.");
    }

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
        role,
        declaration,
      }),
    });

    const jsondata = res.json();
    if (res.ok) {
      console.log("User registered successfully");
      console.log("this is json data", jsondata);
    } else {
      console.error("Failed to register user");
      console.log("this is json data", jsondata);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setOpen(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="signupdiv">
      <div className="signupdiv1">
        <img src={s} alt="Signup" />
      </div>
      <div className="signupdiv2">
        <h2>Sign Up</h2>
        <div className="terms">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="role"
              name="role"
              value={value.role}
              onChange={handleRoleChange}
            >
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
        </div>
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
              ),
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
              ),
            }}
          />
        </div>
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
            ),
            endAdornment: (
              <InputAdornment position="end">
                {!value.isEmailVerified && value.email && (
                  <Button
                    onClick={handleEmailVerification}
                    variant="text"
                    style={{
                      fontSize: "11px",
                      textTransform: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                      pointerEvents: timer ? "none" : "auto",
                      outline: "none",
                    }}
                  >
                    {timer ? `Resend in ${timer}s` : "Verify"}
                  </Button>
                )}
                {value.isEmailVerified && value.email && (
                  <span style={{ color: "green" }}>✔</span>
                )}
              </InputAdornment>
            ),
          }}
        />
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
              ),
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
              ),
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
              ),
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
          />
        </div>
        <div className="terms">
          <Checkbox
            name="declaration"
            checked={value.declaration}
            onChange={handleCheckboxChange}
          />
          <p>
            {" "}
            I've read and agree with Terms of Service and our Privacy Policy.
          </p>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="signupnormal"
          onClick={PostData}
        >
          Sign up
        </Button>
        <div>
          <p>
            Already have an account?
            <NavLink to="/signin"> Signin </NavLink>
          </p>
        </div>
        <div className="divider">
          <span className="line"></span>
          <span className="or">Or, continue with</span>
          <span className="line"></span>
        </div>
        <div className="external-signup">
          <div
            className="icon-wrapper"
            onClick={() => console.log("Continue with Google")}
          >
            <img src={GoogleIcon} alt="Google" className="icon" />
          </div>
          <span className="separator">|</span>
          <div
            className="icon-wrapper"
            onClick={() => console.log("Continue with Facebook")}
          >
            <img src={FacebookIcon} alt="Facebook" className="icon" />
          </div>
          <span className="separator">|</span>
          <div
            className="icon-wrapper"
            onClick={() => console.log("Continue with Microsoft")}
          >
            <img src={MicrosoftIcon} alt="Microsoft" className="icon-new" />
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
        PaperProps={{
          style: {
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogContent>
          <MuiOtpInput
            length={4}
            autoFocus
            onComplete={handleComplete}
            value={value.otp}
            onChange={handleOtpChange}
            display="flex"
            gap={3}
            validateChar={validateChar}
            TextFieldsProps={{
              style: { width: "50px", height: "50px" },
              placeholder: "-",
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Signup;
