/*import Tools from './Tools.jsx';
import SearchBar from './SearchBar.jsx';

export default function Header() {
  return (
    <div className='bg-white text-black'>
      <nav>
        <div className='drawer bg-white text-black'>
          <input
            id='my-drawer'
            type='checkbox'
            className='drawer-toggle bg-white text-black'
          />
          <div className='drawer-content'>
            
            <div className='navbar px-6 shadow-lg'>
              <div className='navbar-start'>
                <div className='dropdown'>
          
                  <label
                    htmlFor='my-drawer'
                    className='btn btn-ghost btn-circle lg:hidden'
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
                        d='M4 6h16M4 12h8m-8 6h16'
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className='menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow'
                  >
                    <li>
                      <a>Homepage</a>
                    </li>
                    <li>
                      <a>Portfolio</a>
                    </li>
                    <li>
                      <a>About</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href='/'
                    className='btn btn-ghost text-xl'
                  >
                    <img
                      className='w-10'
                      src='/Shri-symbol.svg'
                      alt='shri_logo'
                    />
                    <span>Sri Patro</span>
                  </a>
                </div>
              </div>
              <div className='navbar-end'>
                
                
                
                <div className='tooltip tooltip-bottom'>
                  <div className='tooltip-content bg-white'>
                    <div className='bg-white text-red-500 -rotate-10 text-2xl font-black'>
                      <SearchBar />
                    </div>
                  </div>
                 <button className='btn btn-ghost btn-circle'>
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
                </div>
                
                <button className='btn btn-ghost btn-circle'>
                  <div className='indicator'>
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
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                    <span className='badge bg-blue-600  badge-xs  indicator-item'>
                      +1
                    </span>
                  </div>
                </button>
                <div className='tooltip tooltip-bottom'>
                  <div className='tooltip-content bg-white'>
                    <div className='animate-bounce bg-white text-red-500 -rotate-10 text-2xl font-black'>
                      thanks!
                    </div>
                  </div>
                  <a href="mailto:deepakthapa1423@gmail.com"><button className='btn bg-white text-black text-md'>
                FeedBack
                  </button></a>
                </div>
              </div>
            </div>
          </div>

        
          <div className=' z-20 drawer-side text-2xl'>
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='menu bg-white rounded-lg text-black text-base-content min-h-full w-80 p-4'>
          
              <div className='flex items-center justify-start'>
                <a
                  href='/'
                  className='btn btn-ghost text-xl'
                >
                  <img
                    className='w-10'
                    src='/Shri-symbol.svg'
                    alt='shri_logo'
                  />
                  <span>Sri Patro</span>
                </a>
              </div>
              <SearchBar />
              <Tools />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
*/

/*
import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className='bg-white text-black'>
      <nav>
        <div className='drawer bg-white text-black'>
          <input
            id='my-drawer'
            type='checkbox'
            className='drawer-toggle bg-white text-black'
          />
          <div className='drawer-content'>
            
            <div className='navbar px-6 shadow-lg'>
              <div className='navbar-start'>
                <div className='dropdown'>
                  
                  <label
                    htmlFor='my-drawer'
                    className='btn btn-ghost btn-circle lg:hidden'
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
                        d='M4 6h16M4 12h8m-8 6h16'
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className='menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow'
                  >
                    <li>
                      <a>Homepage</a>
                    </li>
                    <li>
                      <a>Portfolio</a>
                    </li>
                    <li>
                      <a>About</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href='/'
                    className='btn btn-ghost text-xl'
                  >
                    <img
                      className='w-10'
                      src='/Shri-symbol.svg'
                      alt='shri_logo'
                    />
                    <span>Sri Patro</span>
                  </a>
                </div>
              </div>
              <div className='navbar-end'>
                <button
                  className='btn btn-ghost btn-circle'
                  onClick={toggleSearchBar}
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
                  <div className='absolute top-full right-0 mt-2 w-64 bg-white rounded shadow-md z-20'>
                    <SearchBar />
                  </div>
                )}

                <div className='bg-white text-black dropdown dropdown-end'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='btn btn-circle btn-ghost btn-xs text-info'
                  >
                    <button className='btn btn-ghost btn-circle'>
                      <div className='indicator'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='#000000'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                          />
                        </svg>
                        <span className='badge badge-xs bg-blue-500 indicator-item'></span>
                      </div>
                    </button>
                  </div>
                  <div
                    tabIndex={0}
                    className='card card-compact dropdown-content bg-base-100 rounded-box z-10 shadow-sm w-64 md:w-80 lg:w-96'
                  >
                    <div
                      tabIndex={0}
                      className='card-body bg-white'
                    >
                      <h2 className='card-title text-md md:text-md lg:text-lg'>
                        🎉 Download SriPatro on Andriod !
                      </h2>
                      <p
                        className='text-sm md:text-sm lg:text-md'
                        style={{ lineHeight: '19px' }}
                      >
                        sripatro is now available to download for andriod
                        devices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='tooltip tooltip-bottom'>
                  <div className='tooltip-content bg-white'>
                    <div className='animate-bounce bg-white text-red-500 -rotate-10 text-2xl font-black'>
                      thanks!
                    </div>
                  </div>
                  <a href='mailto:deepakthapa1423@gmail.com'>
                    <button className='btn bg-white text-black text-md'>
                      FeedBack
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          
          <div className=' z-20 drawer-side text-2xl'>
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='menu bg-white rounded-lg text-black text-base-content min-h-full w-80 p-4'>
          
              <div className='flex items-center justify-start'>
                <a
                  href='/'
                  className='btn btn-ghost text-xl'
                >
                  <img
                    className='w-10'
                    src='/Shri-symbol.svg'
                    alt='shri_logo'
                  />
                  <span>Sri Patro</span>
                </a>
              </div>
              <SearchBar />
              <div className='bg-white rounded-lg shadow-md p-6'>
        <h3 className='text-lg font-semibold underline mb-4'>
          Explore More Tools
        </h3>
        <ol className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
          <li>
            <Link
              to='/'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Panchang Today (Live) <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/birthpanchang'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Birth Panchang (AD)
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/nepalitoenglish'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Bikram Sambat to Panchang (BS)
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/kundali'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Birth Kundali (AD)
              <ArrowSquareOut size={18} />
            </Link>
          </li>
        </ol>
        <br />

        <h3 className='text-lg font-semibold underline mb-4'>Horoscope</h3>
        <ul className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
          <li>
            <Link
              to='/horoscope/daily'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Daily Horoscope
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/horoscope/weekly'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Weekly Horoscope
              <ArrowSquareOut size={18} />
            </Link>
          </li>
          <li>
            <Link
              to='/horoscope/monthly'
              className='transition-colors duration-200 block hover:underline flex  px-4  focus:outline-none focus:ring-2  focus:ring-opacity-50'
            >
              Monthly Horoscope
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
            src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=light'
            alt='Sri&#0032;Patro - Best&#0032;Nepali&#0032;and&#0032;English&#0032;Calender&#0032;forAccurate&#0032;Hourly&#0032;Panchang | Product Hunt'
            style={{ width: '100vw', height: '54px' }}
          />
        </a>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
*/
import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { ArrowSquareOut } from 'phosphor-react';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className='bg-white text-black'>
      <nav>
        <div className='drawer bg-white text-black'>
          <input
            id='my-drawer'
            type='checkbox'
            className='drawer-toggle bg-white text-black'
          />
          <div className='drawer-content'>
            {/* Page content here */}
            <div className='navbar px-6 shadow-lg'>
              <div className='navbar-start'>
                <div className='dropdown'>
                  {/* Hamburger icon to open drawer */}
                  <label
                    htmlFor='my-drawer'
                    className='btn btn-ghost btn-circle lg:hidden'
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
                        d='M4 6h16M4 12h8m-8 6h16'
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className='menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow'
                  >
                    <li>
                      <a>Homepage</a>
                    </li>
                    <li>
                      <a>Portfolio</a>
                    </li>
                    <li>
                      <a>About</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <a
                    href='/'
                    className='btn btn-ghost text-xl'
                  >
                    <img
                      className='w-10'
                      src='/Shri-symbol.svg'
                      alt='shri_logo'
                    />
                    <span>Sri Patro</span>
                  </a>
                </div>
              </div>
              <div className='navbar-end'>
                <button
                  className='btn btn-ghost btn-circle'
                  onClick={toggleSearchBar}
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
                  <div className='absolute top-full right-0 mt-2 w-64 bg-white rounded shadow-md z-20'>
                    <SearchBar />
                  </div>
                )}

                <div className='bg-white text-black dropdown dropdown-end'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='btn btn-circle btn-ghost btn-xs text-info'
                  >
                    <button className='btn btn-ghost btn-circle'>
                      <div className='indicator'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='#000000'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                          />
                        </svg>
                        <span className='badge badge-xs bg-blue-500 indicator-item'></span>
                      </div>
                    </button>
                  </div>
                  <div
                    tabIndex={0}
                    className='card card-compact dropdown-content bg-base-100 rounded-box z-10 shadow-sm w-64 md:w-80 lg:w-96'
                  >
                    <div
                      tabIndex={0}
                      className='card-body bg-white'
                    >
                      <h2 className='card-title text-md md:text-md lg:text-lg'>
                        🎉 Download SriPatro!
                      </h2>
                      <p
                        className='text-sm md:text-sm lg:text-md'
                        style={{ lineHeight: '19px' }}
                      >
                        sripatro is now available to download 
                        
                      </p>
                    </div>
                  </div>
                </div>

                <div className='tooltip tooltip-bottom'>
                  <div className='tooltip-content bg-white'>
                    <div className='animate-bounce bg-white text-red-500 -rotate-10 text-2xl font-black'>
                      thanks!
                    </div>
                  </div>
                  <a href='mailto:deepakthapa1423@gmail.com'>
                    <button className='btn bg-white text-black text-md'>
                      FeedBack
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Drawer */}
          <div className='z-20 drawer-side text-2xl'>
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>
            <ul className='menu bg-white rounded-lg text-black text-base-content min-h-full w-80 p-4'>
              {/* Sidebar header */}
              <li>
                <div className='flex items-center justify-start'>
                  <a
                    href='/'
                    className='btn btn-ghost text-xl'
                  >
                    <img
                      className='w-10'
                      src='/Shri-symbol.svg'
                      alt='shri_logo'
                    />
                    <span>Sri Patro</span>
                  </a>
                </div>
              </li>
              {/* Sidebar search */}
              <li>
                <SearchBar />
              </li>
              {/* Sidebar Tools */}
              <li>
                <div className='flex flex-col bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-lg font-semibold underline mb-4'>
                    Explore More Tools
                  </h3>
                  <ol className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
                    <li>
                      <Link
                        to='/'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Panchang Today (Live) <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/birthpanchang'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Birth Panchang (AD) <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/nepalitoenglish'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Bikram Sambat to Panchang (BS){' '}
                        <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/kundali'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Birth Kundali (AD) <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                  </ol>
                  <br />
                  <h3 className='text-lg font-semibold underline mb-4'>
                    Horoscope
                  </h3>
                  <ul className='text-sm list-none pl-0 border border-l-4 border-l-red-600'>
                    <li>
                      <Link
                        to='/horoscope/daily'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Daily Horoscope <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/horoscope/weekly'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Weekly Horoscope <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/horoscope/monthly'
                        className='transition-colors duration-200 block hover:underline flex px-4 focus:outline-none focus:ring-2 focus:ring-opacity-50'
                      >
                        Monthly Horoscope <ArrowSquareOut size={18} />
                      </Link>
                    </li>
                  </ul>
                  <br />
                  <a
                    href='https://www.producthunt.com/products/sri-patro/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-sri&#0045;patro'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img
                      src='https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=864650&theme=light'
                      alt='Sri Patro - Best Nepali and English Calender for Accurate Hourly Panchang | Product Hunt'
                      style={{ width: '100vw', height: '54px' }}
                    />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
