import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import Question from './components/Question';
import Sidebar from './components/Sidebar';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PermissionsCheck from './components/Permissions';
import CameraView from './components/CameraView';

const questions = [
  // Your questions array here
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [reviewStatus, setReviewStatus] = useState(Array(questions.length).fill(null)); // null, 'answered', 'marked', 'notAttempted'
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and registration

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setShowLogin(true); // After registration, show login page
  };

  const handlePermissionsGranted = () => {
    setPermissionsGranted(true);
  };

  const handlePermissionsDenied = () => {
    alert("Please grant camera and mic permissions to proceed.");
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <div className="auth-toggle">
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Register</button>
        </div>
        {showLogin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register onRegister={handleRegister} />
        )}
      </div>
    );
  }

  if (!permissionsGranted) {
    return <PermissionsCheck onPermissionsGranted={handlePermissionsGranted} onPermissionsDenied={handlePermissionsDenied} />;
  }

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    const updatedStatus = [...reviewStatus];
    updatedStatus[currentQuestion] = 'answered';
    setReviewStatus(updatedStatus);
  };

  const handleMarkForReview = () => {
    const updatedStatus = [...reviewStatus];
    updatedStatus[currentQuestion] = 'marked';
    setReviewStatus(updatedStatus);
  };

  const handleNavigation = (direction) => {
    setCurrentQuestion((prev) => {
      if (direction === 'next' && prev < questions.length - 1) return prev + 1;
      if (direction === 'prev' && prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    const updatedStatus = answers.map((answer, index) =>
      answer === null && reviewStatus[index] !== 'marked' ? 'notAttempted' : reviewStatus[index]
    );
    setReviewStatus(updatedStatus);
    alert("Test submitted!");
  };

  return (
    <div className="App">
      <div className="test-container">
        <div className="header">
          Online Test - CAT Preparation
        </div>
        <div className="camera-timer-container">
          <CameraView />
          <Timer />
        </div>
        <Question
          question={questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <Sidebar
          questions={questions}
          reviewStatus={reviewStatus}
          onQuestionClick={handleQuestionClick}
          currentQuestion={currentQuestion}
        />
        <NavBar
          onPrev={() => handleNavigation('prev')}
          onNext={() => handleNavigation('next')}
          onMarkReview={handleMarkForReview}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
