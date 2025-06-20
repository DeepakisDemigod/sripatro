import React, { useEffect, useState } from 'react';
import { Coffee } from 'phosphor-react';

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState('');
  const [currentYear, setCurrentYear] = useState(2082); // Default to 2082
  const [currentMonth, setCurrentMonth] = useState(3); // Default to Magh (10th month, based on your image)
  const [calendarData, setCalendarData] = useState(null);
  const [todayNepaliDate, setTodayNepaliDate] = useState(null); // Store today's Nepali date

  // Fetch calendar data for the given year and month
  const fetchCalendarData = async (year, month) => {
    try {
      const response = await fetch(`/data-copy-copy/${year}/${month}.json`);
      if (!response.ok) throw new Error('Failed to fetch calendar data');
      const data = await response.json();
      console.log(data);
      setCalendarData(data);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  // Handle Previous Month
  const handlePreviousMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth(prev => (prev === 1 ? 12 : prev - 1));
    if (currentMonth === 1) setCurrentYear(prev => prev - 1);
  };

  // Handle Next Month
  const handleNextMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth(prev => (prev === 12 ? 1 : prev + 1));
    if (currentMonth === 12) setCurrentYear(prev => prev + 1);
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Update days, selected date, and today's Nepali date when calendarData changes
  useEffect(() => {
    if (calendarData?.days?.length) {
      const filteredDays = calendarData.days.filter(day => day.n !== '');
      setDays(filteredDays);
      setMarriage(calendarData.marriage?.[0] || '');

      // Find today's Nepali date
      const today = new Date(); // Current date: June 20, 2025, 06:28 AM IST
      const todayGregorianDate = today.getDate(); // e.g., 20
      const todayDay = calendarData.days.find(
        day => day.e === todayGregorianDate.toString().padStart(2, '0')
      );
      if (todayDay) {
        setTodayNepaliDate(todayDay.n); // e.g., "२" for Shrawan 2 (adjust for Magh if needed)
      } else {
        setTodayNepaliDate(null); // Reset if not in current month
      }

      // Set selected date to today or first day
      setSelectedDate(todayDay || filteredDays[0]);
    }
  }, [calendarData]);

  const handleDateClick = day => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { t, f, h } = selectedDate;
    return (
      <div className='card bg-base-100 shadow-xl'>
        <h3 className='text-xl font-bold text-red-600 mb-4'>
          Selected Date Events
        </h3>
        <div className='space-y-3'>
          <p className='text-gray-700'>
            <span className='font-semibold'>Tithi:</span> {t}
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'>Festival/Event:</span> {f}
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'>Holiday:</span>{' '}
            <span className={`badge ${h ? 'bg-red-700 text-white' : ''}`}>
              {h ? (
                <div className='flex gap-2 py-2'>
                  <Coffee size={15} />
                  <p className='text-sm'>Holiday</p>
                </div>
              ) : (
                'No Holiday'
              )}
            </span>
            <span>{calendarData?.holiFest[0]}</span>
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'>Marriage Muhurat:</span> {marriage}
          </p>
          <p>Bratabandha: {calendarData?.bratabandha[0]}</p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    // Find the first day with a valid Nepali date to determine the starting day
    const firstDay = calendarData?.days.find(day => day.n !== '');
    const startDayOffset = firstDay ? (firstDay.d - 1) % 7 : 0; // d=1 (Sun) to 7 (Sat), offset for grid

    return (
      <div className='grid grid-cols-7 bg-base-100 rounded-lg shadow-lg'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className='text-sm bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white p-2 text-center rounded'
          >
            {day}
          </div>
        ))}
        {[...Array(startDayOffset).fill(null), ...days].map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className='border border-gray-200'
              ></div>
            ); // Empty cell for offset
          }

          const isToday = day.n === todayNepaliDate; // Check if this is today's Nepali date
          const isSelected = selectedDate?.n === day.n; // Check if this is the selected date
          const isHoliday = day.h; // Check if it's a holiday

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center cursor-pointer
                ${
                  isSelected
                    ? 'bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white'
                    : isToday
                    ? 'bg-red-200 text-gray-800 border-2 border-red-400'
                    : 'bg-base-100 hover:bg-red-100 text-gray-800'
                }
                border border-gray-200 shadow-sm`}
            >
              <div
                className={`text-xs text-gray-500 ${
                  isHoliday ? 'text-red-600' : 'text-gray-800'
                } ${isSelected ? "text-white": ""}`}
              >
                {day.t}
              </div>
              <div className='flex items-end gap-[2px]'>
                <div
                  className={`text-2xl ${
                    isHoliday ? 'text-red-600' : 'text-gray-800'
                  } ${isSelected ? "text-white": ""}`}
                >
                  {day.n}
                </div>
                <div
                  className={`text-sm opacity-75 ${
                    isHoliday ? 'text-red-600' : 'text-gray-800'
                  } ${isSelected ? 'text-white' : ''}`}
                >
                  {day.e}
                </div>
              </div>
              <div className={`${isSelected ? 'text-white' : ''}`}>{day.f}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='container w-[350px] mx-auto p-2 min-h-screen bg-base-100'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='lg:flex-1'>
          <div className='mb-6'>
            <div className='flex justify-between items-center gap-4'>
              <button
                onClick={handlePreviousMonth}
                className='text-red-500 btn btn-outline btn-sm'
              >
                Previous
              </button>
              <select
                value={currentYear}
                onChange={e => setCurrentYear(parseInt(e.target.value))}
                className='select select-bordered w-24'
              >
                {Array.from(
                  { length: 2082 - 1992 + 1 },
                  (_, i) => 1992 + i
                ).map(year => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={currentMonth}
                onChange={e => setCurrentMonth(parseInt(e.target.value))}
                className='select select-bordered w-32'
              >
                {[
                  'Baisakh',
                  'Jestha',
                  'Asar',
                  'Shrawan',
                  'Bhadra',
                  'Ashwin',
                  'Kartik',
                  'Mangsir',
                  'Poush',
                  'Magh',
                  'Falgun',
                  'Chaitra'
                ].map((month, index) => (
                  <option
                    key={index + 1}
                    value={index + 1}
                  >
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextMonth}
                className='text-red-500 btn btn-outline btn-sm'
              >
                Next
              </button>
            </div>
            <div className='flex text-3xl font-bold mt-2'>
              <h1 className='text-red-600'>
                {calendarData?.metadata?.np || 'Loading...'}
              </h1>
              <h2 className='text-xl text-gray-600 mt-2'>
                ({calendarData?.metadata?.en || 'Loading...'})
              </h2>
            </div>
          </div>
          {renderCalendar()}
        </div>
        <div className='lg:flex-1 lg:pl-6'>{renderSelectedDateEvents()}</div>
      </div>
    </div>
  );
};

export default TestGPT;
