"use client";
import React, { useState, useRef, useEffect } from 'react';
import './menu.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';

const menuLinks = [
  { path: '/', label: "Home" },
  { path: '/#about', label: "About" },
  { path: '/#work', label: "Work" },
  { path: '/#game', label: "Game" },
  { path: '/#contact', label: "Contact" }
];

const Menu = () => {
  const tl = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, toggleMode } = useTheme();
  const linkRefs = useRef([]);
  const charRefs = useRef([]);
  const modeToggleRef = useRef();
  const menuOpenRef = useRef();
  const menuCloseRef = useRef();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    setIsMenuOpen(false);
    // Extract the ID from the path (e.g., '/#game' becomes '#game')
    const id = path.includes('#') ? path.split('#')[1] : path.replace('/', '');
    const selector = id ? `#${id}` : '#home';
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleModeToggle = () => {
    // Animate the mode toggle button
    gsap.to(modeToggleRef.current, {
      rotation: 360,
      scale: 1.2,
      duration: 0.3,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(modeToggleRef.current, {
          scale: 1,
          duration: 0.1
        });
      }
    });
    toggleMode();
  };

  const handleMenuOpenClick = () => {
    gsap.to(menuOpenRef.current, {
      scale: 0.8,
      duration: 0.05,
      yoyo: true,
      repeat: 1
    });
    handleMenuToggle();
  };

  const handleMenuCloseClick = () => {
    gsap.to(menuCloseRef.current, {
      rotation: 90,
      scale: 0.8,
      duration: 0.1,
      onComplete: () => {
        gsap.to(menuCloseRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.1
        });
      }
    });
    handleMenuToggle();
  };

  useGSAP(() => {
    // Menu overlay animation
    tl.current = gsap.timeline({ paused: true });
    
    tl.current
      .to('.menu-overlay', {
        visibility: 'visible',
        duration: 0
      })
      .fromTo('.menu-overlay', 
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
          duration: 0.4,
          ease: "power2.inOut"
        }
      )
      .fromTo('.menu-links', 
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        },
        '-=0.2'
      )
      .fromTo('.menu-bottom-row', 
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        },
        '-=0.15'
      );

    // Character splitting and animation for menu links
    linkRefs.current.forEach((linkRef, linkIndex) => {
      if (linkRef) {
        const text = linkRef.textContent;
        const chars = text.split('').map(char => 
          `<span class="menu-link-char">${char}</span>`
        ).join('');
        linkRef.innerHTML = chars;
        
        const charElements = linkRef.querySelectorAll('.menu-link-char');
        charRefs.current[linkIndex] = charElements;
        
        // Initial state for characters
        gsap.set(charElements, {
          y: 50,
          opacity: 0,
          rotationX: 45
        });
        
        // Animate characters in when menu opens
        tl.current.fromTo(charElements,
          {
            y: 50,
            opacity: 0,
            rotationX: 45
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.3,
            stagger: 0.02,
            delay: linkIndex * 0.05,
            ease: "back.out(1.7)"
          },
          '-=0.1'
        );
      }
    });

    // Hover animations for menu links
    linkRefs.current.forEach((linkRef, linkIndex) => {
      if (linkRef) {
        const charElements = linkRef.querySelectorAll('.menu-link-char');
        
        linkRef.addEventListener('mouseenter', () => {
          gsap.to(charElements, {
            y: -5,
            rotationX: 10,
            duration: 0.2,
            stagger: 0.01,
            ease: "power2.out"
          });
        });
        
        linkRef.addEventListener('mouseleave', () => {
          gsap.to(charElements, {
            y: 0,
            rotationX: 0,
            duration: 0.2,
            stagger: 0.01,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  useGSAP(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container">
      <div className="menu-bar">
        <div className="menu-logo">
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}>
            SHENAL GUNASKERA
          </a>
        </div>
        
        <div className="menu-actions">
          <div 
            ref={modeToggleRef}
            className="mode-toggle" 
            onClick={handleModeToggle}
          >
            <p>{mode === 'dark' ? '☀️' : '🌙'}</p>
          </div>
          
          <div 
            className="cv-download cursor-pointer transition-all duration-300 hover:scale-110"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Shenals CV.pdf';
              link.download = 'Shenals CV.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <p className="text-xl font-bold" style={{ color: 'var(--menu-bar-icon-color-light-mode)' }}>📄</p>
          </div>
          
          <div 
            ref={menuOpenRef}
            className="menu-open" 
            onClick={handleMenuOpenClick}
          >
            <p>☰</p>
          </div>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div key={link.path} className="menu-link-item">
                <div className="menu-link-item-holder">
                  <a
                    ref={el => linkRefs.current[index] = el}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.path);
                    }}
                  >
                    {link.label}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-bottom-row">
            <div className="menu-info">
              <div className="menu-info-col">
                <a href="mailto:shenalgd@gmail.com">shenalgd@gmail.com</a>
                <a href="tel:+12342342434">+1 (234) 234-2434</a>
                <p>Available for remote work worldwide</p>
              </div>
              <div className="menu-info-col">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </div>
            
            <div 
              ref={menuCloseRef}
              className="menu-close-icon" 
              onClick={handleMenuCloseClick}
            >
              <p>✕</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;