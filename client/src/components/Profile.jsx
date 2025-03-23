// import "../styles/Profile.css";

// import profilelogo from "../assets/signUp.png";
// import profile from "../assets/userprofile.jpeg";
// import dashboard from "../assets/dashboard.jpeg";
// import courses from "../assets/courses.jpeg";
// import activity from "../assets/activity.jpeg";
// import Userprofile from "./Userprofile";

// const Profile = () => {

//   const handleheading = (prop) => {

//   };
//   return (
//     <div className="profile">
//       <div className="profilecont">
//         <div className="profilecontdiv1">
//           <img className="profilelogo" src={profilelogo} alt="" />
//           <div onClick={() => handleheading("Profile")}>
//             <img src={profile} alt="" />
//             <p>Profile</p>
//           </div>
//           <div onClick={() => handleheading("Courses")}>
//             <img src={courses} alt="" />
//             <p>Courses</p>
//           </div>
//           <div onClick={() => handleheading("Dashboard")}>
//             <img src={dashboard} alt="" />
//             <p>Dashboard</p>
//           </div>
//           <div onClick={() => handleheading("Activity")}>
//             <img src={activity} alt="" />
//             <p>Activity</p>
//           </div>
//         </div>
//         <div className="profilecontdiv2">
//           <Userprofile />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { useState, useEffect } from "react";
// import "../styles/Admission.css";

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     address: "",
//     userphoto: "",
//     usersign: "",
//     userparentsign: "",
//     gender: "",
//     phone: "",
//     altphone: "",
//     declaration: false,
//     classorsem: "",
//     chosensubs: ["", "", "", "", "", ""],
//     schoolorcollege: "",
//     semorclg: "",
//     fatherName: "",
//     fatherOcc: "",
//     motherName: "",
//     motherOcc: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       const storedUsername = localStorage.getItem("Username");
//       if (!storedUsername) {
//         console.error("name not found in localStorage");
//         return;
//       }

//       try {
//         const res = await fetch(
//           `https://codru-server.vercel.app/students/${storedUsername}`
//         );
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         const data = await res.json();
//         setFormData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handlefileinput = (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         const newPhoto = reader.result;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           [name]: newPhoto,
//         }));
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, type, value, checked } = e.target;

//     if (name.startsWith("Subject_Choosen")) {
//       const index = parseInt(name.replace("Subject_Choosen", ""), 10);
//       const subjects = [...formData.chosensubs];
//       subjects[index] = value;
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         chosensubs: subjects,
//       }));
//     } else if (type === "checkbox") {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: checked,
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("https://codru-server.vercel.app/admission", {
//         // Adjust the URL as needed
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const jsondata = await res.json();
//         console.log(jsondata);
//         window.alert("Data submitted successfully");
//       } else {
//         console.log("Error submitting data");
//         window.alert("Submission failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       window.alert("An error occurred while submitting the form");
//     }
//   };

//   return (
//     <div className="Admission-form-container">
//       <form onSubmit={handleSubmit}>
//         <table
//           className="form-table"
//           align="center"
//           cellPadding="20"
//           cellSpacing="20"
//         >
//           <tbody>
//             <tr>
//               <td>
//                 <b>Name:</b>
//               </td>
//               <td colSpan="3">
//                 <input type="text" name="name" value={formData.name} disabled />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Date of Birth:</b>
//               </td>
//               <td colSpan="3">
//                 <input type="date" name="dob" value={formData.dob} disabled />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Gender:</b>
//               </td>
//               <td>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   checked={formData.gender === "Male"}
//                   disabled
//                 />{" "}
//                 Male
//               </td>
//               <td>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   checked={formData.gender === "Female"}
//                   disabled
//                 />{" "}
//                 Female
//               </td>
//               <td>
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Other"
//                   checked={formData.gender === "Other"}
//                   disabled
//                 />{" "}
//                 Other
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Address:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="Present Address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Email id:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="email"
//                   placeholder="Email id"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Phone No.:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="tel"
//                   placeholder="Phone No."
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Alternate Phone No.:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="tel"
//                   placeholder="Alternate Phone No."
//                   name="altphone"
//                   value={formData.altphone}
//                   onChange={handleChange}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Subject Choosen:</b>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen0"
//                   value={formData.chosensubs[0]}
//                   disabled
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen1"
//                   value={formData.chosensubs[1]}
//                   disabled
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen2"
//                   value={formData.chosensubs[2]}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen3"
//                   value={formData.chosensubs[3]}
//                   disabled
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen4"
//                   value={formData.chosensubs[4]}
//                   disabled
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   placeholder="Subject Choosen"
//                   name="Subject_Choosen5"
//                   value={formData.chosensubs[5]}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Class:</b>
//               </td>
//               <td colSpan="3">
//                 <select name="classorsem" value={formData.classorsem} disabled>
//                   <option value="" disabled>
//                     Select class
//                   </option>
//                   <option value="6">6th</option>
//                   <option value="7">7th</option>
//                   <option value="8">8th</option>
//                   <option value="9">9th</option>
//                   <option value="10">10th</option>
//                   <option value="11">11th</option>
//                   <option value="12">12th</option>
//                   <option value="13">Undergraduate</option>
//                 </select>
//               </td>
//             </tr>
//             {formData.classorsem === "13" && (
//               <tr>
//                 <td>
//                   <b>Semester:</b>
//                 </td>
//                 <td colSpan="3">
//                   <select name="semorclg" value={formData.semorclg} disabled>
//                     <option value="" disabled>
//                       Select Semester
//                     </option>
//                     <option value="1">Semester 1</option>
//                     <option value="2">Semester 2</option>
//                     <option value="3">Semester 3</option>
//                     <option value="4">Semester 4</option>
//                     <option value="5">Semester 5</option>
//                     <option value="6">Semester 6</option>
//                     <option value="7">Semester 7</option>
//                     <option value="8">Semester 8</option>
//                   </select>
//                 </td>
//               </tr>
//             )}
//             <tr>
//               <td>
//                 <b>School/College:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="School/College"
//                   name="schoolorcollege"
//                   value={formData.schoolorcollege}
//                   onChange={handleChange}
//                   required
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Father's Name:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="Father's Name"
//                   name="fatherName"
//                   value={formData.fatherName}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Father's Occupation:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="Father's Occupation"
//                   name="fatherOcc"
//                   value={formData.fatherOcc}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Mother's Name:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="Mother's Name"
//                   name="motherName"
//                   value={formData.motherName}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Mother's Occupation:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="text"
//                   placeholder="Mother's Occupation"
//                   name="motherOcc"
//                   value={formData.motherOcc}
//                   disabled
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>User Photo:</b>
//               </td>
//               <td colSpan="3">
//                 <label htmlFor="userphoto">change photo</label>
//                 <input
//                   type="file"
//                   name="userphoto"
//                   id="userphoto"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={handlefileinput}
//                 />
//                 {formData.userphoto && (
//                   <img
//                     src={formData.userphoto}
//                     alt="User Photo Preview"
//                     style={{ maxWidth: "200px", marginTop: "10px" }}
//                   />
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>User Signature:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="file"
//                   name="usersign"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   // onChange={handleFileInput}
//                 />
//                 {formData.usersign && (
//                   <img
//                     src={formData.usersign}
//                     alt="User Signature Preview"
//                     style={{ maxWidth: "200px", marginTop: "10px" }}
//                   />
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <b>Parent's Signature:</b>
//               </td>
//               <td colSpan="3">
//                 <input
//                   type="file"
//                   name="userparentsign"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   // onChange={handleFileInput}
//                 />
//                 {formData.userparentsign && (
//                   <img
//                     src={formData.userparentsign}
//                     alt="Parent Signature Preview"
//                     style={{ maxWidth: "200px", marginTop: "10px" }}
//                   />
//                 )}
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="4">
//                 <input
//                   type="checkbox"
//                   name="declaration"
//                   checked={formData.declaration}
//                   // onChange={handleChange}
//                   // required
//                 />{" "}
//                 I do hereby declare that all the information provided above is
//                 true to my knowledge.
//               </td>
//             </tr>
//             <tr>
//               <td colSpan="4" align="center">
//                 <button type="submit">Update Profile</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import "../styles/Admission.css";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="admission-form">
      <div className="header">
        <h1>📚 Codru Education</h1>
        <p>Learn, how to learn.</p>
      </div>
      <div className="form-container">
        <h2>Admission Form</h2>

        {/* Photo Upload Section */}
        <div className="photo-box">
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded" className="uploaded-photo" />
          ) : (
            <p>Upload Photo</p>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <form>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>DOB:</label>
            <div className="dob-container">
              <input type="text" placeholder="DD" className="dob-input" />
              /
              <input type="text" placeholder="MM" className="dob-input" />
              /
              <input type="text" placeholder="YYYY" className="dob-input" />
            </div>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <label>
              <input type="radio" name="gender" /> Male
            </label>
            <label>
              <input type="radio" name="gender" /> Female
            </label>
            <label>
              <input type="radio" name="gender" /> Other
            </label>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea rows="2"></textarea>
          </div>
          <div className="form-group">
            <label>Email Id:</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Phone No.:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Alt Phone No.:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Chosen Subjects:</label>
            <div className="subject-box">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <input key={num} type="text" placeholder={`${num}`} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Class / Semester:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>School / College:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Father’s Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Mother’s Name:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Father’s Occupation:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Mother’s Occupation:</label>
            <input type="text" />
          </div>

          {/* Declaration with Checkbox */}
          <div className="declaration">
            <h3>Declaration</h3>
            <label className="declaration-label">
              <input type="checkbox" required />
              I hereby declare that I will obey all the rules and regulations of
              the institution and be fully responsible for violating the rules.
            </label>
          </div>

          <div className="signatures">
            <p>Student’s Signature</p>
            <p>Parent’s / Guardian’s Signature</p>
          </div>
        </form>
      </div>
      <div className="footer">
        <p>Phone No.: 7300-199-100</p>
        <p>Shop No. 1 & 2 R. K. Puram Kota</p>
      </div>
    </div>
  );
};

export default Profile;
