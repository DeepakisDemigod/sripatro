import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en",
    label: "English",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "ne",
    label: "नेपाली",
    flag: "https://flagcdn.com/np.svg",
  },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className="space-y-3 flex flex-col">
      {languages.map((lang) => {
        const isSelected = i18n.language === lang.code;
        return (
          <div
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all w-full duration-200 ${
              isSelected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={lang.flag}
                alt={lang.label}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-black text-md font-medium">
                {lang.label}
              </span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected ? "border-green-500" : "border-gray-400"
              }`}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
