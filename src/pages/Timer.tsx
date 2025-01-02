import React, { ReactElement } from "react";
import { useState, useEffect } from "react";

import Button from "../components/Button";
import Clock from "../components/Clock";
import Label from "../components/Label";
import ScrollPicker from "../components/ScrollPicker";

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const ms = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

function Timer() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [hrPicker, setHrPicker] = useState(0);
  const [minPicker, setMinPicker] = useState(0);
  const [secPicker, setSecPicker] = useState(0);

  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  const [label, setLabel] = useState("");

  useEffect(() => {
    let totalSeconds = hour * 3600 + minute * 60 + second;
    console.log(totalSeconds);

    if (active && paused === false && totalSeconds > 0) {
      setTotalTime(totalSeconds);

      const interval = setInterval(() => {
        totalSeconds -= 1;

        if (totalSeconds <= 0) {
          clearInterval(interval);
          totalSeconds = 0;
        }

        if (totalSeconds >= 3600) {
          setHour(Math.floor(totalSeconds / 3600));
        }

        if (totalSeconds % 3600 >= 60) {
          setMinute(Math.floor((totalSeconds % 3600) / 60));
        }
        setSecond(totalSeconds % 60);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [active, paused]);

  function handleStart() {
    setPaused(false);
    setActive(true);
  }

  function handleCancel() {
    setPaused(false);
    setActive(false);
  }

  function handlePause() {
    setPaused(true);
  }

  function handleHrScroll(e: React.UIEvent) {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollTop / 25);
    setHrPicker(index);
    setHour(hours[index]);
  }

  function handleMinScroll(e: React.UIEvent) {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollTop / 27.2);
    setMinPicker(index);
    setMinute(ms[index]);
  }

  function handleSecScroll(e: React.UIEvent) {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollTop / 27.2);
    setSecPicker(index);
    setSecond(ms[index]);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Scrollable picker */}
      {!active ? (
        <div className="min-w-96 max-h-36 text-lg flex bg-950 shadow-sm shadow-slate-800">
          <ScrollPicker
            data={hours}
            onScroll={handleHrScroll}
            unit={"hr"}
            picker={hrPicker}
          />

          <ScrollPicker
            data={ms}
            onScroll={handleMinScroll}
            unit={"min"}
            picker={minPicker}
          />

          <ScrollPicker
            data={ms}
            onScroll={handleSecScroll}
            unit={"sec"}
            picker={secPicker}
          />
        </div>
      ) : (
        <Clock
          hour={hour}
          minute={minute}
          second={second}
          totalTime={totalTime}
          isPaused={paused}
        />
      )}
      <br />

      <div className="w-72 flex justify-between">
        <Button buttonName={"Cancel"} onClick={handleCancel} />
        <span className="text-5xl text-white">
          .<span className="text-5xl first-:text-white text-gray-600">.</span>
        </span>
        {!active || paused ? (
          <Button buttonName={"Start"} onClick={handleStart} />
        ) : (
          <Button buttonName={"Pause"} onClick={handlePause} />
        )}
      </div>

      <Label label={label} setLabel={setLabel} />
    </div>
  );
}

export default Timer;
