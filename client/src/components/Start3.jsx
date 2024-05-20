// src/StudyExplore.js
import "../styles/Start3.css"; // Create a separate CSS file for styling
import bookImage from "../assets/books.jpg";
const Start3 = () => {
  const subjects = [
    {
      title: "Science",
      image: { bookImage }, // Replace with actual path
      description:
        "Dive into the fascinating realm of science, where curiosity meets discovery and innovation knows no bounds. From unlocking the mysteries of the cosmos to understanding the intricate workings of life at a cellular level, science empowers us to explore, question, and comprehend the world around us.",
    },
    {
      title: "Mathematics",
      image: "path/to/math-image.jpg", // Replace with actual path
      description:
        "Step into the world of mathematics, where numbers dance, shapes come alive, and equations form the poetry of patterns and structures. From the simplest arithmetic to the most complex calculus, mathematics is the universal language that unlocks the secrets of the universe.",
    },
    {
      title: "Technology",
      image: "path/to/technology-image.jpg", // Replace with actual path
      description:
        "Step into the dynamic world of technology, where innovation is boundless and possibilities are only limited by imagination. From the dawn of the digital age to the era of artificial intelligence, technology has been the driving force behind human progress, revolutionizing the way we live, work, and connect with one another.",
    },
    {
      title: "Engineering",
      image: "path/to/engineering-image.jpg", // Replace with actual path
      description:
        "Welcome to the realm of engineering, where creativity meets ingenuity and innovative solutions are shaped. From building awe-inspiring structures to designing advanced machinery, engineering is the driving force behind modern advancements, turning dreams into tangible achievements.",
    },
  ];

  return (
    <div className="study-explore">
      <h1 className="heading">Explore the Way You Want To Study...</h1>
      <div className="subjects">
        {subjects.map((subject, index) => (
          <div key={index} className="subject">
            <img
              src={subject.image}
              alt={subject.title}
              className="subject-image"
            />
            <h2 className="subject-title">{subject.title}</h2>
            <p className="subject-description">{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Start3;
