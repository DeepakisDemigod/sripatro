import React, { useState , useEffect} from 'react';
import { MhahPanchang } from 'mhah-panchang';

const BirthPanchang = () => {
  useEffect(() => {
    document.title = 'Birth Panchang | Sri Patro';
  }, []);
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [panchang, setPanchang] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${dob}T${time}`);
      const panchangObj = new MhahPanchang();
      const result = panchangObj.calculate(dateTime);
      setPanchang(result);
    } catch (error) {
      console.error('Error calculating Panchang:', error);
      setPanchang(null);
    }
  };

  return (
    <div className=' bg-gray-50 flex items-center justify-center py-10 px-5'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl'>
        <h2 className='text-2xl font-semibold text-gray-800  mb-6'>
          Birth Panchang
        </h2>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div>
            <label
              htmlFor='dob'
              className='block text-sm font-medium text-gray-700'
            >
              Date of Birth
            </label>
            <input
              id='dob'
              type='date'
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='time'
              className='block text-sm font-medium text-gray-700'
            >
              Time of Birth
            </label>
            <input
              id='time'
              type='time'
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition'
          >
            Get Panchang
          </button>
        </form>

        {panchang ? (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Birth Panchang Details
            </h3>
            <div className='space-y-2'>
              <p>
                <strong>Day:</strong>{' '}
                {panchang?.Day?.name_en_UK || 'Not Available'}
              </p>
              <p>
                <strong>Tithi:</strong>{' '}
                {panchang?.Tithi?.name_en_IN || 'Not Available'} (
                {panchang?.Tithi?.start
                  ? new Date(panchang.Tithi.start).toLocaleString()
                  : 'Unknown'}{' '}
                -{' '}
                {panchang?.Tithi?.end
                  ? new Date(panchang.Tithi.end).toLocaleString()
                  : 'Unknown'}
                )
              </p>
              <p>
                <strong>Nakshatra:</strong>{' '}
                {panchang?.Nakshatra?.name_en_IN || 'Not Available'} (
                {panchang?.Nakshatra?.start
                  ? new Date(panchang.Nakshatra.start).toLocaleString()
                  : 'Unknown'}{' '}
                -{' '}
                {panchang?.Nakshatra?.end
                  ? new Date(panchang.Nakshatra.end).toLocaleString()
                  : 'Unknown'}
                )
              </p>
              <p>
                <strong>Yoga:</strong>{' '}
                {panchang?.Yoga?.name_en_IN || 'Not Available'}
              </p>
              <p>
                <strong>Karna:</strong>{' '}
                {panchang?.Karna?.name_en_IN || 'Not Available'}
              </p>
              <p>
                <strong>Paksha:</strong>{' '}
                {panchang?.Paksha?.name_en_IN || 'Not Available'}
              </p>
              <p>
                <strong>Raasi:</strong>{' '}
                {panchang?.Raasi?.name_en_UK || 'Not Available'}
              </p>
            </div>
          </div>
        ) : (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg text-gray-600'>
            Enter your details to get your birth Panchang.
          </div>
        )}

        <div className='mt-6 flex justify-between'>
          <a
            href='/nepalitoenglish'
            className='bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition'
          >
            Change Nepali to English Date
          </a>
        </div>
      </div>
    </div>
  );
};

export default BirthPanchang;
