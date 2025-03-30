/*
import { useEffect, useState } from 'react';
import { WhatsappLogo, TelegramLogo, TwitterLogo } from 'phosphor-react';
import ScrollTop from './ScrollTop.jsx';

function HoroscopeForm() {
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('today');
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState(null);

  const fetchHoroscope = async () => {
    setError(null); // Clear previous errors
    try {
      const response = await fetch('http://localhost:5000/get-horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sign: sign, day: day })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log(data); // Log the API response
      setHoroscope(data);
    } catch (err) {
      console.error('Error fetching horoscope:', err);
      setError(err.message || 'Failed to fetch horoscope.');
      setHoroscope(null);
    }
  };

  const handleSubmit = event => {
    event.preventDefault(); // Prevent the form from refreshing the page
    fetchHoroscope(); // Call fetchHoroscope instead of duplicating the logic
  };

  useEffect(() => {
    if (sign && day) {
      // Only call if sign and day are not empty
      fetchHoroscope();
    }
  }, [sign, day]);

  const getShareText = () => {
    if (!horoscope) return '';
    return encodeURIComponent(
      `Prediction for ${sign} for ${day}\n` +
        `${horoscope.data.date}\n` +
        `${horoscope.data.horoscope_data}`
    );
  };

  const shareToWhatsApp = () => {
    const shareText = getShareText();
    if (shareText) {
      window.open(`https://wa.me/?text=${shareText}`, '_blank');
    }
  };

  const shareToTelegram = () => {
    const shareText = getShareText();
    if (shareText) {
      window.open(`https://t.me/share/url?text=${shareText}`, '_blank');
    }
  };

  const shareToTwitter = () => {
    const shareText = getShareText();
    if (shareText) {
      window.open(
        `https://twitter.com/intent/tweet?text=${shareText}`,
        '_blank'
      );
    }
  };

  return (
    <div className='bg-gray-50 flex items-center justify-center py-10 px-5'>
      <div className='bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto'>
        <h3 className='text-2xl font-semibold text-gray-800 mb-6 underline'>
          Daily Horoscope
        </h3>
        <form onSubmit={handleSubmit}>
          <label className='flex items-center gap-2 block text-sm font-medium text-gray-700'>
            <span>Sign: </span>
            <select
              value={sign}
              onChange={e => setSign(e.target.value)}
              className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
            >
              <option value=''>Select Sign</option>
              <option value='aries'>Aries</option>
              <option value='taurus'>Taurus</option>
              <option value='gemini'>Gemini</option>
              <option value='cancer'>Cancer</option>
              <option value='leo'>Leo</option>
              <option value='virgo'>Virgo</option>
              <option value='libra'>Libra</option>
              <option value='scorpio'>Scorpio</option>
              <option value='sagittarius'>Sagittarius</option>
              <option value='capricorn'>Capricorn</option>
              <option value='aquarius'>Aquarius</option>
              <option value='pisces'>Pisces</option>
            </select>
          </label>
          <br />
          <label className='flex items-center gap-2 block text-sm font-medium text-gray-700'>
            Day:
            <select
              className='bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500'
              value={day}
              onChange={e => setDay(e.target.value)}
            >
              <option value='yesterday'>Yesterday</option>
              <option
                value='today'
                selected
              >
                Today
              </option>
              <option value='tomorrow'>Tomorrow</option>
            </select>
          </label>
          <br />
        </form>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {horoscope && (
          <div>
            <h2 className='text-lg text-black'>
              Horoscope of {sign} for {day}
            </h2>
            <span className='text-xs text-gray-500'>{horoscope.data.date}</span>
            <p className='text-justify text-sm text-gray-600 bg-gray-100 p-3 rounded'>
              {horoscope.data.horoscope_data}
            </p>

          
            <div className='mt-4 text-right flex gap-3 justify-between items-center bg-gray-100 rounded p-1.5'>
              <h3 className='font-bold text-gray-700 flex-[0.2]'>
                Share Pridiction
              </h3>
              <div className='flex items-center justify-around flex-[0.8]'>
                <WhatsappLogo
                  size={30}
                  className='cursor-pointer text-green-500'
                  onClick={shareToWhatsApp}
                />

                <TelegramLogo
                  size={30}
                  className='cursor-pointer text-red-500'
                  onClick={shareToTelegram}
                />
                <TwitterLogo
                  size={30}
                  className='cursor-pointer text-red-400'
                  onClick={shareToTwitter}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
}

export default HoroscopeForm;
*/

import { useEffect, useState } from "react";
import ScrollTop from "./ScrollTop.jsx";

function HoroscopeForm() {
  const [day, setDay] = useState("today");
  const [horoscopeData, setHoroscopeData] = useState({});
  const [error, setError] = useState(null);

  const zodiacSigns = [
    { sign: "aries", emoji: "🐏" },
    { sign: "taurus", emoji: "🐂" },
    { sign: "gemini", emoji: "👬" },
    { sign: "cancer", emoji: "🦀" },
    { sign: "leo", emoji: "🦁" },
    { sign: "virgo", emoji: "🧚" },
    { sign: "libra", emoji: "⚖️" },
    { sign: "scorpio", emoji: "🦂" },
    { sign: "sagittarius", emoji: "🐎" },
    { sign: "capricorn", emoji: "🐐" },
    { sign: "aquarius", emoji: "💧" },
    { sign: "pisces", emoji: "🐟" },
  ];

  const fetchHoroscopes = async () => {
    setError(null);
    try {
      const responses = await Promise.all(
        zodiacSigns.map(({ sign }) =>
          fetch("https://sripatro-server-1.onrender.com/get-horoscope", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sign, day }),
          }).then((res) => res.json().then((data) => ({ sign, data })))
        )
      );

      const updatedHoroscopeData = responses.reduce((acc, { sign, data }) => {
        acc[sign] = data;
        return acc;
      }, {});

      setHoroscopeData(updatedHoroscopeData);
    } catch (err) {
      console.error("Error fetching horoscope:", err);
      setError("Failed to fetch horoscope.");
    }
  };

  useEffect(() => {
    fetchHoroscopes();
  }, [day]);

  return (
    <div className="bg-gray-50 flex items-center justify-center py-10 px-5">
      <div className="bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 underline">
          Daily Horoscope for All Signs
        </h3>

        <label className="block text-sm font-medium text-gray-700 mb-4">
          <select
            className="bg-white text-black w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="yesterday">Yesterday</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
          </select>
        </label>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zodiacSigns.map(({ sign, emoji }) =>
            horoscopeData[sign] ? (
              <div key={sign} className="p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex ">
                  <h2 className="text-5xl font-bold text-gray-900 capitalize">
                    {emoji}
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {sign}
                  </h2>
                </div>
                <span className="text-xs text-gray-500">
                  {horoscopeData[sign].data.date}
                </span>
                <p className="text-sm text-gray-700">
                  {horoscopeData[sign].data.horoscope_data}
                </p>
              </div>
            ) : null
          )}
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default HoroscopeForm;
