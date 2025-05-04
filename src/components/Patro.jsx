import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import { Calendar, Alarm } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import Calender from './Calender.jsx';

const Patro = () => {
  const [mhahObj, setMhahObj] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const { t } = useTranslation();

  // Fetch Panchang details once
  useEffect(() => {
    try {
      const date = new Date();
      const obj = new MhahPanchang();
      setMhahObj(obj.calculate(date));
      console.log(obj);
    } catch (error) {
      console.error('Error fetching Panchang details:', error);
    }
  }, []);

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      const originalDate = new Date();
      const datePart = originalDate.toLocaleDateString(); // Get the date
      const timePart = originalDate.toLocaleTimeString(); // Get the time

      // Combine date and time with the Alarm icon
      const formattedString = (
        <>
          {datePart} ,
          <Alarm
            size={18}
            className='mr-[-4px]'
          />{' '}
          {timePart}
        </>
      );

      setCurrentTime(formattedString);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return mhahObj ? (
    <div className='mt-2 flex justify-center bg-base-200 text-base-content'>
      <div className='shadow-lg rounded-lg p-4 w-full max-w-3xl'>
        {/*<h3 className='text-2xl font-semibold mb-4 underline'>
          {t('Panchang Today')}
        </h3>*/}
        <div className='bg-base-300 rounded-lg border border-2 border-red-800 p-2 text-sm flex items-center justify-between font-semibold'>
          <div className='mx-4'>
            <div className='flex gap-2'>
              <p>
                {t(`tithi.${mhahObj?.Tithi?.name_en_IN}`) || 'Not available'}{' '}
                {t('Tithi')},{' '}
              </p>
              <p>{t(`paksha.${mhahObj?.Paksha?.name_en_IN}`)}</p>
            </div>
            <div className='flex gap-2'>
              <p>
                {' '}
                {t(`rasi.${mhahObj?.Raasi?.name_en_UK}`) ||
                  'Not available'}{' '}
                {t('Rasi')},{' '}
              </p>
              <p>
                {t(`nakshatra.${mhahObj?.Nakshatra?.name_en_IN}`) ||
                  'Not available'}{' '}
                {t('Nakshatra')}
              </p>
            </div>

            <div className='flex gap-2'>
              <p className='text-base-content'>
                {t(`yoga.${mhahObj?.Yoga?.name_en_IN}`) || 'Not available'}{' '}
                {t('Yoga')},{' '}
              </p>
              <p className='text-base-content'>
                {t(`karna.${mhahObj?.Karna?.name_en_IN}`) || 'Not available'}{' '}
                {t('Karna')}
              </p>
            </div>
          </div>
          <div>
            {mhahObj?.Paksha?.name_en_IN === 'Shukla' ? (
              <img
                width='80'
                className=' shadow-2xl rounded-full'
                src={`moon/shukla/${mhahObj?.Tithi?.name_en_IN}.png`}
              />
            ) : (
              <img
                width='80'
                className=' shadow-2xl rounded-full'
                src={`moon/shukla/${mhahObj?.Tithi?.name_en_IN}.png`}
              />
            )}
          </div>
        </div>
        <div className='bg-red-800 text-white rounded-lg p-2 text-center mb-6'>
          <h2 className='text-sm flex items-center justify-start gap-2'>
            <Calendar size={18} />
            {/*{mhahObj?.Day?.name_en_UK || 'Day not available'}*/}
            <span className='font-semibold'>
              {t(`day.${mhahObj?.Day?.name_en_UK}`) || 'Day not available'}
            </span>
            {', '}
            {currentTime}
          </h2>
        </div>

        <Calender />
        <br />

        <div className='overflow-x-auto'>
          <table className='table w-full border border-base-100 text-base-content'>
            {/* head */}
            <thead className='bg-red-800 text-sm'>
              <tr className='text-gray-100'>
                <th className='p-1'>{t('Panchang')}</th>
                <th className='p-1'>{t('Value')}</th>
                <th className='p-1'>{t('Start Time')}</th>
                <th className='p-1'>{t('End Time')}</th>
              </tr>
            </thead>
            <tbody className='text-xs'>
              {/* row 1 */}
              <tr>
                <td className='text-base-content p-1'>{t('Tithi')}</td>
                <td className='text-base-content p-1'>
                  {t(`tithi.${mhahObj?.Tithi?.name_en_IN}`) || 'Not available'}
                </td>
                {/*<td>{t(`${mhahObj?.Tithi?.name_en_IN}`) || 'Not available'}</td>*/}
                <td className='text-base-content p-1'>
                  {mhahObj?.Tithi?.start
                    ? new Date(mhahObj?.Tithi?.start).toLocaleString()
                    : 'Unknown'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Tithi?.end
                    ? new Date(mhahObj?.Tithi?.end).toLocaleString()
                    : 'Unknown'}
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <td className='text-base-content p-1'>{t('Nakshatra')}</td>
                {/*   <td>{mhahObj?.Nakshatra?.name_en_IN || 'Not available'}</td> */}
                <td className='text-base-content p-1'>
                  {t(`nakshatra.${mhahObj?.Nakshatra?.name_en_IN}`) ||
                    'Not available'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Nakshatra?.start
                    ? new Date(mhahObj?.Nakshatra?.start).toLocaleString()
                    : 'Unknown'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Nakshatra?.end
                    ? new Date(mhahObj?.Nakshatra?.end).toLocaleString()
                    : 'Unknown'}
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <td className='text-base-content p-1'>{t('Karna')}</td>
                {/*  <td>{mhahObj?.Karna?.name_en_IN || 'Not available'}</td> */}
                <td className='text-base-content p-1'>
                  {t(`karna.${mhahObj?.Karna?.name_en_IN}`) || 'Not available'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Karna?.start
                    ? new Date(mhahObj?.Karna?.start).toLocaleString()
                    : 'Unknown'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Karna?.end
                    ? new Date(mhahObj?.Karna?.end).toLocaleString()
                    : 'Unknown'}
                </td>
              </tr>
              {/* row 4 */}
              <tr>
                <td className='text-base-content p-1'>{t('Yoga')}</td>
                {/* <td>{mhahObj?.Yoga?.name_en_IN || 'Not available'}</td> */}
                <td className='text-base-content p-1'>
                  {t(`yoga.${mhahObj?.Yoga?.name_en_IN}`) || 'Not available'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Yoga?.start
                    ? new Date(mhahObj?.Yoga?.start).toLocaleString()
                    : 'Unknown'}
                </td>
                <td className='text-base-content p-1'>
                  {mhahObj?.Yoga?.end
                    ? new Date(mhahObj?.Yoga?.end).toLocaleString()
                    : 'Unknown'}
                </td>
              </tr>
              {/* row 5 */}
              <tr>
                <td className='text-base-content p-1'>{t('Rasi')}</td>
                <td
                  className='text-base-content p-1'
                  colSpan={3}
                >
                  {t(`rasi.${mhahObj?.Raasi?.name_en_UK}`) || 'Not available'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-base-100'>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  );
};

export default Patro;
