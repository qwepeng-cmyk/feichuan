"use client";
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <video 
        src="/index_banner_bg_4.mp4"
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      ></video>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">Industrial UAV Systems<br />for Low-Altitude Operations</h1>
        <p className="hero-subtitle">Industrial UAV platforms, airspace awareness, event records, and compliant workflows for infrastructure operations.</p>
        <a href="#" className="btn btn-orange">Discover Solutions</a>
      </div>
    </section>
  );
};

export default Hero;
