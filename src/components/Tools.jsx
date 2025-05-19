import { ArrowSquareOut } from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import { useTranslation } from 'react-i18next';

const Tools = () => {
  const { t } = useTranslation();
  return (
    <div className=' text-white text-left'>
      <div className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>{t('Jyotish')}</h3>
        <ol className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
          <li>
            <Link
              to='/'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Panchang Today (Live)')} <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/date-converter'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Date Converter')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/birthpanchang'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Birth Panchang (AD)')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/nepalitoenglish'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Bikram Sambat to Panchang (BS)')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/kundali'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Birth Kundali (AD)')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          
        </ol>
        <br />

        <h3 className='text-lg font-semibold mb-4'>{t('Horoscope')}</h3>
        <ul className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
          <li>
            <Link
              to='/horoscope'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Daily Horoscope')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/horoscope'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Weekly Horoscope')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/horoscope'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              {t('Monthly Horoscope')}
              <ArrowSquareOut size={18} />
            </Link>
          </li>
        </ul>

        <br />
        <a
          href='https://www.producthunt.com/products/sri-patro/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-sri&#0045;patro'
          target='_blank'
        >
          <img
            src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=dark'
            alt='Sri&#0032;Patro - Best&#0032;Nepali&#0032;and&#0032;English&#0032;Calender&#0032;forAccurate&#0032;Hourly&#0032;Panchang | Product Hunt'
            style={{ width: '100vw', height: '54px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default Tools;
