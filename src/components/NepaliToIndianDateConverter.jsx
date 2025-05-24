import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import NepaliDate from 'nepali-date-converter';
import { Alarm, Calendar, CaretLeft,ArrowSquareOut } from 'phosphor-react';
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
    <div className='text-base-content  bg-base-50 flex items-center justify-center'>
      <div className='md:flex gap-4 bg-base-100 shadow-lg rounded-lg p-8 max-w-6xl w-full'>
        <div>
          <a
            href='/'
            className='hover:underline'
          >
            <div className='hover:bg-base-200 breadcrumbs border border-base-400 rounded   px-4 text-sm'>
              <ul>
                <li className='hover:border'>
                  <CaretLeft size={19} /> <span>{t('Back')}</span>
                </li>
              </ul>
            </div>
          </a>
          
          <div className='mt-2 px-2 flex flex-col justify-between bg-base-100 rounded-md border border-2 border-base-800 border-t-red-600'>
          <div>
            <h3 className='flex items-center gap-1 font-bold text-lg'>
              <span>Date Converter</span>
              <ArrowSquareOut
                weight='bold'
                size={22}
              />
            </h3>
            <p className='text-xs px-.5'>
              change nepali date to indian date and indian date to nepali date.
            </p>
          </div>
          <a
            href='/nepalitoenglish'
            className='my-2 border border-base-500 flex text-sm bg-base-900 items-center gap-2 text-base-800 rounded-md shadow-sm transition'
          >
            <div className=''>
              <span className='text-2xl'> 🇳🇵 </span>
              {t('Nepali Date')}{' '}
              <span className='text-xl mx-2 font-bold'>⇄</span>{' '}
              <span className='text-xl'> 🇮🇳 </span> {t('Indian Date')}
            </div>
          </a>
        </div>

          <h1 className='mt-2 text-2xl font-bold text-base-800 mb-6'>
             {t('Bikram Sambat to Panchang (BS)')}
          </h1>

          <div className='space-y-6'>
            <div>
              <label className='block text-base-600 font-medium mb-1 flex items-center gap-2'>
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
                  className=' bg-base-100   w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
                />
                <select
                  name='month'
                  value={nepaliDate.month}
                  onChange={handleInputChange}
                  className=' bg-base-100   w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
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
                  className=' bg-base-100   w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
                />
              </div>
              <span className='text-xs text-base-400'>
                {t('your date of birth in yyyy-mm-dd format')}
              </span>
            </div>

            <div>
              <label className='block text-base-600 font-medium mb-1  gap-2'>
                <div className='flex items-center'>
                  <Alarm size={18} />
                  <span>{t('Time of Birth')}</span>
                </div>
              </label>
              <input
                type='time'
                value={timeOfBirth}
                onChange={handleTimeChange}
                className=' bg-base-100   w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
              />
              <span className='text-xs text-base-400'>
                {t('your time of birth hh:mm in 24hrs format')}
              </span>
            </div>

            <button
              onClick={convertAndCalculatePanchang}
              className='text-[17px] btn w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-700 transition duration-200'
            >
              {t('Get Panchang')}
            </button>
          </div>
        </div>

        <div>
          {error && (
            <div className='mt-4 text-red-600 font-medium'>{error}</div>
          )}

          {!englishDate && !panchang ? (
            <div className='  bg-base-200 p-4 rounded-lg text-base-600 flex items-center justify-center'>
              {t('Enter date and time to get Panchang.')}
            </div>
          ) : (
            englishDate && (
              <div className='w-70 mt-4 bg-base-100 rounded overflow-x-auto'>
                <div className='flex justify-between border border-base-800 p-1 rounded gap-1'>
                  <div className='pt-2 pl-2'>
                    <h2 className='text-sm font-bold text-base-800'>
                      {t(`day.${dayOfWeek}`)}
                      {', '} {nepaliDate.year}{' '}
                      {t(`nepaliMonth.${BS_MONTHS[nepaliDate.month - 1]}`)}{' '}
                      {nepaliDate.day}
                    </h2>
                    <p className='text-base-600 text-sm font-bold'>
                      {formatTimeWithPeriod(timeOfBirth, t)}
                    </p>
                    <p className='text-base-800 text-sm font-bold'>
                      {englishDate}
                    </p>
                  </div>
                  <div className=''>
                    {panchang?.Paksha?.name_en_IN === 'Shukla' ? (
                      <div>
                        <div className='flex items-center justify-end'>
                          <img
                            className='shadow-2xl rounded-full m-1 bg-zinc-200'
                            width='50'
                            src={`moon/shukla/${panchang?.Tithi?.name_en_IN}.png`}
                          />
                        </div>
                        <p className='text-sm font-bold'>
                          {t(`tithi.${panchang?.Tithi?.name_en_IN}`)},
                          {t(`paksha.${panchang?.Paksha?.name_en_IN}`)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className='flex items-center justify-end'>
                          <img
                            className='shadow-2xl rounded-full m-1 bg-zinc-200'
                            width='50'
                            src={`moon/krishna/${panchang?.Tithi?.name_en_IN}.png`}
                          />
                        </div>
                        <p className='text-sm font-bold'>
                          {t(`tithi.${panchang?.Tithi?.name_en_IN}`)},
                          {t(`paksha.${panchang?.Paksha?.name_en_IN}`)}
                        </p>
                      </div>
                    )}{' '}
                  </div>
                </div>
                {panchang && (
                  <table className='table w-full mt-4'>
                    <tbody>
                      <tr>
                        <th className='text-base-content'>{t('Day')}</th>
                        <td className='text-base-content'>
                          {t(`day.${panchang?.Day?.name_en_UK}`) || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th className='text-base-content'>{t('Paksh')}</th>
                        <td className='text-base-content'>
                          {t(`paksha.${panchang?.Paksha?.name_en_IN}`) || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th className='text-base-content'>{t('Tithi')}</th>
                        <td className='text-base-content flex gap-2 items-start border-none'>
                          {/*  <div>
                          {' '}
                          {panchang?.Paksha?.name_en_IN === 'Shukla' ? (
                            <img
                              className='shadow-2xl'
                              width='20'
                              src={`moon/shukla/${panchang?.Tithi?.name_en_IN}.png`}
                            />
                          ) : (
                            <img
                              className='shadow-2xl'
                              width='20'
                              src={`moon/krishna/${panchang?.Tithi?.name_en_IN}.png`}
                            />
                          )}{' '}
                        </div>*/}
                          {t(`tithi.${panchang?.Tithi?.name_en_IN}`) || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th className='text-base-content'>{t('Nakshatra')}</th>
                        <td className='text-base-content'>
                          {t(`nakshatra.${panchang?.Nakshatra?.name_en_IN}`) ||
                            'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th className='text-base-content'>{t('Rasi')}</th>
                        <td className='text-base-content'>
                          {t(`rasi.${panchang?.Raasi?.name_en_UK}`) || 'N/A'}
                        </td>
                      </tr>
                      {nakshatraInfo && (
                        <>
                          <tr>
                            <th className='text-base-content'>
                              {t('Syllables')}
                            </th>
                            <td className='text-base-content'>
                              {t(
                                `syllables.${nakshatraInfo['first syllables']}`
                              ) || 'Not Available'}
                            </td>
                          </tr>
                          <tr>
                            <th className='text-base-content'>{t('Gan')}</th>
                            <td className='text-base-content'>
                              {t(`ganam.${nakshatraInfo.ganam}`) ||
                                'Not Available'}
                            </td>
                          </tr>
                          <tr>
                            <th className='text-base-content'>
                              {t('Animal Sign')}
                            </th>
                            <td className='text-base-content'>
                              {t(`animal.${nakshatraInfo['animal sign']}`) ||
                                'Not Available'}
                            </td>
                          </tr>
                          <tr>
                            <th className='text-base-content'>{t('Deity')}</th>
                            <td className='text-base-content'>
                              {t(`deity.${nakshatraInfo.Diety}`) ||
                                'Not Available'}
                            </td>
                          </tr>

                          <tr>
                            <th className='text-base-content'>
                              {t('Best Direction')}
                            </th>
                            <td className='text-base-content'>
                              {t(
                                `best_direction.${nakshatraInfo['best direction']}`
                              ) || 'Not Available'}
                            </td>
                          </tr>
                        </>
                      )}
                      <tr>
                        <th className='text-base-content'>{t('Yoga')}</th>
                        <td className='text-base-content'>
                          {t(`yoga.${panchang?.Yoga?.name_en_IN}`) || 'N/A'}
                        </td>
                      </tr>
                      <tr>
                        <th className='text-base-content'>{t('Karna')}</th>
                        <td className='text-base-content'>
                          {t(`karna.${panchang?.Karna?.name_en_IN}`) || 'N/A'}
                        </td>
                      </tr>

                      {age && (
                        <tr>
                          <th className='text-base-content'>{t('Age')}</th>
                          <td className='text-base-content'>
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
    </div>
  );
};

export default BirthPanchangBS;
