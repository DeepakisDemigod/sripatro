/*import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import { Alarm, Swap, Calendar } from 'phosphor-react';
import nakshatraData from './nakshatraData.json'; // Import the Nakshatra data
import ScrollTop from './ScrollTop.jsx';

const BirthPanchang = () => {
  useEffect(() => {
    document.title = 'Birth Panchang | Sri Patro';
  }, []);

  const [dob, setDob] = useState('2025-02-01');
  const [time, setTime] = useState('09:00');
  const [panchang, setPanchang] = useState(null);
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null); // New state

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

  const handleSubmit = e => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${dob}T${time}`);
      const panchangObj = new MhahPanchang();
      const result = panchangObj.calculate(dateTime);
      setPanchang(result);

      // Calculate age
      const calculatedAge = calculateAge(dob);
      setAge(calculatedAge);

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
    } catch (error) {
      console.error('Error calculating Panchang:', error);
      setPanchang(null);
      setAge(null);
      setNakshatraInfo(null);
    }
  };

  return (
    <div className='bg-white text-black flex items-center justify-center py-10 px-5'>
      <div className='bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-3xl'>
        <div className='breadcrumbs border rounded text-black px-4 text-sm'>
          <ul>
            <li>
              <a href='/' className="hover:underline">Home</a>
            </li>
            <li>Birth Panchang</li>
          </ul>
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Birth Panchang
        </h2>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div>
            <label
              htmlFor='dob'
              className='flex items-center gap-2 block text-sm font-medium text-gray-700'
            >
              <Calendar size={18} />
              <span>Date of Birth</span>
            </label>
            <input
              id='dob'
              type='date'
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
              className='bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <div>
            <label
              htmlFor='time'
              className='flex items-center gap-2 block text-sm font-medium text-gray-700'
            >
              <Alarm size={18} />
              <span>Time of Birth</span>
            </label>
            <input
              id='time'
              type='time'
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              className='bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
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
          <div className='mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto'>
            <h3 className='text-lg font-semibold underline text-gray-800 mb-4'>
              Birth Panchang Details
            </h3>
            <table className='table w-full bg-white text-black'>
              <tbody>
                <tr>
                  <th>Day</th>
                  <td>{panchang?.Day?.name_en_UK || 'Not Available'}</td>
                </tr>
                
                <tr>
                  <th>Paksh</th>
                  <td>{panchang?.Paksha?.name_en_IN || 'Not Available'}</td>
                </tr>
                
                <tr>
                  <th>Tithi</th>
                  <td>{panchang?.Tithi?.name_en_IN || 'Not Available'}</td>
                </tr>
                
                <tr>
                  <th>Nakshatra</th>
                  <td>{panchang?.Nakshatra?.name_en_IN || 'Not Available'}</td>
                </tr>
                <tr>
                  <th>Raasi</th>
                  <td>{panchang?.Raasi?.name_en_UK || 'Not Available'}</td>
                </tr>
                {nakshatraInfo && (
                  <>
                    <tr>
                      <th>Syllables</th>
                      <td>
                        {nakshatraInfo['first syllables'] || 'Not Available'}
                      </td>
                    </tr>
                    <tr>
                      <th>Gan</th>
                      <td>{nakshatraInfo.ganam || 'Not Available'}</td>
                    </tr>
                    <tr>
                      <th>Animal Sign</th>
                      <td>{nakshatraInfo['animal sign'] || 'Not Available'}</td>
                    </tr>
                    <tr>
                      <th>Deity</th>
                      <td>{nakshatraInfo.Diety || 'Not Available'}</td>
                    </tr>
                    <tr>
                      <th>Best Direction</th>
                      <td>
                        {nakshatraInfo['best direction'] || 'Not Available'}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>Yoga</th>
                  <td>{panchang?.Yoga?.name_en_IN || 'Not Available'}</td>
                </tr>
                <tr>
                  <th>Karna</th>
                  <td>{panchang?.Karna?.name_en_IN || 'Not Available'}</td>
                </tr>
                
                
                {age && (
                  <tr>
                    <th>Age</th>
                    <td>
                      {age.years} years and {age.months} months
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg text-gray-600'>
            Enter your details to get your birth Panchang.
          </div>
        )}

        <div className='mt-6 flex justify-between'>
          <a
            href='/nepalitoenglish'
            className='flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition'
          >
            <Swap size={18} />
            <span>Change Nepali to English Date</span>
          </a>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default BirthPanchang;
*/



 import React, { useState, useEffect } from 'react';
 import { MhahPanchang } from 'mhah-panchang';
 import { Alarm, Swap, Calendar } from 'phosphor-react';
 import nakshatraData from './nakshatraData.json'; // Import the Nakshatra data
 import ScrollTop from './ScrollTop.jsx';
 

 const BirthPanchang = () => {
  useEffect(() => {
  document.title = 'Birth Panchang | Sri Patro';
  //handleSubmit()
  }, []);
 

  const [dob, setDob] = useState(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  });
 

  const [time, setTime] = useState(() => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
  });
 

  const [panchang, setPanchang] = useState(null);
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null); // New state
 

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
 

  const handleSubmit = e => {
  e.preventDefault();
  try {
  const dateTime = new Date(`${dob}T${time}`);
  const panchangObj = new MhahPanchang();
  const result = panchangObj.calculate(dateTime);
  setPanchang(result);
 

  // Calculate age
  const calculatedAge = calculateAge(dob);
  setAge(calculatedAge);
 

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
  } catch (error) {
  console.error('Error calculating Panchang:', error);
  setPanchang(null);
  setAge(null);
  setNakshatraInfo(null);
  }
  };
 

  return (
  <div className="bg-white text-black flex items-center justify-center py-10 px-5">
  <div className="bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-3xl">
  <div className="breadcrumbs border rounded text-black px-4 text-sm">
  <ul>
  <li>
  <a href="/" className="hover:underline">
  Home
  </a>
  </li>
  <li>Birth Panchang</li>
  </ul>
  </div>
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
  Birth Panchang
  </h2>
 

  <form onSubmit={handleSubmit} className="space-y-6">
  <div>
  <label
  htmlFor="dob"
  className="flex items-center gap-2 block text-sm font-medium text-gray-700"
  >
  <Calendar size={18} />
  <span>Date of Birth</span>
  </label>
  <input
  id="dob"
  type="date"
  value={dob}
  onChange={e => setDob(e.target.value)}
  required
  className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
  />
  </div>
 

  <div>
  <label
  htmlFor="time"
  className="flex items-center gap-2 block text-sm font-medium text-gray-700"
  >
  <Alarm size={18} />
  <span>Time of Birth</span>
  </label>
  <input
  id="time"
  type="time"
  value={time}
  onChange={e => setTime(e.target.value)}
  required
  className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
  />
  </div>
 

  <button
  type="submit"
  className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition"
  >
  Get Panchang
  </button>
  </form>
 

  {panchang ? (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto">
  <h3 className="text-lg font-semibold underline text-gray-800 mb-4">
  Birth Panchang Details
  </h3>
  <table className="table w-full bg-white text-black">
  <tbody>
  <tr>
  <th>Day</th>
  <td>{panchang?.Day?.name_en_UK || 'Not Available'}</td>
  </tr>
 

  <tr>
  <th>Paksh</th>
  <td>{panchang?.Paksha?.name_en_IN || 'Not Available'}</td>
  </tr>
 

  <tr>
  <th>Tithi</th>
  <td>{panchang?.Tithi?.name_en_IN || 'Not Available'}</td>
  </tr>
 

  <tr>
  <th>Nakshatra</th>
  <td>{panchang?.Nakshatra?.name_en_IN || 'Not Available'}</td>
  </tr>
  <tr>
  <th>Raasi</th>
  <td>{panchang?.Raasi?.name_en_UK || 'Not Available'}</td>
  </tr>
  {nakshatraInfo && (
  <>
  <tr>
  <th>Syllables</th>
  <td>
  {nakshatraInfo['first syllables'] || 'Not Available'}
  </td>
  </tr>
  <tr>
  <th>Gan</th>
  <td>{nakshatraInfo.ganam || 'Not Available'}</td>
  </tr>
  <tr>
  <th>Animal Sign</th>
  <td>{nakshatraInfo['animal sign'] || 'Not Available'}</td>
  </tr>
  <tr>
  <th>Deity</th>
  <td>{nakshatraInfo.Diety || 'Not Available'}</td>
  </tr>
  <tr>
  <th>Best Direction</th>
  <td>
  {nakshatraInfo['best direction'] || 'Not Available'}
  </td>
  </tr>
  </>
  )}
  <tr>
  <th>Yoga</th>
  <td>{panchang?.Yoga?.name_en_IN || 'Not Available'}</td>
  </tr>
  <tr>
  <th>Karna</th>
  <td>{panchang?.Karna?.name_en_IN || 'Not Available'}</td>
  </tr>
 

  {age && (
  <tr>
  <th>Age</th>
  <td>
  {age.years} years and {age.months} months
  </td>
  </tr>
  )}
  </tbody>
  </table>
  </div>
  ) : (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg text-gray-600">
  Enter your details to get your birth Panchang.
  </div>
  )}
 

  <div className="mt-6 flex justify-between">
  <a
  href="/nepalitoenglish"
  className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition"
  >
  <Swap size={18} />
  <span>Change Nepali to English Date</span>
  </a>
  </div>
  </div>
  <ScrollTop />
  </div>
  );
 };
 

 export default BirthPanchang;
