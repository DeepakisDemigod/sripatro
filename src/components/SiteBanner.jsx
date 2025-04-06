import { ArrowLineDown, CheckCircle } from "phosphor-react";
import { usePWAInstall } from "react-use-pwa-install";

const SiteBanner = () => {
  const install = usePWAInstall();

  return (
    <div className="bg-white shadow-md overflow-hidden">
      <div className="flex items-center p-4 gap-2">
        <div className="flex justify-between items-center gap-2">
          <p className="text-white flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-400 to-red-700 px-2 rounded text-3xl font-bold">
            <img src="/Shri_symbol_white.svg" alt="sri logo" />
          </p>
          <div className="flex flex-col ">
            <h2 className="text-lg font-semibold text-gray-800">SriPatro</h2>

            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500">4.5</span>
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-500 ml-1">(1,234)</span>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button>
              <span>
                {install ? (
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm font-medium transition duration-300"
                    onClick={install}
                  >
                    <ArrowLineDown size={19} />
                    <span>Download</span>
                  </button>
                ) : (
                  <button className="flex items-center gap-2 border border-green-500 bg-white text-green-500 rounded-full px-4 py-2 text-sm font-medium transition duration-300">
                    <CheckCircle size={19} />
                    <span>Installed</span>
                  </button>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteBanner;
