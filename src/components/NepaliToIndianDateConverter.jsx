/*import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import NepaliDate from 'nepali-date-converter';
import { Alarm, Calendar } from 'phosphor-react';

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
  useEffect(() => {
    document.title = 'Birth Panchang for BS Date | Sri Patro';
  }, []);

  const [nepaliDate, setNepaliDate] = useState({
    year: 2081,
    month: 1,
    day: 1
  });
  const [timeOfBirth, setTimeOfBirth] = useState('09:00');
  const [englishDate, setEnglishDate] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [panchang, setPanchang] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNepaliDate(prev => ({ ...prev, [name]: parseInt(value, 10) || '' }));
    setError('');
    setEnglishDate('');
    setDayOfWeek('');
    setPanchang(null);
  };

  const handleTimeChange = e => {
    setTimeOfBirth(e.target.value);
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
      setPanchang(panchangObj.calculate(adDate));
    } catch (err) {
      setError('Invalid date or time. Please check your input.');
      setEnglishDate('');
      setDayOfWeek('');
      setPanchang(null);
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
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-lg w-full'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          Bikram Sambat to Panchang
        </h1>

        <div className='space-y-6'>
          <div>
            <label className='block text-gray-600 font-medium mb-1 flex items-center gap-2'>
              <Calendar size={18} />
              <span>Date of Birth</span>
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
                className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
              />
              <select
                name='month'
                value={nepaliDate.month}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
              >
                {BS_MONTHS.map((month, index) => (
                  <option
                    key={index}
                    value={index + 1}
                  >
                    {month}
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
                className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-gray-600 font-medium mb-1 flex items-center gap-2'>
              <Alarm size={18} />
              <span>Time of Birth</span>
            </label>
            <input
              type='time'
              value={timeOfBirth}
              onChange={handleTimeChange}
              className='w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            onClick={convertAndCalculatePanchang}
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Convert and Get Panchang
          </button>
        </div>

        {error && <div className='mt-4 text-blue-600 font-medium'>{error}</div>}

        {!englishDate && !panchang ? (
          <div className='mt-6 bg-gray-100 p-4 rounded-lg text-gray-600'>
            Enter date and time to get Panchang.
          </div>
        ) : (
          englishDate && (
            <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
              <h2 className='text-xl font-bold text-gray-800'>
                {nepaliDate.year} {BS_MONTHS[nepaliDate.month - 1]}{' '}
                {nepaliDate.day}
              </h2>
              <p className='text-gray-600'>
                {dayOfWeek}
                {', '}
                {timeOfBirth || 'N/A'}
              </p>
              <p className='text-gray-800 text-lg'>{englishDate}</p>
              {panchang && (
                <div className='mt-4'>
                  <h3 className='text-lg font-semibold'>Panchang Details</h3>
                  <p>
                    <strong>Day:</strong> {panchang?.Day?.name_en_UK || 'N/A'}
                  </p>

                  <p>
                    <strong>Tithi:</strong>{' '}
                    {panchang?.Tithi?.name_en_IN || 'N/A'}
                  </p>
                  <p>
                    <strong>Nakshatra:</strong>{' '}
                    {panchang?.Nakshatra?.name_en_IN || 'N/A'}
                  </p>
                  <p>
                    <strong>Yoga:</strong> {panchang?.Yoga?.name_en_IN || 'N/A'}
                  </p>
                  <p>
                    <strong>Karna:</strong>{' '}
                    {panchang?.Karna?.name_en_IN || 'N/A'}
                  </p>
                  <p>
                    <strong>Paksha:</strong>{' '}
                    {panchang?.Paksha?.name_en_IN || 'N/A'}
                  </p>
                  <p>
                    <strong>Raasi:</strong>{' '}
                    {panchang?.Raasi?.name_en_UK || 'N/A'}
                  </p>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BirthPanchangBS;
*/

import React, { useState, useEffect } from "react";
import { MhahPanchang } from "mhah-panchang";
import NepaliDate from "nepali-date-converter";
import { Alarm, Calendar } from "phosphor-react";
import nakshatraData from "./nakshatraData.json"; // Import the Nakshatra data

const BS_MONTHS = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Paush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const BirthPanchangBS = () => {
  useEffect(() => {
    document.title = "Birth Panchang for BS Date | Sri Patro";
  }, []);

  const [nepaliDate, setNepaliDate] = useState({
    year: 2081,
    month: 11,
    day: 1,
  });
  const [timeOfBirth, setTimeOfBirth] = useState("09:00");
  const [englishDate, setEnglishDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [panchang, setPanchang] = useState(null);
  const [error, setError] = useState("");
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNepaliDate((prev) => ({ ...prev, [name]: parseInt(value, 10) || "" }));
    setError("");
    setEnglishDate("");
    setDayOfWeek("");
    setPanchang(null);
    setAge(null);
    setNakshatraInfo(null);
  };

  const handleTimeChange = (e) => {
    setTimeOfBirth(e.target.value);
  };

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

  const convertAndCalculatePanchang = () => {
    try {
      const { year, month, day } = nepaliDate;

      // Validate inputs
      if (!year || !month || !day) throw new Error("Invalid date input.");

      // Convert BS to AD
      const bsDate = new NepaliDate(year, month - 1, day);
      const adDate = bsDate.toJsDate();

      // Add Time of Birth
      const [hours, minutes] = timeOfBirth.split(":").map(Number);
      adDate.setHours(hours, minutes);

      // Calculate age
      const calculatedAge = calculateAge(adDate);
      setAge(calculatedAge);

      // Format AD Date and Panchang
      setEnglishDate(
        adDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
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
          (n) => n.name === nakshatraName
        );
        setNakshatraInfo(foundNakshatra);
      } else {
        setNakshatraInfo(null);
      }
    } catch (err) {
      setError("Invalid date or time. Please check your input.");
      setEnglishDate("");
      setDayOfWeek("");
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
    <div className="bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white border border-t-blue-600 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Bikram Sambat to Panchang
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-1 flex items-center gap-2">
              <Calendar size={18} />
              <span>Date of Birth</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                name="year"
                value={nepaliDate.year}
                onChange={handleInputChange}
                min="1970"
                max="2100"
                placeholder="Year"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="month"
                value={nepaliDate.month}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {BS_MONTHS.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="day"
                value={nepaliDate.day}
                onChange={handleInputChange}
                min="1"
                max={getMaxDays()}
                placeholder="Day"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1 flex items-center gap-2">
              <Alarm size={18} />
              <span>Time of Birth</span>
            </label>
            <input
              type="time"
              value={timeOfBirth}
              onChange={handleTimeChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={convertAndCalculatePanchang}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Convert and Get Panchang
          </button>
        </div>

        {error && <div className="mt-4 text-blue-600 font-medium">{error}</div>}

        {!englishDate && !panchang ? (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-gray-600">
            Enter date and time to get Panchang.
          </div>
        ) : (
          englishDate && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <h2 className="text-xl font-bold text-gray-800">
                {nepaliDate.year} {BS_MONTHS[nepaliDate.month - 1]}{" "}
                {nepaliDate.day}
              </h2>
              <p className="text-gray-600">
                {dayOfWeek}
                {", "}
                {timeOfBirth || "N/A"}
              </p>
              <p className="text-gray-800 text-lg">{englishDate}</p>

              {panchang && (
                <table className="table table-zebra w-full mt-4">
                  <tbody>
                    <tr>
                      <th>Day</th>
                      <td>{panchang?.Day?.name_en_UK || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Tithi</th>
                      <td>{panchang?.Tithi?.name_en_IN || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Nakshatra</th>
                      <td>{panchang?.Nakshatra?.name_en_IN || "N/A"}</td>
                    </tr>
                    {nakshatraInfo && (
                      <>
                        <tr>
                          <th>Syllables</th>
                          <td>
                            {nakshatraInfo["first syllables"] ||
                              "Not Available"}
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
                          <td>
                            {nakshatraInfo["animal sign"] || "Not Available"}
                          </td>
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
                      <td>{panchang?.Yoga?.name_en_IN || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Karna</th>
                      <td>{panchang?.Karna?.name_en_IN || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Paksha</th>
                      <td>{panchang?.Paksha?.name_en_IN || "N/A"}</td>
                    </tr>
                    <tr>
                      <th>Raasi</th>
                      <td>{panchang?.Raasi?.name_en_UK || "N/A"}</td>
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
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BirthPanchangBS;
