/*import React, { useState, useEffect } from "react";

function Kundali() {
  const [planets, setPlanets] = useState(null);
  const [ascendantSign, setAscendantSign] = useState(null);
  const [dateTime, setDateTime] = useState({
    year: 2004,
    month: 12,
    date: 26,
    hours: 13,
    minutes: 12,
    seconds: 0,
  });
  const [latitude, setLatitude] = useState(28.5185347);
  const [longitude, setLongitude] = useState(77.1659952);

  const handleDateTimeChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    // For date and time, split the value and update accordingly
    if (name === "datetime") {
      const dateObj = new Date(value);
      setDateTime({
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1, // Month is 0-indexed
        date: dateObj.getDate(),
        hours: dateObj.getHours(),
        minutes: dateObj.getMinutes(),
        seconds: dateObj.getSeconds(),
      });
    } else if (name === "latitude") {
      setLatitude(parseFloat(value));
    } else if (name === "longitude") {
      setLongitude(parseFloat(value));
    }
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(
          "https://json.apiastro.com/planets/extended",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "gsH9JZc46V6ReDRpCLQen6DJhw1gquqG3H7NIeeI",
            },
            body: JSON.stringify({
              year: dateTime.year,
              month: dateTime.month,
              date: dateTime.date,
              hours: dateTime.hours,
              minutes: dateTime.minutes,
              seconds: dateTime.seconds,
              latitude: latitude,
              longitude: longitude,
              timezone: 5.5,
              settings: {
                observation_point: "topocentric",
                ayanamsha: "lahiri",
                language: "en",
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setPlanets(responseData.output);
        setAscendantSign(responseData.output.Ascendant.zodiac_sign_name); // Store ascendant sign
        console.log("Planets data:", responseData.output);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };

    fetchPlanets();
  }, [dateTime, latitude, longitude]);

  if (!planets || !ascendantSign) {
    return <p>Loading...</p>;
  }

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  // Function to get the sign for a given house
  const getSignForHouse = (houseNumber) => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return zodiacSigns[houseIndex];
  };

  // Function to get the sign number for a given house
  const getSignNumberForHouse = (houseNumber) => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return houseIndex + 1; // Add 1 to make it 1-based
  };

  // Function to organize planets by house number
  const organizePlanetsByHouse = () => {
    const houses = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };

    Object.entries(planets).forEach(([planetName, planetData]) => {
      if (planetName !== "Ascendant") {
        // Exclude Ascendant from planet list
        const houseNumber = planetData.house_number;
        if (houses[houseNumber]) {
          houses[houseNumber].push({ name: planetName, data: planetData });
        }
      }
    });

    return houses;
  };

  const houses = organizePlanetsByHouse();

  // Define coordinates for each house number
  const houseCoordinates = {
    1: { x: 150, y: 100 },
    2: { x: 80, y: 35 },
    3: { x: 40, y: 75 },
    4: { x: 85, y: 150 },
    5: { x: 35, y: 228 },
    6: { x: 80, y: 260 },
    7: { x: 150, y: 220 },
    8: { x: 223, y: 255 },
    9: { x: 265, y: 228 },
    10: { x: 215, y: 150 },
    11: { x: 265, y: 75 },
    12: { x: 220, y: 35 },
  };

  return (
    <>
      <h1>D1 Chart</h1>
      <form>
        <label htmlFor="datetime">
          Date and Time:
          <input
            className="input"
            type="datetime-local"
            id="datetime"
            name="datetime"
            value={`${dateTime.year}-${String(dateTime.month).padStart(
              2,
              "0"
            )}-${String(dateTime.date).padStart(2, "0")}T${String(
              dateTime.hours
            ).padStart(2, "0")}:${String(dateTime.minutes).padStart(2, "0")}`}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        <label htmlFor="latitude">
          Latitude:
          <input
            className="input"
            type="number"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={handleDateTimeChange}
          />
        </label>
        <br />
        <label htmlFor="longitude">
          Longitude:
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={handleDateTimeChange}
          />
        </label>
      </form>

      <img
        src="Shri-symbol.svg"
        style={{ marginTop: "50px", marginLeft: "40px" }}
      />
      <svg
        style={{ marginTop: "-230px" }}
        width="350"
        height="350"
        viewBox="0 0 350 350"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="280"
          height="280"
          fill="none"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="150"
          y1="10"
          x2="290"
          y2="150"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="290"
          y1="150"
          x2="150"
          y2="290"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="150"
          y1="290"
          x2="10"
          y2="150"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="150"
          x2="150"
          y2="10"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="10"
          y1="10"
          x2="290"
          y2="290"
          stroke="black"
          strokeWidth="1"
        />
        <line
          x1="290"
          y1="10"
          x2="10"
          y2="290"
          stroke="black"
          strokeWidth="1"
        />

        {Object.keys(houses).map((houseNumber) => {
          const planetsInHouse = houses[houseNumber];
          const coords = houseCoordinates[houseNumber];
          const signForHouse = getSignForHouse(parseInt(houseNumber));
          const signNumberForHouse = getSignNumberForHouse(
            parseInt(houseNumber)
          );

          return (
            <g key={houseNumber}>
              <text
                x={coords.x}
                y={coords.y}
                fontFamily="monospace"
                textAnchor="middle"
              >
              {signNumberForHouse}
              </text>
              {planetsInHouse.map((planet, index) => (
                <text
                  key={planet.name}
                  x={coords.x}
                  y={coords.y + 20 + index * 15} // Adjust positioning
                  fontFamily="monospace"
                  textAnchor="middle"
                  fill="red"
                >
                  {planet.name.slice(0, 2)}
                
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </>
  );
}

export default Kundali;
*/

/*

import React, { useState, useEffect } from 'react';

function Kundali() {
  const [planets, setPlanets] = useState(null);
  const [ascendantSign, setAscendantSign] = useState(null);
  const [dateTime, setDateTime] = useState({
    year: 2004,
    month: 12,
    date: 26,
    hours: 13,
    minutes: 12,
    seconds: 0
  });
  const [latitude, setLatitude] = useState(28.5185347);
  const [longitude, setLongitude] = useState(77.1659952);

  const handleDateTimeChange = event => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'datetime') {
      const dateObj = new Date(value);
      setDateTime({
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        date: dateObj.getDate(),
        hours: dateObj.getHours(),
        minutes: dateObj.getMinutes(),
        seconds: dateObj.getSeconds()
      });
    } else if (name === 'latitude') {
      setLatitude(parseFloat(value));
    } else if (name === 'longitude') {
      setLongitude(parseFloat(value));
    }
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(
          'https://json.apiastro.com/planets/extended',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'gsH9JZc46V6ReDRpCLQen6DJhw1gquqG3H7NIeeI'
            },
            body: JSON.stringify({
              year: dateTime.year,
              month: dateTime.month,
              date: dateTime.date,
              hours: dateTime.hours,
              minutes: dateTime.minutes,
              seconds: dateTime.seconds,
              latitude: latitude,
              longitude: longitude,
              timezone: 5.5,
              settings: {
                observation_point: 'topocentric',
                ayanamsha: 'lahiri',
                language: 'en'
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setPlanets(responseData.output);
        setAscendantSign(responseData.output.Ascendant.zodiac_sign_name);
        console.log('Planets data:', responseData.output);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [dateTime, latitude, longitude]);

  if (!planets || !ascendantSign) {
    return <p>Loading...</p>;
  }

  const zodiacSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces'
  ];

  const getSignForHouse = houseNumber => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return zodiacSigns[houseIndex];
  };

  const getSignNumberForHouse = houseNumber => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return houseIndex + 1;
  };

  const organizePlanetsByHouse = () => {
    const houses = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: []
    };

    Object.entries(planets).forEach(([planetName, planetData]) => {
      if (planetName !== 'Ascendant') {
        const houseNumber = planetData.house_number;
        if (houses[houseNumber]) {
          houses[houseNumber].push({ name: planetName, data: planetData });
        }
      }
    });

    return houses;
  };

  const houses = organizePlanetsByHouse();

  const houseCoordinates = {
    1: { x: 150, y: 100 },
    2: { x: 80, y: 35 },
    3: { x: 40, y: 75 },
    4: { x: 85, y: 150 },
    5: { x: 35, y: 228 },
    6: { x: 80, y: 260 },
    7: { x: 150, y: 220 },
    8: { x: 223, y: 255 },
    9: { x: 265, y: 228 },
    10: { x: 215, y: 150 },
    11: { x: 265, y: 75 },
    12: { x: 220, y: 35 }
  };

  return (
    <div className='bg-gray-50 flex items-center justify-center py-10 px-5'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto p-4'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
          Lagna Chart (D1)
        </h2>
        <form className='space-y-4'>
          <div className='form-control w-full max-w-xs'>
            <label
              className='flex items-center gap-2 block text-sm font-medium text-gray-700'
              htmlFor='datetime'
            >
              <span className='label-text'>Date and Time:</span>
            </label>
            <input
              type='datetime-local'
              id='datetime'
              name='datetime'
              value={`${dateTime.year}-${String(dateTime.month).padStart(
                2,
                '0'
              )}-${String(dateTime.date).padStart(2, '0')}T${String(
                dateTime.hours
              ).padStart(2, '0')}:${String(dateTime.minutes).padStart(2, '0')}`}
              onChange={handleDateTimeChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <div className='form-control w-full max-w-xs'>
            <label
              className='flex items-center gap-2 block text-sm font-medium text-gray-700'
              htmlFor='latitude'
            >
              <span className='label-text'>Latitude:</span>
            </label>
            <input
              type='number'
              id='latitude'
              name='latitude'
              value={latitude}
              onChange={handleDateTimeChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>

          <div className='form-control w-full max-w-xs'>
            <label
              className='flex items-center gap-2 block text-sm font-medium text-gray-700'
              htmlFor='longitude'
            >
              <span className='label-text'>Longitude:</span>
            </label>
            <input
              type='number'
              id='longitude'
              name='longitude'
              value={longitude}
              onChange={handleDateTimeChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
          </div>
        </form>

        <div className='flex justify-center mt-8'>
          <svg
            width='350'
            height='350'
            viewBox='0 0 350 350'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='10'
              y='10'
              width='280'
              height='280'
              fill='none'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='150'
              y1='10'
              x2='290'
              y2='150'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='290'
              y1='150'
              x2='150'
              y2='290'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='150'
              y1='290'
              x2='10'
              y2='150'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='10'
              y1='150'
              x2='150'
              y2='10'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='10'
              y1='10'
              x2='290'
              y2='290'
              stroke='black'
              strokeWidth='1'
            />
            <line
              x1='290'
              y1='10'
              x2='10'
              y2='290'
              stroke='black'
              strokeWidth='1'
            />

            {Object.keys(houses).map(houseNumber => {
              const planetsInHouse = houses[houseNumber];
              const coords = houseCoordinates[houseNumber];
              const signForHouse = getSignForHouse(parseInt(houseNumber));
              const signNumberForHouse = getSignNumberForHouse(
                parseInt(houseNumber)
              );

              return (
                <g key={houseNumber}>
                  <text
                    x={coords.x}
                    y={coords.y}
                    textAnchor='middle'
                    className='text-md'
                  >
                     {signNumberForHouse}
                  </text>
                  {planetsInHouse.map((planet, index) => (
                    <text
                      key={planet.name}
                      x={coords.x}
                      y={coords.y + 20 + index * 15}
                      textAnchor='middle'
                      fill='black'
                      className='text-md'
                    >
                      {planet.name.slice(0, 2)}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Kundali;
*/


import React, { useState, useEffect } from 'react';

function Kundali() {
  const [planets, setPlanets] = useState(null);
  const [ascendantSign, setAscendantSign] = useState(null);
  const [dateTime, setDateTime] = useState({
    year: 2004,
    month: 12,
    date: 26,
    hours: 13,
    minutes: 12,
    seconds: 0,
  });
  const [latitude, setLatitude] = useState(28.5185347);
  const [longitude, setLongitude] = useState(77.1659952);

  const handleDateTimeChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'datetime') {
      const dateObj = new Date(value);
      setDateTime({
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        date: dateObj.getDate(),
        hours: dateObj.getHours(),
        minutes: dateObj.getMinutes(),
        seconds: dateObj.getSeconds(),
      });
    } else if (name === 'latitude') {
      setLatitude(parseFloat(value));
    } else if (name === 'longitude') {
      setLongitude(parseFloat(value));
    }
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(
          'https://json.apiastro.com/planets/extended',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'gsH9JZc46V6ReDRpCLQen6DJhw1gquqG3H7NIeeI',
            },
            body: JSON.stringify({
              year: dateTime.year,
              month: dateTime.month,
              date: dateTime.date,
              hours: dateTime.hours,
              minutes: dateTime.minutes,
              seconds: dateTime.seconds,
              latitude: latitude,
              longitude: longitude,
              timezone: 5.5,
              settings: {
                observation_point: 'topocentric',
                ayanamsha: 'lahiri',
                language: 'en',
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setPlanets(responseData.output);
        setAscendantSign(responseData.output.Ascendant.zodiac_sign_name);
        console.log('Planets data:', responseData.output);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [dateTime, latitude, longitude]);

  if (!planets) {
    return <p>Loading...</p>;
  }

  const zodiacSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  const getSignForHouse = (houseNumber) => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return zodiacSigns[houseIndex];
  };

  const getSignNumberForHouse = (houseNumber) => {
    const ascendantIndex = zodiacSigns.indexOf(ascendantSign);
    const houseIndex = (ascendantIndex + houseNumber - 1) % 12;
    return houseIndex + 1;
  };

  const organizePlanetsByHouse = () => {
    const houses = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    };

    Object.entries(planets).forEach(([planetName, planetData]) => {
      if (planetName !== 'Ascendant') {
        const houseNumber = planetData.house_number;
        if (houses[houseNumber]) {
          houses[houseNumber].push({ name: planetName, data: planetData });
        }
      }
    });

    return houses;
  };

  const houses = organizePlanetsByHouse();

  const houseCoordinates = {
    1: { x: 150, y: 100 },
    2: { x: 80, y: 35 },
    3: { x: 40, y: 75 },
    4: { x: 85, y: 150 },
    5: { x: 35, y: 228 },
    6: { x: 80, y: 260 },
    7: { x: 150, y: 220 },
    8: { x: 223, y: 255 },
    9: { x: 265, y: 228 },
    10: { x: 215, y: 150 },
    11: { x: 265, y: 75 },
    12: { x: 220, y: 35 },
  };

  // Prepare planet data for the table
  const planetData = Object.entries(planets).map(([planetName, planetDetails]) => ({
    name: planetName,
    sign: planetDetails.zodiac_sign_name,
    fullDegree: planetDetails.fullDegree,
    normDegree: planetDetails.normDegree,
    isRetro: planetDetails.isRetro,
    nakshatraName: planetDetails.nakshatra_name,
    nakshatraPada: planetDetails.nakshatra_pada,
  }));

  return (
    <div className="bg-gray-50 flex items-center justify-center py-10 px-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Lagna Chart (D1)
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date and Time */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="datetime"
              >
                Date and Time:
              </label>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                value={`${dateTime.year}-${String(dateTime.month).padStart(
                  2,
                  '0'
                )}-${String(dateTime.date).padStart(2, '0')}T${String(
                  dateTime.hours
                ).padStart(2, '0')}:${String(dateTime.minutes).padStart(
                  2,
                  '0'
                )}`}
                onChange={handleDateTimeChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Latitude */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="latitude"
              >
                Latitude:
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={handleDateTimeChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none"
              />
            </div>

            {/* Longitude */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="longitude"
              >
                Longitude:
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={handleDateTimeChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>
        </form>

        <div className="flex justify-center mt-8">
          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="10"
              width="280"
              height="280"
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="150"
              y1="10"
              x2="290"
              y2="150"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="290"
              y1="150"
              x2="150"
              y2="290"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="150"
              y1="290"
              x2="10"
              y2="150"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="10"
              y1="150"
              x2="150"
              y2="10"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="10"
              y1="10"
              x2="290"
              y2="290"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="290"
              y1="10"
              x2="10"
              y2="290"
              stroke="black"
              strokeWidth="1"
            />

            {Object.keys(houses).map((houseNumber) => {
              const planetsInHouse = houses[houseNumber];
              const coords = houseCoordinates[houseNumber];
              const signForHouse = getSignForHouse(parseInt(houseNumber));
              const signNumberForHouse = getSignNumberForHouse(
                parseInt(houseNumber)
              );

              return (
                <g key={houseNumber}>
                  <text
                    x={coords.x}
                    y={coords.y}
                    textAnchor="middle"
                    className="text-md"
                  >
                    {/*{signForHouse}*/} {signNumberForHouse}
                  </text>
                  {planetsInHouse.map((planet, index) => (
                    <text
                      key={planet.name}
                      x={coords.x}
                      y={coords.y + 20 + index * 15}
                      textAnchor="middle"
                      fill="black"
                      className="text-md"
                    >
                      {planet.name.slice(0, 2)}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Planet Data Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Planet Name
                </th>
                <th className="px-5 py-3 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sign
                </th>
                <th className="px-5 py-3 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Full Degree
                </th>
                <th className="px-5 py-3  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Norm Degree
                </th>
                <th className="px-5 py-3  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Retrograde
                </th>
                <th className="px-5 py-3 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nakshatra
                </th>
                <th className="px-5 py-3 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pada
                </th>
              </tr>
            </thead>
            <tbody>
              {planetData.map((planet) => (
                <tr key={planet.name}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.sign}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.fullDegree.toFixed(2)}°
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.normDegree.toFixed(2)}°
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   {planet.isRetro === "true" ? (
                        <>
                          <p className="text-green-500">✓</p>
                        </>
                      ) : (
                        <> 
                        <p className="text-red-500">X</p>
                        </>
                      )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.nakshatraName}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {planet.nakshatraPada}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Kundali;
