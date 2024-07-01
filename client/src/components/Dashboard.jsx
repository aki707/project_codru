import React, { useState } from 'react';
import c3 from '../assets/c3.png';
import student from '../assets/student.png';
import "../styles/Dashboard.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventBoxes from './EventBoxes';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date() });

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
      setNewEvent({ title: '', start: new Date(), end: new Date() });
    };

    const drawerContent = (
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'Profile', icon: <PersonIcon /> },
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Logout', icon: <ExitToAppIcon /> },
          
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
        <div className='leftSectionDashboard'>
          <img src={c3} alt="" />

          <div className='photoDashboard'>
            
            <div className='pDashboard'>
            {/* <img src={student} alt="" style={{}} /> */}
            </div>
            {/* <h3 className='nameDashboard'>Aaryan Vijay</h3> */}
          </div>

          {/* Drawer content directly in leftSectionDashboard */}
          <div className="drawerContent">
            {drawerContent}
          </div>
        </div>

        <div className='rightSectionDashboard'>
          <h1 className='rightSectionHeadingDashboard'>Welcome Aaryan Vijayvargiya</h1>
          <div className='rightSectionDashboard1'>
          <div className='calenderSectionDashboard'>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 562, width: 770, justifyContent:'center', marginLeft:"43px", marginTop:"10px"}}
            />
          </div>
          <div className='eventSectionDashboard'>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                style={{borderRadius:"10%", justifyContent:"space-evenly"}}
              />
              <input
                type="datetime-local"
                name="start"
                value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                onChange={handleInputChange}
              />
              <input
                type="datetime-local"
                name="end"
                value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                onChange={handleInputChange}
              />
              <button type="submit" style={{width:"100px"}}>Add Event</button>
            </form>
            
            <EventBoxes events={events} />
          </div>
 
          </div>
                 </div>
      </div>
    );
};

export default Dashboard;