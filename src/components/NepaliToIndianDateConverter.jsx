import React, { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date-converter';

const BS_MONTHS = [
  'Baisakh',
  'Jestha',
  'Ashadh',
  'Shrawan',
  'Bhadra',
  'Ashwin',
  'Kartik',
  'Mangsir',
  'Paush',
  'Magh',
  'Falgun',
  'Chaitra'
];

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const NepaliToEnglishDateConverter = () => {
  useEffect(() => {
    document.title = 'Nepali to English Date Converter | Sri Patro';
  }, []);
  const [nepaliDate, setNepaliDate] = useState({
    year: 2080,
    month: 1,
    day: 1
  });
  const [englishDate, setEnglishDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNepaliDate(prev => ({
      ...prev,
      [name]: parseInt(value, 10) || ''
    }));
    setError('');
  };

  const convertDate = () => {
    try {
      const { year, month, day } = nepaliDate;

      // Create NepaliDate object and convert to AD
      const bsDate = new NepaliDate(year, month - 1, day);
      const adDate = bsDate.toJsDate();

      setEnglishDate(
        adDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
      setDayOfWeek(DAYS[adDate.getDay()]);
      setError('');
    } catch (err) {
      setError('Invalid date. Please check your input.');
      setEnglishDate('');
      setDayOfWeek('');
    }
  };

  const getMaxDays = () => {
    try {
      return new NepaliDate(
        nepaliDate.year,
        nepaliDate.month - 1,
        1
      ).getLastDateOfMonth();
    } catch {
      return 32; // fallback max days
    }
  };

  return (
    <div className='bg-gray-50 flex items-center justify-center p-6'>
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-lg w-full'>
        <h1 className='text-2xl font-bold text-gray-800  mb-6'>
          Nepali to English Date Converter
        </h1>

        <div className='space-y-6'>
          <div>
            <label className='block text-gray-600 font-medium mb-1'>
              BS Year
            </label>
            <input
              type='number'
              name='year'
              value={nepaliDate.year}
              onChange={handleInputChange}
              min='1970'
              max='2100'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <div>
            <label className='block text-gray-600 font-medium mb-1'>
              BS Month
            </label>
            <select
              name='month'
              value={nepaliDate.month}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
            >
              {BS_MONTHS.map((month, index) => (
                <option
                  key={month}
                  value={index + 1}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-gray-600 font-medium mb-1'>
              BS Day
            </label>
            <input
              type='number'
              name='day'
              value={nepaliDate.day}
              onChange={handleInputChange}
              min='1'
              max={getMaxDays()}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <button
            onClick={convertDate}
            className='w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition duration-200'
          >
            Convert
          </button>
        </div>

        {error && (
          <div className='mt-4 text-center text-red-600 font-medium'>
            {error}
          </div>
        )}

        {englishDate && !error && (
          <div className='bg-zinc-100 rounded p-4 mt-6 text-center'>
            <h3 className='text-xl text-gray-800 font-semibold mb-2'>
              {nepaliDate.year} {BS_MONTHS[nepaliDate.month - 1]}{' '}
              {nepaliDate.day}
            </h3>
            <p className='text-gray-600 text-lg mb-1'>{dayOfWeek}</p>
            <p className='text-3xl text-zinc-700 font-bold'>{englishDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NepaliToEnglishDateConverter;
