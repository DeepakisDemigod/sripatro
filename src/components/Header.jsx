import React from 'react';

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-red-700 text-white'>
      <h3 className='text-2xl font-bold'><a href="/">Sri Patro</a></h3>
      <a href='/birthpanchang'>
        <button className="font-bold">Birth Panchang</button>
      </a>
    </div>
  );
};

export default Header;
