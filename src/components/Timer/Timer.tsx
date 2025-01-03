import React, { useState, useEffect } from "react";
import Button from "../../utils/Button";
import Clock from "./Clock";
import Label from "./Label";
import ScrollPicker from "./ScrollPicker";

interface TimeType {
  hour: number;
  minute: number;
  second: number;
  totalSeconds: number;
}

interface PickerType {
  hr: number;
  min: number;
  sec: number;
}

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const ms = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

function Timer() {
  // ts performs type infer also!
  const [time, setTime] = useState<TimeType>({
    hour: 0,
    minute: 0,
    second: 0,
    totalSeconds: 0,
  });
  const [picker, setPicker] = useState<PickerType>({
    hr: 0,
    min: 0,
    sec: 0,
  });

  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  const [label, setLabel] = useState("");

  useEffect(() => {
    const totalSeconds = time.hour * 3600 + time.minute * 60 + time.second;
    setTime((prevState) => ({
      ...prevState,
      totalSeconds,
    }));
  }, [time.hour, time.minute, time.second]);

  useEffect(() => {
    if (active && !paused && time.totalSeconds > 0) {
      const interval = setInterval(() => {
        setTime((prevState: TimeType) => {
          const newTotalSeconds = prevState.totalSeconds - 1;

          // edge condition
          if (newTotalSeconds <= 0) {
            clearInterval(interval);
            return {
              ...prevState,
              totalSeconds: 0,
              hour: 0,
              minute: 0,
              second: 0,
            };
          }

          // reduce totalSecond, update hour, minute, second
          return {
            ...prevState,
            totalSeconds: newTotalSeconds,
            hour: Math.floor(newTotalSeconds / 3600),
            minute: Math.floor((newTotalSeconds % 3600) / 60),
            second: newTotalSeconds % 60,
          };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [active, paused, time.totalSeconds]);

  const handleScroll = (unit: "hr" | "min" | "sec") => (e: React.UIEvent) => {
    const target = e.target as HTMLDivElement;
    const index = Math.round(target.scrollTop / (unit === "hr" ? 25 : 27.2));

    setPicker((prevState) => {
      const newValue = unit === "hr" ? hours[index] : ms[index];
      return { ...prevState, [unit]: newValue };
    });

    setTime((prevState) => ({
      ...prevState,
      [unit === "hr" ? "hour" : unit === "min" ? "minute" : "second"]:
        unit === "hr" ? hours[index] : ms[index],
    }));
  };

  const handleStart = () => {
    setPaused(false);
    setActive(true);
  };

  const handleCancel = () => {
    setPaused(false);
    setActive(false);
  };

  const handlePause = () => {
    setPaused(true);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      {!active ? (
        <div className="min-w-96 max-h-36 text-lg flex bg-950 shadow-sm shadow-slate-800">
          <ScrollPicker
            data={hours}
            onScroll={handleScroll("hr")}
            unit={"hr"}
            picker={picker.hr}
          />
          <ScrollPicker
            data={ms}
            onScroll={handleScroll("min")}
            unit={"min"}
            picker={picker.min}
          />
          <ScrollPicker
            data={ms}
            onScroll={handleScroll("sec")}
            unit={"sec"}
            picker={picker.sec}
          />
        </div>
      ) : (
        <Clock
          hour={time.hour}
          minute={time.minute}
          second={time.second}
          totalTime={time.totalSeconds}
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
