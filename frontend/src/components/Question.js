import React from 'react';

const Question = ({ question, selectedAnswer, onAnswer }) => {
  return (
    <div className="question-section">
      <h2>Question {question.id}</h2>
      <p>{question.text}</p>
      <form>
        {question.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswer(option)}
            />
            {String.fromCharCode(65 + index)}. {option}
          </label>
        ))}
      </form>
    </div>
  );
};

export default Question;
