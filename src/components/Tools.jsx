/*import React from 'react';

const Tools = () => {
  return (
    <div>
      <h3>Also Checkout</h3>
      <ul>
        <a href='/birthpanchang'>
          <li>Birth Panchang (AD)</li>
        </a>
        <a href='/nepalitoenglish'>
          <li>Bikram Sambat to Panchang (BS)</li>
        </a>
      </ul>
    </div>
  );
};

export default Tools;
*/

import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const Tools = () => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h3 className='text-lg font-semibold underline mb-4'>
        Explore More Tools
      </h3>
      <ol className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
        <li>
          <Link
            to='/'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Panchang Today (Live)
          </Link>
        </li>
        <li>
          <Link
            to='/birthpanchang'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Birth Panchang (AD)
          </Link>
        </li>
        <li>
          <Link
            to='/nepalitoenglish'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Bikram Sambat to Panchang (BS)
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default Tools;
