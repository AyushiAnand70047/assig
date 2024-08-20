import React from 'react';

const Sidebar = ({ questions, reviewStatus, onQuestionClick, currentQuestion }) => {
  const getClass = (status, index) => {
    if (index === currentQuestion) return 'current';
    if (status === 'answered') return 'answered';
    if (status === 'marked') return 'marked';
    if (status === 'notAttempted') return 'not-attempted';
    return '';
  };

  return (
    <div className="sidebar">
      <div className="section">
        <h3>Quant</h3>
        <div className="grid">
          {questions.map((_, index) => (
            <button
              key={index}
              className={getClass(reviewStatus[index], index)}
              onClick={() => onQuestionClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
