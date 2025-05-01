/*import { useEffect, useState } from 'react';
import ScrollTop from './ScrollTop.jsx';

function HoroscopeWeekly() {
  const [day, setDay] = useState('today');
  const [horoscopeData, setHoroscopeData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(null);

  const zodiacSigns = [
    { sign: 'aries', emoji: '🐏' },
    { sign: 'taurus', emoji: '🐂' },
    { sign: 'gemini', emoji: '👬' },
    { sign: 'cancer', emoji: '🦀' },
    { sign: 'leo', emoji: '🦁' },
    { sign: 'virgo', emoji: '🧚' },
    { sign: 'libra', emoji: '⚖️' },
    { sign: 'scorpio', emoji: '🦂' },
    { sign: 'sagittarius', emoji: '🐎' },
    { sign: 'capricorn', emoji: '🐐' },
    { sign: 'aquarius', emoji: '💧' },
    { sign: 'pisces', emoji: '🐟' }
  ];

  const fetchHoroscopes = async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        zodiacSigns.map(({ sign }) =>
          fetch('https://sripatro-server.vercel.app/get-horoscope-weekly', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sign, day })
          }).then(res => res.json().then(data => ({ sign, data })))
        )
      );

      const updatedHoroscopeData = responses.reduce((acc, { sign, data }) => {
        acc[sign] = data;
        return acc;
      }, {});

      setHoroscopeData(updatedHoroscopeData);
    } catch (err) {
      console.error('Error fetching horoscope:', err);
      setError('Failed to fetch horoscope.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscopes();
  }, [day]);

  const toggleExpand = (sign) => {
    setExpanded(prev => ({ ...prev, [sign]: !prev[sign] }));
  };

  const toggleSpeech = (sign, text) => {
    if (speaking === sign) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(null);
      window.speechSynthesis.speak(utterance);
      setSpeaking(sign);
    }
  };

  return (
    <div className='bg-gray-50 flex items-center justify-center py-10 px-5'>
      <div className='bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto'>

        {error && <p className='text-red-600 text-center'>{error}</p>}

        {loading ? (
          <div className='flex justify-center my-10'>
            <span className='loading loading-spinner loading-lg text-black'></span>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {zodiacSigns.map(({ sign, emoji }) =>
              horoscopeData[sign] ? (
                <div key={sign} className='p-4 bg-gray-100 rounded-lg shadow'>
                  <div className='flex items-center gap-2'>
                    <h2 className='text-5xl font-bold'>{emoji}</h2>
                    <h2 className='text-2xl font-bold capitalize text-gray-900'>{sign}</h2>
                  </div>
                  <span className='text-xs text-gray-500'>{horoscopeData[sign].data.week}</span>
                  <p className='text-sm text-gray-700'>
                    {expanded[sign] ? horoscopeData[sign].data.horoscope_data : horoscopeData[sign].data.horoscope_data.substring(0, 100) + '...'}
                  </p>
                  <button
                    onClick={() => toggleExpand(sign)}
                    className='text-blue-500 underline text-sm mt-2'
                  >
                    {expanded[sign] ? 'Show Less' : 'Read More'}
                  </button>
                  <button
                    onClick={() => toggleSpeech(sign, horoscopeData[sign].data.horoscope_data)}
                    className='ml-4 text-green-600 underline text-sm'
                  >
                    {speaking === sign ?  (
                        <p className='bg-blue-600 rounded-full p-2'>
                          <Pause
                            size={21}
                            weight='bold'
                            className='text-white'
                          />
                        </p>
                      ) : (
                        <p className='bg-blue-600 rounded-full p-2'>
                          <Play
                            size={21}
                            weight='bold'
                            className='text-white'
                          />
                        </p>
                      )}
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
}

export default HoroscopeWeekly;
*/

import { useEffect, useState } from "react";
import { Play, Pause } from "phosphor-react"; // Import icons
import ScrollTop from "./ScrollTop.jsx";

function HoroscopeWeekly() {
  const [day, setDay] = useState("today");
  const [horoscopeData, setHoroscopeData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(null);

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
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        zodiacSigns.map(({ sign }) =>
          fetch("https://sripatro-server.vercel.app/get-horoscope-weekly", {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoroscopes();
  }, [day]);

  const toggleExpand = (sign) => {
    setExpanded((prev) => ({ ...prev, [sign]: !prev[sign] }));
  };

  const toggleSpeech = (sign, text) => {
    if (speaking === sign) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(null);
      window.speechSynthesis.speak(utterance);
      setSpeaking(sign);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center ">
      <div className="min-h-screen bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner loading-lg text-black"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zodiacSigns.map(({ sign, emoji }) =>
              horoscopeData[sign] ? (
                <div key={sign} className="p-4 bg-gray-100 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-5xl font-bold">{emoji}</h2>
                      <h2 className="text-2xl font-bold capitalize text-gray-900">
                        {sign}
                      </h2>
                    </div>
                    <button
                      onClick={() =>
                        toggleSpeech(
                          sign,
                          horoscopeData[sign].data.horoscope_data
                        )
                      }
                      className="ml-4 text-green-600 text-sm p-2 bg-red-600 rounded-full"
                    >
                      {speaking === sign ? (
                        <Pause size={21} color="white" />
                      ) : (
                        <Play size={21} color="white" />
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {horoscopeData[sign].data.week}
                  </span>
                  <p className="text-sm text-gray-700">
                    {expanded[sign]
                      ? horoscopeData[sign].data.horoscope_data
                      : horoscopeData[sign].data.horoscope_data.substring(
                          0,
                          180
                        ) + "..."}
                  </p>
                  <button
                    onClick={() => toggleExpand(sign)}
                    className="text-blue-500 underline text-sm mt-2"
                  >
                    {expanded[sign] ? "Show Less" : "Read More"}
                  </button>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
}

export default HoroscopeWeekly;
