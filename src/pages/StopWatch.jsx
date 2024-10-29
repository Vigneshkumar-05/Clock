import React from "react";
import { useState, useEffect } from "react";

import LapList from "../components/LapList";
import Button from "../components/Button";

function Stopwatch() {
  const [lapData, setLapData] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [millisecond, setMillisecond] = useState(0);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setMillisecond((ms) => {
          if (ms === 99) {
            setSecond((s) => {
              if (s === 59) {
                setMinute((m) => (m + 1) % 60);
                return 0;
              }
              return s + 1;
            });
            return 0;
          }
          return ms + 1;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  function handleReset() {
    setMillisecond(0);
    setSecond(0);
    setMinute(0);
    setLapData([]);
  }

  function handleLap() {
    setLapData((l) => {
      return [
        ...l,
        {
          id: lapData.length > 0 ? lapData[lapData.length - 1].id + 1 : 1,
          min: minute < 10 ? "0" + minute : minute,
          sec: second < 10 ? "0" + second : second,
          ms: millisecond < 10 ? "0" + millisecond : millisecond,
        },
      ];
    });
  }

  return (
    <div className="min-h-full flex flex-col justify-center items-center bg-black text-white">
      <div className="min-w-72 flex items-baseline justify-evenly text-6xl text-neutral-400">
        <p className="min-w-24 flex justify-center">
          {minute < 10 ? "0" + minute : minute}
        </p>
        <p className="text-6xl">:</p>
        <p className="min-w-24 flex justify-center">
          {second < 10 ? "0" + second : second}
        </p>
        <p className="mt-6 text-5xl">.</p>
        <p className="min-w-24 flex justify-center">
          {millisecond < 10 ? "0" + millisecond : millisecond}
        </p>
      </div>

      <div className="m-2 p-1 min-w-72 flex justify-around">
        <div>
          {!isActive && millisecond + second + minute > 0 ? (
            <Button buttonName={"Reset"} onClick={handleReset} />
          ) : (
            <Button buttonName={"Laps"} onClick={handleLap} />
          )}
        </div>

        <span className="text-5xl text-white">
          .<span className="text-5xl first-:text-white text-gray-600">.</span>
        </span>

        <div>
          {!isActive ? (
            <Button
              buttonName={"Start"}
              onClick={() => setIsActive((a) => true)}
            />
          ) : (
            <Button
              buttonName={"Stop"}
              onClick={() => setIsActive((a) => false)}
            />
          )}
        </div>
      </div>

      <hr className="mt-3 border-1 border-solid border-gray-800 rounded-xl" />

      <div className="min-w-72 max-h-56 overflow-y-scroll no-scrollbar ">
        <LapList laps={lapData} />
      </div>
    </div>
  );
}

export default Stopwatch;
