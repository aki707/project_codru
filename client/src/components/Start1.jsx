import "../styles/Start1.css";

import bookImage from "../assets/books.jpg";
import thinkImage from "../assets/thinks.jpg";
import teachImage from "../assets/teach.jpg";
import studyImage from "../assets/study.jpg";

function Start1() {
  return (
    <div className="Start1">
      <div className="Start1div1">
        <div className="square-container">
          <img src={bookImage} alt="Books" className="corner-image top-left" />
          <img
            src={thinkImage}
            alt="Think"
            className="corner-image top-right"
          />
          <img
            src={teachImage}
            alt="Teach"
            className="corner-image bottom-left"
          />
          <img
            src={studyImage}
            alt="Study"
            className="corner-image bottom-right"
          />
          Learn Think Study and Grow with Us
        </div>
      </div>
      <div className="Start1div2">
        <div className="text-container">
          <p>Learn How To Learn</p>
        </div>
      </div>
    </div>
  );
}

export default Start1;
