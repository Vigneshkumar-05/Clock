import React from "react";

type ButtonType = {
  buttonName: string;
  onClick: () => void;
};

const Button: React.FC<ButtonType> = ({ buttonName, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`m-1 p-1 h-16 w-16 text-md rounded-full ${
        buttonName === "Start"
          ? "bg-emerald-950 text-green-500"
          : buttonName === "Stop"
          ? "bg-red-950 text-red-500"
          : buttonName === "Pause"
          ? "bg-yellow-950 text-yellow-500"
          : "bg-gray-900 text-gray-400"
      }`}
    >
      {buttonName}
    </button>
  );
};

export default Button;
