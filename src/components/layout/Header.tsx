"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
        <Link href="/" className="logo">
          <img src="/logo1.png" alt="N-TET Logo" className="logo-light" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="/logo1.png" alt="N-TET Logo" className="logo-dark" />
        </Link>

        <input type="checkbox" id="nav-checkbox" className="hidden" />
        <label htmlFor="nav-checkbox" className="menu-toggle">☰</label>

        <nav className="main-nav">
          <Link href="/" className="nav-item nav-link">Home</Link>
          <Link href="/solutions" className="nav-item nav-link">Solutions</Link>
          <Link href="/products" className="nav-item nav-link">Products</Link>
          <Link href="/cases" className="nav-item nav-link">Cases</Link>
          <Link href="/media" className="nav-item nav-link">Media</Link>
          <Link href="/about" className="nav-item nav-link">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
