import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver'; // For saving the image
import { ArrowCounterClockwise, FileArrowDown, X, ShareNetwork } from 'phosphor-react';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import ScrollTop from './ScrollTop.jsx';
import { useTranslation } from 'react-i18next';

function Kundali() {
  const { t } = useTranslation();
  const [planets, setPlanets] = useState(null);
  const [ascendantSign, setAscendantSign] = useState(null);
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    };
  });
  const [latitude, setLatitude] = useState(28.5185347);
  const [longitude, setLongitude] = useState(77.1659952);
  const kundaliRef = useRef(null);

  const handleDateTimeChange = event => {
    const { target } = event;
    const { name, value } = target;

    let dateObj;

    if (name === 'datetime') {
      dateObj = new Date(value);
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
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [dateTime, latitude, longitude]);

  const downloadKundali = async () => {
    if (kundaliRef.current) {
      try {
        domtoimage.toBlob(kundaliRef.current).then(blob => {
          saveAs(blob, 'kundali_report.png');
        });
      } catch (error) {
        console.error('Error downloading Kundali:', error);
      }
    }
  };

  if (!planets) {
    return (
      <div className='bg-base-100 text-base-content gap-2 flex h-[60vh] items-center justify-center'>
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

  const generateMoonChartHouses = () => {
    const moon = planets ? planets.Moon : null;
    if (!moon) return null;

    const moonHouse = moon.house_number;
    const moonChartHouses = {
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
        let houseNumber = planetData.house_number - moonHouse + 1;
        houseNumber = houseNumber < 1 ? houseNumber + 12 : houseNumber;
        houseNumber = houseNumber % 12;
        houseNumber = houseNumber === 0 ? 12 : houseNumber;

        if (moonChartHouses[houseNumber]) {
          moonChartHouses[houseNumber].push({
            name: planetName,
            data: planetData
          });
        }
      }
    });

    return moonChartHouses;
  };

  const moonChartHouses = generateMoonChartHouses();

  const getMoonChartSignForHouse = houseNumber => {
    const moon = planets ? planets.Moon : null;
    if (!moon) return '';

    const moonSign = moon.zodiac_sign_name;
    const moonSignIndex = zodiacSigns.indexOf(moonSign);
    const houseIndex = (moonSignIndex + houseNumber - 1) % 12;
    return zodiacSigns[houseIndex];
  };

  const getMoonChartSignNumberForHouse = houseNumber => {
    const moon = planets ? planets.Moon : null;
    if (!moon) return '';

    const moonSign = moon.zodiac_sign_name;
    const moonSignIndex = zodiacSigns.indexOf(moonSign);
    const houseIndex = (moonSignIndex + houseNumber - 1) % 12;
    return houseIndex + 1;
  };

  const handleShare = async () => {
    if (kundaliRef.current) {
      try {
        domtoimage.toBlob(kundaliRef.current).then(blob => {
          if (navigator.share) {
            const file = new File([blob], 'kundali_report.png', {
              type: 'image/png'
            });

            navigator
              .share({
                files: [file],
                title: 'Kundali Report',
                text: 'Check out my Kundali report!'
              })
              .then(() => console.log('Shared successfully'))
              .catch(error => console.log('Error sharing', error));
          } else {
            // Fallback: Open in new tab or offer download
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }
        });
      } catch (error) {
        console.error('Error sharing Kundali:', error);
      }
    }
  };

  // Mapping of planet names to emojis
  const planetEmojis = {
    Sun: '☉',
    Moon: '☾',
    Mars: '♂',
    Mercury: '☿️',
    Jupiter: '♃',
    Venus: '♀',
    Saturn: '♄',
    Rahu: '☊',
    Ketu: '☋',
    Uranus: '⛢',
    Neptune: '♆',
    Pluto: '♇',
    Ascendant: '🔺'
  };

  return (
    <div className='bg-base-100 flex items-center justify-center text-base-content'>
      <ScrollTop />
      <div
        className='bg-base-100 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto'
        ref={kundaliRef}
      >
        <div className='breadcrumbs border rounded text-base-content px-4 text-sm'>
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
        <h2 className='text-2xl flex items-center justify-between font-semibold text-base-800 mb-6'>
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
            <div>
              <label
                className='block text-sm font-medium text-base-700'
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
                className='bg-base-100 text-base-content mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>
            <div>
              <label
                className='block text-sm font-medium text-base-700'
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
                className='bg-base-100 text-base-content mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>

            <div>
              <label
                className='block text-sm font-medium text-base-700'
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
                className='bg-base-100 text-base-content mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-red-500 focus:outline-none'
              />
            </div>
          </div>
        </form>

        <div className='justify-center items-center md:flex lg:flex xl:flex 2xl:flex'>
          <div className='flex flex-col items-center justify-center text-center mt-8'>
            <svg
              className='mb-[50px]'
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
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='150'
                y1='10'
                x2='290'
                y2='150'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='290'
                y1='150'
                x2='150'
                y2='290'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='150'
                y1='290'
                x2='10'
                y2='150'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='10'
                y1='150'
                x2='150'
                y2='10'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='10'
                y1='10'
                x2='290'
                y2='290'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='290'
                y1='10'
                x2='10'
                y2='290'
                stroke='#000'
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
                      {signNumberForHouse}
                    </text>
                    {planetsInHouse.map((planet, index) => (
                      <text
                        key={planet.name}
                        x={coords.x}
                        y={coords.y + 20 + index * 15}
                        textAnchor='middle'
                        fill='black'
                        className='text-lg z-10 font-bold'
                      >
                        {t(`planets.${planet.name.slice(0, 2)}`)}
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
                {t('(D1) Generated by SriPatro')}
              </text>
            </svg>
            <img
              src='/watermark.png'
              className='z-2 mt-[-390px] ml-[-70px] w-[280px] opacity-[.4]'
            />
          </div>

          <div className='flex flex-col items-center justify-center text-center mt-8'>
            <svg
              className='mb-[50px]'
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
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='150'
                y1='10'
                x2='290'
                y2='150'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='290'
                y1='150'
                x2='150'
                y2='290'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='150'
                y1='290'
                x2='10'
                y2='150'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='10'
                y1='150'
                x2='150'
                y2='10'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='10'
                y1='10'
                x2='290'
                y2='290'
                stroke='#000'
                strokeWidth='1'
              />
              <line
                x1='290'
                y1='10'
                x2='10'
                y2='290'
                stroke='#000'
                strokeWidth='1'
              />
              {moonChartHouses &&
                Object.keys(moonChartHouses).map(houseNumber => {
                  const planetsInHouse = moonChartHouses[houseNumber];
                  const coords = houseCoordinates[houseNumber];
                  const signForHouse = getMoonChartSignForHouse(
                    parseInt(houseNumber)
                  );
                  const signNumberForHouse = getMoonChartSignNumberForHouse(
                    parseInt(houseNumber)
                  );

                  return (
                    <g key={`moon-${houseNumber}`}>
                      <text
                        x={coords.x}
                        y={coords.y}
                        textAnchor='middle'
                        fill='#333'
                        className='text-xs z-20'
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
                          className='text-lg z-20 font-bold'
                        >
                          {/* {planet.name.slice(0, 2)} */}{' '}
                          {t(`planets.${planet.name.slice(0, 2)}`)}
                        </text>
                      ))}
                    </g>
                  );
                })}

              <text
                x='25'
                y='310'
                fill='#666'
              >
                {t('(MoonChart) Generated by SriPatro')}
              </text>
            </svg>
             <img
              src='/watermark.png'
              className='z-2 mt-[-390px] ml-[-70px] w-[280px] opacity-[.4]'
            /> 
          </div>
        </div>

        <div className='mt-12 flex justify-center'>
          <button
            onClick={handleShare}
            className='btn flex items-center justify-center gap-1 bg-red-600 px-3 py-2 rounded '
          >
            <ShareNetwork
              size={21}
              className='cursor-pointer text-white'
            />
            <span className='text-white'> Share Report</span>
          </button>
        </div>

        <div className='mt-8 overflow-x-auto'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='p-2 bg-red-700 text-white text-left text-xs font-semibold text-base-600 uppercase tracking-wider'>
                 {t('Planet Name (Retro)')}
                </th>
                <th className='p-2 bg-red-700 text-white text-left text-xs font-semibold text-base-600 uppercase tracking-wider'>
                 {t('Full Degree')}
                </th>
                <th className='p-2 bg-red-700 text-white text-left text-xs font-semibold text-base-600 uppercase tracking-wider'>
                  {t("Norm Degree")}
                </th>
                <th className='p-2 bg-red-700 text-white text-left text-xs font-semibold text-base-600 uppercase tracking-wider'>
                  {t("Sign")}
                </th>
                <th className='p-2 bg-red-700 text-white text-left text-xs font-semibold text-base-600 uppercase tracking-wider'>
                  {t("Nakshatra (Pada)")}
                </th>
              </tr>
            </thead>
            <tbody>
              {planetData.map(planet => (
                <tr key={planet.name}>
                  <td className='flex items-center gap-2 p-2 border-b border-gray-200 bg-base-100 text-sm'>
                    <span>{planetEmojis[planet.name] || ''} {t(`planetFull.${planet.name}`)}</span>{' '}
                    {planet.isRetro === 'true' ? (
                      <>
                        <span
                          className='tooltip text-red-800'
                          data-tip={t('Retrograde')}
                        >
                          <ArrowCounterClockwise
                            size={15}
                            weight='bold'
                          />
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-base-100 text-sm'>
                    {planet.fullDegree.toFixed(2)}°
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-base-100 text-sm'>
                    {planet.normDegree.toFixed(2)}°
                  </td>
                  <td className='p-2 border-b border-gray-200 bg-base-100 text-sm'>
                    {t(`rasi.${planet.sign}`)}
                  </td>
                  <td className='flex items-center gap-2 p-2 border-b border-gray-200 bg-base-100 text-sm'>
                    <span>{t(`nakshatra.${planet.nakshatraName}`)}</span>
                    <span
                      className='tooltip'
                      data-tip={t('Pada')}
                    >
                      ({planet.nakshatraPada})
                    </span>
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
