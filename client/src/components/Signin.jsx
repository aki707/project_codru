// import  { useState } from 'react';
// import "../styles/Signin.css";
// import { NavLink } from "react-router-dom";
// import signin from '../assets/signin.png';
// import c3 from '../assets/c3.png';

// import { Lock, Person } from '@mui/icons-material';
// import { TextField, Button, InputAdornment } from '@mui/material';
// import GoogleIcon from '../assets/google.svg';
// import FacebookIcon from '../assets/facebook-color.svg';
// import MicrosoftIcon from '../assets/microsoft.svg';


// function Signin() {
//   const [value, setValue] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValue((prevValue) => ({
//       ...prevValue,
//       [name]: value
//     }));
//   };

//   const PostData = async (e) => {
//     e.preventDefault();
//     const { username, password} = value;

//     const res = await fetch("/api/signin", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });

//     if (res.ok) {
//       // Handle successful response
//       console.log("Welcome!");
//     } else {
//       // Handle error response
//       console.error("Failed to Sign In");
//     }
//   };

//   return (

    
//     <div className="signindiv">
      
      
//       <div className="signindiv1">
      

    
//         <div className="img">
//           <div className='logo2'>
//           <img className="img1" src={c3} alt="SignIn" />
//           </div>
   
   
//           <img className="image" src={signin} alt="SignIn" />
//         </div>

//         <div className="signindiv2">
//           <h2 className='signin'>Sign In</h2>

//           <div className="username-input">
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Username"
//               name="username"
//               value={value.username}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Person />
                
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </div>

//           <div className="password-input">
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Password"
//               name="password"
//               type="password"
//               value={value.password}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock />
                
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </div>

//           <Button
//            fullWidth 
//             variant="contained"
//             color="primary"
//             className="signinnormal"
//             onClick={PostData}
//           >
//             Sign in
//           </Button>

//           <div className="donothave">
//             <p>
//               Don't have an account? <NavLink to="/signup">Sign up</NavLink>
//             </p>
//           </div>

//           <div className="donothave">
//             <p>------ or Try! ------</p>
//           </div>

//           <div className="external">
//             <div
//               className="icon-wrapper"
//               onClick={() => console.log("Continue with Google")}
//             >
//               <img src={GoogleIcon} alt="Google" className="icon" />
//             </div>
//             <span className="separator">|</span>
//             <div
//               className="icon-wrapper"
//               onClick={() => console.log("Continue with Facebook")}
//             >
//               <img src={FacebookIcon} alt="Facebook" className="icon" />
//             </div>
//             <span className="separator">|</span>
//             <div
//               className="icon-wrapper"
//               onClick={() => console.log("Continue with Microsoft")}
//             >
//               <img src={MicrosoftIcon} alt="Microsoft" className="icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signin;


import React from 'react';
import Video from '../assets/buy.mp4';
import "../styles/Buy.css";

const Signin = () => {
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

export default Signin;
