import React from "react";
import "../styles/TaskModel.css";

const TaskModal = ({ show, onClose, question, answer, link, position }) => {
  if (!show) {
    return null;
  }

  // Calculate modal position considering scroll and viewport dimensions
  const calculateModalPosition = () => {
    const modalWidth = 400; // Adjust according to your modal's width
    const modalHeight = 300; // Adjust according to your modal's height
    const { x, y } = position;

    // Determine viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Adjusted positions
    let adjustedX = x;
    let adjustedY = y;

    // Check if modal exceeds viewport boundaries
    if (x + modalWidth > viewportWidth) {
      adjustedX = viewportWidth - modalWidth - 20; // Adjusting for some padding
    }

    if (y + modalHeight > viewportHeight) {
      adjustedY = viewportHeight - modalHeight - 20; // Adjusting for some padding
    }

    return { top: adjustedY, left: adjustedX };
  };

  const modalStyle = {
    position: "fixed",
    top: calculateModalPosition().top + "px",
    left: calculateModalPosition().left + "px",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>Close</button>
        <h2>Task Details</h2>
        <h3>{question}</h3>
        <p>{answer}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </div>
    </div>
  );
};

export default TaskModal;
