import doubt from "../assets/doubt.png";
import "../styles/Courses.css";
import Navbar from "./Navbar";
import onlineLearning from "../assets/onlineLearning.png";
import table from "../assets/table.png";
import uncle from "../assets/uncle.png";
import examination1 from "../assets/examination1.png";
import extra from "../assets/extra.png";
import class6 from "../assets/class6.png";
import class11 from "../assets/class11.png";
import { NavLink } from "react-router-dom";
import demo from "../assets/demo.png";
import Footer from "../components/Footer";
import React from "react";

function Courses({ userData, setUserData }) {
  const scrollToSkilldev = (event) => {
    event.preventDefault(); // Prevent the default navigation behavior
    var topRef = document.getElementById("courses-maindiv"); // Get the top section by its ID
    var topPosition = topRef.getBoundingClientRect().top; // Get the position of the top section
    const skilldevRef = document.getElementById("skilldevRef"); // Get the Skill Development section by its ID
    const elementPosition = skilldevRef.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset; // Adjust for offset if needed
  
    document.querySelector("body").scrollTo({
      top: offsetPosition-topPosition, // Adjust the offset as needed
      behavior: "smooth", // Smooth scrolling
    }); // Scroll to the Skill Development section
  };
  const scrollToAcademic = () => {
    var topRef = document.getElementById("courses-maindiv"); // Get the top section by its ID
    var topPosition = topRef.getBoundingClientRect().top; // Get the position of the top section
    var academicRef = document.getElementById("academicRef"); // Get the Academic section by its ID
    var headerOffset = 0;
    var elementPosition = academicRef.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
    document.querySelector("body").scrollTo({
         top: offsetPosition-topPosition, // Adjust the offset as needed
         behavior: "smooth"
    }); // Scroll to the Academic section
  };
  
  return (
    <div className="courses-page">
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="courses-maindiv" id="courses-maindiv">
        <h1 className="courses-title">Quick Start with Me</h1>
        <div className="demoCourses">
          <div className="freeDemoCourses">
            <h1 className="demo-title">Start your 5 Days Free Demo</h1>
              <div className="demoSectionCoursesSub">
              <h3 className="demo-description">
                  Dive into a world of knowledge <br />
                  conveniently from your device, <br />
                  shaping your future at your pace.
                </h3>
                <img src={demo} alt="" className="demo-image" />                
              </div>
            <NavLink to="/form">
              <button className="demoEnroll">Start Now</button>
            </NavLink>
          </div>
          <div className="doubtSectionCourses">
            <h1 className="doubt-title">Ask your Doubts here</h1>
              <div className="doubtSectionCoursesSub">
              <h3 className="doubt-description">
                  Thinking is the art <br />
                  of exploring endless possibilities <br />
                  within the confines of the mind
                </h3>
                <img src={doubt} alt="" className="doubt-image" />                
              </div>
            <NavLink to="/form">
              <button className="doubtEnroll">Ask Here</button>
            </NavLink>
          </div>
        </div>

        <div className="text2">
          <span className="white-text1">Courses </span>
          <span className="red-text1">Offered</span>
        </div>

        <div className="imagesCourses">
          <NavLink to="#" onClick={scrollToAcademic}> {/*/class6*/}
            <img src={class6} alt="" className="zoomable" />
          </NavLink>

          <NavLink to="#" onClick={(event) => scrollToSkilldev(event)}>
            <img src={extra} alt="" className="zoomable" />
          </NavLink>

          <NavLink to="/Custom">
            <img src={class11} alt="" className="zoomable" />
          </NavLink>
        </div>

        <div className="text1">
          <span className="white-text">What will you </span>
          <span className="red-text">Learn</span>
          <span className="text"> ?</span>
        </div>

        <div className="images">
          <img src={onlineLearning} alt="" className="zoomable" />
          <img src={table} alt="" className="zoomable" />
          <img src={uncle} alt="" className="zoomable" />
          <img src={examination1} alt="" className="zoomable" />
        </div>

        <h1 className="courses-title" id="academicRef"  >Academic</h1>

        <div className="academicCourses">
          <div className="academic-courses-subtitle">
            <div className="academic-courses-subtitle1">
              <h3>For Classes 6th to 10th</h3>
            </div>
            <NavLink to="/form">
              <button className="acadEnroll">Enroll Now</button>
            </NavLink>
          </div>
          <div className="academic-courses-subtitle">
            <div className="academic-courses-subtitle1">
              <h3>For Classes 11th and 12th</h3>
            </div>
            <NavLink to="/form">
              <button className="acadEnroll">Enroll Now</button>
            </NavLink>
          </div>
          <div className="academic-courses-subtitle">
            <div className="academic-courses-subtitle1">
              <h3>For B.Tech.</h3>
            </div>
            <NavLink to="/form">
              <button className="acadEnroll">Enroll Now</button>
            </NavLink>
          </div>
        </div>

        <h1 className="courses-title" id="skilldevRef">Skill Development</h1>

        <div className="roboticsBanner">
          <img src="/src/assets/Robotics_Banner.jpg" alt=""  />
        </div>

        <div className="roboticsCourses">
          <div className="robotics-courses-subtitle">
            <div className="robotics-courses-subtitle1">
              <img src="/src/assets/bot_explorer_1.jpg" alt=""  />
              <img src="/src/assets/bot_explorer_2.jpg" alt=""  />
            </div>
            <NavLink to="/form">
              <button className="botEnroll">Enroll Now</button>
            </NavLink>
          </div>
          <div className="robotics-courses-subtitle">
            <div className="robotics-courses-subtitle1">
              <img src="/src/assets/bot_engineer_1.jpg" alt=""  />
              <img src="/src/assets/bot_engineer_2.jpg" alt=""  />
            </div>
            <NavLink to="/form">
              <button className="botEnroll">Enroll Now</button>
            </NavLink>
          </div>
          <div className="robotics-courses-subtitle">
            <div className="robotics-courses-subtitle1">
              <img src="/src/assets/bot_inventor_1.jpg" alt=""  />
              <img src="/src/assets/bot_inventor_2.jpg" alt=""  />
            </div>
            <NavLink to="/form">
              <button className="botEnroll">Enroll Now</button>
            </NavLink>
          </div>
        </div>

        <div className="animationCourses">
          {/* <div className="div1"></div> */}
          <div className="div2">Enjoy Learning, Have Fun 😊</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
