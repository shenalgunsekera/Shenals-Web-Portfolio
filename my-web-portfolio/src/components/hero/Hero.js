// src/components/hero/Hero.js
// Make sure to include "use client" if you're using Next.js App Router
// and this component is rendered on the client side.
"use client"; 

import React from 'react';
import Image from 'next/image';
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
    backgroundImage: mode === 'dark' ? 'url(/images/dark.png.jpg)' : 'url(/images/light.jpg)',
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
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    width={300}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 768px) 200px, 300px"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
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