import React from 'react';
import moment from 'moment';

function EventBoxes({ events }) {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to generate a mock Google Meet link
  const generateMeetLink = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = 'https://meet.google.com/';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      if (i < 2) result += '-';
    }
    return result;
  };

  return (
    <div className="event-boxes">
      <h2>Upcoming Events</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems:"center", justifyContent:"flex-start"}}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getRandomColor(),
              padding: '10px',
              borderRadius: '5px',
              width: '200px',
              color: 'white'
            }}
          >
            <h3 style={{ marginBottom: '5px' }}>{event.title}</h3>
            <p style={{ fontSize: '0.8em', margin: '2px 0' }}>
              Date: {moment(event.start).format('MMM D, YYYY')}
            </p>
            <p style={{ fontSize: '0.8em', margin: '2px 0' }}>
              Time: {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
            </p>
            <button
              onClick={() => window.open(generateMeetLink(), '_blank')}
              style={{
                backgroundColor: '#4285F4',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.9em',
                marginTop: '5px'
              }}
            >
              Join Google Meet
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventBoxes;