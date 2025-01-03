import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';

const Patro = () => {
  const [mhahObj, setMhahObj] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Fetch Panchang details once
  useEffect(() => {
    try {
      const date = new Date();
      const obj = new MhahPanchang();
      setMhahObj(obj.calculate(date));
    } catch (error) {
      console.error('Error fetching Panchang details:', error);
    }
  }, []);

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return mhahObj ? (
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Panchang Today
        </h3>
        <div className="text-center text-gray-600 mb-6">
          <h2 className="text-xl">
            {mhahObj?.Day?.name_en_UK || 'Day not available'}, {currentTime}
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Tithi:</strong> {mhahObj?.Tithi?.name_en_IN || 'Not available'} (
            {(mhahObj?.Tithi?.start &&
              new Date(mhahObj?.Tithi?.start).toLocaleString()) ||
              'Unknown'}{' '}
            -{' '}
            {(mhahObj?.Tithi?.end &&
              new Date(mhahObj?.Tithi?.end).toLocaleString()) ||
              'Unknown'}
            ), {mhahObj?.Paksha?.name_en_IN || 'Not available'} Paksha
          </p>

          <p>
            <strong>Nakshatra:</strong> {mhahObj?.Nakshatra?.name_en_IN || 'Not available'} (
            {(mhahObj?.Nakshatra?.start &&
              new Date(mhahObj?.Nakshatra?.start).toLocaleString()) ||
              'Unknown'}{' '}
            -{' '}
            {(mhahObj?.Nakshatra?.end &&
              new Date(mhahObj?.Nakshatra?.end).toLocaleString()) ||
              'Unknown'}
            )
          </p>

          <p>
            <strong>Karna:</strong> {mhahObj?.Karna?.name_en_IN || 'Not available'} (
            {(mhahObj?.Karna?.start &&
              new Date(mhahObj?.Karna?.start).toLocaleString()) ||
              'Unknown'}{' '}
            -{' '}
            {(mhahObj?.Karna?.end &&
              new Date(mhahObj?.Karna?.end).toLocaleString()) ||
              'Unknown'}
            )
          </p>

          <p>
            <strong>Yoga:</strong> {mhahObj?.Yoga?.name_en_IN || 'Not available'} (
            {(mhahObj?.Yoga?.start &&
              new Date(mhahObj?.Yoga?.start).toLocaleString()) ||
              'Unknown'}{' '}
            -{' '}
            {(mhahObj?.Yoga?.end &&
              new Date(mhahObj?.Yoga?.end).toLocaleString()) ||
              'Unknown'}
            )
          </p>

          <p>
            <strong>Raasi:</strong> {mhahObj?.Raasi?.name_en_UK || 'Not available'} Zodiac
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Patro;
