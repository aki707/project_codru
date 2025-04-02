import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { useGoogleLogin } from '@react-oauth/google';

const Calendar = () => {
  const googleCalendarApiKey = "AIzaSyC38azhHvc2JBwLz2wvGYmU1Cvl6gzltNM";
  const [accessToken, setAccessToken] = useState(null);

  // Configure Google Login to obtain an access token
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly', // Scope for read-only calendar access
  });

  return (
    <div className="full-calendar-container">
      {/* Show the Authorize button if no access token is present */}
      {!accessToken && (
        <button onClick={() => login()}>
          Authorize
        </button>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={googleCalendarApiKey}
        events={
          accessToken
            ? {
                googleCalendarId: 'aaryanvijay12345@gmail.com', // Replace with your actual Google Calendar ID
                extraParams: {
                  access_token: accessToken,
                },
              }
            : 'your_event_source_here' // Fallback to original event source if no token
        }
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          window.open(info.event.url, '_blank', 'noopener,noreferrer');
        }}
      />
    </div>
  );
};

export default Calendar;