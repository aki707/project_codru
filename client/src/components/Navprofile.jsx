import "../styles/Navprofile.css";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Muialert from "./Muialert";

function Navprofile({
  setShowProfile,
  showProfile,
  closeNavProfile,
  userData,
  setUserData,
}) {
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to store alert message
  const navigate = useNavigate();

  const fileInputRef = useRef(null); // Ref to the file input element
  const navProfileRef = useRef(null); // Ref for Navprofile container

  const SignOut = async () => {
    const res = await fetch("https://codru-server.vercel.app/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const jsondata = await res.json();
    if (res.ok) {
      localStorage.clear("Token");
      setAlertMessage(jsondata.message);
      setShowAlert(true);
      navigate("/");
      closeNavProfile();
    } else {
      console.error("Failed to logout user");
      setAlertMessage(jsondata.error);
      setShowAlert(true);
    }
  };

  const handlePhotoInput = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = async () => {
      const newPhoto = reader.result;

      const res = await fetch("https://codru-server.vercel.app/profile-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: localStorage.getItem("Username"),
          photo: newPhoto, // Pass the new photo data correctly
        }),
      });

      const jsondata = await res.json();
      if (res.ok) {
        setUserData((prevData) => ({
          ...prevData,
          Photo: jsondata.user.photo.toString(),
        }));
        setAlertMessage(jsondata.message || "Image updated successfully");
        setShowAlert(true);
        window.location.reload();
      } else {
        setAlertMessage(jsondata.error || "Failed to update image");
        setShowAlert(true);
      }
    };

    reader.readAsDataURL(file);
  };

  const handlePenClick = () => {
    fileInputRef.current.click(); // Programmatically click the file input element
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleClickOutside = (event) => {
    if (
      navProfileRef.current &&
      !navProfileRef.current.contains(event.target)
    ) {
      closeNavProfile();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Publicprofile = () => {
    navigate(`/public-profile/${localStorage.getItem("Username")}`);
  };

  return (
    <div className="Navprofilemaindiv" ref={navProfileRef}>
      <div className="Navprofilemaindivcross">
        <span
          onClick={() => {
            setShowProfile(false);
          }}
        >
          <FontAwesomeIcon
          className={"crossicon"}
          icon={faTimes}
        />
        </span>
      </div>
      <div className="Navprofilemaindivdiv1">
        <div className="Navprofilemaindivdiv1div1">
          <img onClick={handlePenClick} src={userData.Photo} alt="Profile" />
          <FontAwesomeIcon
            className="profileediticon"
            icon={faPen}
            onClick={handlePenClick} // Call handlePenClick when the pen icon is clicked
            title="Change Photo"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoInput} // Call handlePhotoInput when the file input changes
          />
        </div>
        <div className="Navprofilemaindivdiv1div2">
          <p>Hi, {userData.Name}</p>
          <p>{localStorage.getItem("Username")}</p>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="Navprofilemaindivdiv2">
        <button
          onClick={() => {
            navigate("/planetary-path");
          }}
        >
          See My Report
        </button>
        <div className="Navprofilemaindivdiv2div1">
          <button onClick={() => Publicprofile()}>
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
