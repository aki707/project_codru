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
