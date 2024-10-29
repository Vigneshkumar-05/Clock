import React from "react";

function Clock({ hour, minute, second, totalTime, isPaused }) {
  const duration = {
    animationDuration: `${totalTime + 2}s`,
    animationPlayState: isPaused ? "paused" : "running",
  };

  return (
    <div>
      <svg className="absolute right-set top-set w-3/12 h-3/6 transform rotate-y-360 rotate-z--90">
        <circle
          r="120"
          cx="160"
          cy="200"
          style={duration}
          className={`stroke-yellow-400 fill-none stroke-3 [stroke-dasharray:754px] [stroke-dashoffset:0px] [stroke-linecap:round] animate-countdown`}
        ></circle>
      </svg>

      <span className="h-60 w-60 text-5xl flex justify-center items-center text-gray-400">
        {hour === 0 || (hour < 10 ? "0" + hour : hour)`:`}
        {minute < 10 ? "0" + minute : minute}:
        {second < 10 ? "0" + second : second}
      </span>
    </div>
  );
}

export default Clock;
