import React, { useState } from "react";

const Calendar = () => {
  const [schedules, setSchedules] = useState([
    { time: "09:00 AM", title: "Invited by friends", color: "#FF8C8C" },
    { time: "11:00 AM", title: "Prayer Time", color: "#4AB4F8" },
    { time: "01:00 PM", title: "Lunch Time", color: "#FFA63D" },
    { time: "06:00 PM", title: "Prayer Time", color: "#4CAF50" },
    { time: "08:00 PM", title: "Dinner Time", color: "#5A64F7" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    time: "",
    title: "",
    color: "#FF8C8C",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    setSchedules([...schedules, newEvent]);
    setIsModalOpen(false);
    setNewEvent({ time: "", title: "", color: "#FF8C8C" });
  };

  return (
    <div className="flex flex-wrap">
      {/* Sidebar */}
      <div className="min-w-[1rem] p-4 ">
        <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-700">Create Schedule</button>
        <div className="mb-6">
          <h2 className="text-gray-600 text-sm font-bold">December 2, 2021</h2>
          <div className="grid grid-cols-7 gap-1 mt-4 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={index} className="text-sm text-gray-400">{day}</span>
            ))}
            {Array(30)
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  className={`text-sm p-1 rounded-md ${
                    index + 1 === 3 ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">December 2, 2021</h2>
          <div className="flex space-x-2">
            <button className="text-blue-600 font-bold">Day</button>
            <button className="text-gray-500">Week</button>
            <button className="text-gray-500">Month</button>
            <button className="text-gray-500">Year</button>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300">
          {Array(16)
            .fill()
            .map((_, hour) => {
              const time = `${hour > 9 ? hour : `0${hour}`}:00 ${hour < 12 ? "AM" : "PM"}`;
              const event = schedules.find((s) => s.time === time);
              return (
                <div
                  key={hour}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <span className="text-sm text-gray-400 w-20">{time}</span>
                  {event ? (
                    <div
                      className="w-full ml-2 px-4 py-2 rounded-md text-white"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ) : (
                    <div className="w-full ml-2"></div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md transform scale-95 opacity-0 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Create New Event</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Time</label>
              <input
                type="text"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                placeholder="e.g., 09:00 AM"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Color</label>
              <input
                type="color"
                name="color"
                value={newEvent.color}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
