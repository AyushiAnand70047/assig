import React, { useState } from 'react';
import Question from './Question';
import Sidebar from './Sidebar';
import NavBar from './Navbar';

const TestEnvironment = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [reviewStatus, setReviewStatus] = useState(Array(questions.length).fill(null));

  return (
    <div>
      <Sidebar 
        currentQuestion={currentQuestion} 
        reviewStatus={reviewStatus} 
        setCurrentQuestion={setCurrentQuestion} 
      />
      <Question 
        question={questions[currentQuestion]} 
        setAnswer={(answer) => {
          const updatedAnswers = [...answers];
          updatedAnswers[currentQuestion] = answer;
          setAnswers(updatedAnswers);
        }}
      />
      <NavBar 
        currentQuestion={currentQuestion} 
        setCurrentQuestion={setCurrentQuestion} 
        questionsLength={questions.length} 
      />
      <video autoPlay>{/* Camera preview logic */}</video>
    </div>
  );
};

export default TestEnvironment;
