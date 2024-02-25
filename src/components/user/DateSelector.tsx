import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="mb-4 font-['merriweather'] text-2xl text-[#22555A]">
      <DatePicker
        className="h-[70px] w-[700px] rounded-lg pl-[30px]"
        selected={startDate}
        onChange={(date) => date && setStartDate(date)}
        dateFormat="dd MMMM yyyy"
      />
    </div>
  );
};

export default DateSelector;
