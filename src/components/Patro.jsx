import React, { useState, useEffect } from "react";
import { MhahPanchang } from "mhah-panchang";
import { Calendar, Alarm } from "phosphor-react";
import { useTranslation } from "react-i18next";


const Patro = () => {
  const [mhahObj, setMhahObj] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const { t } = useTranslation();

  // Fetch Panchang details once
  useEffect(() => {
    try {
      const date = new Date();
      const obj = new MhahPanchang();
      setMhahObj(obj.calculate(date));
    } catch (error) {
      console.error("Error fetching Panchang details:", error);
    }
  }, []);

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      const originalDate = new Date();
      const datePart = originalDate.toLocaleDateString(); // Get the date
      const timePart = originalDate.toLocaleTimeString(); // Get the time

      // Combine date and time with the Alarm icon
      const formattedString = (
        <>
          {datePart} ,<Alarm size={18} className="mr-[-4px]" /> {timePart}
        </>
      );

      setCurrentTime(formattedString);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return mhahObj ? (
    <div className="flex justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {t('Panchang Today')}
        </h3>
        <div className="text-center text-gray-600 mb-6">
          <h2 className="text-md flex items-center justify-start gap-2">
            <Calendar size={18} />
            {mhahObj?.Day?.name_en_UK || "Day not available"} {currentTime}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table  w-full">
            {/* head */}
            <thead className="bg-red-600 text-white text-sm">
              <tr>
                <th>PANCHANG</th>
                <th>VALUE</th>
                <th>START TIME</th>
                <th>END TIME</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* row 1 */}
              <tr>
                <td>Tithi</td>
                <td>{mhahObj?.Tithi?.name_en_IN || "Not available"}</td>
                <td>
                  {mhahObj?.Tithi?.start
                    ? new Date(mhahObj?.Tithi?.start).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  {mhahObj?.Tithi?.end
                    ? new Date(mhahObj?.Tithi?.end).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>Nakshatra</td>
                <td>{mhahObj?.Nakshatra?.name_en_IN || "Not available"}</td>
                <td>
                  {mhahObj?.Nakshatra?.start
                    ? new Date(mhahObj?.Nakshatra?.start).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  {mhahObj?.Nakshatra?.end
                    ? new Date(mhahObj?.Nakshatra?.end).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>Karna</td>
                <td>{mhahObj?.Karna?.name_en_IN || "Not available"}</td>
                <td>
                  {mhahObj?.Karna?.start
                    ? new Date(mhahObj?.Karna?.start).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  {mhahObj?.Karna?.end
                    ? new Date(mhahObj?.Karna?.end).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
              {/* row 4 */}
              <tr>
                <td>Yoga</td>
                <td>{mhahObj?.Yoga?.name_en_IN || "Not available"}</td>
                <td>
                  {mhahObj?.Yoga?.start
                    ? new Date(mhahObj?.Yoga?.start).toLocaleString()
                    : "Unknown"}
                </td>
                <td>
                  {mhahObj?.Yoga?.end
                    ? new Date(mhahObj?.Yoga?.end).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
              {/* row 5 */}
              <tr>
                <td>Raasi</td>
                <td colSpan={3}>
                  {mhahObj?.Raasi?.name_en_UK || "Not available"} Zodiac
                </td>
              </tr>
            </tbody>
          </table>
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
