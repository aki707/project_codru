// import React from 'react';
// import "../styles/Dashboard.css";
// import c3 from '../assets/c3.png';
// import Calendar from 'react-calendar' 

// function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <aside className="dashboard-sidebar">
//         <div className="sidebar-logo">
//           <img src={c3} alt="Lurna Logo" />
//         </div>
//       </aside>
//       <main className="main-content">
//         <header className="dashboard-header">
//           <h1>Dashboard</h1>
//           <button>ADD NEW COURSE</button>
//         </header>
//         <div className="dashboard-courses-container">
//           <div className="dashboard-courses">
//             <div className="dashboard-courses1">Course 1</div>
//             <div className="dashboard-courses2">Course 2</div>
//           </div>
//           <div className="dashboard-courses-1">
//             <div className="dashboard-courses3">Course 3</div>
//             <div className="dashboard-courses4">Course 4</div>
//           </div>
//           <div className="dashboard-courses-2">
//             <div className="dashboard-courses5">Course 5</div>
//             <div className="dashboard-courses6">Course 6</div>
//           </div>
//           <div className="dashboard-courses-3">
//             <div className="dashboard-courses7">Course 7</div>
//             <div className="dashboard-courses8">Course 8</div>
//           </div>

//           <Calendar  className="dashboard-calender"/>
//         </div>

        

//         <div className="tabs">
//           <div className="tab tab-active">Current Term</div>
//           <div className="tab">Spring 2023</div>
//           <div className="tab">Winter 2022</div>
//           <div className="tab">Fall 2022</div>
//           <div className="tab">Summer 2022</div>
//         </div>
//         <div className="courses">
//           <div className="course-card">
//             <img src="path-to-image.jpg" alt="ENG 101" />{" "}
//             {/* Update the path to your image */}
//             <div className="course-card-content">
//               <h3>ENG 101</h3>
//               <p>August 10</p>
//               <p>8hr</p>
//             </div>
//           </div>
//           <div className="course-card">
//             <img src="path-to-image.jpg" alt="ENG 101" />{" "}
//             {/* Update the path to your image */}
//             <div className="course-card-content">
//               <h3>ENG 101</h3>
//               <p>August 10</p>
//               <p>8hr</p>
//             </div>
//           </div>
//           <div className="course-card">
//             <img src="path-to-image.jpg" alt="ENG 101" />{" "}
//             <div className="course-card-content">
//               <h3>ENG 101</h3>
//               <p>August 10</p>
//               <p>8hr</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import React from 'react';
import "../styles/Dashboard.css";
import c3 from '../assets/c3.png';
// import Calendar from 'react-calendar';
import dashCal from '../assets/dashCal.png';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img src={c3} alt="Lurna Logo" />
        </div>
      </aside>
      <main className="main-content">
        <div className="dashboard-header">
          <h1 className="dashUserName">Welcome Aaryan Vijayvargiya</h1>
          <NavLink to="/Admission">
            <button className="newCourseBtn">ADD NEW COURSE</button>
          </NavLink>
        </div>
        <div className="dashboard-courses-container">
           <h2>Courses</h2>
          <div className='dashboard-course-boxes1'>
            <div className='dashboard-course1'>
              Science
            </div>
            <div className='dashboard-course2'>
              Maths
            </div>
         
          </div>

          <div className='dashboard-course-boxes2'>

          <div className='dashboard-course3'>
              Social Science
            </div>
            <div className='dashboard-course4'>
              Computer
            </div>
        
          </div>

          {/* <div className="dashboard-courses">
            <div className="dashboard-courses1">Course 1</div>
            <div className="dashboard-courses3">Course 2</div>
            <div className="dashboard-courses5">Course 2</div>
            <div className="dashboard-courses7">Course 2</div>
          </div>
          <div className="dashboard-courses-1">
            <div className="dashboard-courses2">Course 3</div>
            <div className="dashboard-courses4">Course 4</div>
            <div className="dashboard-courses6">Course 6</div>
            <div className="dashboard-courses8">Course 8</div>
          </div> */}
          <div className="calendar-container">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=270&wkst=1&ctz=UTC&bgcolor=%23efe1e1&showTitle=0&src=YWFyeWFudmlqYXkxMjM0NUBnbWFpbC5jb20&src=Y2xhc3Nyb29tMTAwMzczMDg5MTcxMjQwMDc2Mjk5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAxODgzOTkzMTExNzY0ODMyMjQxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA3Nzc5MzY1OTc1NTk1NDM3NzU4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTE4MjQ1MzIxNDAxMzY1ODg0ODU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23202124&color=%230047a8&color=%2333B679&color=%23c26401&color=%230B8043&color=%23c26401"
              style={{
                border: "solid 1px #777",
                width: "460px",
                height: "270px",
              }}
              frameBorder="0"
              scrolling="no"
              title="Google Calendar"
            ></iframe>
          </div>
          <div></div>
        </div>

        <div className="tabs">
          <div className="tab tab-active">Current Term</div>
          <div className="tab">Spring 2023</div>
          <div className="tab">Winter 2022</div>
          <div className="tab">Fall 2022</div>
          <div className="tab">Summer 2022</div>
        </div>
        <div className="courses">
          <div className="course-card">
            <img src="path-to-image.jpg" alt="ENG 101" />
            <div className="course-card-content">
              <h3>ENG 101</h3>
              <p>August 10</p>
              <p>8hr</p>
            </div>
          </div>
          <div className="course-card">
            <img src="path-to-image.jpg" alt="ENG 101" />
            <div className="course-card-content">
              <h3>ENG 101</h3>
              <p>August 10</p>
              <p>8hr</p>
            </div>
          </div>
          <div className="course-card">
            <img src="path-to-image.jpg" alt="ENG 101" />
            <div className="course-card-content">
              <h3>ENG 101</h3>
              <p>August 10</p>
              <p>8hr</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
