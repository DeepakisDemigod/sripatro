/*
 *
 * import { useEffect, useState } from "react";
import { Play, Pause } from "phosphor-react";
import { useSpeech } from "react-text-to-speech";

function HoroscopeTile() {
  const [day, setDay] = useState("today");
  const [horoscopeData, setHoroscopeData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSign, setActiveSign] = useState(null);

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
          fetch("https://sripatro-server.vercel.app/get-horoscope/", {
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

  const { Text, speechStatus, start, pause } = useSpeech({
    text: horoscopeData[activeSign]?.data?.horoscope_data || "",
    pitch: 1,
    rate: 1,
    volume: 1,
    lang: "en_GB",
    voiceURI: "Hindi India",
    autoPlay: false,
    highlightText: false,
  });

  const toggleSpeech = (sign) => {
    if (activeSign === sign && speechStatus === "started") {
      pause();
    } else {
      setActiveSign(sign);
      start();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="min-h-screen bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 underline">
          Daily Horoscope for All Signs
        </h3>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner loading-lg text-black"></span>
          </div>
        ) : (
          <div className="carousel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zodiacSigns.map(({ sign, emoji }) =>
              horoscopeData[sign] ? (
                <div
                  key={sign}
                  className="carousel-item p-4 bg-gray-100 rounded-lg shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <h2 className="text-5xl font-bold">{emoji}</h2>
                      <h2 className="text-2xl font-bold capitalize text-gray-900">
                        {sign}
                      </h2>
                    </div>
                    <button onClick={() => toggleSpeech(sign)}>
                      {activeSign === sign && speechStatus === "started" ? (
                        <p className="bg-red-600 rounded-full p-2">
                          <Pause
                            size={21}
                            weight="bold"
                            className="text-white"
                          />
                        </p>
                      ) : (
                        <p className="bg-red-600 rounded-full p-2">
                          <Play
                            size={21}
                            weight="bold"
                            className="text-white"
                          />
                        </p>
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {horoscopeData[sign].data.week}
                  </span>
                  <p className="text-sm text-gray-700">
                    {horoscopeData[sign].data.horoscope_data}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HoroscopeTile;
*/

import { useEffect, useState } from "react";
import { Play, Pause } from "phosphor-react";
import { useSpeech } from "react-text-to-speech";

function HoroscopeTile() {
  const [day, setDay] = useState("today");
  const [horoscopeData, setHoroscopeData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSign, setActiveSign] = useState(null);

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
          fetch("https://sripatro-server.vercel.app/get-horoscope/", {
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

  const { Text, speechStatus, start, pause } = useSpeech({
    text: horoscopeData[activeSign]?.data?.horoscope_data || "",
    pitch: 1,
    rate: 1,
    volume: 1,
    lang: "en_GB",
    voiceURI: "Hindi India",
    autoPlay: false,
    highlightText: false,
  });

  const toggleSpeech = (sign) => {
    if (activeSign === sign && speechStatus === "started") {
      pause();
    } else {
      setActiveSign(sign);
      start();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-10">
      <div className="min-h-screen bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 underline">
          Daily Horoscope for All Signs
        </h3>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center my-10">
            <span className="loading loading-spinner loading-lg text-black"></span>
          </div>
        ) : (
          <div className="carousel carousel-center space-x-4 rounded-box">
            {zodiacSigns.map(({ sign, emoji }) =>
              horoscopeData[sign] ? (
                <div
                  key={sign}
                  className="carousel-item w-80 bg-gray-100 rounded-lg shadow p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2 items-center">
                      <h2 className="text-5xl font-bold">{emoji}</h2>
                      <h2 className="text-2xl font-bold capitalize text-gray-900">
                        {sign}
                      </h2>
                    </div>
                    <button onClick={() => toggleSpeech(sign)}>
                      {activeSign === sign && speechStatus === "started" ? (
                        <p className="bg-red-600 rounded-full p-2">
                          <Pause
                            size={21}
                            weight="bold"
                            className="text-white"
                          />
                        </p>
                      ) : (
                        <p className="bg-red-600 rounded-full p-2">
                          <Play
                            size={21}
                            weight="bold"
                            className="text-white"
                          />
                        </p>
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {horoscopeData[sign].data.week}
                  </span>
                  <p className="text-sm text-gray-700">
                    {horoscopeData[sign].data.horoscope_data}
                  </p>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HoroscopeTile;
