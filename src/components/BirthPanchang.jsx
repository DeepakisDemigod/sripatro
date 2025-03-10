/*
import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import { Alarm, Swap, Calendar } from 'phosphor-react';
import nakshatraData from './nakshatraData.json'; // Import the Nakshatra data

const BirthPanchang = () => {
  useEffect(() => {
    document.title = 'Birth Panchang | Sri Patro';
  }, []);

  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [panchang, setPanchang] = useState(null);
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null); // New state

  console.log(nakshatraInfo);
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
      console.log(result);
      setPanchang(result);

      // Calculate age
      const calculatedAge = calculateAge(dob);
      setAge(calculatedAge);

      // Find Nakshatra Info
      const nakshatraName = result?.Nakshatra?.name_en_IN;

      if (nakshatraName) {
        console.log('Nakshatra Name from Panchang:', nakshatraName); // Add this
        const foundNakshatra = nakshatraData.find(
          n => n.name === nakshatraName
        );
        console.log('Found Nakshatra:', foundNakshatra); // Add this
        setNakshatraInfo(foundNakshatra);
      }

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
    <div className='bg-gray-50 flex items-center justify-center py-10 px-5'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl'>
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
              requiblue
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
              requiblue
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition'
          >
            Get Panchang
          </button>
        </form>

        {panchang ? (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold underline text-gray-800 mb-4'>
              Birth Panchang Details
            </h3>
            <div className='space-y-2 mx-2'>
              <p>
                <strong>Day:</strong>{' '}
                {panchang?.Day?.name_en_UK || 'Not Available'}
              </p>
              <p>
                <strong>Tithi:</strong>{' '}
                {panchang?.Tithi?.name_en_IN || 'Not Available'}
              </p>
              <p>
                <strong>Nakshatra:</strong>{' '}
                {panchang?.Nakshatra?.name_en_IN || 'Not Available'}
              </p>
              {nakshatraInfo && (
                <>
                  <p>
                    <strong>Syllables:</strong>{' '}
                    {nakshatraInfo['first syllables'] || 'Not Available'}
                  </p>
                  <p>
                    <strong>Deity:</strong>{' '}
                    {nakshatraInfo.Diety || 'Not Available'}
                  </p>
                  <p>
                    <strong>Ganam:</strong>{' '}
                    {nakshatraInfo.ganam || 'Not Available'}
                  </p>
                  <p>
                    <strong>Animal Sign:</strong>{' '}
                    {nakshatraInfo['animal sign'] || 'Not Available'}
                  </p>
                  <p>
                    <strong>Best Direction:</strong>{' '}
                    {nakshatraInfo['best direction'] || 'Not Available'}
                  </p>
                </>
              )}
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
              {age && (
                <p>
                  <strong>Age:</strong> {age.years} years and {age.months}{' '}
                  months
                </p>
              )}
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
            className='flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition'
          >
            <Swap size={18} />
            <span>Change Nepali to English Date</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BirthPanchang;
*/

import React, { useState, useEffect } from "react";
import { MhahPanchang } from "mhah-panchang";
import { Alarm, Swap, Calendar } from "phosphor-react";
import nakshatraData from "./nakshatraData.json"; // Import the Nakshatra data

const BirthPanchang = () => {
  useEffect(() => {
    document.title = "Birth Panchang | Sri Patro";
  }, []);

  const [dob, setDob] = useState("2025-02-01");
  const [time, setTime] = useState("09:00");
  const [panchang, setPanchang] = useState(null);
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null); // New state

  const calculateAge = (dateOfBirth) => {
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

  const handleSubmit = (e) => {
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
          (n) => n.name === nakshatraName
        );
        setNakshatraInfo(foundNakshatra);
      } else {
        setNakshatraInfo(null);
      }
    } catch (error) {
      console.error("Error calculating Panchang:", error);
      setPanchang(null);
      setAge(null);
      setNakshatraInfo(null);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center py-10 px-5">
      <div className="bg-white border border-t-blue-600 shadow-lg rounded-lg p-6 w-full max-w-3xl">
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
              onChange={(e) => setDob(e.target.value)}
              requiblue
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              onChange={(e) => setTime(e.target.value)}
              requiblue
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition"
          >
            Get Panchang
          </button>
        </form>

        {panchang ? (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <h3 className="text-lg font-semibold underline text-gray-800 mb-4">
              Birth Panchang Details
            </h3>
            <table className="table table-zebra w-full">
              <tbody>
                <tr>
                  <th>Day</th>
                  <td>{panchang?.Day?.name_en_UK || "Not Available"}</td>
                </tr>
                <tr>
                  <th>Tithi</th>
                  <td>{panchang?.Tithi?.name_en_IN || "Not Available"}</td>
                </tr>
                <tr>
                  <th>Nakshatra</th>
                  <td>{panchang?.Nakshatra?.name_en_IN || "Not Available"}</td>
                </tr>
                {nakshatraInfo && (
                  <>
                    <tr>
                      <th>Syllables</th>
                      <td>
                        {nakshatraInfo["first syllables"] || "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <th>Deity</th>
                      <td>{nakshatraInfo.Diety || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Ganam</th>
                      <td>{nakshatraInfo.ganam || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Animal Sign</th>
                      <td>{nakshatraInfo["animal sign"] || "Not Available"}</td>
                    </tr>
                    <tr>
                      <th>Best Direction</th>
                      <td>
                        {nakshatraInfo["best direction"] || "Not Available"}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>Yoga</th>
                  <td>{panchang?.Yoga?.name_en_IN || "Not Available"}</td>
                </tr>
                <tr>
                  <th>Karna</th>
                  <td>{panchang?.Karna?.name_en_IN || "Not Available"}</td>
                </tr>
                <tr>
                  <th>Paksha</th>
                  <td>{panchang?.Paksha?.name_en_IN || "Not Available"}</td>
                </tr>
                <tr>
                  <th>Raasi</th>
                  <td>{panchang?.Raasi?.name_en_UK || "Not Available"}</td>
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
            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition"
          >
            <Swap size={18} />
            <span>Change Nepali to English Date</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BirthPanchang;
