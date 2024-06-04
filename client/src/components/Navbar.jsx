import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import c3 from "../assets/c3.png";
import "../styles/Navbar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

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
          <NavLink to="/About" className="navlinks" onClick={toggleLinks}>
            About Us
          </NavLink>
          <NavLink to="/courses" className="navlinks" onClick={toggleLinks}>
            Courses
          </NavLink>
          <NavLink to="/Contact" className="navlinks" onClick={toggleLinks}>
            Contact Us
          </NavLink>
          <NavLink to="/User" className="navlinks" onClick={toggleLinks}>
            Schedule
          </NavLink>
        </div>
        <NavLink className="signuplink" to="/signup">
          <button>REGISTER </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
