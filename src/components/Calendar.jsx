import React, { useState } from 'react';


const Calendar = () => {
  // State to keep track of the current date
  const [date, setDate] = useState(new Date());

  // Array of month names for displaying the current month
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Function to generate the days of the calendar
  const renderCalendar = () => {
    const currentYear = date.getFullYear(); // Current year
    const currentMonth = date.getMonth();  // Current month (0-indexed)

    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Array to hold the calendar day elements
    const days = [];

    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="bg-slate-400"></div>);
    }

    // Add the actual days of the current month
    const today = new Date(); // Get today's date for highlighting
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&       // Check if the day matches today's date
        currentMonth === today.getMonth() && // Check if the month matches
        currentYear === today.getFullYear(); // Check if the year matches

      days.push(
        <div key={day} className={`text-center p-2 rounded-[5px] bg-[#f1f1f1] cursor-pointer hover:bg-[#007bff] hover:text-white ${isToday ? 'bg-black text-white' : ''}`}>
          {day} {/* Display the day number */}
        </div>
      );
    }

    return days; // Return the array of day elements
  };

  // Function to handle clicking the "Previous Month" button
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1)); // Set date to the previous month
  };

  // Function to handle clicking the "Next Month" button
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1)); // Set date to the next month
  };

  return (
    <div className="w-full md:w-[350px] bg-slate-300 rounded-md shadow overflow-hidden my-[20px] mx-auto">
      {/* Calendar Header */}
      <div className="flex justify-between items-center py-[10px] px-[20px] bg-[#007bff] text-white ">
        {/* Previous Month Button */}
        <button onClick={handlePrevMonth} className='text-[24px] bg-none'>&lt;</button>

        {/* Display current month and year */}
        <h2 className='text-[18px] font-bold'>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </h2>

        {/* Next Month Button */}
        <button onClick={handleNextMonth} className='text-[24px] bg-none'>&gt;</button>
      </div>

      {/* Weekday Row */}
      <div className=" grid grid-cols-7 text-center font-bold text-[#333] px-0 py-2 bg-[#f9f9f9] ">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days Grid */}
      <div className=" grid grid-cols-7 gap-1 p-2 ">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
