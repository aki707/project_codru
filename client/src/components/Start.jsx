import "../styles/Start.css";

import bookImage from "../assets/books.jpg";
import thinkImage from "../assets/thinks.jpg";
import teachImage from "../assets/teach.jpg";
import studyImage from "../assets/study.jpg";

function Start() {
  return (
    <div className="Start">
      <div className="Startdiv1">
        <div className="grid-container">
          <div className="grid-item-center">
            <p>Learn Think Study and Grow with Us</p>
          </div>
        </div>
      </div>
      <div className="Startdiv2">
        <div className="text-container">
          <p>Learn How</p>
          <p>To Learn</p>
        </div>
      </div>
    </div>
  );
}

export default Start;
