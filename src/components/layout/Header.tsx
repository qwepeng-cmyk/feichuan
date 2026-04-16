"use client";
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="site-header" className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <a href="#" className="logo">
          <img src="/logo.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="/logo.png" alt="N-TET Logo" className="logo-dark" />
        </a>

        <input type="checkbox" id="nav-checkbox" className="hidden" />
        <label htmlFor="nav-checkbox" className="menu-toggle">☰</label>

        <nav className="main-nav">
          <div className="nav-item">
            <div className="nav-link">Home</div>
          </div>
          <div className="nav-item group">
            <div className="nav-link">Solutions</div>
            <div className="mega-menu group-hover:opacity-100 group-hover:visible">
               <div className="container grid grid-cols-4 gap-12 w-full">
                  <div className="mega-column">
                    <h3 className="mega-title">Border Patrol</h3>
                    <ul className="mega-list">
                      <li><a href="#">Maritime Patrol</a></li>
                      <li><a href="#">Land Surveillance</a></li>
                    </ul>
                  </div>
                  {/* ... other columns ... */}
               </div>
            </div>
          </div>
          <div className="nav-item">
            <div className="nav-link">Products</div>
          </div>
          <div className="nav-item">
            <div className="nav-link">Cases</div>
          </div>
          <div className="nav-item">
            <div className="nav-link">About</div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
