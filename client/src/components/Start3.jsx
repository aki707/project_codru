import "../styles/Start3.css";
import science from "../assets/science.jpg";
import technology from "../assets/technology.jpg";
import math from "../assets/math.jpeg";
import engineering from "../assets/engineering.jpg";


function Start3() {
  return (
    <div className="Start3">
   
      
      <div className="Start3div1">Explore The Way You Want To Study...</div>
      
      <div className="Start3div2">
        <div className="Start3div2div">
          <div>
            <img src={science} alt="" />
          </div>
          <div>
            <h2>Science</h2>
            <p>
              Dive into the fascinating realm of science, where curiosity meets
              discovery and innovation knows no bounds. From unraveling the
              mysteries of the cosmos to understanding the intricate workings of
              life at a cellular level, science empowers us to explore,
              question, and comprehend the world around us.
            </p>
            
          </div>
        </div>
        <div className="start3-hollow-circle"></div>
        

        <div className="Start3div2div">
          <div>
            <h2>Mathematics</h2>
            <p>
              Step into the world of mathematics, where numbers dance, shapes
              come alive, and equations unveil the beauty of patterns and
              structures. From the simplest arithmetic to the most complex
              calculus, mathematics is the universal language that unlocks the
              secrets of the universe.
            </p>
          </div>
          <div>
            <img src={math} alt="" />
          </div>
        </div>

        <div className="Start3div2div">
          <div>
            <img src={technology} alt="" />
          </div>
          <div>
            <h2>Technology</h2>
            <p>
              Step into the dynamic world of technology, where innovation knows
              no bounds and possibilities are limited only by imagination. From
              the dawn of civilization to the digital age, technology has been
              the driving force behind human progress, revolutionizing the way
              we live, work, and connect with one another.
            </p>
          </div>
        </div>

        <div className="Start3div2div">
          <div>
            <h2>Engineering</h2>
            <p>
              Welcome to the realm of engineering, where creativity meets
              ingenuity and innovation shapes the world around us. From towering
              skyscrapers to cutting-edge technology, engineering is the driving
              force behind human progress, transforming ideas into reality and
              turning dreams into tangible achievements.
            </p>
          </div>
          <div>
            <img src={engineering} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start3;
