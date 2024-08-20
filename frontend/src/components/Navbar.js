import React from 'react';

const NavBar = ({ onPrev, onNext, onMarkReview, onSubmit }) => {
  return (
    <div className="nav-bar">
      <button className="mark-review" onClick={onMarkReview}>Mark for review</button>
      <button className="previous" onClick={onPrev}>Previous</button>
      <button className="next" onClick={onNext}>Next</button>
      <button className="submit" onClick={onSubmit}>Submit Test</button>
    </div>
  );
};

export default NavBar;
