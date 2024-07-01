
import React, { useState, useEffect, useRef } from 'react';
import DraggableBox from './DraggableBox';
import PlanetryAnimatedBackground from './PlanetryAnimatedBackground';
import Xarrow, { Xwrapper } from 'react-xarrows';
import '../styles/PlanetryPath.css';
import TaskModal from './TaskModal';
import '../styles/Elements.css';
// import Checkpoint from './Checkpoint';
// import Character from './Character';
// import TaskForm from './TaskForm';

const PlanetryPath = () => {
  const numElements = 48;
  const elementIds = Array.from({ length: numElements }, (_, i) => `elem${i + 1}`);
  const xIncrement = 220; 
  const containerHeight = window.innerHeight - 200; // Adjusting for element height and some margin

  const generateRandomYPosition = () => {
    const minY = 50; // Minimum y position
    const maxY = containerHeight - 450; // Adjusted to prevent overflow
    return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  };

  const defaultPositions = elementIds.reduce((acc, id, index) => {
    const x = 50 + index * xIncrement;
    const y = generateRandomYPosition();
    acc[id] = { x, y };
    return acc;
  }, {});

  const [positions, setPositions] = useState(defaultPositions);
  const [showModal, setShowModal] = useState(false);
  const [modalQuestion, setModalQuestion] = useState('');
  const [modalAnswer, setModalAnswer] = useState('');
  const [modalLink, setModalLink] = useState('');
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const scrollContainerRef = useRef(null);

  const questionsAndAnswers = [
    { id: 'elem1', question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.', link: 'https://reactjs.org' },
    { id: 'elem2', question: 'What is a component?', answer: 'A component is a reusable piece of UI in a React application.', link: 'https://reactjs.org/docs/components-and-props.html' },
    { id: 'elem3', question: 'What is a component?', answer: 'A component is a reusable piece of UI in a React application.', link: 'https://reactjs.org/docs/components-and-props.html' },
    
  ];

  const handlePositionChange = (id, x, y) => {
    const newY = Math.min(Math.max(y, 50), containerHeight - 50); // Clamp Y to within bounds
    const newPositions = { ...positions, [id]: { x, y: newY } };
    setPositions(newPositions);
  };

  const handleElementClick = (id, event) => {
    event.preventDefault();
    event.stopPropagation();

    const { x, y, width, height } = event.target.getBoundingClientRect();
    const modalWidth = 300; //  modal's width
    const modalHeight = 200; //  modal's height
    
    // Calculate modal position considering scroll and viewport dimensions
    const modalX = x + window.scrollX + width / 2;
    const modalY = y + window.scrollY + height / 2;
    
    // Determine if the element is near the edges of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let adjustedX = modalX;
    let adjustedY = modalY;
    
    // Adjust X position
    if (modalX + modalWidth / 2 > viewportWidth) {
      adjustedX = viewportWidth - modalWidth / 2;
    } else if (modalX - modalWidth / 2 < 0) {
      adjustedX = modalWidth / 2;
    }
    
    // Adjust Y position
    if (modalY + modalHeight / 2 > viewportHeight) {
      adjustedY = viewportHeight - modalHeight / 2;
    } else if (modalY - modalHeight / 2 < 0) {
      adjustedY = modalHeight / 2;
    }

    const clickedElementData = questionsAndAnswers.find(item => item.id === id);
    
    if (clickedElementData) {
      setModalQuestion(clickedElementData.question);
      setModalAnswer(clickedElementData.answer);
      setModalLink(clickedElementData.link);
      setModalPosition({ x: adjustedX, y: adjustedY });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalQuestion('');
    setModalAnswer('');
    setModalLink('');
  };

  const handleWheel = (event) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div className="Pscroll-container" ref={scrollContainerRef}>
      <div className="Pscroll-content">
        <Xwrapper>
          {elementIds.map(id => (
            <div key={id}>
              <DraggableBox
                id={id}
                onDrag={(x, y) => handlePositionChange(id, x, y)}
                onClick={(e) => handleElementClick(id, e)}
                className={`element ${id}`}
                style={{ left: positions[id].x, top: positions[id].y }}
              />
            </div>
          ))}
          {elementIds.slice(1).map((id, index) => (
            <Xarrow key={id} start={elementIds[index]} end={id} curveness={1.5} />
          ))}
        </Xwrapper>
        <TaskModal
          show={showModal}
          onClose={handleCloseModal}
          question={modalQuestion}
          answer={modalAnswer}
          link={modalLink}
          position={modalPosition}
        />
        
        <PlanetryAnimatedBackground />
      </div>
    </div>
  );
};

export default PlanetryPath;
