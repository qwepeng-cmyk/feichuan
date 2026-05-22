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
        <h1 className="hero-title">Industrial Unmanned Systems<br />and Monitoring Solutions</h1>
        <p className="hero-subtitle">Connecting technology and applications for industrial security, monitoring, and emergency operations.</p>
        <a href="#" className="btn btn-orange">Discover Solutions ↗</a>
      </div>
    </section>
  );
};

export default Hero;
