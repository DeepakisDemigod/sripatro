import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowSquareOut, Bell } from 'phosphor-react';
import SearchBar from './SearchBar.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header className='bg-white text-black shadow-sm'>
      <div className='drawer'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
        />

        {/* Main Content */}
        <div className='drawer-content flex flex-col'>
          <nav className='navbar px-4 md:px-6'>
            <div className='flex-none lg:hidden'>
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
              {/* Search */}
              {/*  <button
                className='btn btn-ghost btn-circle'
                onClick={() => setShowSearchBar(!showSearchBar)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>

              {showSearchBar && (
                <div className='absolute top-full mt-2 right-4 w-72 bg-white rounded shadow-lg z-50'>
                  <SearchBar />
                </div>
              )}*/}

              {/* Notification */}
              {/* Notification Bell Button */}
              <div
                className='btn btn-ghost btn-circle'
                onClick={() =>
                  document.getElementById('notif_modal').showModal()
                }
              >
                <div className='indicator'>
                  <Bell size={21} />
                  <span className="indicator-item status status-success"></span>

                </div>
                
              </div>

              {/* Modal */}
              <dialog
                id='notif_modal'
                className='modal '
              >
                <div className='modal-box bg-white text-black'>
                  <h2 className='font-bold text-lg'>🎉 Download SriPatro!</h2>
                  <p className='py-4'>
                    SriPatro is now available to download at{' '}
                    <a
                      href='https://sripatro.vercel.app/'
                      className='underline text-red-500'
                    >
                      @sripatro
                    </a>
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
                <button className='btn btn-sm btn-outline text-black'>
                  Feedback
                </button>
              </a>
            </div>
          </nav>
        </div>

        {/* Drawer Sidebar */}
        <div className='drawer-side z-40 text-black bg-white'>
          <label
            htmlFor='my-drawer'
            className='drawer-overlay'
          ></label>
          <aside className='menu p-4 w-80 min-h-full bg-white  space-y-6 overflow-y-auto'>
            <div className='flex items-center gap-2 text-xl text-black font-bold'>
              <img
                src='/Shri-symbol.svg'
                alt='Logo'
                className='w-8'
              />
              Sri Patro
            </div>

            <SearchBar />
            <LanguageSwitcher />

            <div className='text-black'>
              <h3 className='text-lg font-semibold mb-2 underline'>
                Explore More Tools
              </h3>
              <ul className='space-y-1 pl-2 border-l-4 border-red-600'>
                <li>
                  <Link to='/'>
                    Panchang Today <ArrowSquareOut size={18} />
                  </Link>
                </li>
                <li>
                  <Link to='/birthpanchang'>
                    Birth Panchang (AD) <ArrowSquareOut size={18} />
                  </Link>
                </li>
                <li>
                  <Link to='/nepalitoenglish'>
                    Bikram Sambat to Panchang (BS) <ArrowSquareOut size={18} />
                  </Link>
                </li>
                <li>
                  <Link to='/kundali'>
                    Birth Kundali (AD) <ArrowSquareOut size={18} />
                  </Link>
                </li>
              </ul>
            </div>

            <div className='text-black'>
              <h3 className='text-lg font-semibold mb-2 underline'>
                Horoscope
              </h3>
              <ul className='space-y-1 pl-2 border-l-4 border-red-600'>
                <li>
                  <Link to='/horoscope/daily'>
                    Daily Horoscope <ArrowSquareOut size={18} />
                  </Link>
                </li>
                <li>
                  <Link to='/horoscope/weekly'>
                    Weekly Horoscope <ArrowSquareOut size={18} />
                  </Link>
                </li>
                <li>
                  <Link to='/horoscope/monthly'>
                    Monthly Horoscope <ArrowSquareOut size={18} />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <a
                href='https://www.producthunt.com/products/sri-patro/reviews?utm_source=badge-product_review'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=light'
                  alt='Sri Patro on Product Hunt'
                  className='w-full'
                />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}
