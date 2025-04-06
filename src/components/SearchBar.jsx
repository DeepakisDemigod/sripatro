import React, { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('a');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dummySuggestions = [
    {
      title: 'Birth Panchang (AD)',
      link: '/birthpanchang',
      desc: 'Get Panchang from Indian (AD) date of birth and time.'
    },
    {
      title: 'Nepali Panchang (BS)',
      link: '/nepalitoenglish',
      desc: 'Get Panchang from Nepali (BS) date of birth and time.'
    },
    {
      title: 'Kundali Report (AD)',
      link: '/kundali',
      desc: 'Get Kundali from date of birth and time.'
    },
    {
      title: 'Horoscope (Daily)',
      link: '/horoscope',
      desc: 'Get daily horoscope today, yesterday and tomorrow.'
    }
  ];

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredSuggestions = dummySuggestions.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full md:w-96 lg:w-1/2">
      <label className="flex items-center gap-2 bg-base-100 text-base-content border border-blue-300 rounded-xl shadow-sm w-full px-3 py-2">
        <MagnifyingGlass size={20} />
        <input
          type="search"
          placeholder="Search..."
          className="grow bg-transparent focus:outline-none"
          value={searchTerm}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onFocus={() => setShowSuggestions(true)}
        />
        <div className="flex gap-1">
          <kbd className="kbd kbd-sm text-sm bg-base-200 text-base-content border border-blue-300">⌘</kbd>
          <kbd className="kbd kbd-sm text-sm bg-base-200 text-base-content border border-blue-300">K</kbd>
        </div>
      </label>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 mt-1 w-full bg-base-100 text-base-content border border-blue-300 rounded-xl shadow-lg z-20">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="flex items-start gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <Link to={suggestion.link} className="flex items-start gap-3 w-full no-underline text-inherit">
                <img src="/Shri-symbol.svg" alt="logo" className="w-7 mt-1" />
                <div>
                  <p className="font-semibold hover:underline">{suggestion.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.desc}</p>
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
