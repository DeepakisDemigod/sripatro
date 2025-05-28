import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FlagBanner,
  Bell,
  Cake,
  Calendar,
  ChartLine,
  Star,
  Sun,
  DiamondsFour
} from 'phosphor-react';
import ThemeToggle from './ThemeToggle.jsx';
import SearchBar from './SearchBar.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';
import SiteBanner from './SiteBanner.jsx';

export default function Header() {
  const { t } = useTranslation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const drawerCheckboxRef = useRef(null);

  const handleLinkClick = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <header className='bg-base-300 text-base-content shadow-sm'>
      <div className='drawer'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          ref={drawerCheckboxRef}
        />

        {/* Main Content */}
        <div className='drawer-content flex flex-col'>
          <nav className='navbar px-4 md:px-6'>
            <div className='flex-none'>
              <label
                htmlFor='my-drawer'
                className='btn btn-ghost btn-circle'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </label>
            </div>

            {/* Logo */}
            <div className='flex-1'>
              <Link
                to='/'
                className='flex items-center gap-2 btn btn-ghost text-lg font-bold'
              >
                <img
                  src='/Shri-symbol.svg'
                  alt='Sri Patro'
                  className='w-8'
                />
                Sri Patro
              </Link>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-2'>
              {/* Notification Bell Button */}
              <div
                className='btn btn-ghost btn-circle'
                onClick={() =>
                  document.getElementById('notif_modal').showModal()
                }
              >
                <div className='indicator'>
                  <Bell
                    size={24}
                    className=''
                  />
                  <span className='indicator-item status status-error'></span>
                </div>
              </div>

              {/* Modal */}
              <dialog
                id='notif_modal'
                className='modal'
              >
                <div className='modal-box bg-base-100 text-base-content'>
                  <h2 className='font-bold text-lg'>🎉 Download SriPatro!</h2>
                  <p className='py-4'>
                    SriPatro is now available to download at{' '}
                    <a
                      href='https://sripatro.vercel.app/'
                      className='underline text-red-500'
                    >
                      @sripatro
                    </a>
                    <SiteBanner />
                  </p>
                </div>
                <form
                  method='dialog'
                  className='modal-backdrop'
                >
                  <button>Close</button>
                </form>
              </dialog>

              {/* Feedback */}
              <a
                href='mailto:deepakthapa1423@gmail.com'
                className='tooltip tooltip-bottom'
                data-tip='Send Feedback'
              >
                <button className='btn btn-sm text-[13px] bg-red-700 text-white'>
                  Feedback
                </button>
              </a>
            </div>
          </nav>
        </div>

        {/* Drawer Sidebar */}
        <div className='drawer-side z-40 text-base-content'>
          <label
            htmlFor='my-drawer'
            className='drawer-overlay'
          ></label>
          <aside className='p-4 w-80 min-h-full bg-base-200 overflow-y-auto'>
            {/* Logo */}
            <div className='flex items-center justify-between gap-2 text-xl font-bold mb-6'>
              <div className='flex items-center gap-2 justify-between'>
                <img
                  src='/Shri-symbol.svg'
                  alt='Logo'
                  className='w-8'
                />
                Sri Patro
              </div>
              <div>
                <ThemeToggle />
              </div>
            </div>

            {/* Search and Language */}
            <div className='space-y-4 mb-6'>
              <SearchBar />
              <LanguageSwitcher />
            </div>

            {/* Astrology Section */}
            <section className='mb-6 '>
              <h3 className='text-lg font-semibold mb-3'>{t('Jyotish')}</h3>
              <div className='grid grid-cols-2 gap-3 mx-2'>
                <Link
                  to='/'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>📆</span>
                  <span className='text-xs mt-2 text-center group-hover:text-base-content'>
                    {t('Panchang Today')}
                  </span>
                </Link>
                <Link
                  to='/date-converter'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🗓️</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Date Converter')}
                  </span>
                </Link>
                <Link
                  to='/birthpanchang'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'> 🇮🇳</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Birth Panchang (AD)')}
                  </span>
                </Link>
                <Link
                  to='/nepalitoenglish'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🇳🇵</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Bikram Sambat to Panchang (BS)')}
                  </span>
                </Link>
                <Link
                  to='/kundali'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-4xl shadow-2xl'>🪐</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Birth Kundali (AD)')}
                  </span>
                </Link>
                <Link
                  to='/nepali-cheena'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🧧</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Nepali Cheena')}
                  </span>
                </Link>
                
              </div>
            </section>

            {/* Horoscope Section */}
            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-3'>{t('Horoscope')}</h3>
              <div className='grid grid-cols-2 gap-3'>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🐏</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Daily Horoscope')}
                  </span>
                </Link>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24  justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🐏</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Weekly Horoscope')}
                  </span>
                </Link>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn   flex items-center flex-col h-24 justify-center bg-base-100 hover:bg-base-200 transition duration-200 group'
                >
                  <span className='text-3xl shadow-2xl'>🐏</span>
                  <span className='text-xs mt-2  text-center group-hover:text-base-content'>
                    {t('Monthly Horoscope')}
                  </span>
                </Link>
              </div>
            </section>

            {/* Product Hunt Badge */}
            <div className='mt-6'>
              <a
                href='https://www.producthunt.com/products/sri-patro/reviews?utm_source=badge-product_review'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=neutral'
                  alt='Sri Patro on Product Hunt'
                  className='w-25'
                />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}
