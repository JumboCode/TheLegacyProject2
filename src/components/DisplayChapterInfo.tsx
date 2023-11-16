interface DisplayChapterInfoParams {
  location: string;
  noMembers: number;
  yearsActive: number;
}

const DisplayChapterInfo = ({
  location,
  noMembers,
  yearsActive,
}: DisplayChapterInfoParams) => {
  return (
    <div className="font-merriweather flex h-1/5 w-5/6 flex-col justify-between space-y-2 rounded-md bg-white p-8">
      <div className="flex flex-row text-start">
        <div>Location: </div>
        <div className="ml-2 font-bold">{location}</div>
      </div>
      <div className="flex flex-row text-start">
        <div>No. of members: </div>
        <div className="ml-2 font-bold">{noMembers}</div>
      </div>
      <div className="flex flex-row text-start">
        <div>Years Active: </div>
        <div className="ml-2 font-bold">{yearsActive}</div>
      </div>
    </div>
  );
};

export default DisplayChapterInfo;