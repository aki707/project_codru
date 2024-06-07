// import c3 from "../assets/c3.png";
import "../styles/Courses.css";
// import "../styles/Navbar.css";
import Navbar from "./Navbar";
import onlineLearning from "../assets/onlineLearning.png";
import table from "../assets/table.png";
import uncle from "../assets/uncle.png";
import examination1 from "../assets/examination1.png";
import extra from "../assets/extra.png";
import class6 from "../assets/class6.png";
import class11 from "../assets/class11.png";
import { NavLink } from "react-router-dom";

function Courses() {
  return (
    <div className="courses-maindiv">
      {/* <img src={c3} alt="" /> */}

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

      <div className="text2">
        <span className="white-text1">Courses </span>
        <span className="red-text1">Offered</span>
      </div>

      <div className="imagesCourses">
        <NavLink to="/Class6">
          <img src={class6} alt="" className="zoomable" />
        </NavLink>

        <NavLink to="/Extra">
          <img src={extra} alt="" className="zoomable" />
        </NavLink>

        <NavLink to="/Custom">
          <img src={class11} alt="" className="zoomable" />
        </NavLink>
      </div>
    </div>
  );
}

export default Courses;
