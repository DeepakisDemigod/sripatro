import React from 'react';
import { Headset, House } from 'phosphor-react';

const NotFound = () => {
  return (
    <div className=''>
      <div className='h-[60vh] flex flex-col items-center justify-center bg-white text-black min-h-full px-4 py-4  sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
        <div className='mx-auto max-w-max'>
          <div className='mt-5'>
            <div className='flex mt-6'>
              <p className='mt-4 text-4xl font-extrabold text-black sm:text-5xl'>
                Oops
              </p>
              <div className='ml-6'>
                <div className='pl-6 border-l border-gray-500'>
                  <h2 className='text-3xl font-bold tracking-tight text-black  sm:text-4xl'>
                    Something went wrong!
                  </h2>
                  <p className='mt-1 text-md text-black '>
                    Please select a topic from the tag cloud above or go back
                    home
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <a href='/'>
            <button className='btn bg-white text-black px-2 py-1'>
              <House size={21} />
              <span>Home</span>
            </button>
          </a>
          <a href='mailto:deepakthapa'>
            <button className='btn bg-white text-black px-2 py-1'>
              <Headset size={21} />
              <span>Support</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
