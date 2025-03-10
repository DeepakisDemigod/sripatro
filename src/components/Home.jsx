import Tools from './Tools.jsx';
import React from 'react';
import Patro from './Patro.jsx';
import Calender from './Calender.jsx';
import Horoscope from './Horoscope.jsx';

const Home = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
        <div className=''>
          <Calender />
        </div>

        <Patro />
        <div>
          <Tools />
        </div>
      </div>
    </div>
  );
};

export default Home;
