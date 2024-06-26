// TaskForm.jsx

import React, { useState } from 'react';
import '../styles/TaskForm.css'; 
const TaskForm = () => {
  const [studentId, setStudentId] = useState('');
  const [weekNo, setWeekNo] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    
    console.log({ studentId, weekNo, question, answer, link });

    
    setStudentId('');
    setWeekNo('');
    setQuestion('');
    setAnswer('');
    setLink('');
  };

  return (
    <div className="task-form">
      <div className="form-container">
        <h2 className="form-heading">Task Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId" className="form-label">
            Student ID:
          </label>
          <input
            type="text"
            id="studentId"
            className="form-input"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <label htmlFor="weekNo" className="form-label">
            Week Number:
          </label>
          <input
            type="text"
            id="weekNo"
            className="form-input"
            value={weekNo}
            onChange={(e) => setWeekNo(e.target.value)}
            required
          />

          <label htmlFor="question" className="form-label">
            Question:
          </label>
          <input
            type="text"
            id="question"
            className="form-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <label htmlFor="answer" className="form-label">
            Answer:
          </label>
          <textarea
            id="answer"
            className="form-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          ></textarea>

          <label htmlFor="link" className="form-label">
            Link:
          </label>
          <input
            type="text"
            id="link"
            className="form-input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
