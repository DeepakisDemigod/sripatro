import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NepaliDate from 'nepali-date-converter';

const Calendar = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [currentNepaliMonth, setCurrentNepaliMonth] = useState('');

  useEffect(() => {
    const generateCalendar = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const calendarDays = [];
      let nepaliMonthForHeading = ''; // Store the Nepali month for the heading

      for (let i = 0; i < firstDay; i++) calendarDays.push(null);
      for (let day = 1; day <= daysInMonth; day++) {
        const engDate = new Date(year, month, day);
        const nepDate = new NepaliDate(engDate);
        const bs = nepDate.getBS();

        // Only set the Nepali month if it's not already set
        if (!nepaliMonthForHeading) {
          nepaliMonthForHeading = nepaliMonthName(bs.month);
        }

        calendarDays.push({
          day,
          nepDate: `${bs.date} ${nepaliMonthName(bs.month)}`,
          isTodayNepali: isTodayNepali(bs)
        });
      }

      setDays(calendarDays);
      setCurrentNepaliMonth(nepaliMonthForHeading); // Update the state
    };

    generateCalendar();
  }, []);

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();

  const dayKeys = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  const isTodayNepali = bs => {
    const todayBS = new NepaliDate();
    return (
      todayBS.getYear() === bs.year &&
      todayBS.getMonth() === bs.month &&
      todayBS.getDate() === bs.date
    );
  };

  const nepaliMonthName = index => {
    const months = [
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
    return months[index];
  };

  return (
    <div className='flex flex-col items-center bg-base-50'>
      <div className='bg-base-200 shadow-lg rounded-lg w-full max-w-md'>
        {/* <h2 className='underline text-xl font-semibold  text-center mb-6'>
          {currentMonth} {currentYear} ({currentNepaliMonth})
        </h2> */}
        <div>
          <div className='grid grid-cols-7 gap-[2px] text-center text-base-content font-medium mb-4'>
            {dayKeys.map(key => (
              <div
                key={key}
                className='text-sm bg-red-800 text-gray-200 rounded'
              >
                {t(`calender.${key}`)}
              </div>
            ))}
          </div>
          <div className='grid grid-cols-7 gap-1'>
            {days.map((dayObj, index) => (
              <div
                key={index}
                className={`text-xs h-12 flex flex-col items-center justify-center rounded-md px-1 ${
                  !dayObj
                    ? 'bg-transparent'
                    : dayObj.day === today.getDate()
                    ? 'hover: bg-red-700 text-white font-semibold'
                    : 'hover: hover:border-red-200 bg-base-300 text-base-600 hover:bg-base-200'
                }`}
              >
                <div className='text-[18px] ml-2 mb-[-12px]'>
                  {dayObj?.day || ''}
                </div>
                <div
                  className={`text-[10px] leading-tight ${
                    dayObj?.isTodayNepali ? 'text-white' : 'text-base-700'
                  }`}
                >
                  {dayObj?.nepDate || ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
