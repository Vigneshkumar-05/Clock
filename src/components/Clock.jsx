import { min } from "d3";
import React from "react";

function Clock({ hour, minute, second, totalTime, isPaused }) {
  const duration = {
    animationDuration: `${totalTime}s`,
    animationPlayState: isPaused ? "paused" : "running",
  };

  return (
    <div className="max-w-screen max-h-screen flex justify-center items-center">
      <svg className="min-w-64 min-h-72 transform rotate-y-360 rotate-z--90">
        <circle
          r="40%"
          cx="50%"
          cy="50%"
          style={duration}
          className={`stroke-yellow-400 fill-none stroke-3 [stroke-dasharray:738px] [stroke-dashoffset:0px] [stroke-linecap:round] animate-countdown`}
        ></circle>
      </svg>
      <span className="absolute text-6xl flex justify-center items-center text-gray-400">
        {hour > 0 ? (
          <>
            {hour < 10 ? `0${hour}` : hour}
            <span className="text-2xl">:</span>
            {minute < 10 ? `0${minute}` : minute}
            <span className="text-2xl">:</span>
            {second < 10 ? `0${second}` : second}
          </>
        ) : (
          <>
            {minute < 10 ? `0${minute}` : minute}
            <span className="text-2xl">:</span>
            {second < 10 ? `0${second}` : second}
          </>
        )}
      </span>
    </div>
  );
}

export default Clock;
