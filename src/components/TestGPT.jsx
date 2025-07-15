import React, { useEffect, useState } from "react";
import { Coffee } from "phosphor-react";
import { MhahPanchang } from "mhah-panchang";

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState("");
  const [currentYear, setCurrentYear] = useState(2082); // Default to 2082
  const [currentMonth, setCurrentMonth] = useState(3); // Default to Shrawan (3rd month)
  const [calendarData, setCalendarData] = useState(null);
  const [todayNepaliDate, setTodayNepaliDate] = useState(null); // Store today's Nepali date
  const [sunData, setSunData] = useState({}); // Store sunrise/sunset data by date
  const panchang = new MhahPanchang(); // Initialize MhahPanchang

  // Fetch calendar data for the given year and month
  const fetchCalendarData = async (year, month) => {
    try {
      const response = await fetch(`/data-copy-copy/${year}/${month}.json`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  // Fetch sunrise/sunset data for each day in the month
  const fetchSunData = async (year, month) => {
    const sunDataMap = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      try {
        const response = await fetch(
          `https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&date=${dateStr}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          sunDataMap[dateStr] = {
            sunrise: data.results.sunrise,
            sunset: data.results.sunset,
          };
        }
      } catch (error) {
        console.error(`Error fetching sun data for ${dateStr}:`, error);
      }
    }
    setSunData(sunDataMap);
  };

  // Fetch tithi, paksha, nakshatra, raasi, and image data for each day
  const fetchPanchangData = async (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    const panchangData = {};
    const lat = 12.972; // Bengaluru, India (example)
    const lng = 77.594; // Bengaluru, India (example)
    const tithiMap = {
      Padyami: "Padyami.png",
      Dvitiya: "Chavithi.png",
      Tritiya: "Thadiya.png",
      Chaturthi: "Chavithi.png",
      Panchami: "Panchami.png",
      Shasti: "Shasti.png",
      Sapthami: "Sapthami.png",
      Ashtami: "Ashtami.png",
      Navami: "Navami.png",
      Dasami: "Dasami.png",
      Ekadasi: "Ekadasi.png",
      Dvadasi: "Dvadasi.png",
      Trayodasi: "Trayodasi.png",
      Chaturdasi: "Chaturdasi.png",
      Punnami: "Punnami.png",
      Amavasya: "Amavasya.png",
      Vidhiya: "Vidhiya.png",
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const { sunrise } = sunData[dateStr] || { sunrise: "05:30:00 AM" }; // Fallback to 05:30 if no sun data
      const [sunriseHour, sunriseMin, sunrisePeriod] = sunrise.split(/[: ]/);
      let hour = parseInt(sunriseHour, 10);
      if (sunrisePeriod === "PM" && hour !== 12) hour += 12;
      else if (sunrisePeriod === "AM" && hour === 12) hour = 0;
      const date = new Date(year, month, day, hour, parseInt(sunriseMin, 10), 0); // Use sunrise time
      try {
        // Use calculate method for Nakshatra and Raasi
        const mhahCalc = panchang.calculate(date);
        const mhahCal = panchang.calendar(date, lat, lng); // For Tithi and Paksha
        const tithi = mhahCal.Tithi.name_en_IN;
        const paksha = mhahCal.Paksha.name_en_IN;
        const nakshatra = mhahCalc.Nakshatra.name_en_IN; // From calculate
        const raasi = mhahCalc.Raasi.name_en_UK; // From calculate
        console.log(`Date: ${date.toISOString()}, Tithi: ${tithi}, Paksha: ${paksha}, Nakshatra: ${nakshatra}, Raasi: ${raasi}`);
        const imageFile = tithiMap[tithi] || "Vidhiya.png";
        panchangData[dateStr] = {
          tithiPaksha: `${tithi} ${paksha}`,
          image: `/moon/${paksha === "Shukla" ? "shukla" : "krishna"}/${imageFile}`,
          nakshatra: nakshatra,
          raasi: raasi,
        };
      } catch (error) {
        console.error(`Error fetching panchang data for ${date}:`, error);
        panchangData[dateStr] = {
          tithiPaksha: "N/A",
          image: "/moon/krishna/Vidhiya.png",
          nakshatra: "N/A",
          raasi: "N/A",
        };
      }
    }
    return panchangData;
  };

  // Handle Previous Month
  const handlePreviousMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (currentMonth === 1) setCurrentYear((prev) => prev - 1);
  };

  // Handle Next Month
  const handleNextMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (currentMonth === 12) setCurrentYear((prev) => prev + 1);
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth);
    fetchSunData(currentYear, currentMonth - 1); // Adjust for 0-based month
    fetchPanchangData(currentYear, currentMonth - 1).then((panchangData) => {
      if (calendarData?.days?.length) {
        const updatedDays = calendarData.days.map((day) => {
          const gregorianDate = `${currentYear}-${String(
            currentMonth
          ).padStart(2, "0")}-${day.e}`;
          const data = panchangData[gregorianDate] || {
            tithiPaksha: day.t || "N/A",
            image: "/moon/krishna/Vidhiya.png",
            nakshatra: "N/A",
            raasi: "N/A",
          };
          return {
            ...day,
            tithiPaksha: data.tithiPaksha,
            image: data.image,
            nakshatra: data.nakshatra,
            raasi: data.raasi,
          };
        });
        setDays(updatedDays.filter((day) => day.n !== ""));
      }
    });
  }, [currentYear, currentMonth]);

  // Update selected date and today's Nepali date when days or calendarData change
  useEffect(() => {
    if (days.length > 0 && calendarData) {
      setMarriage(calendarData?.marriage?.[0] || "");

      // Find today's Nepali date
      const today = new Date(); // 08:29 AM CEST, June 22, 2025 (11:59 AM IST)
      const todayGregorianDate = today.getDate(); // e.g., 22
      const todayDay = days.find(
        (day) => day.e === todayGregorianDate.toString().padStart(2, "0")
      );
      if (todayDay) {
        setTodayNepaliDate(todayDay.n); // e.g., "२" for Asadh 8 (adjust for month)
      } else {
        setTodayNepaliDate(null); // Reset if not in current month
      }

      // Set selected date to today or first day
      setSelectedDate(todayDay || days[0]);
    }
  }, [days, calendarData]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { tithiPaksha, f, h, image, nakshatra, raasi } = selectedDate;
    return (
      <div className="card bg-base-100 shadow-xl">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Selected Date Events
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Tithi:</span> {tithiPaksha}
          </p>
          {image && (
            <img
              width="50"
              className="shadow-2xl rounded-full border border-base-300 bg-base-100"
              src={image}
              alt="Moon phase"
              onError={(e) => console.log(`Image load error for ${image}`)}
            />
          )}
          <p className="text-gray-700">
            <span className="font-semibold">Nakshatra:</span> {nakshatra}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Raasi:</span> {raasi}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Festival/Event:</span> {f}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Holiday:</span>{" "}
            <span className={`badge ${h ? "bg-red-700 text-white" : ""}`}>
              {h ? (
                <div className="flex gap-2 py-2">
                  <Coffee size={15} />
                  <p className="text-sm">Holiday</p>
                </div>
              ) : (
                "No Holiday"
              )}
            </span>
            <span>{calendarData?.holiFest[0]}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Marriage Muhurat:</span> {marriage}
          </p>
          <p>Bratabandha: {calendarData?.bratabandha[0]}</p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    // Find the first day with a valid Nepali date to determine the starting day
    const firstDay = calendarData?.days.find((day) => day.n !== "");
    const startDayOffset = firstDay ? (firstDay.d - 1) % 7 : 0; // d=1 (Sun) to 7 (Sat), offset for grid

    return (
      <div className="grid grid-cols-7 bg-base-100 rounded-lg shadow-lg">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className=" text-sm bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800  p-2 text-center rounded"
          >
            {day}
          </div>
        ))}
        {[...Array(startDayOffset).fill(null), ...days].map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="border border-gray-200"
              ></div>
            ); // Empty cell for offset
          }

          const isToday = day.n === todayNepaliDate; // Check if this is today's Nepali date
          const isSelected = selectedDate?.n === day.n; // Check if this is the selected date
          const isHoliday = day.h; // Check if it's a holiday
          const gregorianDate = `${currentYear}-${String(currentMonth).padStart(
            2,
            "0"
          )}-${day.e}`;
          const { sunrise, sunset } = sunData[gregorianDate] || {
            sunrise: "N/A",
            sunset: "N/A",
          };

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center cursor-pointer
                ${
                  isSelected
                    ? "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white"
                    : isToday
                    ? "bg-red-200 text-base-800 border-2 border-red-400"
                    : "bg-base-100 hover:bg-red-100 text-base-800"
                }
                border border-base-300 shadow-sm`}
            >
              {day.image && (
                <img
                  width="20"
                  className="shadow-2xl rounded-full border border-base-300 bg-base-100 relative z-10"
                  src={day.image}
                  alt="Moon phase"
                  onError={(e) => console.log(`Image load error for ${day.image}`)}
                />
              )}
              <div
                className={`text-xs text-base-500 ${
                  isHoliday ? "text-red-600" : "text-base-800"
                } ${isSelected ? "text-white" : ""}`}
              >
                {day.tithiPaksha}
              </div>
              <div className="flex items-end gap-[2px]">
                <div
                  className={`text-2xl ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.n}
                </div>
                <div
                  className={`text-sm opacity-75 ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.e}
                </div>
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Nakshatra: {day.nakshatra}
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Raasi: {day.raasi}
              </div>
              <div className={`${isSelected ? "text-base-800" : ""}`}>{day.f}</div>
              <div className={`text-xs ${isSelected ? "text-base-800" : ""}`}>
                Sunrise: {sunrise}, Sunset: {sunset}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container w-[350px] mx-auto p-2 min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePreviousMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Previous
              </button>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="select select-bordered w-24"
              >
                {Array.from({ length: 2090 - 1992 + 1 }, (_, i) => 1992 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="select select-bordered w-32"
              >
                {[
                  "Baisakh",
                  "Jestha",
                  "Asar",
                  "Shrawan",
                  "Bhadra",
                  "Ashwin",
                  "Kartik",
                  "Mangsir",
                  "Poush",
                  "Magh",
                  "Falgun",
                  "Chaitra",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
            <div className="flex text-3xl font-bold mt-2">
              <h1 className="text-red-600">
                {calendarData?.metadata?.np || "Loading..."}
              </h1>
              <h2 className="text-xl text-gray-600 mt-2">
                ({calendarData?.metadata?.en || "Loading..."})
              </h2>
            </div>
          </div>
          {renderCalendar()}
        </div>
        <div className="lg:flex-1 lg:pl-6">{renderSelectedDateEvents()}</div>
      </div>
    </div>
  );
};

export default TestGPT;


/*
import React, { useEffect, useState } from "react";
import { Coffee } from "phosphor-react";
import { MhahPanchang } from "mhah-panchang";

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState("");
  const [currentYear, setCurrentYear] = useState(2082); // Default to 2082
  const [currentMonth, setCurrentMonth] = useState(3); // Default to Shrawan (3rd month)
  const [calendarData, setCalendarData] = useState(null);
  const [todayNepaliDate, setTodayNepaliDate] = useState(null); // Store today's Nepali date
  const [sunData, setSunData] = useState({}); // Store sunrise/sunset data by date
  const panchang = new MhahPanchang(); // Initialize MhahPanchang

  // Fetch calendar data for the given year and month
  const fetchCalendarData = async (year, month) => {
    try {
      const response = await fetch(`/data-copy-copy/${year}/${month}.json`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  // Fetch sunrise/sunset data for each day in the month
  const fetchSunData = async (year, month) => {
    const sunDataMap = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      try {
        const response = await fetch(
          `https://api.sunrisesunset.io/json?lat=12.972&lng=77.594&date=${dateStr}` // Updated to Bengaluru coordinates
        );
        const data = await response.json();
        if (data.status === "OK") {
          sunDataMap[dateStr] = {
            sunrise: data.results.sunrise,
            sunset: data.results.sunset,
          };
        }
      } catch (error) {
        console.error(`Error fetching sun data for ${dateStr}:`, error);
      }
    }
    setSunData(sunDataMap);
  };

  // Fetch tithi, paksha, nakshatra, raasi, and image data for each day
  const fetchPanchangData = async (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    const panchangData = {};
    const tithiMap = {
      Padyami: "Padyami.png",
      Dvitiya: "Chavithi.png",
      Tritiya: "Thadiya.png",
      Chaturthi: "Chavithi.png",
      Panchami: "Panchami.png",
      Shasti: "Shasti.png",
      Sapthami: "Sapthami.png",
      Ashtami: "Ashtami.png",
      Navami: "Navami.png",
      Dasami: "Dasami.png",
      Ekadasi: "Ekadasi.png",
      Dvadasi: "Dvadasi.png",
      Trayodasi: "Trayodasi.png",
      Chaturdasi: "Chaturdasi.png",
      Punnami: "Punnami.png",
      Amavasya: "Amavasya.png",
      Vidhiya: "Vidhiya.png",
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const { sunrise } = sunData[dateStr] || { sunrise: "05:30:00 AM" }; // Fallback to 05:30 if no sun data
      const [sunriseHour, sunriseMin, sunrisePeriod] = sunrise.split(/[: ]/);
      let hour = parseInt(sunriseHour, 10);
      if (sunrisePeriod === "PM" && hour !== 12) hour += 12;
      else if (sunrisePeriod === "AM" && hour === 12) hour = 0;
      const date = new Date(year, month, day, hour, parseInt(sunriseMin, 10), 0); // Use sunrise time
      try {
        // Use calculate method for all panchang data
        const mhahCalc = panchang.calculate(date);
        const tithi = mhahCalc.Tithi.name_en_IN;
        const paksha = mhahCalc.Paksha.name_en_IN;
        const nakshatra = mhahCalc.Nakshatra.name_en_IN;
        const raasi = mhahCalc.Raasi.name_en_UK;
        console.log(`Date: ${date.toISOString()}, Tithi: ${tithi}, Paksha: ${paksha}, Nakshatra: ${nakshatra}, Raasi: ${raasi}`);
        const imageFile = tithiMap[tithi] || "Vidhiya.png";
        panchangData[dateStr] = {
          tithiPaksha: `${tithi} ${paksha}`,
          image: `/moon/${paksha === "Shukla" ? "shukla" : "krishna"}/${imageFile}`,
          nakshatra: nakshatra,
          raasi: raasi,
        };
      } catch (error) {
        console.error(`Error fetching panchang data for ${date}:`, error);
        panchangData[dateStr] = {
          tithiPaksha: "N/A",
          image: "/moon/krishna/Vidhiya.png",
          nakshatra: "N/A",
          raasi: "N/A",
        };
      }
    }
    return panchangData;
  };

  // Handle Previous Month
  const handlePreviousMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (currentMonth === 1) setCurrentYear((prev) => prev - 1);
  };

  // Handle Next Month
  const handleNextMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (currentMonth === 12) setCurrentYear((prev) => prev + 1);
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth);
    fetchSunData(currentYear, currentMonth - 1); // Adjust for 0-based month
    fetchPanchangData(currentYear, currentMonth - 1).then((panchangData) => {
      if (calendarData?.days?.length) {
        const updatedDays = calendarData.days.map((day) => {
          const gregorianDate = `${currentYear}-${String(
            currentMonth
          ).padStart(2, "0")}-${day.e}`;
          const data = panchangData[gregorianDate] || {
            tithiPaksha: day.t || "N/A",
            image: "/moon/krishna/Vidhiya.png",
            nakshatra: "N/A",
            raasi: "N/A",
          };
          return {
            ...day,
            tithiPaksha: data.tithiPaksha,
            image: data.image,
            nakshatra: data.nakshatra,
            raasi: data.raasi,
          };
        });
        setDays(updatedDays.filter((day) => day.n !== ""));
      }
    });
  }, [currentYear, currentMonth]);

  // Update selected date and today's Nepali date when days or calendarData change
  useEffect(() => {
    if (days.length > 0 && calendarData) {
      setMarriage(calendarData?.marriage?.[0] || "");

      // Find today's Nepali date
      const today = new Date(); // 10:11 AM CEST, June 22, 2025 (01:41 PM IST)
      const todayGregorianDate = today.getDate(); // e.g., 22
      const todayDay = days.find(
        (day) => day.e === todayGregorianDate.toString().padStart(2, "0")
      );
      if (todayDay) {
        setTodayNepaliDate(todayDay.n); // e.g., "२" for Asadh 8 (adjust for month)
      } else {
        setTodayNepaliDate(null); // Reset if not in current month
      }

      // Set selected date to today or first day
      setSelectedDate(todayDay || days[0]);
    }
  }, [days, calendarData]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { tithiPaksha, f, h, image, nakshatra, raasi } = selectedDate;
    return (
      <div className="card bg-base-100 shadow-xl">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Selected Date Events
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Tithi:</span> {tithiPaksha}
          </p>
          {image && (
            <img
              width="50"
              className="shadow-2xl rounded-full border border-base-300 bg-base-100"
              src={image}
              alt="Moon phase"
              onError={(e) => console.log(`Image load error for ${image}`)}
            />
          )}
          <p className="text-gray-700">
            <span className="font-semibold">Nakshatra:</span> {nakshatra}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Raasi:</span> {raasi}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Festival/Event:</span> {f}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Holiday:</span>{" "}
            <span className={`badge ${h ? "bg-red-700 text-white" : ""}`}>
              {h ? (
                <div className="flex gap-2 py-2">
                  <Coffee size={15} />
                  <p className="text-sm">Holiday</p>
                </div>
              ) : (
                "No Holiday"
              )}
            </span>
            <span>{calendarData?.holiFest[0]}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Marriage Muhurat:</span> {marriage}
          </p>
          <p>Bratabandha: {calendarData?.bratabandha[0]}</p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    // Find the first day with a valid Nepali date to determine the starting day
    const firstDay = calendarData?.days.find((day) => day.n !== "");
    const startDayOffset = firstDay ? (firstDay.d - 1) % 7 : 0; // d=1 (Sun) to 7 (Sat), offset for grid

    return (
      <div className="grid grid-cols-7 bg-base-100 rounded-lg shadow-lg">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className=" text-sm bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800  p-2 text-center rounded"
          >
            {day}
          </div>
        ))}
        {[...Array(startDayOffset).fill(null), ...days].map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="border border-gray-200"
              ></div>
            ); // Empty cell for offset
          }

          const isToday = day.n === todayNepaliDate; // Check if this is today's Nepali date
          const isSelected = selectedDate?.n === day.n; // Check if this is the selected date
          const isHoliday = day.h; // Check if it's a holiday
          const gregorianDate = `${currentYear}-${String(currentMonth).padStart(
            2,
            "0"
          )}-${day.e}`;
          const { sunrise, sunset } = sunData[gregorianDate] || {
            sunrise: "N/A",
            sunset: "N/A",
          };

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center cursor-pointer
                ${
                  isSelected
                    ? "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white"
                    : isToday
                    ? "bg-red-200 text-base-800 border-2 border-red-400"
                    : "bg-base-100 hover:bg-red-100 text-base-800"
                }
                border border-base-300 shadow-sm`}
            >
              {day.image && (
                <img
                  width="20"
                  className="shadow-2xl rounded-full border border-base-300 bg-base-100 relative z-10"
                  src={day.image}
                  alt="Moon phase"
                  onError={(e) => console.log(`Image load error for ${day.image}`)}
                />
              )}
              <div
                className={`text-xs text-base-500 ${
                  isHoliday ? "text-red-600" : "text-base-800"
                } ${isSelected ? "text-white" : ""}`}
              >
                {day.tithiPaksha}
              </div>
              <div className="flex items-end gap-[2px]">
                <div
                  className={`text-2xl ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.n}
                </div>
                <div
                  className={`text-sm opacity-75 ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.e}
                </div>
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Nakshatra: {day.nakshatra}
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Raasi: {day.raasi}
              </div>
              <div className={`${isSelected ? "text-base-800" : ""}`}>{day.f}</div>
              <div className={`text-xs ${isSelected ? "text-base-800" : ""}`}>
                Sunrise: {sunrise}, Sunset: {sunset}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container w-[350px] mx-auto p-2 min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePreviousMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Previous
              </button>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="select select-bordered w-24"
              >
                {Array.from({ length: 2090 - 1992 + 1 }, (_, i) => 1992 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="select select-bordered w-32"
              >
                {[
                  "Baisakh",
                  "Jestha",
                  "Asar",
                  "Shrawan",
                  "Bhadra",
                  "Ashwin",
                  "Kartik",
                  "Mangsir",
                  "Poush",
                  "Magh",
                  "Falgun",
                  "Chaitra",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
            <div className="flex text-3xl font-bold mt-2">
              <h1 className="text-red-600">
                {calendarData?.metadata?.np || "Loading..."}
              </h1>
              <h2 className="text-xl text-gray-600 mt-2">
                ({calendarData?.metadata?.en || "Loading..."})
              </h2>
            </div>
          </div>
          {renderCalendar()}
        </div>
        <div className="lg:flex-1 lg:pl-6">{renderSelectedDateEvents()}</div>
      </div>
    </div>
  );
};

export default TestGPT;
*/

/*
import React, { useEffect, useState } from "react";
import { Coffee } from "phosphor-react";
import { MhahPanchang } from "mhah-panchang";

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState("");
  const [currentYear, setCurrentYear] = useState(2082); // Default to 2082
  const [currentMonth, setCurrentMonth] = useState(3); // Default to Shrawan (3rd month)
  const [calendarData, setCalendarData] = useState(null);
  const [todayNepaliDate, setTodayNepaliDate] = useState(null); // Store today's Nepali date
  const [sunData, setSunData] = useState({}); // Store sunrise/sunset data by date
  const panchang = new MhahPanchang(); // Initialize MhahPanchang

  // Fetch calendar data for the given year and month
  const fetchCalendarData = async (year, month) => {
    try {
      const response = await fetch(`/data-copy-copy/${year}/${month}.json`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  // Fetch sunrise/sunset data for each day in the month
  const fetchSunData = async (year, month) => {
    const sunDataMap = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      try {
        const response = await fetch(
          `https://api.sunrisesunset.io/json?lat=12.972&lng=77.594&date=${dateStr}`
        ); // Updated to Bengaluru coords
        const data = await response.json();
        if (data.status === "OK") {
          sunDataMap[dateStr] = {
            sunrise: data.results.sunrise,
            sunset: data.results.sunset,
          };
        }
      } catch (error) {
        console.error(`Error fetching sun data for ${dateStr}:`, error);
      }
    }
    setSunData(sunDataMap);
  };

  // Fetch tithi, paksha, nakshatra, raasi, and image data for each day
  const fetchPanchangData = async (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    const panchangData = {};
    const tithiMap = {
      Padyami: "Padyami.png",
      Dvitiya: "Chavithi.png",
      Tritiya: "Thadiya.png",
      Chaturthi: "Chavithi.png",
      Panchami: "Panchami.png",
      Shasti: "Shasti.png",
      Sapthami: "Sapthami.png",
      Ashtami: "Ashtami.png",
      Navami: "Navami.png",
      Dasami: "Dasami.png",
      Ekadasi: "Ekadasi.png",
      Dvadasi: "Dvadasi.png",
      Trayodasi: "Trayodasi.png",
      Chaturdasi: "Chaturdasi.png",
      Punnami: "Punnami.png",
      Amavasya: "Amavasya.png",
      Vidhiya: "Vidhiya.png",
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const { sunrise } = sunData[dateStr] || { sunrise: "05:30:00 AM" }; // Fallback to 05:30 if no sun data
      const [sunriseHour, sunriseMin, sunrisePeriod] = sunrise.split(/[: ]/);
      let hour = parseInt(sunriseHour, 10);
      if (sunrisePeriod === "PM" && hour !== 12) hour += 12;
      else if (sunrisePeriod === "AM" && hour === 12) hour = 0;
      const date = new Date(year, month, day, hour, parseInt(sunriseMin, 10), 0); // Use sunrise time
      try {
        // Use calculate method for all panchang elements
        const mhahCalc = panchang.calculate(date);
        console.log(mhahCalc)
	const tithi = mhahCalc.Tithi.name_en_IN;
	console.log(tithi)
        const paksha = mhahCalc.Paksha.name_en_IN;
	console.log(paksha)
        const nakshatra = mhahCalc.Nakshatra.name_en_IN;
	console.log(nakshatra)
        const raasi = mhahCalc.Raasi.name_en_UK;
	console.log(raasi)
        if (day === 1) {
          console.log(`First Date: ${date.toISOString()}, Tithi: ${tithi}, Paksha: ${paksha}, Nakshatra: ${nakshatra}, Raasi: ${raasi}`); // Log first date
        }
        const imageFile = tithiMap[tithi] || "Vidhiya.png";
        panchangData[dateStr] = {
          tithiPaksha: `${tithi} ${paksha}`,
          image: `/moon/${paksha === "Shukla" ? "shukla" : "krishna"}/${imageFile}`,
          nakshatra: nakshatra,
          raasi: raasi,
        };
      } catch (error) {
        console.error(`Error fetching panchang data for ${date}:`, error);
        panchangData[dateStr] = {
          tithiPaksha: "N/A",
          image: "/moon/krishna/Vidhiya.png",
          nakshatra: "N/A",
          raasi: "N/A",
        };
      }
    }
    return panchangData;
  };

  // Handle Previous Month
  const handlePreviousMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (currentMonth === 1) setCurrentYear((prev) => prev - 1);
  };

  // Handle Next Month
  const handleNextMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (currentMonth === 12) setCurrentYear((prev) => prev + 1);
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth);
    fetchSunData(currentYear, currentMonth - 1); // Adjust for 0-based month
    fetchPanchangData(currentYear, currentMonth - 1).then((panchangData) => {
      if (calendarData?.days?.length) {
        const updatedDays = calendarData.days.map((day) => {
          const gregorianDate = `${currentYear}-${String(
            currentMonth
          ).padStart(2, "0")}-${day.e}`;
          const data = panchangData[gregorianDate] || {
            tithiPaksha: day.t || "N/A",
            image: "/moon/krishna/Vidhiya.png",
            nakshatra: "N/A",
            raasi: "N/A",
          };
          return {
            ...day,
            tithiPaksha: data.tithiPaksha,
            image: data.image,
            nakshatra: data.nakshatra,
            raasi: data.raasi,
          };
        });
        setDays(updatedDays.filter((day) => day.n !== ""));
      }
    });
  }, [currentYear, currentMonth]);

  // Update selected date and today's Nepali date when days or calendarData change
  useEffect(() => {
    if (days.length > 0 && calendarData) {
      setMarriage(calendarData?.marriage?.[0] || "");

      // Find today's Nepali date
      const today = new Date(); // 02:59 PM IST, June 22, 2025
      const todayGregorianDate = today.getDate(); // e.g., 22
      const todayDay = days.find(
        (day) => day.e === todayGregorianDate.toString().padStart(2, "0")
      );
      if (todayDay) {
        setTodayNepaliDate(todayDay.n); // e.g., "२" for Asadh 8 (adjust for month)
      } else {
        setTodayNepaliDate(null); // Reset if not in current month
      }

      // Set selected date to today or first day
      setSelectedDate(todayDay || days[0]);
    }
  }, [days, calendarData]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { tithiPaksha, f, h, image, nakshatra, raasi } = selectedDate;
    return (
      <div className="card bg-base-100 shadow-xl">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Selected Date Events
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Tithi:</span> {tithiPaksha}
          </p>
          {image && (
            <img
              width="50"
              className="shadow-2xl rounded-full border border-base-300 bg-base-100"
              src={image}
              alt="Moon phase"
              onError={(e) => console.log(`Image load error for ${image}`)}
            />
          )}
          <p className="text-gray-700">
            <span className="font-semibold">Nakshatra:</span> {nakshatra}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Raasi:</span> {raasi}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Festival/Event:</span> {f}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Holiday:</span>{" "}
            <span className={`badge ${h ? "bg-red-700 text-white" : ""}`}>
              {h ? (
                <div className="flex gap-2 py-2">
                  <Coffee size={15} />
                  <p className="text-sm">Holiday</p>
                </div>
              ) : (
                "No Holiday"
              )}
            </span>
            <span>{calendarData?.holiFest[0]}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Marriage Muhurat:</span> {marriage}
          </p>
          <p>Bratabandha: {calendarData?.bratabandha[0]}</p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    // Find the first day with a valid Nepali date to determine the starting day
    const firstDay = calendarData?.days.find((day) => day.n !== "");
    const startDayOffset = firstDay ? (firstDay.d - 1) % 7 : 0; // d=1 (Sun) to 7 (Sat), offset for grid

    return (
      <div className="grid grid-cols-7 bg-base-100 rounded-lg shadow-lg">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className=" text-sm bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800  p-2 text-center rounded"
          >
            {day}
          </div>
        ))}
        {[...Array(startDayOffset).fill(null), ...days].map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="border border-gray-200"
              ></div>
            ); // Empty cell for offset
          }

          const isToday = day.n === todayNepaliDate; // Check if this is today's Nepali date
          const isSelected = selectedDate?.n === day.n; // Check if this is the selected date
          const isHoliday = day.h; // Check if it's a holiday
          const gregorianDate = `${currentYear}-${String(currentMonth).padStart(
            2,
            "0"
          )}-${day.e}`;
          const { sunrise, sunset } = sunData[gregorianDate] || {
            sunrise: "N/A",
            sunset: "N/A",
          };

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center cursor-pointer
                ${
                  isSelected
                    ? "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white"
                    : isToday
                    ? "bg-red-200 text-base-800 border-2 border-red-400"
                    : "bg-base-100 hover:bg-red-100 text-base-800"
                }
                border border-base-300 shadow-sm`}
            >
              {day.image && (
                <img
                  width="20"
                  className="shadow-2xl rounded-full border border-base-300 bg-base-100 relative z-10"
                  src={day.image}
                  alt="Moon phase"
                  onError={(e) => console.log(`Image load error for ${day.image}`)}
                />
              )}
              <div
                className={`text-xs text-base-500 ${
                  isHoliday ? "text-red-600" : "text-base-800"
                } ${isSelected ? "text-white" : ""}`}
              >
                {day.tithiPaksha}
              </div>
              <div className="flex items-end gap-[2px]">
                <div
                  className={`text-2xl ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.n}
                </div>
                <div
                  className={`text-sm opacity-75 ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.e}
                </div>
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Nakshatra: {day.nakshatra}
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Raasi: {day.raasi}
              </div>
              <div className={`${isSelected ? "text-base-800" : ""}`}>{day.f}</div>
              <div className={`text-xs ${isSelected ? "text-base-800" : ""}`}>
                Sunrise: {sunrise}, Sunset: {sunset}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container w-[350px] mx-auto p-2 min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePreviousMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Previous
              </button>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="select select-bordered w-24"
              >
                {Array.from({ length: 2090 - 1992 + 1 }, (_, i) => 1992 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="select select-bordered w-32"
              >
                {[
                  "Baisakh",
                  "Jestha",
                  "Asar",
                  "Shrawan",
                  "Bhadra",
                  "Ashwin",
                  "Kartik",
                  "Mangsir",
                  "Poush",
                  "Magh",
                  "Falgun",
                  "Chaitra",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
            <div className="flex text-3xl font-bold mt-2">
              <h1 className="text-red-600">
                {calendarData?.metadata?.np || "Loading..."}
              </h1>
              <h2 className="text-xl text-gray-600 mt-2">
                ({calendarData?.metadata?.en || "Loading..."})
              </h2>
            </div>
          </div>
          {renderCalendar()}
        </div>
        <div className="lg:flex-1 lg:pl-6">{renderSelectedDateEvents()}</div>
      </div>
    </div>
  );
};

export default TestGPT;*/

/*
import React, { useEffect, useState } from "react";
import { Coffee } from "phosphor-react";
import { MhahPanchang } from "mhah-panchang";

const TestGPT = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [marriage, setMarriage] = useState("");
  const [currentYear, setCurrentYear] = useState(2082); // Default to 2082
  const [currentMonth, setCurrentMonth] = useState(3); // Default to Shrawan (3rd month)
  const [calendarData, setCalendarData] = useState(null);
  const [todayNepaliDate, setTodayNepaliDate] = useState(null); // Store today's Nepali date
  const [sunData, setSunData] = useState({}); // Store sunrise/sunset data by date
  const panchang = new MhahPanchang(); // Initialize MhahPanchang

  // Fetch calendar data for the given year and month
  const fetchCalendarData = async (year, month) => {
    try {
      const response = await fetch(`/data-copy-copy/${year}/${month}.json`);
      if (!response.ok) throw new Error("Failed to fetch calendar data");
      const data = await response.json();
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  // Fetch sunrise/sunset data for each day in the month
  const fetchSunData = async (year, month) => {
    const sunDataMap = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      try {
        const response = await fetch(
          `https://api.sunrisesunset.io/json?lat=12.972&lng=77.594&date=${dateStr}`
        ); // Bengaluru coords
        const data = await response.json();
        if (data.status === "OK") {
          sunDataMap[dateStr] = {
            sunrise: data.results.sunrise,
            sunset: data.results.sunset,
          };
        }
      } catch (error) {
        console.error(`Error fetching sun data for ${dateStr}:`, error);
      }
    }
    setSunData(sunDataMap);
  };

  // Fetch tithi, paksha, nakshatra, raasi, and image data for each day
  const fetchPanchangData = async (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0-based month
    const panchangData = {};
    const tithiMap = {
      Padyami: "Padyami.png",
      Dvitiya: "Chavithi.png",
      Tritiya: "Thadiya.png",
      Chaturthi: "Chavithi.png",
      Panchami: "Panchami.png",
      Shasti: "Shasti.png",
      Sapthami: "Sapthami.png",
      Ashtami: "Ashtami.png",
      Navami: "Navami.png",
      Dasami: "Dasami.png",
      Ekadasi: "Ekadasi.png",
      Dvadasi: "Dvadasi.png",
      Trayodasi: "Trayodasi.png",
      Chaturdasi: "Chaturdasi.png",
      Punnami: "Punnami.png",
      Amavasya: "Amavasya.png",
      Vidhiya: "Vidhiya.png",
    };

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const { sunrise } = sunData[dateStr] || { sunrise: "05:30:00 AM" }; // Fallback to 05:30 if no sun data
      const [sunriseHour, sunriseMin, sunrisePeriod] = sunrise.split(/[: ]/);
      let hour = parseInt(sunriseHour, 10);
      if (sunrisePeriod === "PM" && hour !== 12) hour += 12;
      else if (sunrisePeriod === "AM" && hour === 12) hour = 0;
      const date = new Date(year, month, day - 2, hour, parseInt(sunriseMin, 10), 0); // Adjust by -2 days to align Asar 1 with June 15
      try {
        const mhahCalc = panchang.calculate(date);
        const tithi = mhahCalc.Tithi.name_en_IN;
        const paksha = mhahCalc.Paksha.name_en_IN;
        const nakshatra = mhahCalc.Nakshatra.name_en_IN;
        const raasi = mhahCalc.Raasi.name_en_UK;
        if (day === 1) {
          console.log(`First Date: ${date.toISOString()}, Tithi: ${tithi}, Paksha: ${paksha}, Nakshatra: ${nakshatra}, Raasi: ${raasi}`); // Log first date
        }
        const imageFile = tithiMap[tithi] || "Vidhiya.png";
        panchangData[dateStr] = {
          tithiPaksha: `${tithi} ${paksha}`,
          image: `/moon/${paksha === "Shukla" ? "shukla" : "krishna"}/${imageFile}`,
          nakshatra: nakshatra,
          raasi: raasi,
        };
      } catch (error) {
        console.error(`Error fetching panchang data for ${date}:`, error);
        panchangData[dateStr] = {
          tithiPaksha: "N/A",
          image: "/moon/krishna/Vidhiya.png",
          nakshatra: "N/A",
          raasi: "N/A",
        };
      }
    }
    return panchangData;
  };

  // Handle Previous Month
  const handlePreviousMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1));
    if (currentMonth === 1) setCurrentYear((prev) => prev - 1);
  };

  // Handle Next Month
  const handleNextMonth = () => {
    setDays([]); // Clear days to prevent rendering old data
    setSelectedDate(null); // Reset selected date
    setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1));
    if (currentMonth === 12) setCurrentYear((prev) => prev + 1);
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth);
    fetchSunData(currentYear, currentMonth - 1); // Adjust for 0-based month
    fetchPanchangData(currentYear, currentMonth - 1).then((panchangData) => {
      if (calendarData?.days?.length) {
        const updatedDays = calendarData.days.map((day) => {
          const gregorianDate = `${currentYear}-${String(
            currentMonth
          ).padStart(2, "0")}-${String(parseInt(day.e) - 2).padStart(2, "0")}`; // Adjust English date by -2
          const data = panchangData[gregorianDate] || {
            tithiPaksha: day.t || "N/A",
            image: "/moon/krishna/Vidhiya.png",
            nakshatra: "N/A",
            raasi: "N/A",
          };
          return {
            ...day,
            e: String(parseInt(day.e) - 2).padStart(2, "0"), // Update e to reflect correct Gregorian date
            tithiPaksha: data.tithiPaksha,
            image: data.image,
            nakshatra: data.nakshatra,
            raasi: data.raasi,
          };
        });
        setDays(updatedDays.filter((day) => day.n !== ""));
      }
    });
  }, [currentYear, currentMonth]);

  // Update selected date and today's Nepali date when days or calendarData change
  useEffect(() => {
    if (days.length > 0 && calendarData) {
      setMarriage(calendarData?.marriage?.[0] || "");

      // Find today's Nepali date
      const today = new Date(); // 03:14 PM IST, June 22, 2025
      const todayGregorianDate = today.getDate(); // e.g., 22
      const todayDay = days.find(
        (day) => parseInt(day.e) === todayGregorianDate - 2 // Adjust for offset
      );
      if (todayDay) {
        setTodayNepaliDate(todayDay.n); // e.g., "२" for Asadh 8 (adjust for month)
      } else {
        setTodayNepaliDate(null); // Reset if not in current month
      }

      // Set selected date to today or first day
      setSelectedDate(todayDay || days[0]);
    }
  }, [days, calendarData]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;

    const { tithiPaksha, f, h, image, nakshatra, raasi } = selectedDate;
    return (
      <div className="card bg-base-100 shadow-xl">
        <h3 className="text-xl font-bold text-red-600 mb-4">
          Selected Date Events
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Tithi:</span> {tithiPaksha}
          </p>
          {image && (
            <img
              width="50"
              className="shadow-2xl rounded-full border border-base-300 bg-base-100"
              src={image}
              alt="Moon phase"
              onError={(e) => console.log(`Image load error for ${image}`)}
            />
          )}
          <p className="text-gray-700">
            <span className="font-semibold">Nakshatra:</span> {nakshatra}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Raasi:</span> {raasi}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Festival/Event:</span> {f}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Holiday:</span>{" "}
            <span className={`badge ${h ? "bg-red-700 text-white" : ""}`}>
              {h ? (
                <div className="flex gap-2 py-2">
                  <Coffee size={15} />
                  <p className="text-sm">Holiday</p>
                </div>
              ) : (
                "No Holiday"
              )}
            </span>
            <span>{calendarData?.holiFest[0]}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Marriage Muhurat:</span> {marriage}
          </p>
          <p>Bratabandha: {calendarData?.bratabandha[0]}</p>
        </div>
      </div>
    );
  };

  const renderCalendar = () => {
    // Find the first day with a valid Nepali date to determine the starting day
    const firstDay = calendarData?.days.find((day) => day.n !== "");
    const startDayOffset = firstDay ? (firstDay.d - 1) % 7 : 0; // d=1 (Sun) to 7 (Sat), offset for grid

    return (
      <div className="grid grid-cols-7 bg-base-100 rounded-lg shadow-lg">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className=" text-sm bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800  p-2 text-center rounded"
          >
            {day}
          </div>
        ))}
        {[...Array(startDayOffset).fill(null), ...days].map((day, index) => {
          if (!day) {
            return (
              <div
                key={index}
                className="border border-gray-200"
              ></div>
            ); // Empty cell for offset
          }

          const isToday = parseInt(day.e) === 20; // Adjusted for June 22 (22 - 2 = 20)
          const isSelected = selectedDate?.n === day.n; // Check if this is the selected date
          const isHoliday = day.h; // Check if it's a holiday
          const gregorianDate = `${currentYear}-${String(currentMonth).padStart(
            2,
            "0"
          )}-${day.e}`;
          const { sunrise, sunset } = sunData[gregorianDate] || {
            sunrise: "N/A",
            sunset: "N/A",
          };

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`text-center cursor-pointer
                ${
                  isSelected
                    ? "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800 text-white"
                    : isToday
                    ? "bg-red-200 text-base-800 border-2 border-red-400"
                    : "bg-base-100 hover:bg-red-100 text-base-800"
                }
                border border-base-300 shadow-sm`}
            >
              {day.image && (
                <img
                  width="20"
                  className="shadow-2xl rounded-full border border-base-300 bg-base-100 relative z-10"
                  src={day.image}
                  alt="Moon phase"
                  onError={(e) => console.log(`Image load error for ${day.image}`)}
                />
              )}
              <div
                className={`text-xs text-base-500 ${
                  isHoliday ? "text-red-600" : "text-base-800"
                } ${isSelected ? "text-white" : ""}`}
              >
                {day.tithiPaksha}
              </div>
              <div className="flex items-end gap-[2px]">
                <div
                  className={`text-2xl ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.n}
                </div>
                <div
                  className={`text-sm opacity-75 ${
                    isHoliday ? "text-red-600" : "text-base-800"
                  } ${isSelected ? "text-base-800" : ""}`}
                >
                  {day.e}
                </div>
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Nakshatra: {day.nakshatra}
              </div>
              <div className={`text-xs ${isSelected ? "text-white" : ""}`}>
                Raasi: {day.raasi}
              </div>
              <div className={`${isSelected ? "text-base-800" : ""}`}>{day.f}</div>
              <div className={`text-xs ${isSelected ? "text-base-800" : ""}`}>
                Sunrise: {sunrise}, Sunset: {sunset}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container w-[350px] mx-auto p-2 min-h-screen bg-base-100">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePreviousMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Previous
              </button>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="select select-bordered w-24"
              >
                {Array.from({ length: 2090 - 1992 + 1 }, (_, i) => 1992 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="select select-bordered w-32"
              >
                {[
                  "Baisakh",
                  "Jestha",
                  "Asar",
                  "Shrawan",
                  "Bhadra",
                  "Ashwin",
                  "Kartik",
                  "Mangsir",
                  "Poush",
                  "Magh",
                  "Falgun",
                  "Chaitra",
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={handleNextMonth}
                className="text-red-500 btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
            <div className="flex text-3xl font-bold mt-2">
              <h1 className="text-red-600">
                {calendarData?.metadata?.np || "Loading..."}
              </h1>
              <h2 className="text-xl text-gray-600 mt-2">
                ({calendarData?.metadata?.en || "Loading..."})
              </h2>
            </div>
          </div>
          {renderCalendar()}
        </div>
        <div className="lg:flex-1 lg:pl-6">{renderSelectedDateEvents()}</div>
      </div>
    </div>
  );
};

export default TestGPT;*/
