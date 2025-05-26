import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import { Calendar, Alarm, Sun, Moon } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import Calender from './Calender.jsx';

const INFO_FIELDS = [
  {
    labelKey: 'Tithi',
    valueKey: 'Tithi',
    i18nPrefix: 'tithi',
    nameField: 'name_en_IN',
    extra: ', '
  },
  {
    labelKey: 'Paksha',
    valueKey: 'Paksha',
    i18nPrefix: 'paksha',
    nameField: 'name_en_IN',
    extra: ''
  },
];

const TABLE_FIELDS = [
  {
    labelKey: 'Tithi',
    valueKey: 'Tithi',
    i18nPrefix: 'tithi',
    nameField: 'name_en_IN',
  },
  {
    labelKey: 'Nakshatra',
    valueKey: 'Nakshatra',
    i18nPrefix: 'nakshatra',
    nameField: 'name_en_IN',
  },
  {
    labelKey: 'Karna',
    valueKey: 'Karna',
    i18nPrefix: 'karna',
    nameField: 'name_en_IN',
  },
  {
    labelKey: 'Yoga',
    valueKey: 'Yoga',
    i18nPrefix: 'yoga',
    nameField: 'name_en_IN',
  },
];

const Patro = () => {
  const [mhahObj, setMhahObj] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [sunData, setSunData] = useState(null);
  const { t } = useTranslation();

  // Helper: translation with fallback
  const translateWithFallback = (key, fallback = 'Not available') => t(key) || fallback;
  // Helper: format date/time
  const formatDateTime = (date) => date ? new Date(date).toLocaleString() : 'Unknown';

  useEffect(() => {
    try {
      const date = new Date();
      const obj = new MhahPanchang();
      setMhahObj(obj.calculate(date));
    } catch (error) {
      console.error('Error fetching Panchang details:', error);
    }
  }, []);

  useEffect(() => {
    const fetchSunDetails = async () => {
      try {
        const response = await fetch(
          'https://api.sunrisesunset.io/json?lat=28.7041&lng=77.1025'
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setSunData(data.results);
      } catch (e) {
        setSunData(null);
      }
    };
    fetchSunDetails();
    const timer = setInterval(() => {
      const now = new Date();
      const datePart = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      const timePart = now.toLocaleTimeString();
      setCurrentTime(
        <>
          {datePart},{' '}
          <Alarm size={18} className='mr-[-4px]' />{' '}
          {timePart}
        </>
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mhahObj) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-base-100'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  // Info block for Rasi/Nakshatra
  const rasiNakshatraBlock = (
    <div className='flex flex-wrap gap-2'>
      <span className='font-medium'>
        {translateWithFallback(`rasi.${mhahObj?.Raasi?.name_en_UK}`)} {t('Rasi')},
      </span>
      <span className='font-medium'>
        {translateWithFallback(`nakshatra.${mhahObj?.Nakshatra?.name_en_IN}`)}
      </span>
      <span className='font-light'>{t('Nakshatra')}</span>
    </div>
  );

  // Info block for Yoga/Karna
  const yogaKarnaBlock = (
    <div className='flex flex-wrap gap-2'>
      <span className='font-medium'>
        {translateWithFallback(`yoga.${mhahObj?.Yoga?.name_en_IN}`)} {t('Yoga')},
      </span>
      <span className='font-medium'>
        {translateWithFallback(`karna.${mhahObj?.Karna?.name_en_IN}`)} {t('Karna')}
      </span>
    </div>
  );

  // Info block for Tithi/Paksha
  const tithiPakshaBlock = (
    <div className='flex flex-wrap gap-2'>
      {INFO_FIELDS.map(({ labelKey, valueKey, i18nPrefix, nameField, extra }) => (
        <span key={labelKey} className='font-medium'>
          {translateWithFallback(`${i18nPrefix}.${mhahObj?.[valueKey]?.[nameField]}`)}
          {labelKey === 'Tithi' && ` ${t('Tithi')}, `}
        </span>
      ))}
      <span className='font-medium'>{translateWithFallback(`paksha.${mhahObj?.Paksha?.name_en_IN}`)}</span>
    </div>
  );

  // Table rows
  const tableRows = [
    ...TABLE_FIELDS.map(({ labelKey, valueKey, i18nPrefix, nameField }) => (
      <tr key={labelKey}>
        <td className='text-base-content p-1'>{t(labelKey)}</td>
        <td className='text-base-content p-1'>
          {translateWithFallback(`${i18nPrefix}.${mhahObj?.[valueKey]?.[nameField]}`)}
        </td>
        <td className='text-base-content p-1'>
          {formatDateTime(mhahObj?.[valueKey]?.start)}
        </td>
        <td className='text-base-content p-1'>
          {formatDateTime(mhahObj?.[valueKey]?.end)}
        </td>
      </tr>
    )),
  ];

  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 px-2'>
      <div className='card w-full max-w-lg shadow-2xl bg-base-200 text-base-content rounded-box'>
        <div className='card-body p-4'>
          <div className='flex items-center gap-2 mb-2'>
            <span className='w-2 h-2 bg-red-600 rounded-full animate-ping'></span>
            <span className='uppercase text-xs tracking-widest font-semibold'>Live</span>
          </div>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-base-300 border border-red-800 rounded-xl p-4 mb-4'>
            <div className='flex-1 flex flex-col gap-1'>
              {tithiPakshaBlock}
              {rasiNakshatraBlock}
              {yogaKarnaBlock}
              <div className='flex gap-4 mt-2 items-center'>
                <span className='flex items-center gap-1 text-base-content'>
                  <Sun size={20} className='text-yellow-400' />
                  <span className='font-semibold'>{sunData?.sunrise || 'Unknown'}</span>
                </span>
                <span className='flex items-center gap-1 text-base-content'>
                  <Moon size={20} className='text-blue-400' />
                  <span className='font-semibold'>{sunData?.sunset || 'Unknown'}</span>
                </span>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <img
                width='80'
                className='shadow-2xl rounded-full border border-base-300 bg-base-100'
                src={`moon/${mhahObj?.Paksha?.name_en_IN === 'Shukla' ? 'shukla' : 'krishna'}/${mhahObj?.Tithi?.name_en_IN}.png`}
                alt='Moon phase'
              />
            </div>
          </div>
          <div className='bg-red-800 text-white rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
            <h2 className='text-base flex items-center gap-2 font-semibold'>
              <Calendar size={20} />
              <span>
                {translateWithFallback(`day.${mhahObj?.Day?.name_en_UK}`, 'Day not available')},
              </span>
              <span className='ml-2'>{currentTime}</span>
            </h2>
          </div>
          <div className='mb-4'>
            <Calender />
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-zebra w-full rounded-box border border-base-100 text-base-content'>
              <thead className='bg-red-800 text-sm text-white'>
                <tr>
                  <th className='p-1'>{t('Panchang')}</th>
                  <th className='p-1'>{t('Value')}</th>
                  <th className='p-1'>{t('Start Time')}</th>
                  <th className='p-1'>{t('End Time')}</th>
                </tr>
              </thead>
              <tbody className='text-xs'>
                {tableRows}
                <tr>
                  <td className='text-base-content p-1'>{t('Rasi')}</td>
                  <td className='text-base-content p-1' colSpan={3}>
                    {translateWithFallback(`rasi.${mhahObj?.Raasi?.name_en_UK}`)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patro;
