import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import NepaliDate from 'nepali-date-converter';
import { Alarm, Calendar, CaretLeft } from 'phosphor-react';
import nakshatraData from './nakshatraData.json'; // Import the Nakshatra data
import { useTranslation } from 'react-i18next';

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

const BirthPanchangBS = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'Birth Panchang for BS Date | Sri Patro';
  }, []);

  const formatTimeWithPeriod = (time, t) => {
    const [hourStr, minute] = time.split(':');
    let hour = parseInt(hourStr, 10);
    const suffix = hour >= 12 ? 'pm' : 'am';

    let periodKey = '';
    if (hour < 4) periodKey = 'Night';
    else if (hour < 12) periodKey = 'Morning';
    else if (hour < 16) periodKey = 'Afternoon';
    else if (hour < 20) periodKey = 'Evening';
    else periodKey = 'Night';

    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    const translatedPeriod = t(`timePeriod.${periodKey}`);

    return `${translatedPeriod}, ${String(hour).padStart(
      2,
      '0'
    )}:${minute}${suffix}`;
  };

  const [nepaliDate, setNepaliDate] = useState(() => {
    const todayInBS = new NepaliDate();
    return {
      year: todayInBS.getYear(),
      month: todayInBS.getMonth() + 1,
      day: todayInBS.getDate()
    };
  });

  const [timeOfBirth, setTimeOfBirth] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });

  const [englishDate, setEnglishDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [panchang, setPanchang] = useState(null);
  const [error, setError] = useState('');
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNepaliDate(prev => ({ ...prev, [name]: parseInt(value, 10) || '' }));
    setError('');
    setEnglishDate('');
    setDayOfWeek('');
    setPanchang(null);
    setAge(null);
    setNakshatraInfo(null);
  };

  const handleTimeChange = e => {
    setTimeOfBirth(e.target.value);
  };

  const calculateAge = dateOfBirth => {
    const now = new Date();
    const dobDate = new Date(dateOfBirth);
    const years = now.getFullYear() - dobDate.getFullYear();
    const months = now.getMonth() - dobDate.getMonth();

    let ageYears = years;
    let ageMonths = months;

    if (months < 0 || (months === 0 && now.getDate() < dobDate.getDate())) {
      ageYears -= 1;
      ageMonths = (months + 12) % 12;
    }

    return { years: ageYears, months: ageMonths };
  };

  const convertAndCalculatePanchang = () => {
    try {
      const { year, month, day } = nepaliDate;

      // Validate inputs
      if (!year || !month || !day) throw new Error('Invalid date input.');

      // Convert BS to AD
      const bsDate = new NepaliDate(year, month - 1, day);
      const adDate = bsDate.toJsDate();

      // Add Time of Birth
      const [hours, minutes] = timeOfBirth.split(':').map(Number);
      adDate.setHours(hours, minutes);

      // Calculate age
      const calculatedAge = calculateAge(adDate);
      setAge(calculatedAge);

      // Format AD Date and Panchang
      setEnglishDate(
        adDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
      setDayOfWeek(DAYS[adDate.getDay()]);

      const panchangObj = new MhahPanchang();
      const result = panchangObj.calculate(adDate);
      setPanchang(result);

      // Find Nakshatra Info
      const nakshatraName = result?.Nakshatra?.name_en_IN;
      if (nakshatraName) {
        const foundNakshatra = nakshatraData.find(
          n => n.name === nakshatraName
        );
        setNakshatraInfo(foundNakshatra);
      } else {
        setNakshatraInfo(null);
      }
    } catch (err) {
      setError('Invalid date or time. Please check your input.');
      setEnglishDate('');
      setDayOfWeek('');
      setPanchang(null);
      setAge(null);
      setNakshatraInfo(null);
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
      return 32; // Fallback max days
    }
  };

  return (
    <div className='bg-gray-50 flex items-center justify-center p-6'>
      <div className='bg-white border border-t-red-600 shadow-lg rounded-lg p-8 max-w-lg w-full'>
        <div className='breadcrumbs border rounded text-black px-4 text-sm'>
          <ul>
            <li className='hover:border'>
              <a
                href='/'
                className='hover:underline'
              >
                <CaretLeft size={19} /> <span>{t('Back')}</span>
              </a>
            </li>
          </ul>
        </div>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          {t('Bikram Sambat to Panchang')}
        </h1>

        <div className='space-y-6'>
          <div>
            <label className='block text-gray-600 font-medium mb-1 flex items-center gap-2'>
              <Calendar size={18} />
              <span>{t('Date of Birth')}</span>
            </label>
            <div className='grid grid-cols-3 gap-3'>
              <input
                type='number'
                name='year'
                value={nepaliDate.year}
                onChange={handleInputChange}
                min='1970'
                max='2100'
                placeholder='Year'
                className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
              />
              <select
                name='month'
                value={nepaliDate.month}
                onChange={handleInputChange}
                className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
              >
                {BS_MONTHS.map((month, index) => (
                  <option
                    key={index}
                    value={index + 1}
                  >
                    {t(`nepaliMonth.${month}`)}
                  </option>
                ))}
              </select>
              <input
                type='number'
                name='day'
                value={nepaliDate.day}
                onChange={handleInputChange}
                min='1'
                max={getMaxDays()}
                placeholder='Day'
                className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-600 font-medium mb-1 flex items-center gap-2'>
              <Alarm size={18} />
              <span>{t('Time of Birth')}</span>
            </label>
            <input
              type='time'
              value={timeOfBirth}
              onChange={handleTimeChange}
              className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
            />
          </div>

          <button
            onClick={convertAndCalculatePanchang}
            className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200'
          >
            {t('Get Panchang')}
          </button>
        </div>

        {error && <div className='mt-4 text-red-600 font-medium'>{error}</div>}

        {!englishDate && !panchang ? (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg text-gray-600'>
            {t('Enter date and time to get Panchang.')}
          </div>
        ) : (
          englishDate && (
            <div className='mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto'>
              <h2 className='text-lg font-bold text-gray-800'>
                {t(`day.${dayOfWeek}`)}
                {', '} {nepaliDate.year}{' '}
                {t(`nepaliMonth.${BS_MONTHS[nepaliDate.month - 1]}`)}{' '}
                {nepaliDate.day}
              </h2>
              <p className='text-gray-600 font-semibold'>
                {formatTimeWithPeriod(timeOfBirth, t)}
              </p>
              <p className='text-gray-800 text-md font-bold'>{englishDate}</p>
              {panchang && (
                <table className='table w-full mt-4'>
                  <tbody>
                    <tr>
                      <th>{t('Day')}</th>
                      <td>{t(`day.${panchang?.Day?.name_en_UK}`) || 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>{t('Paksh')}</th>
                      <td>
                        {t(`paksha.${panchang?.Paksha?.name_en_IN}`) || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('Tithi')}</th>
                      <td>
                        {t(`tithi.${panchang?.Tithi?.name_en_IN}`) || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('Nakshatra')}</th>
                      <td>
                        {t(`nakshatra.${panchang?.Nakshatra?.name_en_IN}`) ||
                          'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('Rasi')}</th>
                      <td>
                        {t(`rasi.${panchang?.Raasi?.name_en_UK}`) || 'N/A'}
                      </td>
                    </tr>
                    {nakshatraInfo && (
                      <>
                        <tr>
                          <th>{t('Syllables')}</th>
                          <td>
                            {t(
                              `syllables.${nakshatraInfo['first syllables']}`
                            ) || 'Not Available'}
                          </td>
                        </tr>
                        <tr>
                          <th>{t('Gan')}</th>
                          <td>
                            {t(`ganam.${nakshatraInfo.ganam}`) ||
                              'Not Available'}
                          </td>
                        </tr>
                        <tr>
                          <th>{t('Animal Sign')}</th>
                          <td>
                            {t(`animal.${nakshatraInfo['animal sign']}`) ||
                              'Not Available'}
                          </td>
                        </tr>
                        <tr>
                          <th>{t('Deity')}</th>
                          <td>
                            {t(`deity.${nakshatraInfo.Diety}`) ||
                              'Not Available'}
                          </td>
                        </tr>

                        <tr>
                          <th>{t('Best Direction')}</th>
                          <td>
                            {t(
                              `best_direction.${nakshatraInfo['best direction']}`
                            ) || 'Not Available'}
                          </td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th>{t('Yoga')}</th>
                      <td>
                        {t(`yoga.${panchang?.Yoga?.name_en_IN}`) || 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('Karna')}</th>
                      <td>
                        {t(`karna.${panchang?.Karna?.name_en_IN}`) || 'N/A'}
                      </td>
                    </tr>

                    {age && (
                      <tr>
                        <th>{t('Age')}</th>
                        <td>
                          {age.years} {t('years and')} {age.months}{' '}
                          {t('months')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BirthPanchangBS;
