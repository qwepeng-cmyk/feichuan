"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <Link href="/" className="logo" style={{ position: 'relative', display: 'block', width: '120px', height: '40px' }}>
          <Image src="/logo1.webp" alt="N-TET Logo" fill style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} className="logo-light" />
          <Image src="/logo1.webp" alt="N-TET Logo" fill style={{ objectFit: 'contain' }} className="logo-dark" />
        </Link>

        <input type="checkbox" id="nav-checkbox" className="hidden" />
        <label htmlFor="nav-checkbox" className="menu-toggle">Menu</label>

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

