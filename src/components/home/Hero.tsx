"use client";
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <video 
        src="/index_banner_bg_3.mp4"
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      ></video>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">Industrial Aerial Platform &<br />Low-Altitude Defense Systems</h1>
        <p className="hero-subtitle">N-TET builds two core system lines: industrial Aerial Platform platforms for inspection and emergency missions, and Low-Altitude Defense systems for early warning, identification, positioning, tracking, alert linkage, and site response protocols at airports, energy facilities, and public sites.</p>
        <a href="#" className="btn btn-orange">Discover Solutions</a>
      </div>
    </section>
  );
};

export default Hero;
