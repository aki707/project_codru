import "../styles/Navprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navprofile({ setShowprofile, showprofile }) {
  const navigate = useNavigate();

  const SignOut = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const jsondata = res.json();
    if (res.ok) {
      // Handle successful response
      console.log(jsondata.message);
      navigate("/");
    } else {
      // Handle error response
      console.error("Failed to logout user user");
    }
  };
  return (
    <div className="Navprofilemaindiv">
      <div className="Navprofilemaindivcross">
        <span
          onClick={() => {
            setShowprofile(!showprofile);
          }}
        >
          X
        </span>
      </div>
      <div className="Navprofilemaindivdiv1">
        <div className="Navprofilemaindivdiv1div1">
          <img src={localStorage.getItem("Photo")} alt="" />
          <FontAwesomeIcon className="profileediticon" icon={faPen} />
        </div>
        <div className="Navprofilemaindivdiv1div2">
          <p>Hi, {localStorage.getItem("Name")} </p>
          <p>{localStorage.getItem("Username")}</p>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="Navprofilemaindivdiv2">
        <button>See My Report</button>
        <div className="Navprofilemaindivdiv2div1">
          <button>
            <FontAwesomeIcon icon={faUser} /> <span>Manage</span>
          </button>
          <button onClick={SignOut}>
            <FontAwesomeIcon icon={faRightFromBracket} /> <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navprofile;
