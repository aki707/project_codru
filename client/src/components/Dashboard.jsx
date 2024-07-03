import React, { useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import c3 from "../assets/c3.png";
import "../styles/Dashboard.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventBoxes from "./EventBoxes";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RouteIcon from "@mui/icons-material/Route";
import BackpackIcon from "@mui/icons-material/Backpack";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddEvent(newEvent);
    setNewEvent({ title: "", start: new Date(), end: new Date() });
  };

  const fileInputRef = useRef(null);

  const handlePhotoInput = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = async () => {
      const newPhoto = reader.result;

      const res = await fetch("/api/profile-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: localStorage.getItem("Username"),
          photo: newPhoto,
        }),
      });

      const jsondata = await res.json();
      if (res.ok) {
        localStorage.setItem("Photo", jsondata.user.photo);
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
    fileInputRef.current.click();
  };

  const SignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const jsondata = await res.json();
      if (res.ok) {
        localStorage.clear("Token");
        setAlertMessage(jsondata.message);
        setShowAlert(true);
        navigate("/");
      } else {
        console.error("Failed to logout user");
        setAlertMessage(jsondata.error);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  const role = localStorage.getItem("Role");
  console.log(role);

  const getDrawerContent = (role) => {
    switch (role) {
      case "Admin":
        return (
          <List>
            {[
              {
                text: "Dashboard",
                icon: <PersonIcon />,
                path: "/admin-dashboard",
              },
              {
                text: "Manage Users",
                icon: <RouteIcon />,
                path: "/manage-users",
              },
              { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button key="Logout" onClick={SignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        );
      case "Teacher":
        return (
          <List>
            {[
              { text: "Profile", icon: <PersonIcon />, path: "/profile" },
              {
                text: "My Courses",
                icon: <BackpackIcon />,
                path: "/my-courses",
              },
              { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button key="Logout" onClick={SignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        );
      case "Student":
        return (
          <List>
            {[
              { text: "Profile", icon: <PersonIcon />, path: "/profile" },
              {
                text: "My Courses",
                icon: <BackpackIcon />,
                path: "/my-courses",
              },
              { text: "My Blogs", icon: <RssFeedIcon />, path: "/my-blogs" },
              { text: "Report", icon: <RouteIcon />, path: "/planetary-path" },
              { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button key="Logout" onClick={SignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        );
      default:
        return (
          <List>
            {[
              { text: "Profile", icon: <PersonIcon />, path: "/profile" },

              { text: "My Blogs", icon: <RssFeedIcon />, path: "/my-blogs" },

              { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
            ].map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem button key="Logout" onClick={SignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        );
    }
  };

  return (
    <div className="mainDashboard">
      <div className="leftSectionDashboard">
        <NavLink to="/">
          <img src={c3} alt="codrudivision" className="codrudivision" />
        </NavLink>

        <div className="photoDashboard">
          <img
            src={localStorage.getItem("Photo")}
            alt="User"
            className="dashboard-image"
          />
          <FontAwesomeIcon
            className="myphotoedit"
            icon={faPen}
            onClick={handlePenClick}
            title="Change Photo"
          />

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handlePhotoInput}
          />
        </div>

        <div className="drawerContent">{getDrawerContent(role)}</div>
      </div>

      <div className="rightSectionDashboard">
        <h1 className="rightSectionHeadingDashboard">
          Welcome {localStorage.getItem("Username")}!
        </h1>
        <div className="rightSectionDashboard1">
          <div className="calenderSectionDashboard">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: 562,
                width: 770,
                justifyContent: "center",
                marginLeft: "43px",
                marginTop: "10px",
              }}
            />
          </div>
          <div className="eventSectionDashboard">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                style={{ borderRadius: "10%", justifyContent: "space-evenly" }}
              />
              <input
                type="datetime-local"
                name="start"
                value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                onChange={handleInputChange}
              />
              <input
                type="datetime-local"
                name="end"
                value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                onChange={handleInputChange}
              />
              <button type="submit" style={{ width: "100px" }}>
                Add Event
              </button>
            </form>

            <EventBoxes events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
