// import React, { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { gapi } from 'gapi-script';
// import "../styles/Dashboard.css";
// import EventList from "./EventList";




// const CLIENT_ID = '354144275324-a8a9eovuovsg9letiacfvrt6tnedhiqp.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyA066YeGeRRzIaMUIsLE300BUy6L1yV7Zg';
// const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
// const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

// const google = window.google;

// const calendarStyles = {
//   width: '70%', 
//   maxWidth: '1000px', 
//   margin: '40px 100px 0px 0px', 
//   border: '1px solid #ccc', 
//   padding: ' 10px', 
//   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
//   fontSize: '0.8em', 
//   height: '80vh',
// };

// const Calendar = () => {


//   const [events, setEvents] = useState([]);
//   const [gapiInited, setGapiInited] = useState(false);
//   const [gisInited, setGisInited] = useState(false);
//   const [tokenClient, setTokenClient] = useState(null);

//   useEffect(() => {
//     gapiLoaded();
//     gisLoaded();
//   }, []);

//   function gapiLoaded() {
//     gapi.load('client', initializeGapiClient);
//   }

//   async function initializeGapiClient() {
//     await gapi.client.init({
//       apiKey: API_KEY,
//       discoveryDocs: [DISCOVERY_DOC],
//     });
//     setGapiInited(true);
//   }

//   function gisLoaded() {
//     const newTokenClient = google.accounts.oauth2.initTokenClient({
//       client_id: CLIENT_ID,
//       scope: SCOPES,
//       callback: '', 
//     });
//     setTokenClient(newTokenClient);
//     setGisInited(true);
//   }

//   function handleAuthClick() {
//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw (resp);
//       }
//       await fetchEvents();
//     };

//     if (gapi.client.getToken() === null) {
//       tokenClient.requestAccessToken({prompt: 'consent'});
//     } else {
//       tokenClient.requestAccessToken({prompt: ''});
//     }
//   }

//   const fetchEvents = async () => {
//     try {
//       const response = await gapi.client.calendar.events.list({
//         'calendarId': 'primary',
//         'timeMin': (new Date()).toISOString(),
//         'showDeleted': false,
//         'singleEvents': true,
//         'maxResults': 10,
//         'orderBy': 'startTime',
//       });
//       const events = response.result.items.map(event => ({
//         id: event.id,
//         title: event.summary,
//         start: event.start.dateTime || event.start.date,
//         end: event.end.dateTime || event.end.date,
//       }));
//       setEvents(events);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const addEvent = async (event) => {
//     if (!gapi.client || !gapi.client.calendar) {
//       console.error('Google API client not loaded or authorized.');
//       return;
//     }
  
//     if (!event.title || !event.start || !event.end) {
//       console.error('Event object is missing required properties.');
//       return;
//     }
  
//     const startTime = new Date(event.start).toISOString();
//     const endTime = new Date(event.end).toISOString();

//     try {
//       const response = await gapi.client.calendar.events.insert({
//         'calendarId': 'primary',
//         'resource': {
//           'summary': event.title,
//           'start': {
//             'dateTime': startTime,
//             'timeZone': 'UTC',
//           },
//           'end': {
//             'dateTime': endTime,
//             'timeZone': 'UTC',
//           },
        
//         'conferenceData': {
//           'createRequest': {
//             'requestId': Math.random().toString(36).substring(7), // Random unique ID
//             'conferenceSolutionKey': {
//               'type': 'hangoutsMeet'
//             }
//           }
//         }
//       },
//       'conferenceDataVersion': 1
//     });

//       setEvents([...events, { ...event, id: response.result.id }]);
//     } catch (error) {
//       console.error('Error adding event:', error);
//     }
//   };

//   const removeEvent = async (event) => {
//     try {
//       await gapi.client.calendar.events.delete({
//         'calendarId': 'primary',
//         'eventId': event.id,
//       });
//       setEvents(events.filter(e => e.id !== event.id));
//     } catch (error) {
//       console.error('Error removing event:', error);
//     }
//   };

//   const handleDateSelect = (selectInfo) => {
//     const title = prompt('Please enter a title for your event');
//     if (title) {
//       const event = {
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       };
//       addEvent(event);
//       removeEvent(event);
//     }
//   };

//   const handleEventClick = (clickInfo) => {
//     if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       removeEvent(clickInfo.event);
//     }
//   };

//   if (!gapiInited || !gisInited) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='calendarMainDiv'>
//       <button onClick={handleAuthClick}>Authorize</button>
//       <div className='calendarEventSection' style={{display: "flex", alignItems: "flex-start", justifyContent: "center"}}>
        
//         <div style={calendarStyles}>
//           <FullCalendar
//             plugins={[dayGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             selectable={true}
//             editable={true}
//             events={events}
//             select={handleDateSelect}
//             eventClick={handleEventClick}
//             height="80vh" 
//           />
          
//         </div>
//         <div>
//         <EventList events={events} /> {/* Add EventList component */}
//         </div>
        
//       </div>
//     </div>
//       );
// };


// export default Calendar;


import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { gapi } from 'gapi-script';
import Modal from 'react-modal';
import "../styles/Dashboard.css";
import EventList from "./EventList";

const CLIENT_ID = '354144275324-a8a9eovuovsg9letiacfvrt6tnedhiqp.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA066YeGeRRzIaMUIsLE300BUy6L1yV7Zg';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const google = window.google;

const calendarStyles = {
  width: '70%', 
  maxWidth: '1000px', 
  margin: '40px 100px 0px 0px', 
  border: '1px solid #ccc', 
  padding: ' 10px', 
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  fontSize: '0.8em', 
  height: '80vh',
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
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
        meetLink: event.conferenceData?.entryPoints?.[0]?.uri || null,
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
              'requestId': Math.random().toString(36).substring(7),
              'conferenceSolutionKey': {
                'type': 'hangoutsMeet'
              }
            }
          }
        },
        'conferenceDataVersion': 1
      });

      setEvents([...events, { ...event, id: response.result.id, meetLink: response.result.hangoutLink }]);
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
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      meetLink: clickInfo.event.extendedProps.meetLink,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  if (!gapiInited || !gisInited) {
    return <div>Loading...</div>;
  }

  return (
    <div className='calendarMainDiv'>
      <button onClick={handleAuthClick}>Authorize</button>
      <div className='calendarEventSection' style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <div style={calendarStyles}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="80vh" 
          />
        </div>
        <div>
          <EventList events={events} />
        </div>
      </div>

      {selectedEvent && (
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
      )}
    </div>
  );
};

export default Calendar;
