// import React, { useState } from "react";
// import c3 from "../assets/c3.png";
// import student from "../assets/student.png";
// import "../styles/Dashboard.css";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import EventBoxes from "./EventBoxes";
// import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import RouteIcon from "@mui/icons-material/Route";

// const localizer = momentLocalizer(moment);

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     start: new Date(),
//     end: new Date(),
//   });

//   const handleAddEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewEvent({ ...newEvent, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleAddEvent(newEvent);
//     setNewEvent({ title: "", start: new Date(), end: new Date() });
//   };

//   const drawerContent = (
//     <List>
//       {[
//         { text: "Profile", icon: <PersonIcon /> },
//         { text: "Report", icon: <RouteIcon /> },
//         { text: "Settings", icon: <SettingsIcon /> },
//         { text: "Logout", icon: <ExitToAppIcon /> },
//       ].map((item) => (
//         <ListItem button key={item.text}>
//           <ListItemIcon>{item.icon}</ListItemIcon>
//           <ListItemText primary={item.text} />
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <div className="mainDashboard">
//       <div className="leftSectionDashboard">
//         <img src={c3} alt="" />

//         <div className="photoDashboard">
//           <div className="pDashboard">
//             {/* <img src={student} alt="" style={{}} /> */}
//           </div>
//           {/* <h3 className='nameDashboard'>Aaryan Vijay</h3> */}
//         </div>

//         {/* Drawer content directly in leftSectionDashboard */}
//         <div className="drawerContent">{drawerContent}</div>
//       </div>

//       <div className="rightSectionDashboard">
//       <h1 className="rightSectionHeadingDashboard">Welcome Aaryan Vijayvargiya</h1>
//         <div className="rightSectionDashboard1">
       
//         <div className="calenderSectionDashboard">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{
//               height: 562,
//               width: 770,
//               justifyContent: "center",
//               marginLeft: "43px",
//               marginTop: "10px",
//             }}
//           />
//         </div>
//         <div className="eventSectionDashboard">
//           <form
//             onSubmit={handleSubmit}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <input
//               type="text"
//               name="title"
//               placeholder="Event Title"
//               value={newEvent.title}
//               onChange={handleInputChange}
//               style={{ borderRadius: "10%", justifyContent: "space-evenly" }}
//             />
//             <input
//               type="datetime-local"
//               name="start"
//               value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
//               onChange={handleInputChange}
//             />
//             <input
//               type="datetime-local"
//               name="end"
//               value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
//               onChange={handleInputChange}
//             />
//             <button type="submit" style={{ width: "100px" }}>
//               Add Event
//             </button>
//           </form>

//           <EventBoxes events={events} />
//         </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { gapi } from 'gapi-script';
import c3 from "../assets/c3.png";
import student from "../assets/student.png";
import "../styles/Dashboard.css";
import EventBoxes from "./EventBoxes";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RouteIcon from "@mui/icons-material/Route";

const CLIENT_ID = '354144275324-a8a9eovuovsg9letiacfvrt6tnedhiqp.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA066YeGeRRzIaMUIsLE300BUy6L1yV7Zg';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const google = window.google;

const calendarStyles = {
  width: '100%', 
  maxWidth: '950px', 
  margin: '0 auto', 
  border: '1px solid #ccc', 
  padding: '10px', 
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  fontSize: '0.8em', 
  height: '500px',
};

const CalendarComponent = () => {


  const [events, setEvents] = useState([]);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, []);

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
  }

  function gisLoaded() {
    const newTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', 
    });
    setTokenClient(newTokenClient);
    setGisInited(true);
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await fetchEvents();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      });
      const events = response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
      }));
      setEvents(events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const addEvent = async (event) => {
    if (!gapi.client || !gapi.client.calendar) {
      console.error('Google API client not loaded or authorized.');
      return;
    }
  
    if (!event.title || !event.start || !event.end) {
      console.error('Event object is missing required properties.');
      return;
    }
  
    const startTime = new Date(event.start).toISOString();
    const endTime = new Date(event.end).toISOString();

    try {
      const response = await gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': {
          'summary': event.title,
          'start': {
            'dateTime': startTime,
            'timeZone': 'UTC',
          },
          'end': {
            'dateTime': endTime,
            'timeZone': 'UTC',
          },
        
        'conferenceData': {
          'createRequest': {
            'requestId': Math.random().toString(36).substring(7), // Random unique ID
            'conferenceSolutionKey': {
              'type': 'hangoutsMeet'
            }
          }
        }
      },
      'conferenceDataVersion': 1
    });

      setEvents([...events, { ...event, id: response.result.id }]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const removeEvent = async (event) => {
    try {
      await gapi.client.calendar.events.delete({
        'calendarId': 'primary',
        'eventId': event.id,
      });
      setEvents(events.filter(e => e.id !== event.id));
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a title for your event');
    if (title) {
      const event = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      addEvent(event);
      removeEvent(event);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      removeEvent(clickInfo.event);
    }
  };

  if (!gapiInited || !gisInited) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handleAuthClick}>Authorize</button>
      <div style={calendarStyles}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto" 
      contentHeight="auto" 
      />
    </div>
  </div>
  );
};

const Dashboard = () => {
  const drawerContent = (
    <List>
      {[
        { text: "Profile", icon: <PersonIcon /> },
        { text: "Report", icon: <RouteIcon /> },
        { text: "Settings", icon: <SettingsIcon /> },
        { text: "Logout", icon: <ExitToAppIcon /> },
      ].map((item) => (
        <ListItem button key={item.text}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
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
        <div className="drawerContent">{drawerContent}</div>
      </div>

      <div className="rightSectionDashboard">
        <h1 className="rightSectionHeadingDashboard">Welcome Aaryan Vijayvargiya</h1>
        <div className="rightSectionDashboard1">
          <div className="calenderSectionDashboard">
            <CalendarComponent />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
