import React, { useState, useEffect, useContext } from "react";



const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400000);
    const hours = Math.floor((time % 86400000) / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <p>{formatTime(time)}</p>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={() => setTime(0)}>Reset</button>
    </div>  
  )
};

export default Stopwatch;
