import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  //   useEffect(() => {
  //     const timer = setInterval(() => setTime(new Date()), 1000);
  //     return () => clearInterval(timer); // Cleanup on unmount
  //   }, []);

  //   const formatTime = (date) => {
  //     const hours = date.getHours().toString().padStart(2, "0");
  //     const minutes = date.getMinutes().toString().padStart(2, "0");
  //     const seconds = date.getSeconds().toString().padStart(2, "0");
  //     return `${hours}:${minutes}:${seconds}`;
  //   };

  const formatTime = time.toLocaleTimeString();
  const clockRunner = () => {
    const currentTime = new Date();
    console.log(currentTime);
    setTime(currentTime);
  };
  useEffect(() => {
    const runningTime = setInterval(() => clockRunner(), 1000);
    console.log("Digital Clock mounted");
    return () => {
      clearInterval(runningTime);
      console.log("Digital Clock unMounted");
    };
  }, []);

  return (
    <div className="flex justify-center items-center p-10 bg-gray-700">
      <div className="text-center">
        <h1 className="text-3xl text-white font-bold">Digital Clock</h1>
        <p className="text-4xl mt-5 text-blue-400 font-mono">{formatTime}</p>
      </div>
    </div>
  );
};

export default DigitalClock;
