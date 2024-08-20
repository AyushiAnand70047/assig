import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 42, seconds: 39 });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="timer">
      <h3>Time Left</h3>
      <div>{`${timeLeft.hours} hours : ${timeLeft.minutes} minutes : ${timeLeft.seconds} seconds`}</div>
    </div>
  );
};

export default Timer;
