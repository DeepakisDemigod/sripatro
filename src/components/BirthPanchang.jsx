import { useState, useEffect } from "react";
import { MhahPanchang } from "mhah-panchang";
import { Alarm, Swap, Calendar, CaretLeft } from "phosphor-react";
import nakshatraData from "./nakshatraData.json"; // Import the Nakshatra data
import ScrollTop from "./ScrollTop.jsx";
import { useTranslation } from "react-i18next";

const BirthPanchang = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Birth Panchang | Sri Patro";
    //handleSubmit()
  }, []);

  const [dob, setDob] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const [time, setTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  const [panchang, setPanchang] = useState(null);
  const [age, setAge] = useState(null);
  const [nakshatraInfo, setNakshatraInfo] = useState(null); // New state

  const calculateAge = (dateOfBirth) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
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
          (n) => n.name === nakshatraName
        );
        setNakshatraInfo(foundNakshatra);
      } else {
        setNakshatraInfo(null);
      }
    } catch (error) {
      console.error("Error calculating Panchang:", error);
      setPanchang(null);
      setAge(null);
      setNakshatraInfo(null);
    }
  };

  return (
    <div className="bg-white text-black flex items-center justify-center py-10 px-5">
      <div className="bg-white border border-t-red-600 shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="breadcrumbs border rounded text-black px-4 text-sm">
          <ul>
            <li className="hover:border">
              <a href="/" className="hover:underline">
                <CaretLeft size={19} /> <span>{t("Back")}</span>
              </a>
            </li>
          </ul>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {t("Birth Panchang (AD)")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dob"
              className="flex items-center gap-2 block text-sm font-medium text-gray-700"
            >
              <Calendar size={18} />
              <span>{t("Date of Birth")}</span>
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="flex items-center gap-2 block text-sm font-medium text-gray-700"
            >
              <Alarm size={18} />
              <span>{t("Time of Birth")}</span>
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="bg-white mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition"
          >
            {t("Get Panchang")}
          </button>
        </form>

        {panchang ? (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <h3 className="text-lg font-semibold underline text-gray-800 mb-4">
              {t("Birth Panchang Details")}
            </h3>
            <table className="table w-full bg-white text-black">
              <tbody>
                <tr>
                  <th>{t("Day")}</th>
                  <td>
                    {t(`day.${panchang?.Day?.name_en_UK}`) || "Not Available"}
                  </td>
                  {/*  <td>{panchang?.Day?.name_en_UK || 'Not Available'}</td>*/}
                </tr>

                <tr>
                  <th>{t("Paksh")}</th>
                  <td>
                    {t(`paksha.${panchang?.Paksha?.name_en_IN}`) ||
                      "Not Available"}
                  </td>
                </tr>

                <tr>
                  <th>{t("Tithi")}</th>
                  <td>
                    {t(`tithi.${panchang?.Tithi?.name_en_IN}`) ||
                      "Not Available"}
                  </td>
                </tr>

                <tr>
                  <th>{t("Nakshatra")}</th>
                  <td>
                    {t(`nakshatra.${panchang?.Nakshatra?.name_en_IN}`) ||
                      "Not Available"}
                  </td>
                </tr>
                <tr>
                  <th>{t("Rasi")}</th>
                  <td>
                    {t(`rasi.${panchang?.Raasi?.name_en_UK}`) ||
                      "Not Available"}
                  </td>
                </tr>
                {nakshatraInfo && (
                  <>
                    <tr>
                      <th>{t("Syllables")}</th>
                      <td>
                        {t(`syllables.${nakshatraInfo["first syllables"]}`) ||
                          "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <th>{t("Gan")}</th>
                      <td>
                        {t(`ganam.${nakshatraInfo.ganam}`) || "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <th>{t("Animal Sign")}</th>
                      <td>
                        {t(`animal.${nakshatraInfo["animal sign"]}`) ||
                          "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <th>{t("Deity")}</th>
                      <td>
                        {t(`deity.${nakshatraInfo.Diety}`) || "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <th>{t("Best Direction")}</th>
                      <td>
                        {t(
                          `best_direction.${nakshatraInfo["best direction"]}`
                        ) || "Not Available"}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th>{t("Yoga")}</th>
                  <td>
                    {t(`yoga.${panchang?.Yoga?.name_en_IN}`) || "Not Available"}
                  </td>
                </tr>
                <tr>
                  <th>{t("Karna")}</th>
                  <td>
                    {t(`karna.${panchang?.Karna?.name_en_IN}`) ||
                      "Not Available"}
                  </td>
                </tr>

                {age && (
                  <tr>
                    <th>{t("Age")}</th>
                    <td>
                      {age.years} {t("years and")} {age.months} {t("months")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg text-gray-600">
            {t("Enter your details to get your birth Panchang.")}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <a
            href="/nepalitoenglish"
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 transition"
          >
            <Swap size={18} />
            <span>{t("Change Nepali to English Date")}</span>
          </a>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default BirthPanchang;
