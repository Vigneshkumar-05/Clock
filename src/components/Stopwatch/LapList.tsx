type LapDataType =
  | {
      id: number;
      min: string;
      sec: string;
      ms: string;
    }[];

type ListDataProps = {
  laps: LapDataType;
};

const LapList: React.FC<ListDataProps> = ({ laps }) => {
  return (
    <div className="flex flex-col-reverse justify-center items-center m-2 bg-slate-950 rounded-md">
      {laps.map(
        (data: { id: number; min: string; sec: string; ms: string }, index) => (
          <div
            key={index + data.id}
            className="m-1 p-2 w-full flex items-center justify-between border-2 border-solid border-gray-900 rounded-md"
          >
            <span>Lap {data.id}</span>
            <span>
              {data.min}:{data.sec}.{data.ms}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default LapList;
