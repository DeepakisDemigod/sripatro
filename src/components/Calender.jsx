/*import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateCalendar = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      // Get the first day of the month
      const firstDay = new Date(year, month, 1).getDay();

      // Get the total number of days in the current month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Create an array of days for the calendar
      const calendarDays = [];
      for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null); // Empty days before the start of the month
      }
      for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
      }

      setDays(calendarDays);
    };

    generateCalendar();
  }, []);

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  return (
    <div className=" flex flex-col items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          {currentMonth} {currentYear}
        </h2>
        <div className="">
          <div className="grid grid-cols-7 gap-1 text-center text-gray-700 font-medium mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-sm">
                {t(day)}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-sm h-8 flex items-center justify-center rounded-md ${
                  day === today.getDate()
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700"
                } ${!day && "bg-transparent cursor-default"}`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;*/
/*
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateCalendar = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const calendarDays = [];
      for (let i = 0; i < firstDay; i++) calendarDays.push(null);
      for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

      setDays(calendarDays);
    };

    generateCalendar();
  }, []);

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const dayKeys = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          {currentMonth} {currentYear}
        </h2>
        <div>
          <div className="grid grid-cols-7 gap-1 text-center text-gray-700 font-medium mb-4">
            {dayKeys.map((key) => (
              <div key={key} className="text-sm">
                {t(`calendar.${key}`)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-sm h-8 flex items-center justify-center rounded-md ${
                  day === today.getDate()
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700"
                } ${!day && "bg-transparent cursor-default"}`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;*/

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateCalendar = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const calendarDays = [];
      for (let i = 0; i < firstDay; i++) calendarDays.push(null);
      for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

      setDays(calendarDays);
    };

    generateCalendar();
  }, []);

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const dayKeys = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          {currentMonth} {currentYear}
        </h2>
        <div>
          <div className="grid grid-cols-7 gap-1 text-center text-gray-700 font-medium mb-4">
            {dayKeys.map((key) => (
              <div key={key} className="text-sm">
                {t(`calender.${key}`)}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`text-sm h-8 flex items-center justify-center rounded-md ${
                  day === today.getDate()
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-gray-100 text-gray-700"
                } ${!day && "bg-transparent cursor-default"}`}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
