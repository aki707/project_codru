import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import c3 from "../assets/c3.png";
import student from "../assets/student.png";
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

  const drawerContent = (
    <List>
      {[
        { text: "Profile", icon: <PersonIcon />, path: "/profile" },
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

  return (
    <div className="mainDashboard">
      <div className="leftSectionDashboard">
        <img src={c3} alt="" />

        <div className="photoDashboard">
          <div className="pDashboard">
            {/* <img src={student} alt="" style={{}} /> */}
          </div>
          {/* <h3 className='nameDashboard'>Aaryan Vijay</h3> */}
        </div>

        {/* Drawer content directly in leftSectionDashboard */}
        <div className="drawerContent">{drawerContent}</div>
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
