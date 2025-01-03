import React from "react";

type labelType = {
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
};

function Label({ label, setLabel }: labelType) {
  return (
    <div className="mt-10 w-3/12 h-12 p-1 bg-gray-900">
      <form className="max-w-full min-h-full flex justify-between items-center flex-wrap">
        <label
          htmlFor="label"
          className="h-full text-gray-200 pl-4 flex items-center"
        >
          Label
        </label>
        <input
          type="text"
          id="label"
          placeholder="Timer"
          value={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value)
          }
          className="h-full w-4/6 text-end text-gray-400 pr-2 outline-none border-none rounded-md bg-gray-900"
        />
      </form>
    </div>
  );
}

export default Label;
