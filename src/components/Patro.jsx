/*import React, { useState, useEffect } from "react";
import { MhahPanchang } from "mhah-panchang";
import { Calendar, Alarm, Sun, SunHorizon } from "phosphor-react";
import { useTranslation } from "react-i18next";
import Calender from "./Calender.jsx";
import TestGPT from "./TestGPT.jsx";
import NepaliDate from "nepali-date-converter";

const INFO_FIELDS = [
  {
    labelKey: "Tithi",
    valueKey: "Tithi",
    i18nPrefix: "tithi",
    nameField: "name_en_IN",
    extra: ", ",
  },
  {
    labelKey: "Paksha",
    valueKey: "Paksha",
    i18nPrefix: "paksha",
    nameField: "name_en_IN",
    extra: "",
  },
];

const TABLE_FIELDS = [
  {
    labelKey: "Tithi",
    valueKey: "Tithi",
    i18nPrefix: "tithi",
    nameField: "name_en_IN",
  },
  {
    labelKey: "Nakshatra",
    valueKey: "Nakshatra",
    i18nPrefix: "nakshatra",
    nameField: "name_en_IN",
  },
  {
    labelKey: "Karna",
    valueKey: "Karna",
    i18nPrefix: "karna",
    nameField: "name_en_IN",
  },
  {
    labelKey: "Yoga",
    valueKey: "Yoga",
    i18nPrefix: "yoga",
    nameField: "name_en_IN",
  },
];

const Patro = () => {
  const [mhahObj, setMhahObj] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [sunData, setSunData] = useState(null);
  const { t } = useTranslation();

  // Helper: translation with fallback
  const translateWithFallback = (key, fallback = "Not available") =>
    t(key) || fallback;
  // Helper: format date/time
  const formatDateTime = (date) =>
    date ? new Date(date).toLocaleString() : "Unknown";

  useEffect(() => {
    try {
      const date = new Date();
      const obj = new MhahPanchang();
      setMhahObj(obj.calculate(date));
      console.log(mhahObj)
    } catch (error) {
      console.error("Error fetching Panchang details:", error);
    }
  }, []);

  useEffect(() => {
    const fetchSunDetails = async () => {
      try {
        const response = await fetch(
          "https://api.sunrisesunset.io/json?lat=28.7041&lng=77.1025"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setSunData(data.results);
      } catch (e) {
        setSunData(null);
      }
    };
    fetchSunDetails();
    const timer = setInterval(() => {
      const now = new Date();
      const datePart = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const timePart = now.toLocaleTimeString();
      setCurrentTime(
        <>
          {datePart}, <Alarm size={18} className="mr-[-4px]" /> {timePart}
        </>
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mhahObj) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Info block for Rasi/Nakshatra
  const rasiNakshatraBlock = (
    <div className="flex flex-wrap gap-2">
      <span className="font-medium">
        {translateWithFallback(`rasi.${mhahObj?.Raasi?.name_en_UK}`)}{" "}
        {t("Rasi")},
      </span>
      <span className="font-medium">
        {translateWithFallback(`nakshatra.${mhahObj?.Nakshatra?.name_en_IN}`)}
      </span>
      <span className="font-light">{t("Nakshatra")}</span>
    </div>
  );

  // Info block for Yoga/Karna
  const yogaKarnaBlock = (
    <div className="flex flex-wrap gap-2">
      <span className="font-medium">
        {translateWithFallback(`yoga.${mhahObj?.Yoga?.name_en_IN}`)} {t("Yoga")}
        ,
      </span>
      <span className="font-medium">
        {translateWithFallback(`karna.${mhahObj?.Karna?.name_en_IN}`)}{" "}
        {t("Karna")}
      </span>
    </div>
  );

  // Info block for Tithi/Paksha
  const tithiPakshaBlock = (
    <div className="flex flex-wrap gap-2">
      {INFO_FIELDS.map(
        ({ labelKey, valueKey, i18nPrefix, nameField, extra }) => (
          <span key={labelKey} className="font-medium">
            {translateWithFallback(
              `${i18nPrefix}.${mhahObj?.[valueKey]?.[nameField]}`
            )}
            {labelKey === "Tithi" && ` ${t("Tithi")}, `}
          </span>
        )
      )}
      <span className="font-medium">
        {translateWithFallback(`paksha.${mhahObj?.Paksha?.name_en_IN}`)}
      </span>
    </div>
  );

  // Table rows
  const tableRows = [
    ...TABLE_FIELDS.map(({ labelKey, valueKey, i18nPrefix, nameField }) => (
      <tr key={labelKey}>
        <td className="text-base-content p-1">{t(labelKey)}</td>
        <td className="text-base-content p-1">
          {translateWithFallback(
            `${i18nPrefix}.${mhahObj?.[valueKey]?.[nameField]}`
          )}
        </td>
        <td className="text-base-content p-1">
          {formatDateTime(mhahObj?.[valueKey]?.start)}
        </td>
        <td className="text-base-content p-1">
          {formatDateTime(mhahObj?.[valueKey]?.end)}
        </td>
      </tr>
    )),
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-2">
      <div className="card w-full  shadow-2xl bg-base-200 text-base-content rounded-box">
        <div className="card-body p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            <span className="uppercase text-xs tracking-widest font-semibold">
              Live
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-base-300 border border-red-800 rounded-xl p-4 mb-4">
            <div className="flex justify-center items-center relative">
              <img
                src="/watermark.png"
                alt="Watermark"
                className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
                style={{ zIndex: 0 }}
              />
              <img
                width="80"
                className="shadow-2xl rounded-full border border-base-300 bg-base-100 relative z-10"
                src={`moon/${
                  mhahObj?.Paksha?.name_en_IN === "Shukla"
                    ? "shukla"
                    : "krishna"
                }/${mhahObj?.Tithi?.name_en_IN}.png`}
                alt="Moon phase"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex gap-4 mt-2 items-center">
                <span className="flex items-center gap-1 text-base-content">
                  <Sun size={22} weight="bold" className="text-base-content" />
                  <span className="font-semibold">
                    {sunData?.sunrise || "Unknown"}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-base-content">
                  <SunHorizon
                    size={22}
                    weight="bold"
                    className="text-base-content"
                  />
                  <span className="font-semibold">
                    {sunData?.sunset || "Unknown"}
                  </span>
                </span>
              </div>

              {tithiPakshaBlock}
              {rasiNakshatraBlock}
              {yogaKarnaBlock}
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-red-900 via-red-700 to-red-800"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 backdrop-blur-md bg-gradient-to-r from-red-600 via-red-500 to-red-700 shadow-xl">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2">
                  <Calendar
                    size={28}
                    weight="fill"
                    className="text-white drop-shadow animate-fade-in"
                  />
                  <span className="text-xl md:text-2xl font-extrabold tracking-wide text-white animate-fade-in">
                    {t(`day.${mhahObj?.Day?.name_en_UK}`) ||
                      "Day not available"}
                  </span>
                </div>
                <span className="text-lg md:text-xl font-semibold text-white/90 animate-fade-in delay-100">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Alarm
                  size={24}
                  weight="fill"
                  className="text-white animate-pulse"
                />
                <span className="text-lg md:text-xl font-mono font-bold text-white animate-fade-in delay-200">
                  {new Date()
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })
                    .toLowerCase()}
                </span>
              </div>

              <div className="flex flex-col items-start md:items-end gap-1">
                <div>
                  {(() => {
                    try {
                      const now = new Date();
                      const bsDate = NepaliDate.fromAD(now);
                      const BS_MONTHS_NEPALI = [
                        "बैशाख",
                        "जेठ",
                        "असार",
                        "साउन",
                        "भदौ",
                        "असोज",
                        "कार्तिक",
                        "मंसिर",
                        "पुष",
                        "माघ",
                        "फागुन",
                        "चैत्र",
                      ];
                      const bsYear = bsDate.getYear();
                      const bsMonth = bsDate.getMonth();
                      const bsDay = bsDate.getDate();
                      return (
                        <span className="text-lg font-semibold text-white animate-fade-in delay-150">
                          {bsYear} {BS_MONTHS_NEPALI[bsMonth]} {bsDay}  {t(`day.${mhahObj?.Day?.name_en_UK}`) ||
                      "Day not available"}

                        </span>
                      );
                    } catch {
                      return null;
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex lg:flex xl:flex 2xl:flex">
            <div>
              <div className="mb-4">
                <Calender />
              </div>
              <div className="overflow-x-auto  card bg-base-100 shadow-xl p-2">
                <table className="table table-zebra w-full rounded-box border border-base-100 text-base-content">
                  <thead className="bg-red-600 text-sm text-white">
                    <tr>
                      <th className="p-1">{t("Panchang")}</th>
                      <th className="p-1">{t("Value")}</th>
                      <th className="p-1">{t("Start Time")}</th>
                      <th className="p-1">{t("End Time")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {tableRows}
                    <tr>
                      <td className="text-base-content p-1">{t("Rasi")}</td>
                      <td className="text-base-content p-1" colSpan={3}>
                        {translateWithFallback(
                          `rasi.${mhahObj?.Raasi?.name_en_UK}`
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <TestGPT />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patro;*/



"use client";

import React, { useEffect, useState } from "react";
import { MhahPanchang } from "mhah-panchang";
import NepaliDate from "nepali-date-converter";
import { useTranslation } from "react-i18next";
import TestGPT from "../components/TestGPT";

export default function LivePanchangCard() {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());
  const [panchang, setPanchang] = useState(null);
  const [sun, setSun] = useState(null);

  // 1) Tick the clock every second
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  // 2) Recalculate Panchang whenever `now` changes
  useEffect(() => {
    const obj = new MhahPanchang();
    // you can tweak lat/lng to your location
    const data = obj.calendar(now, 28.7041, 77.1025);
    console.log(data);
    setPanchang(data);
  }, [now]);

  // 3) Fetch sunrise/sunset once
  useEffect(() => {
    fetch(
      "https://api.sunrise-sunset.org/json?lat=28.7041&lng=77.1025&formatted=0"
    )
      .then((r) => r.json())
      .then((j) =>
        setSun({
          sunrise: new Date(j.results.sunrise),
          sunset: new Date(j.results.sunset),
        })
      )
      .catch(console.error);
  }, []);

  
if (!panchang || !sun)
  return (
    <div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow-lg overflow-hidden font-sans animate-pulse p-4 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="skeleton w-2 h-2 rounded-full" />
            <div className="skeleton h-3 w-12 rounded" />
          </div>
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
        <div className="text-right space-y-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-4 w-28 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="skeleton w-24 h-24 rounded-full" />
      </div>

      <div className="flex justify-around text-sm py-2">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>

      <div className="space-y-2 text-sm">
        <div className="skeleton h-3 w-40 rounded" />
        <div className="skeleton h-3 w-36 rounded" />
        <div className="skeleton h-3 w-48 rounded" />
        <div className="skeleton h-3 w-44 rounded" />
        <div className="skeleton h-3 w-38 rounded" />
      </div>
    </div>
  );


	// AD date parts
  const weekday = now.toLocaleDateString("en-GB", { weekday: "long" });
  const adFull = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // BS date in Nepali script
  const bs = NepaliDate.fromAD(now);
  const bsFull = bs.format("YYYY MMMM D", "np"); // e.g. "२०८२ जेठ १६"

  // Moon phase path
  const pakshaDir =
    panchang.Paksha.name_en_IN === "Shukla" ? "shukla" : "krishna";
  const tithiName = panchang.Tithi.name_en_IN; // must match your PNG filenames
  const moonSrc = `moon/${pakshaDir}/${tithiName}.png`;

  return (
    <div className="max-w-md mx-auto bg-base-100 rounded-2xl shadow-lg overflow-hidden font-sans">
      {/* header */}
      <div className="flex justify-between p-4">
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="flex items-center gap-2">
            <p className="w-2 h-2 bg-red-600 rounded-full animate-ping"></p>
            <span className="text-xs font-semibold uppercase">Live</span>
          </div>
          <div className=" pb-2 text-center text-base-800 font-thin text-lg">
            {t(`nepaliMonth.${panchang.Masa.name_en_IN}`)}{" "}
            {pakshaDir === "shukla" ? "शुक्ल" : "कृष्ण"}{" "}
            {t(`tithi.${tithiName}`)}
            <div className="flex gap-1">
              <p className="text-xs text-base-800">सिद्धार्थी</p>{" "}
              <span className="text-xs text-base-800">(२०५६)</span>
            </div>
          </div>
        </div>

        <div className="text-right text-sm">
          <div className="font-medium">{weekday}</div>
          <div className="text-lg font-semibold">{adFull}</div>
          <div className="text-base-800">{bsFull}</div>
          <div className="flex items-center gap-1 text-base	-800 mt-1">
            ⏰ {timeStr}
          </div>
        </div>
      </div>

      {/* moon */}
      <div className="flex justify-center py-2">
        <img
          src={moonSrc}
          alt="Moon phase"
          className="w-24 h-24 rounded-full border-4 border-base-600"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      {/* sunrise / sunset */}
      <div className="flex justify-around text-sm font-semibold text-base-800 py-2 ">
        <div className="flex items-center gap-1">
          🌅{" "}
          {sun.sunrise.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        <div className="flex items-center gap-1">
          🌇{" "}
          {sun.sunset.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>

      {/* panchang details */}
      <div className="p-4 space-y-1 text-sm">
        <div>
          <strong>Tithi:</strong> {tithiName}, {panchang.Paksha.name_en_IN}{" "}
          Paksha
        </div>
        <div>
          <strong>Rasi:</strong> {panchang.Raasi.name_en_UK}
        </div>
        <div>
          <strong>Nakshatra:</strong> {panchang.Nakshatra.name_en_IN}
        </div>
        <div>
          <strong>Yoga:</strong> {panchang.Yoga.name_en_IN}
        </div>
        <div>
          <strong>Karna:</strong> {panchang.Karna.name_en_IN}
        </div>
      </div>
    </div>
  );
}
