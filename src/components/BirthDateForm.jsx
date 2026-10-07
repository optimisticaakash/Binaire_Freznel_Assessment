import React from "react";

const BirthDateForm = ({ day, setDay, month, setMonth, year, setYear }) => {
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-md bg-[#354454] px-8 py-5">
      <p className="mb-3 text-gray-300">
        Please enter your birth date to continue:
      </p>

      <div className="flex justify-center gap-1">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="bg-[#2a475e] px-3 py-2 text-[#66c0f4] outline-none focus:ring-2 focus:ring-[#66c0f4] focus-visible:ring-2 focus-visible:ring-[#66c0f4] hover:bg-[#3a5f7d]"
        >
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-[#2a475e] px-3 py-2 text-[#66c0f4] outline-none focus:ring-2 focus:ring-[#66c0f4] focus-visible:ring-2 focus-visible:ring-[#66c0f4] hover:bg-[#3a5f7d]"
        >
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-[#2a475e] px-3 py-2 text-[#66c0f4] outline-none focus:ring-2 focus:ring-[#66c0f4] focus-visible:ring-2 focus-visible:ring-[#66c0f4] hover:bg-[#3a5f7d]"
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option key={2026 - i}>{2026 - i}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BirthDateForm;
