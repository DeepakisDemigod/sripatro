import { useEffect, useState } from 'react';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  // Load saved theme or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <label className='bg-base-200 hover:bg-base-400 rounded-lg swap swap-rotate'>
      <input
        type='checkbox'
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />

      {/* Light (Sun) icon */}
      <Sun
        className='swap-off'
        size={22}
        weight='bold'
      />

      {/* Dark (Moon) icon */}
      <Moon
        className='swap-on'
        size={22}
        weight='bold'
      />
    </label>
  );
};

export default ThemeToggle;
