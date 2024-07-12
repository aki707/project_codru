// import React from 'react';
// import '../styles/EventList.css';

// const EventList = ({ events }) => {
//   return (
//     <div className="event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item">
//             <h3>{event.title}</h3>
//             <p>Start: {new Date(event.start).toLocaleString()}</p>
//             <p>End: {new Date(event.end).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;


// import React from 'react';
// import '../styles/EventList.css';

// const EventList = ({ events }) => {
//   return (
//     <div className="event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item">
//             <h3>{event.title}</h3>
//             <div className="event-times">
//               <p>Start: {new Date(event.start).toLocaleString()}</p>
//               <p>End: {new Date(event.end).toLocaleString()}</p>
//             </div>
//             {event.meetLink && (
//               <a href={event.meetLink} className="meet-button" target="_blank" rel="noopener noreferrer">
//                 Join Google Meet
//               </a>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;

import React from 'react';
import '../styles/EventList.css';

const coolColors = [
  '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffadad', '#fdffb6',
  '#caffbf', '#9bf6ff', '#bde0fe', '#a4a4ff', '#a6e3e9'
];

const getRandomColor = () => {
  return coolColors[Math.floor(Math.random() * coolColors.length)];
};

const EventList = ({ events }) => {

  
  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map(event => (
          <div key={event.id} className="event-item" style={{ backgroundColor: getRandomColor() }}>
            <h3>{event.title}</h3>
            <div className="event-times">
              <p>Start: {new Date(event.start).toLocaleString()}</p>
              <p>End: {new Date(event.end).toLocaleString()}</p>
            </div>
            {event.meetLink && (
              <a href={event.meetLink} className="calendar-meet-button" target="_blank" rel="noopener noreferrer">
                Join Google Meet
              </a>
            )}
          </div>
        ))
      ) : (
        <p>Upcoming Events</p>
      )}
    </div>
  );
};

export default EventList;

