import { useState, useEffect } from 'react';

function Horoscope() {
  const [sign, setSign] = useState('leo'); // Lowercase for API
  const [day, setDay] = useState('YESTERDAY'); // Uppercase for API
  const [data, setData] = useState(null);

  const fetchHoroscope = async () => {
    try {
      const prediction = await fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`,
      );

      if (!prediction.ok) {
        throw new Error(`HTTP error! Status: ${prediction.status}`);
      }

      const predictionData = await prediction.json();
      console.log(predictionData);
      setData(predictionData);
    } catch (error) {
      console.error('Failed to fetch horoscope:', error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchHoroscope();
  }, [sign, day]); // Re-fetch when `sign` or `day` changes

  return (
    <>
      <h1>Horoscope Data for {day}</h1> {/* Use day state in heading */}
      {data ? (
        <div>
          <h2>{sign}</h2> {/* Display sign */}
          <p>Date: {data.date}</p> {/* Display date */}
          <p>Horoscope: {data.horoscope}</p> {/* Display horoscope */}
        </div>
      ) : (
        <p>Loading horoscope data...</p>
      )}
    </>
  );
}

export default Horoscope;
