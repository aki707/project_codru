import React from 'react';
import '../styles/EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map(event => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>Upcoming Events</p>
      )}
    </div>
  );
};

export default EventList;
