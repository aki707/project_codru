// import { useState } from "react";
import "../styles/Profile.css";
// import bookImage from "../assets/books.jpg";
import profilelogo from "../assets/signUp.png";
import profile from "../assets/userprofile.jpeg";
import dashboard from "../assets/dashboard.jpeg";
import courses from "../assets/courses.jpeg";
import activity from "../assets/activity.jpeg";
import Userprofile from "./Userprofile";
// import notification from "../assets/notification.png";
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  // const [active, setActive] = useState("Profile");
  const handleheading = (prop) => {
    // setActive(prop);
  };
  return (
    <div className="profile">
      <div className="profilecont">
        <div className="profilecontdiv1">
          <img className="profilelogo" src={profilelogo} alt="" />
          <div onClick={() => handleheading("Profile")}>
            <img src={profile} alt="" />
            <p>Profile</p>
          </div>
          <div onClick={() => handleheading("Courses")}>
            <img src={courses} alt="" />
            <p>Courses</p>
          </div>
          <div onClick={() => handleheading("Dashboard")}>
            <img src={dashboard} alt="" />
            <p>Dashboard</p>
          </div>
          <div onClick={() => handleheading("Activity")}>
            <img src={activity} alt="" />
            <p>Activity</p>
          </div>
        </div>
        <div className="profilecontdiv2">
          <Userprofile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
