
export const DateDropDown = ({
  setIsDateTabCollapsed,
  availableFilePaths,
  handleDateSelection,
  setSelectedDate,
}) => {
  
  // Utility function to format date as dd-mm-yy@hh:mm:ss
  const formatDate = (dateString) => {
    // Manually parse the date string
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const hours = timePart.slice(0, 2);
    const minutes = timePart.slice(2, 4);
    const seconds = timePart.slice(4);

    return `${day}-${month}-${year.slice(-2)}@${hours}:${minutes}:${seconds}`;
  };

  console.log(availableFilePaths)
  // Extract unique dates from file paths
  const dates = availableFilePaths.map((file) => {
    return file.match(/(\d{4}-\d{2}-\d{2}T\d+)/)[0];
  });

  return (
    <div className="h-[300px] w-[200px] mt-[32px] absolute bg-white z-10 flex flex-col justify-start text-center gap-1 overflow-auto">
      {dates.map((date, index) => (
        <span
          key={index}
          className="hoverMode rounded-sm w-full cursor-pointer"
          onClick={() => {
            handleDateSelection(date);
            setIsDateTabCollapsed(false);
            setSelectedDate(formatDate(date));
          }}
        >
          {formatDate(date)}
        </span>
      ))}
    </div>
  );
};
