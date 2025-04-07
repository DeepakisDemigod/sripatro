import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FlagBanner, Bell, Cake, Calendar, ChartLine, Star, Sun } from 'phosphor-react';
import SearchBar from './SearchBar.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const drawerCheckboxRef = useRef(null);

  const handleLinkClick = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <header className='bg-white text-black shadow-sm'>
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
              {/* Notification Bell Button */}
              <div
                className='btn btn-ghost btn-circle'
                onClick={() =>
                  document.getElementById('notif_modal').showModal()
                }
              >
                <div className='indicator'>
                  <Bell size={24} className='text-red-500' />
                  <span className='indicator-item status status-success'></span>
                </div>
              </div>

              {/* Modal */}
              <dialog
                id='notif_modal'
                className='modal'
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
        <div className='drawer-side z-40'>
          <label
            htmlFor='my-drawer'
            className='drawer-overlay'
          ></label>
          <aside className='p-4 w-80 min-h-full bg-white text-black overflow-y-auto'>
            {/* Logo */}
            <div className='flex items-center gap-2 text-xl font-bold mb-6'>
              <img
                src='/Shri-symbol.svg'
                alt='Logo'
                className='w-8'
              />
              Sri Patro
            </div>

            {/* Search and Language */}
            <div className='space-y-4 mb-6'>
              <SearchBar />
              <LanguageSwitcher />
            </div>

            {/* Astrology Section */}
            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-3'>Astrology</h3>
              <div className='grid grid-cols-2 gap-3'>
                <Link
                  to='/'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <Calendar size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Panchang Today</span>
                </Link>
                <Link
                  to='/birthpanchang'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <Cake size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Birth Panchang</span>
                </Link>
                <Link
                  to='/nepalitoenglish'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <FlagBanner size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Nepali Panchang</span>
                </Link>
                <Link
                  to='/kundali'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <Sun size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Birth Kundali</span>
                </Link>
              </div>
            </section>

            {/* Horoscope Section */}
            <section className='mb-6'>
              <h3 className='text-lg font-semibold mb-3'>Horoscope</h3>
              <div className='grid grid-cols-2 gap-3'>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <Star size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Daily</span>
                </Link>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <ChartLine size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Weekly</span>
                </Link>
                <Link
                  to='/horoscope'
                  onClick={handleLinkClick}
                  className='btn btn-outline flex items-center flex-col h-24 justify-center bg-white text-black border border-zinc-200 hover:bg-red-500 hover:text-white hover:border-white transition duration-200 group'
                >
                  <Calendar size={32} className='text-red-500 group-hover:text-white' />
                  <span className='text-xs mt-2 text-center group-hover:text-white'>Monthly</span>
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