import React from 'react';

const Tiles = () => {
  return (
    <div>
      <div className='flex stats shadow bg-white text-black '>
        <div>
          <a href='nepalitoenglish'>
            <div className='stat'>
              <div className='stat-figure text-secondary text-black'>BS</div>
              <div className='stat-value'>🇳🇵</div>
              <div className='stat-desc text-black font-bold'>Panchang</div>
            </div>
          </a>
          <a href='/kundali'>
            <div className='stat'>
              <div className='stat-figure text-secondary text-black'>AD</div>
              <div className='stat-value'>🪐</div>
              <div className='stat-desc text-black font-bold'>Kundali</div>
            </div>
          </a>
        </div>

        <div>
          <a href='/birthpanchang'>
            <div className='stat'>
              <div className='stat-figure text-secondary text-black'>AD</div>
              <div className='stat-value'>🇮🇳</div>
              <div className='stat-desc text-black font-bold'>Panchang</div>
            </div>
          </a>

          <a href='/horoscope/daily'>
            <div className='stat'>
              <div className='stat-figure text-secondary'>AD</div>
              <div className='stat-value'>🐏</div>
              <div className='stat-desc text-black font-bold'>Horoscope</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tiles;
