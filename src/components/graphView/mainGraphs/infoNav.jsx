import { DateDropDown } from "./dateDropDown";

export const InfoNav = ({
  gameName,
  setIsDateTabCollapsed,
  isDateTabCollapsed,
  themeOptions,
  selectedDate,
  availableFilePaths,
  handleDateSelection,
  setSelectedDate,
}) => {
  return (
    <>
      {/* info bar */}
      <div className="w-full h-[70px] flex gap-4  items-center justify-center ">
        {/* Game Name */}
        <div>
          <span className="text-3xl font-bold">{gameName}</span>
        </div>
        {/* Change date settings */}
        <div className="flex flex-col">
          <button
            onClick={() => {
              setIsDateTabCollapsed(!isDateTabCollapsed);
            }}
            className="w-[200px] flex justify-center items-center gap-1 text-md border-[1px] rounded-lg px-2"
            style={{ borderColor: themeOptions.borderColor }}
          >
            {selectedDate ? (
              <span>{selectedDate}</span>
            ) : (
              <span>Latest Date</span>
            )}
            <img
              src="/assets/icons/arrow-down.png"
              alt="/assets/icons/arrow-down.png"
              height="18"
              width="18"
            />
          </button>
          {/* date options wrapper */}
          {availableFilePaths &&
          availableFilePaths.length > 0 &&
          isDateTabCollapsed ? (
            <DateDropDown
              setIsDateTabCollapsed={setIsDateTabCollapsed}
              availableFilePaths={availableFilePaths}
              handleDateSelection={handleDateSelection}
              setSelectedDate={setSelectedDate}
              initialSelectedDate={selectedDate}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

