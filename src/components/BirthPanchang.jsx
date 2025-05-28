import { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';
import {
  Alarm,
  Swap,
  Calendar,
  CaretLeft,
  ArrowSquareOut
} from 'phosphor-react';
import nakshatraData from './nakshatraData.json'; // Import the Nakshatra data
import ScrollTop from './ScrollTop.jsx';
import { useTranslation } from 'react-i18next';
import NepaliDate from 'nepali-date-converter';

const BS_MONTHS_NEPALI = [
  'बैशाख',
  'जेठ',
  'असार',
  'साउन',
  'भदौ',
  'असोज',
  'कार्तिक',
  'मंसिर',
  'पुष',
  'माघ',
  'फागुन',
  'चैत्र'
];

const BirthPanchang = () => {
  const { t } = useTranslation();
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
  const [sunData, setSunData] = useState(null); // <-- Add state for sunrise/sunset

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
      console.log('log');
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

  // Fetch sunrise/sunset when dob changes
  useEffect(() => {
    if (!dob) return;
    const fetchSunDetails = async () => {
      try {
        // Format date as YYYY-MM-DD
        const dateParam = dob;
        const response = await fetch(
          `https://api.sunrisesunset.io/json?lat=28.7041&lng=77.1025&date=${dateParam}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setSunData(data.results);
      } catch (e) {
        setSunData(null);
      }
    };
    fetchSunDetails();
  }, [dob]);

  return (
    <div className='bg-base-100 text-base-content flex items-center justify-center'>
      <div className='bg-base-200 shadow-lg rounded-lg p-6 w-full max-w-3xl'>
        <a
          href='/date-converter'
          className='hover:underline'
        >
          <div className='breadcrumbs border rounded   px-4 text-sm hover:bg-base-200'>
            <ul>
              <li className='hover:border'>
                <CaretLeft size={19} />{' '}
                <span className='ml-2'>{t('Back')}</span>
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
          {t('Ishwi Sambat to Panchang')}
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div>
            <label
              htmlFor='dob'
              className='flex items-center gap-2 block text-sm font-medium text-base-700'
            >
              <Calendar size={18} />
              <span>{t('Date of Birth')}</span>
            </label>
            <input
              id='dob'
              type='date'
              value={dob}
              onChange={e => setDob(e.target.value)}
              required
              className=' bg-base-200 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
            <span className='text-xs text-base-400'>
              {t('your date of birth in yyyy-mm-dd format')}
            </span>
          </div>

          <div>
            <label
              htmlFor='time'
              className='flex items-center gap-2 block text-sm font-medium text-base-600'
            >
              <Alarm size={18} />
              <span>{t('Time of Birth')}</span>
            </label>
            <input
              id='time'
              type='time'
              value={time}
              onChange={e => setTime(e.target.value)}
              required
              className=' bg-base-200 mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none'
            />
            <span className='text-xs text-base-400'>
              {t('your time of birth hh:mm in 24hrs format')}
            </span>
          </div>

          <button
            type='submit'
            className='btn text-[17px] font-bold w-full bg-red-700 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 transition'
          >
            {t('Get Panchang')}
          </button>
        </form>

        {panchang ? (
          <>
            {/* Extra Info Card */}
            <div className="w-70 mb-4 bg-base-100 rounded overflow-x-auto">
              <div className="flex justify-between border border-base-800 p-1 rounded gap-1">
                <div className="pt-2 pl-2">
                  <h2 className="text-sm font-bold text-base-800">
                    {t(`day.${panchang?.Day?.name_en_UK}`)}
                    {dob ? `, ${dob}` : ''}
                  </h2>
                  <p className="text-base-600 text-sm font-bold">
                    {time ? `${time}` : ''}
                  </p>
                  {/*<p className="text-base-800 text-sm font-bold">
                    {panchang && new Date(dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>*/}
                  {/* Show AD to BS conversion */}
                  {dob && (() => {
                    try {
                      const adDate = new Date(dob);
                      const bsDate = NepaliDate.fromAD(adDate);
                      const bsYear = bsDate.getYear();
                      const bsMonth = bsDate.getMonth();
                      const bsDay = bsDate.getDate();
                      return (
                        <span className="text-base-600 text-md font-semibold">
                          {bsYear} {BS_MONTHS_NEPALI[bsMonth]} {bsDay}
                        </span>
                      );
                    } catch {
                      return null;
                    }
                  })()}
                </div>
                <div className='flex flex-col items-end justify-between'>
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
                  )}
                </div>
              </div>
            </div>
            {/* End Extra Info Card */}
            <div className='mt-6 bg-base-200 p-1 rounded-lg overflow-x-auto'>
              {/*<h3 className='text-lg font-semibold underline text-base-800 mb-4'>
                {t('Birth Panchang Details')}
              </h3>*/}
              <table className='table w-full  bg-base-200 text-base-content '>
                <tbody>
                  <tr className='text-base-content'>
                    <th>{t('Day')}</th>
                    <td>
                      {t(`day.${panchang?.Day?.name_en_UK}`) || 'Not Available'}
                    </td>
                    {/*  <td>{panchang?.Day?.name_en_UK || 'Not Available'}</td>*/}
                  </tr>

                  <tr className='text-base-content'>
                    <th>{t('Paksh')}</th>
                    <td>
                      {t(`paksha.${panchang?.Paksha?.name_en_IN}`) ||
                        'Not Available'}
                    </td>
                  </tr>

                  <tr className='text-base-content'>
                    <th>{t('Tithi')}</th>
                    <td className='flex gap-2 items-start border-none'>
                      <div className='bg-zinc-200 rounded-full p-[.5px]'>
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
                      </div>
                      <p>
                        {t(`tithi.${panchang?.Tithi?.name_en_IN}`) ||
                          'Not Available'}
                      </p>
                    </td>
                  </tr>

                  <tr className='text-base-content'>
                    <th>{t('Nakshatra')}</th>
                    <td>
                      {t(`nakshatra.${panchang?.Nakshatra?.name_en_IN}`) ||
                        'Not Available'}
                    </td>
                  </tr>
                  <tr className='text-base-content'>
                    <th>{t('Rasi')}</th>
                    <td>
                      {t(`rasi.${panchang?.Raasi?.name_en_UK}`) ||
                        'Not Available'}
                    </td>
                  </tr>
                  {nakshatraInfo && (
                    <>
                      <tr className='text-base-content'>
                        <th>{t('Syllables')}</th>
                        <td>
                          {t(`syllables.${nakshatraInfo['first syllables']}`) ||
                            'Not Available'}
                        </td>
                      </tr>
                      <tr className='text-base-content'>
                        <th>{t('Gan')}</th>
                        <td>
                          {t(`ganam.${nakshatraInfo.ganam}`) || 'Not Available'}
                        </td>
                      </tr>
                      <tr className='text-base-content'>
                        <th>{t('Animal Sign')}</th>
                        <td>
                          {t(`animal.${nakshatraInfo['animal sign']}`) ||
                            'Not Available'}
                        </td>
                      </tr>
                      <tr className='text-base-content'>
                        <th>{t('Deity')}</th>
                        <td>
                          {t(`deity.${nakshatraInfo.Diety}`) || 'Not Available'}
                        </td>
                      </tr>
                      <tr className='text-base-content'>
                        <th>{t('Best Direction')}</th>
                        <td>
                          {t(
                            `best_direction.${nakshatraInfo['best direction']}`
                          ) || 'Not Available'}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr className='text-base-content'>
                    <th>{t('Yoga')}</th>
                    <td>
                      {t(`yoga.${panchang?.Yoga?.name_en_IN}`) || 'Not Available'}
                    </td>
                  </tr>
                  <tr className='text-base-content'>
                    <th>{t('Karna')}</th>
                    <td>
                      {t(`karna.${panchang?.Karna?.name_en_IN}`) ||
                        'Not Available'}
                    </td>
                  </tr>
                  <tr className='text-base-content'>
                    <th>{t('Sunrise')}</th>
                    <td>{t('timePeriod.Morning')} {" "}{sunData?.sunrise || 'Unknown'}</td>
                  </tr>
                  <tr className='text-base-content'>
                    <th>{t('Sunset')}</th>
                    <td>{t('timePeriod.Evening')} {" "}{sunData?.sunset || 'Unknown'}</td>
                  </tr>
                  {age && (
                    <tr className='text-base-content'>
                      <th>{t('Age')}</th>
                      <td>
                        {age.years} {t('years and')} {age.months} {t('months')}
                      </td>
                    </tr>
                  )}
                  
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='mt-6 bg-base-100 p-4 rounded-lg text-base-600 text-sm'>
            {t('Enter your details to get your birth Panchang.')}
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
};

export default BirthPanchang;
