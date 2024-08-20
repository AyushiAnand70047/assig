import React from 'react';

const QuestionPanel = ({ question, onAnswer }) => {
  return (
    <div className="question-panel">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
