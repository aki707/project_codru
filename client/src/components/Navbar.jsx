import { NavLink } from "react-router-dom";
import "./Navbar.css";
import c3 from "../assets/c3.png"


const style = {
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
};
function Navbar() {
  return (
    <div className="Navbarmaindiv">
      <div className="navlogo">
        <img
          //   src="https://cdn.pixabay.com/photo/2023/04/05/16/08/hedgehog-fly-7901862_640.jpg"
          src={c3}
          alt=""
        />
        {/* <h2>Codru Education</h2> */}
      </div>
      <div className="navbuttons">
        <div className="btn">
          <button>
            <NavLink to="/login" style={style}>
              About Us
            </NavLink>
          </button>
          <button>
            <NavLink to="/courses" style={style}>
              Courses
            </NavLink>
          </button>
          <button>
            <NavLink to="/contact-us" style={style}>
              Contact Us
            </NavLink>
          </button>
          <button>
            <NavLink to="/schedule" style={style}>
              Schedule
            </NavLink>
          </button>
        </div>
        <div className="Regbtn">
          <button>Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
