import React, { useEffect, useState } from 'react';
import calendarData from './data.json';
import { Coffee } from 'phosphor-react';

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState('');
  console.log(calendarData?.calendarData?.marriage);

  useEffect(() => {
    if (calendarData?.calenderData?.days?.length) {
      setDays(calendarData.calenderData.days);
      // console.log(calendarData.calenderData.days);
      const today = new Date();
      const todayDate = today.getDate();
      const todayDay = calendarData.calenderData.days.find(
        day => day.d === todayDate
      );
      setSelectedDate(todayDay || calendarData.calenderData.days[0]);
    }
  }, []);

  const handleDateClick = day => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { t, f, h } = selectedDate;
    return (
      <div className='card bg-base-100 shadow-xl p-6'>
        <h3 className='text-xl font-bold text-red-600 mb-4'>
          Selected Date Events
        </h3>
        <div className='space-y-3'>
          <p className='text-gray-700'>
            <span className='font-semibold'></span> {t}
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'></span> {f}
          </p>
          <p className='text-gray-700'>
            <span className='font-semibold'></span>{' '}
            <span className={`badge ${h ? 'bg-red-700 text-white' : ''}`}>
              {h ? (
                <div className='flex gap-2 py-2'>
                  <Coffee size={17} />
                  <p>Holiday</p>
                </div>
              ) : (
                ''
              )}
            </span>
          </p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    return (
      <div className='grid grid-cols-7 gap-2 p-4 bg-base-100 rounded-lg shadow-lg'>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className='text-center font-semibold text-red-600 p-2'
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={` text-center rounded-lg cursor-pointer
              ${
                selectedDate?.n === day.n
                  ? 'bg-red-600 text-white'
                  : 'bg-base-300 hover:bg-red-100 text-gray-800'
              }
              border border-gray-200 shadow-sm`}
          >
            <div className='font-medium'>{day.n}</div>
            <div className='text-sm opacity-75'>{day.e}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='container mx-auto p-4 min-h-screen bg-gray-50'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='lg:flex-1'>
          <div className='mb-6 '>
            <div className='flex text-3xl font-bold text-red-600'>
              <h1>{calendarData.calenderData.metadata?.np}</h1>
              <h2 className='text-xl text-gray-600 mt-2'>
                ({calendarData.calenderData.metadata?.en})
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
