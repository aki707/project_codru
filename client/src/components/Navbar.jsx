import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import notifyicon from "../assets/notification.png";
import c3 from "../assets/c3.png";
import "../styles/Navbar.css";
import Navprofile from "./Navprofile";
import Notification from "./Notification";
import Dashboard from "./Dashboard";
import Blogpopup from "./Blogpopup";

function Navbar({ userData, setUserData }) {
  const [showLinks, setShowLinks] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) {
      setShowProfile(false);
    }
  };

  const closeNotification = () => {
    setShowNotifications(false);
  };

  const closeNavProfile = () => {
    setShowProfile(false);
  };

  const toggleDashboard = () => {
    localStorage.setItem("currentView", "dashboard");
    localStorage.setItem("activeTab", "Dashboard");
    setShowDashboard(!showDashboard);
  };

  const openPopup = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setActiveLink("blogs");
  };

  const closePopup = () => {
    setShowPopup(false);
    setActiveLink("");
  };

  const isLoggedIn = !!localStorage.getItem("Token");

  return (
    <div className={`Navbarmaindiv ${showPopup ? "blur" : ""}`}>
      <NavLink to="/" className="navlogo">
        <img src={c3} alt="Logo" />
      </NavLink>
      <div
        className={showLinks ? "navoptions" : "barcross"}
        onClick={toggleLinks}
      >
        <FontAwesomeIcon
          className={showLinks ? "navbarcrossicon" : ""}
          icon={showLinks ? faTimes : faBars}
        />
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
          <NavLink to="/blogs" className={`navlinks`} onClick={openPopup}>
            Blogs
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/dashboard"
              className="navlinks"
              onClick={toggleDashboard}
            >
              Dashboard
            </NavLink>
          )}
        </div>
        {isLoggedIn ? (
          <div className="Profileimgmaindiv">
            <NavLink className="navnotification" onClick={toggleNotifications}>
              <img src={notifyicon} alt="Notifications" />
            </NavLink>
            <NavLink
              className="navprofile"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img src={userData.Photo} alt="Profile" />
            </NavLink>
          </div>
        ) : (
          <NavLink className="signuplink" to="/signin">
            <button>Sign In</button>
          </NavLink>
        )}
      </div>
      {showProfile && isLoggedIn && (
        <Navprofile
          setShowProfile={setShowProfile}
          showProfile={showProfile}
          closeNavProfile={closeNavProfile}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {showNotifications && isLoggedIn && (
        <Notification
          setShowNotifications={setShowNotifications}
          showNotifications={showNotifications}
          closeNotification={closeNotification}
        />
      )}
      {showDashboard && isLoggedIn && (
        <Dashboard
          setShowDashboard={setShowDashboard}
          showDashboard={showDashboard}
        />
      )}
      {showPopup && <Blogpopup closePopup={closePopup} />}
    </div>
  );
}

export default Navbar;
