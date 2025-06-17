/*import React from "react";
import { Headset, House, MaskSad } from "phosphor-react";

const NotFound = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-base-100 text-base-content px-4">
      <div className="card bg-base-200 shadow-xl rounded-xl p-8 max-w-md w-full flex flex-col items-center">
        <MaskSad size={64} className="text-red-600 mb-2" /><div className="flex gap-1">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">4</h1>
        <img src="/sri.png" className="w-10  h-10 rounded-full" alt="logo-0"/>
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">4</h1>
</div>
        <h2 className="text-2xl font-bold mb-1">Page Not Found</h2>
        <p className="text-base-content/70 mb-6 text-center">
          Sorry, the page you are looking for does not exist or has been moved.
          <br />
          Please check the URL or return to the homepage.
        </p>
        <div className="flex gap-3 w-full justify-center">
          <a
            href="/"
            className="text-white btn bg-red-600 flex items-center gap-2 rounded-lg font-semibold"
          >
            <House size={22} />
            Home
          </a>
          <a
            href="mailto:deepakthapa1423@gmail.com"
            className="text-base-content hover:border hover:text-red-600 hover:border-red-600 btn flex items-center gap-2 rounded-lg font-semibold"
          >
            <Headset size={22} />
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;*/

/*

'use client';
import React from "react";
import { Headset, House, MaskSad } from "phosphor-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <div className="bg-base-200 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start p-8 gap-8 max-w-4xl w-full">

        <div className="flex flex-col items-center text-center md:text-left">
          <MaskSad size={72} className="text-red-600 mb-4" />
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-6xl font-black text-base-content">4</h1>
            <img
              src="/sri.png"
              className="w-12 h-12 rounded-full"
              alt="logo"
            />
            <h1 className="text-6xl font-black text-base-content">4</h1>
          </div>
          <h2 className="text-2xl font-semibold text-base-content mb-1">
            Page Not Found
          </h2>
          <p className="text-base text-base-content/70 max-w-sm">
            The page you're looking for doesn’t exist or may have been moved.
            Please check the URL or return to the homepage.
          </p>
        </div>


        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <a
            href="/"
            className="btn bg-red-600 text-white font-semibold flex items-center gap-2 w-full md:w-auto"
          >
            <House size={22} />
            Home
          </a>
          <a
            href="mailto:deepakthapa1423@gmail.com"
            className="btn border border-base-300 hover:border-red-600 hover:text-red-600 font-semibold flex items-center gap-2 w-full md:w-auto"
          >
            <Headset size={22} />
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;*/



'use client';
import React from "react";
import { Headset, House} from "phosphor-react";
import SearchBar from "./SearchBar.jsx"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-100 px-6 flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start p-8 gap-8 max-w-4xl w-full">

        {/* Left */}
        <div className="flex flex-col items-center text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-6xl font-medium font-black text-base-content">4</h1>
            <img
              src="/sri.png"
              className="w-10 h-10 border border-base-700 border-2 rounded-full animate-flicker rotate-45"
              alt="logo"
            />
            <h1 className="text-6xl font-medium font-black text-base-content">4</h1>
          </div>
          <h2 className="text-2xl font-semibold text-base-content mb-1">
            Page Not Found
          </h2>
          <p className="text-base-600 max-w-sm">
            The page you're looking for doesn’t exist or may have been moved.
            Please check the URL or return to the homepage.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
          <a
            href="/"
            className="btn bg-red-600 text-white font-semibold flex items-center gap-2 w-full md:w-auto"
          >
            <House size={22} />
            Home
          </a>
          <a
            href="mailto:deepakthapa1423@gmail.com"
            className="btn border border-base-300 hover:border-red-600 hover:text-red-600 font-semibold flex items-center gap-2 w-full md:w-auto"
          >
            <Headset size={22} />
            Support
          </a>
        
      </div>


      <div className="flex flex-col gap-2 items-start xs:border-t xs:border-base-400 sm:border-t sm:border-base-400  md:border-l md:border-base-400 lg:border-l lg:border-base-400 xl:border-l xl:border-base-400 p-4 ">
	  <p className="text-base-400 text-sm py-1">find panchang, kundali, horoscope and more on sripatro</p>

        <SearchBar />
	
      </div>
	  </div>
    </div>
  );
};

export default NotFound;


