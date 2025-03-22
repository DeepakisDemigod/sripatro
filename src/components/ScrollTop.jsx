import React, { useState, useEffect } from 'react';
import { ArrowLineUp } from 'phosphor-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled beyond 100px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    isVisible && (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '15px 15px',
          borderRadius: '50px',
          cursor: 'pointer'
        }}
        onClick={scrollToTop}
      >
        <ArrowLineUp
          size={25}
          weight='bold'
        />
      </div>
    )
  );
};

export default ScrollToTop;
