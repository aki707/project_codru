import React from 'react';
import "../styles/Custom.css";
import { NavLink } from 'react-router-dom';

const Custom = () => {
  return (
    <div className="course-table-container">
      <div className="header">
        <h1>Codru Education</h1>
        <h2>Learn, how to learn.</h2>
      </div>
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Perks</th>
            <th>1 Day</th>
            <th>7 Days</th>
            <th>30 Days</th>
            <th>45 Days</th>
            <th>90 Days</th>
            <th>180 Days</th>
            <th>Yearly</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Doubt & Self-Study Sessions",
            "One:One Interactive Sessions",
            "Subjects of Choice",
            "Mini Workshops",
            "Performance Report",
            "Collaborative Learning",
            "Access to Workshops & Events",
            "Access to Book Bank & Library",
            "Mentorship & Career Guidance",
            "Internship & Training (B.Tech Students)"
          ].map((perk, index) => (
            <tr key={index}>
              <td>{perk}</td>
              {["1 Day", "7 Days", "30 Days", "45 Days", "90 Days", "180 Days", "Yearly"].map((duration, idx) => (
                <td key={idx}>{index < 2 || (duration === "1 Day" && index < 2) ? "✔️" : "" || (duration === "7 Days" && index < 3) ? "✔️" : "" || (duration === "30 Days" && index < 5) ? "✔️" : "" || (duration === "45 Days" && index < 6) ? "✔️" : "" || (duration === "90 Days" && index < 7) ? "✔️" : "" || (duration === "180 Days" && index < 8) ? "✔️" : "" || (duration === "Yearly" && index < 9) ? "✔️" : "" || (duration === "30 Days" && index === 9) ? "✔️" : "" || (duration === "45 Days" && index === 9) ? "✔️" : "" || (duration === "90 Days" && index === 9) ? "✔️" : ""}</td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Total Fee</td>
            {["1 Day", "7 Days", "30 Days", "45 Days", "90 Days", "180 Days", "Yearly"].map((duration, idx) => (
              <td key={idx}>
                <div className="fee-cell">
                  <NavLink to='/Admission'>
                    <button className="custom-buy-now-button">Customize Now</button>
                  </NavLink>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="particulars">
        <ul>
          <li>We follow 5 - days work week.</li>
          <li>1 and 3 month courses will have an Admission Test.</li>
          <li>1 month course only offers 1 subject for crash course.</li>
          <li>3 month course offers 3 core subjects only for crash course.</li>
          <li>Duration of each class is 45 minutes except for 1 Day (Max: 1.5 Hours).</li>
          <li>Demo is only available for courses of duration 1, 3, 6 months and yearly.</li>
          <li>Our Mini Workshop Includes Movies, Games, Magic Maths & Self- Development Sessions on weekly basis.</li>
          <li>6 month & 1 year courses will not have daily 1:1 self study sessions. There will be weekly or monthly 1:1 sessions.</li>
        </ul>
      </div>
      <div className="footer">
        <p>📞 7300-199-100, 8949-775-255</p>
        <p>📍 Shop No.: 1 & 2 near Ahinsa Circle, R.K. Puram, Kota (Rajasthan)</p>
      </div>
    </div>
  );
};

export default Custom;
