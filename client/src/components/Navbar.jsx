import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import notifyicon from "../assets/notification.png";
import c3 from "../assets/c3.png";
import "../styles/Navbar.css";
import Navprofile from "./Navprofile";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [showprofile, setShowprofile] = useState(false);

  const Showprofile = () => {
    setShowprofile(!showprofile);
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const isLoggedIn = !!localStorage.getItem("Token");

  return (
    <div className="Navbarmaindiv">
      <NavLink to="/" className="navlogo">
        <img src={c3} alt="" />
      </NavLink>
      <div
        className={showLinks ? "navoptions" : "barcross"}
        onClick={toggleLinks}
      >
        <FontAwesomeIcon icon={showLinks ? faTimes : faBars} />
      </div>
      <div className={`navbuttons ${showLinks ? "show" : ""}`}>
        <div className="btn">
          <NavLink to="/About" className="navlinks">
            About Us
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/my-courses" className="navlinks">
              My Courses
            </NavLink>
          ) : (
            <NavLink to="/courses" className="navlinks">
              Courses
            </NavLink>
          )}
          <NavLink to="/Contact" className="navlinks">
            Contact Us
          </NavLink>
          <NavLink to="/blog" className="navlinks">
            Schedule
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className="Profileimgmaindiv">
            <NavLink className="navnotification" to="/notify">
              <img src={notifyicon} alt="" />
            </NavLink>
            <NavLink
              className="navprofile"
              onClick={() => {
                Showprofile();
              }}
            >
              <img src={localStorage.getItem("Photo")} alt="Profile" />
            </NavLink>
          </div>
        ) : (
          <NavLink className="signuplink" to="/signin">
            <button>Sign In</button>
          </NavLink>
        )}
      </div>
      {showprofile && localStorage.getItem("Token") ? (
        <Navprofile setShowprofile={setShowprofile} showprofile={showprofile} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
