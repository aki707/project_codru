import React, { useState } from 'react';
// import Calendar from 'react-calendar';
import c4 from '../assets/c4.png';
import "../styles/Dashboard.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventBoxes from './EventBoxes';

    // Set up the localizer
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
  
  return (
    <div className="mainDashboard">
      
    <div className='leftSectionDashboard'>
      <img src={c4} alt="" />

      <div className='photoDashboard'>
        <div className='pDashboard' style={{
          width: "25%", height: "75%", borderRadius: "100%", border: "2px solid red", 
          marginTop:"7px", marginLeft: "10px"}}>
        </div>

        <h3 className='nameDashboard'>Aaryan Vijay</h3>
      </div>
    </div>
    <div className='rightSectionDashboard'>
        <div className='calenderSectionDashboard'>
        <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 582, width: 700, alignItems: 'center', justifyContent:'center', marginLeft:"100px"}}
    />

        </div>
        <div className='eventSectionDashboard'>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="title"
    placeholder="Event Title"
    value={newEvent.title}
    onChange={handleInputChange}
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
  );
};

export default Dashboard;
