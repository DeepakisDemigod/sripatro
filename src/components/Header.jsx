import React from 'react';

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-red-700 text-white'>
      <h3 className='text-2xl font-bold'>
        <a href='/'>Sri Patro</a>
      </h3>
      <a href='mailto:deepakthapa1423@gmail.com?subject=Feedback%20for%20Sri%20Patro&body=I%20would%20Like%20to%20have%20a%20Feature...'>
        <button className='btn font-bold'>Feedback</button>
      </a>
      <a href='/birthpanchang'>
        <button className='font-bold'>Birth Panchang</button>
      </a>
    </div>
  );
};

export default Header;
