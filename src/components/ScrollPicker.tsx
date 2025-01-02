type ScrollPickerType = {
  data: any;
  onScroll: any;
  unit: any;
  picker: any;
};

function ScrollPicker({ data, onScroll, unit, picker }: ScrollPickerType) {
  return (
    <div className="w-full flex justify-evenly items-center">
      <div
        className="h-20 overflow-y-scroll no-scrollbar flex flex-col text-white"
        onScroll={onScroll}
      >
        {data.map((d: any, index: number) => (
          <span
            className={`text-white text-center ${
              index === picker
                ? "text-xl bg-gray-700 rounded-full p-1"
                : "opacity-30"
            }`}
            key={index}
          >
            {d}
          </span>
        ))}
      </div>
      <span>{unit}</span>
    </div>
  );
}

export default ScrollPicker;
