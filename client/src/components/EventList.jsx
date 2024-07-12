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

// import React from 'react';
// import '../styles/EventList.css';

// const coolColors = [
//   '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffadad', '#fdffb6',
//   '#caffbf', '#9bf6ff', '#bde0fe', '#a4a4ff', '#a6e3e9'
// ];

// const getRandomColor = () => {
//   return coolColors[Math.floor(Math.random() * coolColors.length)];
// };

// const EventList = ({ events }) => {

  
//   return (
//     <div className="my-event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item" style={{ backgroundColor: getRandomColor() }}>
//             <h3>{event.title}</h3>
//             <div className="event-times">
//               <p>Start: {new Date(event.start).toLocaleString()}</p>
//               <p>End: {new Date(event.end).toLocaleString()}</p>
//             </div>
//             {event.meetLink && (
//               <a href={event.meetLink} className="calendar-meet-button" target="_blank" rel="noopener noreferrer">
//                 Join Google Meet
//               </a>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;

import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/EventList.css';

Modal.setAppElement('#root'); // Ensure this matches the root element of your app

const coolColors = [
  '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffadad', '#fdffb6',
  '#caffbf', '#9bf6ff', '#bde0fe', '#a4a4ff', '#a6e3e9'
];

const getRandomColor = () => {
  return coolColors[Math.floor(Math.random() * coolColors.length)];
};

const EventList = ({ events }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="event-list">
      {events.length > 0 ? (
        events.map(event => (
          <div
            key={event.id}
            className="event-item"
            style={{ backgroundColor: getRandomColor() }}
            onClick={() => openModal(event)}
          >
            <h3>{event.title}</h3>
            <div className="event-times">
              <p>Start: {new Date(event.start).toLocaleString()}</p>
              <p>End: {new Date(event.end).toLocaleString()}</p>
            </div>
            {event.meetLink && (
              <a href={event.meetLink} className="meet-button" target="_blank" rel="noopener noreferrer">
                Join Google Meet
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No Upcoming Events</p>
      )}

      {/* {selectedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Event Details"
          className="event-modal"
          overlayClassName="event-overlay"
        >
          <h3>{selectedEvent.title}</h3>
          <div className="event-times">
            <p>Start: {new Date(selectedEvent.start).toLocaleTimeString()}</p>
            <p>End: {new Date(selectedEvent.end).toLocaleTimeString()}</p>
          </div>
          {selectedEvent.meetLink && (
            <a href={selectedEvent.meetLink} className="meet-button" target="_blank" rel="noopener noreferrer">
              Join Google Meet
            </a>
          )}
          <button onClick={closeModal} className="close-button">Close</button>
        </Modal>
      )} */}
    </div>
  );
};

export default EventList;
