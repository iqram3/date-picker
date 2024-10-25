import WeekdayDateRangePicker from "./components/WeekdayDateRangePicker";

const App = () => {
  const handleRangeChange = (weekdays: string[], weekends: string[]) => {
    console.log("Selected weekdays: ", weekdays);
    console.log("Selected weekends: ", weekends);
  };

  return (
    <div>
      <WeekdayDateRangePicker
        onChange={handleRangeChange}
        predefinedRanges={[
          {
            label: "This Week",
            range: [new Date("2024-10-21"), new Date("2024-10-24")],
          },
          {
            label: "Last Month",
            range: [new Date("2024-09-01"), new Date("2024-09-30")],
          },
        ]}
      />
    </div>
  );
};

export default App;
