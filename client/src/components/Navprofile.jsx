import "../styles/Navprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Muialert from "./Muialert";

function Navprofile({ setShowprofile, showprofile }) {
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to store alert message
  const navigate = useNavigate();
  const [editphoto, setEditphoto] = useState({
    Photo: localStorage.getItem("Photo"),
  });
  const fileInputRef = useRef(null); // Ref to the file input element

  const SignOut = async () => {
    const res = await fetch("/api/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const jsondata = res.json();
    if (res.ok) {
      localStorage.clear("Token");
      // Handle successful response
      console.log(jsondata.message);
      navigate("/");
    } else {
      // Handle error response
      console.error("Failed to logout user user");
    }
  };

  const handlephotoinput = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setEditphoto({ ...editphoto, Photo: reader.result });
    };
    reader.readAsDataURL(file);

    const res = await fetch("/api/profile-edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        photo: { Photo: reader.result }, // Pass the photo data correctly
      }),
    });

    const jsondata = await res.json();
    if (res.ok) {
      setAlertMessage(jsondata.message || "Failed to update image");
      setShowAlert(true);
    } else {
      setAlertMessage(jsondata.error || "Failed to find user");
      setShowAlert(true);
    }
  };

  const handlePenClick = () => {
    fileInputRef.current.click(); // Programmatically click the file input element
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
          <img src={editphoto.Photo} alt="" />
          <FontAwesomeIcon
            className="profileediticon"
            icon={faPen}
            onClick={handlePenClick} // Call handlePenClick when the pen icon is clicked
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlephotoinput} // Call handlephotoinput when the file input changes
          />
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
      {showAlert && (
        <Muialert
          message={alertMessage}
          severity="error"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default Navprofile;
