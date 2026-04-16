"use client";
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <video 
        src="/videos/index_banner_bg_1.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      ></video>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">Global unmanned security field<br />Defense experts</h1>
        <p className="hero-subtitle">Connecting technology and applications, providing top-tier integrated security services to global clients.</p>
        <a href="#" className="btn btn-orange">Discover Solutions ↗</a>
      </div>
    </section>
  );
};

export default Hero;
