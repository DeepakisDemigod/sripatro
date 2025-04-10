import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "ne",
    name: "नेपाली",
    flag: "https://flagcdn.com/np.svg",
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(() => 
    localStorage.getItem("appLang") || i18n.language || "en"
  );

  // Handle language initialization
  useEffect(() => {
    const savedLang = localStorage.getItem("appLang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang).catch((err) => 
        console.error("Failed to change language:", err)
      );
    }
  }, [i18n]);

  // Memoize the change handler
  const handleChange = useCallback((code) => {
    i18n.changeLanguage(code).catch((err) => 
      console.error("Failed to change language:", err)
    );
    localStorage.setItem("appLang", code);
    setSelectedLang(code);
  }, [i18n]);

  return (
    <div className="space-y-3 flex flex-col" role="radiogroup" aria-label="Language selection">
      {LANGUAGES.map(({ code, name, flag }) => (
        <label
          key={code}
          htmlFor={`lang-${code}`}
          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all w-full duration-200 ${
            selectedLang === code
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <img
              src={flag}
              alt={`${name} flag`}
              className="w-6 h-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-black text-md font-medium">{name}</span>
          </div>
          <input
            type="radio"
            id={`lang-${code}`}
            name="language"
            value={code}
            checked={selectedLang === code}
            onChange={(e) => handleChange(e.target.value)}
            className="sr-only"
            aria-checked={selectedLang === code}
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedLang === code ? "border-green-500" : "border-gray-400"
            }`}
          >
            {selectedLang === code && (
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default LanguageSwitcher;