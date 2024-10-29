import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RiTimerFill } from "react-icons/ri";
import { IoTimer } from "react-icons/io5";

function Navbar() {
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  function handleStopwatchIconFunc() {
    navigate("/");
    setActive((a) => !a);
  }

  function handleTimerIconFunc() {
    navigate("/timer");
    setActive((a) => !a);
  }

  return (
    <div className="sticky bottom-0 min-w-lvw flex justify-center bg-black text-white">
      <div className="min-w-16 flex">
        <div
          onClick={handleStopwatchIconFunc}
          className={`w-28 flex flex-col items-center justify-center cursor-pointer ${
            active ? "text-yellow-300" : "text-white"
          }`}
        >
          <RiTimerFill className="size-8" />
          <span className="text-sm">Stopwatch</span>
        </div>

        <div
          className={`w-28 flex flex-col items-center justify-center cursor-pointer ${
            !active ? "text-yellow-300" : "text-white"
          }`}
          onClick={handleTimerIconFunc}
        >
          <IoTimer className="size-8" />
          <span className="text-sm">Timers</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
