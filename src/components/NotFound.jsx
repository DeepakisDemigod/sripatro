import React from 'react';
import { Headset, House, WarningCircle } from 'phosphor-react';

const NotFound = () => {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-base-100 text-base-content px-4">
      <div className="card bg-base-200 shadow-xl rounded-xl p-8 max-w-md w-full flex flex-col items-center">
        <WarningCircle size={64} className="text-error mb-2" />
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-1">Page Not Found</h2>
        <p className="text-base-content/70 mb-6 text-center">
          Sorry, the page you are looking for does not exist or has been moved.<br />
          Please check the URL or return to the homepage.
        </p>
        <div className="flex gap-3 w-full justify-center">
          <a href="/" className="text-white btn bg-red-500 flex items-center gap-2 rounded-lg font-semibold">
            <House size={22} />
            Home
          </a>
          <a href="mailto:deepakthapa" className="text-base-content hover:border hover:text-red-400 hover:border-red-400 btn flex items-center gap-2 rounded-lg font-semibold">
            <Headset size={22} />
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
