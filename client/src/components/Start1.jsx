// import "../styles/Start1.css";

// import bookImage from "../assets/books.jpg";
// import thinkImage from "../assets/thinks.jpg";
// import teachImage from "../assets/teach.jpg";
// import studyImage from "../assets/study.jpg";

// function Start1() {
//   return (
//     <div className="Start1">
//       <div className="Start1div1">
//         <div className="square-container">
//           <img src={bookImage} alt="Books" className="corner-image top-left" />
//           <img
//             src={thinkImage}
//             alt="Think"
//             className="corner-image top-right"
//           />
//           <img
//             src={teachImage}
//             alt="Teach"
//             className="corner-image bottom-left"
//           />
//           <img
//             src={studyImage}
//             alt="Study"
//             className="corner-image bottom-right"
//           />
//           <p>
//           Learn Think Study and Grow with Us
//           </p>
          
//         </div>
//       </div>
//       <div className="Start1div2">
//         <div className="text-container">
//           <p>Learn How To Learn</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Start1;

import React from 'react';
import "../styles/Start1.css";
// import BackgroundImage from '../assets/BackgroundImage.png';
import { NavLink } from 'react-router-dom';

const Start1 = () => {
  return (
    <div className="landing-container">
       <div className="text-content">
        <h1>Welcome To</h1>
        <h2><span>C</span>odru <span>E</span>ducation</h2>
        <NavLink to='/signup'><button className="start-button">Let's Begin Your Journey</button></NavLink>
        <i className="fas fa-thumbs-up thumbs-up-icon"></i>
      </div>
     
      <div className="overlay"></div>
    </div>
  );
};

export default Start1;


