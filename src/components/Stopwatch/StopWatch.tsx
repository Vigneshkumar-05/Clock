import React from "react";
import { useState, useEffect, useReducer } from "react";

import LapList from "./LapList";
import Button from "../../utils/Button";

type LapDataType = {
  id: number;
  min: string;
  sec: string;
  ms: string;
}[];

type State = {
  minute: number;
  second: number;
  millisecond: number;
};

type Action =
  | { type: "update_millisecond"; value: number }
  | { type: "update_second"; value: number }
  | { type: "update_minute"; value: number };

const timeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update_millisecond":
      return { ...state, millisecond: action.value };
    case "update_second":
      return { ...state, second: action.value };
    case "update_minute":
      return { ...state, minute: action.value };
  }
};

const Stopwatch: React.FunctionComponent = () => {
  const initialState = { minute: 0, second: 0, millisecond: 0 };
  const [state, dispatch] = useReducer(timeReducer, initialState);

  const [lapData, setLapData] = useState<LapDataType>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      interval = setInterval(() => {
        if (state.millisecond === 100) {
          dispatch({ type: "update_millisecond", value: 0 });

          const updatedSecond = state.second + 1;
          if (updatedSecond === 60) {
            dispatch({ type: "update_second", value: 0 });

            const updatedMinute = state.minute + 1;
            if (updatedMinute === 60) {
              dispatch({ type: "update_minute", value: 0 });
            } else {
              dispatch({ type: "update_minute", value: updatedMinute });
            }
          } else {
            dispatch({ type: "update_second", value: updatedSecond });
          }
        } else {
          dispatch({
            type: "update_millisecond",
            value: state.millisecond + 1,
          });
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isActive, state]);

  const handleReset = (e: React.ChangeEvent<Element>) => {
    e.preventDefault();
    dispatch({ type: "update_millisecond", value: 0 });
    dispatch({ type: "update_second", value: 0 });
    dispatch({ type: "update_minute", value: 0 });
    setLapData([]);
  };

  const handleLap = (e: React.ChangeEvent<Element>) => {
    e.preventDefault();
    setLapData((prevLapData: LapDataType) => {
      const lastLap =
        prevLapData.length > 0 ? prevLapData[prevLapData.length - 1] : null;
      return [
        ...prevLapData,
        {
          id: lastLap ? Number(lastLap.id) + 1 : 1,

          min: state.minute.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }),

          sec: ("0" + state.second).slice(-2),

          ms: ("0" + state.millisecond).slice(-2),
        },
      ];
    });
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center bg-black text-white">
      <div className="min-w-72 flex items-baseline justify-evenly text-6xl text-neutral-400">
        <p className="min-w-24 flex justify-center">
          {("0" + state.minute).slice(-2)}
        </p>
        <p className="text-6xl">:</p>
        <p className="min-w-24 flex justify-center">
          {("0" + state.second).slice(-2)}
        </p>
        <p className="mt-6 text-5xl">.</p>
        <p className="min-w-24 flex justify-center">
          {("0" + state.millisecond).slice(-2)}
        </p>
      </div>

      <div className="m-2 p-1 min-w-72 flex justify-around">
        <div>
          {!isActive && state.millisecond + state.second + state.minute > 0 ? (
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
};

export default Stopwatch;
