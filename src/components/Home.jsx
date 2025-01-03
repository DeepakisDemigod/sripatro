import React from 'react';
import Patro from './Patro.jsx';
import Calender from './Calender.jsx';

const Home = () => {
  return (
    <div className='md:flex justify-around lg:flex justify-around'>
      <Calender />
      <Patro />
    </div>
  );
};

export default Home;
