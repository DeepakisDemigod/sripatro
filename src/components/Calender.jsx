import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NepaliDate from 'nepali-date-converter';
import { CaretLeft, CaretRight } from 'phosphor-react';

const Calendar = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [currentNepaliMonth, setCurrentNepaliMonth] = useState('');
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  useEffect(() => {
    const generateCalendar = () => {
      const year = viewYear;
      const month = viewMonth;
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const calendarDays = [];
      let nepaliMonthForHeading = '';
      for (let i = 0; i < firstDay; i++) calendarDays.push(null);
      for (let day = 1; day <= daysInMonth; day++) {
        const engDate = new Date(year, month, day);
        const nepDate = new NepaliDate(engDate);
        const bs = nepDate.getBS();
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
      setCurrentNepaliMonth(nepaliMonthForHeading);
    };
    generateCalendar();
  }, [viewYear, viewMonth]);

  const today = new Date();
  const currentMonth = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });
  const currentYear = viewYear;

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

  const handlePrevMonth = () => {
    setViewMonth(prev => {
      if (prev === 0) {
        setViewYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  const handleNextMonth = () => {
    setViewMonth(prev => {
      if (prev === 11) {
        setViewYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  return (
    <div className='max-w-80 flex flex-col items-center bg-base-50'>
      <div className='bg-base-200 rounded-lg w-full max-w-md'>
        {/* Month/Year Navigation */}
        <div className='flex items-center justify-between px-2 py-3 mb-2'>
          <button onClick={handlePrevMonth} className='btn btn-ghost btn-xs'><CaretLeft size={22} /></button>
          <div className='font-bold text-base-content text-lg flex flex-col items-center'>
            <span>{currentMonth} {currentYear}</span>
            <span className='text-xs text-base-400'>{currentNepaliMonth}</span>
          </div>
          <button onClick={handleNextMonth} className='btn btn-ghost btn-xs'><CaretRight size={22} /></button>
        </div>
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
                    : 'hover: border hover:border-red-500 bg-none text-base-600 hover:bg-base-200'
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
