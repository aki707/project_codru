
// import React from 'react';
// import { useState } from 'react';
// import "../styles/Dashboard.css";
// import c3 from '../assets/c3.png';
// import { NavLink } from 'react-router-dom';
// import sidebarImage from '../assets/sidebarImage.png';

// function Dashboard() {
//   const [courses, setCourses] = useState([
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },

//   ]);

//   const [newCourseName, setNewCourseName] = useState('');

  
//   const handleAddCourse = (e) => {
//     e.preventDefault();
//     if (newCourseName.trim() === '') return;

//     const newCourse = {
//       id: courses.length + 1,
//       name: newCourseName
//     };
//     setCourses([...courses, newCourse]);
//     setNewCourseName('');
//   };

//   const handleRemoveCourse = (id) => {
//   setCourses(courses.filter(course => course.id !== id
//   ));
//   };

//   const handleJoinMeet = () => {
//     window.location.href = 'https://meet.google.com';
//   };

 

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-sidebar">
//         <div className="sidebar-logo">
//           <img src={c3} alt="Lurna Logo" />

//           <img
//             src={sidebarImage}
//             alt="User Image"
//             style={{ marginTop: "80px" }}
//           />

//           <button className="sidebarmeetBtn" onClick={handleJoinMeet}>
//             Join Now
//           </button>
//         </div>
//       </div>
//       <div className="main-content">
//         <div className="mainDashboard"></div>
//         <div className="dashboard-header">
//           <h1>Welcome Aaryan Vijayvargiya</h1>
//           <NavLink to="/Admission">
//             <button className="newCourseBtn">ADD NEW COURSE</button>
//           </NavLink>
//         </div>
//         <div className="dashboard-courses-container">
//           <div className="calendar-container">
//             <iframe
//               src="https://calendar.google.com/calendar/embed?height=270&wkst=1&ctz=UTC&bgcolor=%23efe1e1&showTitle=0&src=YWFyeWFudmlqYXkxMjM0NUBnbWFpbC5jb20&src=Y2xhc3Nyb29tMTAwMzczMDg5MTcxMjQwMDc2Mjk5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAxODgzOTkzMTExNzY0ODMyMjQxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA3Nzc5MzY1OTc1NTk1NDM3NzU4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTE4MjQ1MzIxNDAxMzY1ODg0ODU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23202124&color=%230047a8&color=%2333B679&color=%23c26401&color=%230B8043&color=%23c26401"
//               style={{
//                 border: "solid 1px #777",
//                 width: "460px",
//                 height: "270px",
//               }}
//               frameBorder="0"
//               scrolling="no"
//               title="Google Calendar"
//             ></iframe>
//           </div>
//         </div>
        
//         <div className="dashboard-courses-container2">
//           Courses Enrolled
          
//           {courses.map((course) => (
//             <div key={course.id} className="enrolledCoursesDash">
//               {course.name}

//               <button
//                 className="remove-course-button"
//                 onClick={() => handleRemoveCourse(course.id)}
//               >
//                 X
//               </button>
//               <img src="https://img.icons8.com/bubbles/100/000000/services.png" alt="choose Course" />
              
//             </div>

//           ))}
//           <div className="add-course-form">
//             <form onSubmit={handleAddCourse}>
//               <input
//                 type="text"
//                 value={newCourseName}
//                 onChange={(e) => setNewCourseName(e.target.value)}
//                 placeholder="Enter new course name"
//               />
//               <button type="submit">Add Course</button>
//             </form>
//           </div>
//         </div>

//         <div className="dashboard-courses-container3">
//           Courses Recommended
//           <div className="recommendeCourses">
//             <div className="recommendedCourse1">
//               {/* <img src={recommendedCourse1} alt="recommendedCourse1" /> */}
//             </div>
//             <div className="recommendedCourse2">
//               {/* <img src={recommendedCourse2} alt="recommendedCourse2" /> */}
//             </div>

//             <div className="recommendedCourse3">
//               {/* <img src={recommendedCourse3} alt="recommendedCourse3" /> */}
//             </div>

//             <div className="recommendedCourse4">
//               {/* <img src={recommendedCourse4} alt="recommendedCourse4" /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import c3 from '../assets/c3.png';
import sidebarImage from '../assets/sidebarImage.png';
import "../styles/Dashboard.css";
import recommend1 from '../assets/recommend1.png';
import recommend2 from '../assets/recommend2.png';
import recommend3 from '../assets/recommend3.png';

function Dashboard() {
  const [courses, setCourses] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);

  const [newCourseName, setNewCourseName] = useState('');

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourseName.trim() === '') return;

    const newCourse = {
      id: courses.length + 1,
      name: newCourseName
    };
    setCourses([...courses, newCourse]);
    setNewCourseName('');
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleJoinMeet = () => {
    window.location.href = 'https://meet.google.com';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img src={c3} alt="Lurna Logo" />
          <img src={sidebarImage} alt="User Image" style={{ marginTop: "80px" }} />
          <button className="sidebarmeetBtn" onClick={handleJoinMeet}>
            Join Now
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="mainDashboard"></div>
        <div className="dashboard-header">
          <h1>Welcome Aaryan Vijayvargiya</h1>
          <NavLink to="/Admission">
            <button className="newCourseBtn">ADD NEW COURSE</button>
          </NavLink>
        </div>
        <div className="dashboard-courses-container">
          <div className="calendar-container">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=270&wkst=1&ctz=UTC&bgcolor=%23efe1e1&showTitle=0&src=YWFyeWFudmlqYXkxMjM0NUBnbWFpbC5jb20&src=Y2xhc3Nyb29tMTAwMzczMDg5MTcxMjQwMDc2Mjk5QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTAxODgzOTkzMTExNzY0ODMyMjQxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA3Nzc5MzY1OTc1NTk1NDM3NzU4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTE4MjQ1MzIxNDAxMzY1ODg0ODU2QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%23202124&color=%230047a8&color=%2333B679&color=%23c26401&color=%230B8043&color=%23c26401"
              style={{ border: "solid 1px #777", width: "460px", height: "270px" }}
              frameBorder="0"
              scrolling="no"
              title="Google Calendar"
            ></iframe>
          </div>
        </div>
        
        <div className="dashboard-courses-container2">
          <div className='enrollCourse'>Courses Enrolled</div>
          {courses.map((course) => (
            <div key={course.id} className="enrolledCoursesDash">
              <p style={{marginLeft:"50px"}}>{course.name}</p>
              <button className="remove-course-button" onClick={() => handleRemoveCourse(course.id)}>X</button>
              <img src="https://img.icons8.com/bubbles/100/000000/services.png" alt="choose Course" />
            </div>
          ))}
          <div className="add-course-form">
            <form onSubmit={handleAddCourse}>
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Enter new course name"
              />
              <button type="submit">Add Course</button>
            </form>
          </div>
        </div>

        <div className="dashboard-courses-container3">
          <div className='recommend'>Courses Recommended</div>

          <div className='recommendedCourses'>
            <div className="recommendedCourse1"> 
                 <img src={recommend1} alt="" ></img>
                 <NavLink to="/Buy"> 
                 <button className='recommendBtn'>Enroll Now 🚀</button>
                 </NavLink>
                 
            </div>
            <div className="recommendedCourse2">
            <img src={recommend2} alt="" ></img>
            <NavLink to="/Buy">
            <button className='recommendBtn'>Enroll Now 🚀</button>
            </NavLink>
            
            </div>
            <div className="recommendedCourse3">
            <img src={recommend3} alt="" ></img>
            <NavLink to="/Buy">
            <button className='recommendBtn'>Enroll Now 🚀</button>
            </NavLink>
            </div>
            <div className="recommendedCourse4">
            <img src={recommend1} alt="" ></img>
            
            <NavLink to="/Buy">
            <button className='recommendBtn'>Enroll Now 🚀</button>
            </NavLink>           
            </div>
      
            </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
