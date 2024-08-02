// import * as queryString from 'query-string';

// const stringifiedParams = queryString.stringify({
//   client_id: process.env.CLIENT_ID_GOES_HERE,
//   redirect_uri: 'https://www.example.com/authenticate/google',
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.email',
//     'https://www.googleapis.com/auth/userinfo.profile',
//   ].join(' '),
//   response_type: 'code',
//   access_type: 'offline',
//   prompt: 'consent',
// });

// const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

// const urlParams = queryString.parse(window.location.search);

// if (urlParams.error) {
//   console.log(`An error occurred: ${urlParams.error}`);
// } else {
//   console.log(`The code is: ${urlParams.code}`);
// }


// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const GoogleAuth = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const fetchTokens = async () => {
//       const queryParams = new URLSearchParams(location.search);
//       const code = queryParams.get('code');

//       if (code) {
//         try {
//           // Send the authorization code to the backend to exchange it for tokens
//           const response = await axios.get(`http://localhost:3000/oauth2callback?code=${code}`);
//           // Handle success (e.g., store tokens, redirect to calendar)
//           console.log('Tokens:', response.data);
//           window.location.href = '/';
//         } catch (error) {
//           console.error('Error exchanging code for tokens:', error);
//         }
//       } else {
//         console.error('No code found in URL');
//       }
//     };

//     fetchTokens();
//   }, [location]);

//   return <div>Loading...</div>;
// };

// export default GoogleAuth;

