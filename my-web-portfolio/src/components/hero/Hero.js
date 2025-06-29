// src/components/hero/Hero.js
// Make sure to include "use client" if you're using Next.js App Router
// and this component is rendered on the client side.
"use client"; 

import React from 'react';
import './hero.css'; // Your CSS file for styling
import { useTheme } from '@/contexts/ThemeContext';

const imageSets = [
  { folder: "js", alt: "JavaScript slide" },
  { folder: "j", alt: "JavaScript slide" },
  { folder: "t", alt: "JavaScript slide" },
  { folder: "r", alt: "JavaScript slide" },
  { folder: "c", alt: "JavaScript slide" },
  { folder: "h", alt: "JavaScript slide" },
];

const Hero = () => {
  const { mode } = useTheme();
  // Use 2.png for light mode, 1.png for dark mode
  const imgNum = mode === 'light' ? '2' : '1';
  const sliderImages = imageSets.map(set => ({
    src: `/images/${set.folder}/${imgNum}.png`,
    alt: `${set.alt} ${imgNum}`
  }));
  const quantity = sliderImages.length;

  // Set background image for .banner in dark mode
  const bannerStyle = {
    backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f8f8f8',
    backgroundImage: mode === 'dark' ? 'url(/images/dark.png.jpg)' : 'url(/images/light.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-color 0.3s ease, background-image 0.3s ease',
  };

  return (
    <div>
      <section className="hero">
        <div className="banner" style={bannerStyle}>
          {/* The slider-container wraps the actual slider.
            It's where we'll apply the CSS 'perspective' for the 3D effect.
            This helps avoid conflicts when the inner .slider is also animated with 'transform'.
          */}
          <div className="slider-container">
            {/* The slider itself. We pass the --quantity CSS variable here.
              It will hold the individual rotating items.
            */}
            <div className="slider" style={{ "--quantity": quantity }}>
              {sliderImages.map((image, index) => (
                // Each individual item within the slider.
                // We pass the --position CSS variable (1-based index).
                <div className="item" style={{ "--position": index + 1 }} key={index}>
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;