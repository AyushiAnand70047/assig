import React from 'react';

const SubmitTest = ({ onSubmit }) => {
  return (
    <div>
      <h1>Submit Test</h1>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default SubmitTest;
