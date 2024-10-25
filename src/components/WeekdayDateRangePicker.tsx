import React, { useState } from "react";

interface WeekdayDateRangePickerProps {
  predefinedRanges?: { label: string; range: [Date, Date] }[];
  onChange?: (selectedRange: [string, string], weekends: string[]) => void;
}

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges = [],
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  const handleDateSelection = (start: Date, end: Date) => {
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return; // Exit if dates are invalid
    }

    const range: string[] = [];
    const weekends: string[] = [];

    let currentDate = new Date(start);
    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        weekends.push(currentDate.toISOString().split("T")[0]);
      } else {
        range.push(currentDate.toISOString().split("T")[0]);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (onChange) {
      onChange(
        [start.toISOString().split("T")[0], end.toISOString().split("T")[0]],
        weekends
      );
    }

    setStartDate(start);
    setEndDate(end);
  };

  const handlePredefinedRange = (range: [Date, Date]) => {
    setError(null);
    handleDateSelection(range[0], range[1]);
  };

  const handleStartDateChange = (date: Date) => {
    if (isWeekend(date)) {
      setError("Start date cannot be a weekend!");
    } else if (endDate && date > endDate) {
      setError("Start date cannot be after end date!");
    } else {
      setError(null);
      handleDateSelection(date, endDate || date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    if (isWeekend(date)) {
      setError("End date cannot be a weekend!");
    } else if (startDate && date < startDate) {
      setError("End date cannot be before start date!");
    } else {
      setError(null);
      handleDateSelection(startDate || date, date);
    }
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setError(null); // Reset error message
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 shadow-lg rounded-md text-white">
      <h2 className="text-xl font-bold mb-4">Weekday Date Range Picker</h2>

      {/* Date Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="start-date"
          >
            Start Date:
          </label>
          <input
            id="start-date"
            type="date"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:ring focus:ring-blue-500 focus:outline-none"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="end-date">
            End Date:
          </label>
          <input
            id="end-date"
            type="date"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-4 py-2 focus:ring focus:ring-blue-500 focus:outline-none"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Success Message */}
      {startDate && endDate && !error && (
        <p className="text-green-500 mb-4">
          Date range selected:{" "}
          {startDate instanceof Date && !isNaN(startDate.getTime())
            ? startDate.toISOString().split("T")[0]
            : "Invalid Start Date"}{" "}
          to{" "}
          {endDate instanceof Date && !isNaN(endDate.getTime())
            ? endDate.toISOString().split("T")[0]
            : "Invalid End Date"}
        </p>
      )}

      {/* Clear Button */}
      <button
        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 shadow-lg mb-4"
        onClick={handleClearDates}
      >
        Clear Dates
      </button>

      {/* Predefined Ranges */}
      <h3 className="text-lg font-semibold mb-2">Predefined Ranges</h3>
      <ul className="space-y-2">
        {predefinedRanges.map((range, idx) => (
          <li key={idx}>
            <button
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 shadow-lg"
              onClick={() => handlePredefinedRange(range.range)}
            >
              {range.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekdayDateRangePicker;
