/*import React, { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Dummy suggestions
  const dummySuggestions = [
    {
      title: 'Birth Panchang (AD)',
      link: '/birthpanchang',
      desc: 'get panchang from indian (ad) date of birth and time.'
    },
    {
      title: 'Nepali Panchang (BS)',
      link: '/nepalitoenglish',
      desc: 'get panchang from nepali (bs) date of birth and time.'
    },
    {
      title: 'Kundali Report (AD)',
      link: '/kundali',
      desc: 'get kundali from date of birth and time.'
    },
    {
      title: 'Horoscope (Daily)',
      link: '/horoscope/daily',
      desc: 'get daily horoscope today, yesterday and tommorow'
    }
  ];

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter suggestions based on input
    const filteredSuggestions = dummySuggestions.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = suggestion => {
    setSearchTerm(suggestion.title); // Set search term to the title
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className=' relative w-full'>
      <label className='bg-white text-black input shadow-sm border border-2 border-blue-300 w-full'>
        <MagnifyingGlass size={25} />
        <input
          type='search'
          placeholder='Search...'
          className='grow px-2 bg-white text-black w-full rounded shadow-sm border border-2 border-blue-300 focus:outline-none focus:ring focus:ring-blue-300'
          value={searchTerm}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => setShowSuggestions(true)}
        />
        <kbd className='border border-2 border-blue-300 kbd kbd-sm bg-white text-black'>
          ⌘
        </kbd>
        <kbd className='border border-2 border-blue-300 kbd kbd-sm bg-white text-black'>
          K
        </kbd>
      </label>
      {showSuggestions && suggestions.length > 0 && (
        <ul className='absolute left-0 mt-1 w-full bg-white border rounded shadow-md z-10'>
          {suggestions.map((suggestion, index) => (
            <a href={suggestion.link}>
              <li
                key={index}
                className='flex m-1 rounded border-b-gray-700  cursor-pointer'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className='flex rounded-full bg-white'>
                  <img
                    src='/Shri-symbol.svg'
                    alt='logo'
                    className='w-7'
                  />
                  <p className='font-semibold hover:underline'>
                    {suggestion.title}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm text-gray-500 hover:underline'>
                    {suggestion.desc}
                  </p>
                </div>
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
*/

import React, { useState} from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Dummy suggestions
  const dummySuggestions = [
    {
      title: 'Birth Panchang (AD)',
      link: '/birthpanchang',
      desc: 'get panchang from indian (ad) date of birth and time.'
    },
    {
      title: 'Nepali Panchang (BS)',
      link: '/nepalitoenglish',
      desc: 'get panchang from nepali (bs) date of birth and time.'
    },
    {
      title: 'Kundali Report (AD)',
      link: '/kundali',
      desc: 'get kundali from date of birth and time.'
    },
    {
      title: 'Horoscope (Daily)',
      link: '/horoscope/daily',
      desc: 'get daily horoscope today, yesterday and tommorow'
    }
  ];

  const handleChange = event => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter suggestions based on input
    const filteredSuggestions = dummySuggestions.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = suggestion => {
    setSearchTerm(suggestion.title); // Set search term to the title
    setSuggestions([]);
    setShowSuggestions(false);
  };

  

  return (
    <div className='relative w-full md:w-96 lg:w-1/2'>
      {/* Responsive width */}
      <label className='bg-white text-black input shadow-sm border border-2 border-blue-300 w-full flex items-center'>
        <MagnifyingGlass
          size={25}
          className='ml-2'
        />{' '}
        {/* Added margin */}
        <input
          type='search'
          placeholder='Search...'
          className='grow px-2 bg-white text-black focus:outline-none'
          value={searchTerm}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => setShowSuggestions(true)}
        />
        <kbd className='kbd kbd-sm bg-white text-black border border-blue-300'>
          ⌘
        </kbd>
        <kbd className='kbd kbd-sm bg-white text-black border border-blue-300'>
          K
        </kbd>
      </label>
      {showSuggestions && suggestions.length > 0 && (
        <ul className='absolute left-0 mt-1 w-full bg-white border rounded shadow-md z-10'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Link
                to={suggestion.link}
                className='flex items-center w-full no-underline text-black'
              >
                <img
                  src='/Shri-symbol.svg'
                  alt='logo'
                  className='w-7 mr-2'
                />
                <div>
                  <p className='font-semibold hover:underline'>
                    {suggestion.title}
                  </p>
                  <p className='text-sm text-gray-500'>{suggestion.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
