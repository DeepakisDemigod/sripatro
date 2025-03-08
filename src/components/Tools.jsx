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
        <li>
          <Link
            to='/kundali'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Birth Kundali (AD)
          </Link>
        </li>
      </ol>

      <h3 className='text-lg font-semibold underline mb-4'>Horoscope</h3>
      <ol className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
        <li>
          <Link
            to='/horoscope/daily'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Daily Horoscope
          </Link>
        </li>
        <li>
          <Link
            to='/horoscope/weekly'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Weekly Horoscope
          </Link>
        </li>
        <li>
          <Link
            to='/horoscope/monthly'
            className='transition-colors duration-200 block  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
          >
            Monthly Horoscope
          </Link>
        </li>
      </ol>

      <br />
      <a
        href='https://www.producthunt.com/products/sri-patro/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-sri&#0045;patro'
        target='_blank'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=light'
          alt='Sri&#0032;Patro - Best&#0032;Nepali&#0032;and&#0032;English&#0032;Calender&#0032;forAccurate&#0032;Hourly&#0032;Panchang | Product Hunt'
          style={{ width: '100vw', height: '54px' }}
        />
      </a>
    </div>
  );
};

export default Tools;
