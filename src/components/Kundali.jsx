import {
  Check,
  FileArrowDown,
  X,
  WhatsappLogo,
  TelegramLogo,
  TwitterLogo,
  LinkedinLogo,
  MessengerLogo,
  FacebookLogo,
  InstagramLogo,
  SnapchatLogo
} from 'phosphor-react';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import ScrollTop from './ScrollTop.jsx';

function Kundali() {
  const [planets, setPlanets] = useState(null);
  const [ascendantSign, setAscendantSign] = useState(null);
  const [dateTime, setDateTime] = useState({
    year: 2025,
    month: 1,
    date: 1,
    hours: 13,
    minutes: 12,
    seconds: 0
  });
  const [latitude, setLatitude] = useState(28.5185347);
  const [longitude, setLongitude] = useState(77.1659952);
  const kundaliRef = useRef(null);

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
              'x-api-key': 'F7YFnQl2777f8cHUFguUZ2rUEF9R4Fal1zr8kH27'
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
        // console.log('Planets data:', responseData.output);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [dateTime, latitude, longitude]);

  const downloadKundali = () => {
    if (kundaliRef.current) {
      html2canvas(kundaliRef.current, {
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'kundali_report.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  const shareKundali = async platform => {
    if (kundaliRef.current) {
      try {
        const canvas = await html2canvas(kundaliRef.current, {
          useCORS: true,
          scrollX: 0,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
        });
        const imageURL = canvas.toDataURL('image/png');

        // Convert the data URL to a Blob
        const blob = await (await fetch(imageURL)).blob();
        const file = new File([blob], 'kundali_report.png', {
          type: 'image/png'
        });

        let shareURL = '';
        const text = encodeURIComponent('Check out my Kundali report!');

        switch (platform) {
          case 'whatsapp':
            shareURL = `https://wa.me/?text=${text}`;
            break;
          case 'telegram':
            shareURL = `https://t.me/share/url?text=${text}`;
            break;
          case 'twitter':
            shareURL = `https://twitter.com/intent/tweet?text=${text}`;
            break;
          default:
            console.error('Invalid platform');
            return;
        }

        if (navigator.share) {
          try {
            await navigator.share({
              files: [file],
              title: 'Kundali Report',
              text: 'Check out my Kundali report!'
            });
            console.log('Shared successfully');
          } catch (error) {
            console.log('Error sharing:', error);
            // Fallback to regular URL sharing for Telegram and Twitter
            if (platform === 'telegram' || platform === 'twitter') {
              window.open(shareURL, '_blank');
            }
          }
        } else {
          // Fallback to regular URL sharing for all platforms
          window.open(shareURL, '_blank');
        }
      } catch (error) {
        console.error('Error sharing Kundali:', error);
      }
    }
  };

  if (!planets) {
    return (
      <div className='bg-white text-black gap-2  flex h-[60vh] items-center justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
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

  // Prepare planet data for the table
  const planetData = Object.entries(planets).map(
    ([planetName, planetDetails]) => ({
      name: planetName,
      sign: planetDetails.zodiac_sign_name,
      fullDegree: planetDetails.fullDegree,
      normDegree: planetDetails.normDegree,
      isRetro: planetDetails.isRetro,
      nakshatraName: planetDetails.nakshatra_name,
      nakshatraPada: planetDetails.nakshatra_pada
    })
  );

  return (
    <div className='bg-gray-50 flex items-center justify-center py-10 px-5'>
      <ScrollTop />
      <div
        className='bg-white border border-t-red-500 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto'
        ref={kundaliRef}
      >
        <div className='breadcrumbs border rounded text-black px-4 text-sm'>
          <ul>
            <li>
              <a
                href='/'
                className='hover:underline'
              >
                Home
              </a>
            </li>
            <li>Kundali Report</li>
          </ul>
        </div>
        <h2 className='text-2xl flex items-center justify-between font-semibold text-gray-800 mb-6'>
          <span> Lagna Kundali Chart (D1) </span>
          <button
            className='mt-4 bg-red-600 hover:bg-red-700 text-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-evenly gap-2'
            type='button'
            onClick={downloadKundali}
          >
            <FileArrowDown
              size={22}
              weight='bold'
            />
            <span className='text-[17px]'>Download</span>
          </button>
        </h2>
        <form className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Date and Time */}
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='datetime'
              >
                Date and Time:
              </label>
              <input
                required
                type='datetime-local'
                id='datetime'
                name='datetime'
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
                className='bg-white text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>
            {/* Latitude */}
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='latitude'
              >
                Latitude:
              </label>
              <input
                required
                type='number'
                id='latitude'
                name='latitude'
                value={latitude}
                onChange={handleDateTimeChange}
                className='bg-white text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>

            {/* Longitude */}
            <div>
              <label
                className='block text-sm font-medium text-gray-700'
                htmlFor='longitude'
              >
                Longitude:
              </label>
              <input
                required
                type='number'
                id='longitude'
                name='longitude'
                value={longitude}
                onChange={handleDateTimeChange}
                className='bg-white text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>
          </div>
        </form>

        <div className='flex flex-col items-center justify-center text-center mt-8'>
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
                    fill='#333'
                    className='text-xs'
                  >
                    {/*{signForHouse}*/} {signNumberForHouse}
                  </text>
                  {planetsInHouse.map((planet, index) => (
                    <text
                      key={planet.name}
                      x={coords.x}
                      y={coords.y + 20 + index * 15}
                      textAnchor='middle'
                      fill='black'
                      className='text-lg'
                    >
                      {planet.name.slice(0, 2)}
                    </text>
                  ))}
                </g>
              );
            })}
            <text
              x='70'
              y='310'
              fill='#666'
            >
              Generated by SriPatro
            </text>
          </svg>
        </div>
        {/* Share Buttons */}
        <div className='mt-4 flex gap-3 justify-center border border-zinc-600 rounded p-2 '>
          <WhatsappLogo
            size={32}
            className='cursor-pointer text-green-500'
            onClick={() => shareKundali('whatsapp')}
          />
          <TelegramLogo
            size={32}
            className='cursor-pointer text-blue-500'
            onClick={() => shareKundali('telegram')}
          />
          <TwitterLogo
            size={32}
            className='cursor-pointer text-blue-400'
            onClick={() => shareKundali('twitter')}
          />

          <LinkedinLogo
            size={32}
            className='cursor-pointer text-blue-600'
            onClick={() => shareKundali('twitter')}
          />

          <MessengerLogo
            size={32}
            className='cursor-pointer text-indigo-600'
            onClick={() => shareKundali('twitter')}
          />
          <FacebookLogo
            size={32}
            className='cursor-pointer text-blue-700'
            onClick={() => shareKundali('twitter')}
          />
          <InstagramLogo
            size={32}
            className='cursor-pointer text-fuchsia-400'
            onClick={() => shareKundali('twitter')}
          />
          <SnapchatLogo
            size={32}
            className='cursor-pointer text-yellow-400'
            onClick={() => shareKundali('twitter')}
          />
        </div>

        {/* Planet Data Table */}
        <div className='mt-8 overflow-x-auto'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='p-2  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Planet Name
                </th>
                <th className='p-2 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Sign
                </th>
                <th className='p-2 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Full Degree
                </th>
                <th className='p-2  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Norm Degree
                </th>
                <th className='p-2  bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Retro grade
                </th>
                <th className='p-2 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Nakshatra
                </th>
                <th className='p-2 bg-red-500 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Pada
                </th>
              </tr>
            </thead>
            <tbody>
              {planetData.map(planet => (
                <tr key={planet.name}>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.name}
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.sign}
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.fullDegree.toFixed(2)}°
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.normDegree.toFixed(2)}°
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.isRetro === 'true' ? (
                      <>
                        <p className='text-green-500'>
                          <Check
                            size={21}
                            weight='bold'
                          />
                        </p>
                      </>
                    ) : (
                      <>
                        <p className='text-red-600'>
                          <X
                            size={21}
                            weight='bold'
                          />
                        </p>
                      </>
                    )}
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
                    {planet.nakshatraName}
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-white text-sm'>
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
