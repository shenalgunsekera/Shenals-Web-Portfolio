"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function SimpleNavsProject() {
  const { mode } = useTheme();
  const pageRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (isLoading) return;

    // Page entrance animation
    gsap.fromTo('.project-hero',
      {
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );

    // Stagger animations for sections
    gsap.fromTo('.project-section',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.project-section',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating animation for hero elements
    gsap.to('.floating-element', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

  }, { scope: pageRef, dependencies: [isLoading] });

  if (isLoading) {
    return (
      <div className={`${styles.loadingScreen} fixed inset-0 flex items-center justify-center z-50`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className={`${styles.projectPage} ${mode === 'dark' ? styles.dark : ''}`}>
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/#work" className={`${styles.backButton}`}>
          <span className="text-xl">←</span>
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Section */}
      <section className="project-hero relative min-h-screen flex items-center justify-center p-8">
        <div className={`absolute inset-0 ${styles.bgGradientRadial}`}></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={`${styles.floatingElement} mb-8`}>
            <Image 
              src="/images/simple navs.webp" 
              alt="Simple-Navs Project" 
              width={800}
              height={600}
              className="rounded-3xl shadow-2xl mx-auto"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              quality={90}
            />
          </div>
          
          <h1 className={`text-6xl md:text-8xl font-black mb-6 ${styles.textGradient}`}>
            Simple-Navs
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 opacity-90 font-light">
            A fully customizable, responsive, and animated navigation bar for React applications
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className={`px-4 py-2 ${styles.bgGradientPrimary} text-white rounded-full font-semibold`}>
              React Library
            </span>
            <span className={`px-4 py-2 ${styles.glass} text-white rounded-full font-semibold`}>
              TypeScript
            </span>
            <span className={`px-4 py-2 ${styles.glass} text-white rounded-full font-semibold`}>
              npm Package
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://www.npmjs.com/package/simple-navs" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
            >
              View on npm
            </a>
            <a 
              href="https://github.com/yourusername/simple-navs" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="project-section py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-16 text-center ${styles.textGradient}`}>
            Project Overview
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div className="space-y-8">
              <div className={`${styles.glass} p-8 rounded-3xl`}>
                <h3 className={`text-3xl font-bold mb-4 ${styles.textGradient}`}>💡 The Idea</h3>
                <p className="text-lg leading-relaxed">
                  I was working on personal projects and got tired of rewriting the same navbar logic every time. 
                  Existing libraries either had too many dependencies or weren't flexible enough. So I built my own 
                  lightweight, animated, and easy-to-customize solution.
                </p>
              </div>
              
              <div className={`${styles.glass} p-8 rounded-3xl`}>
                <h3 className={`text-3xl font-bold mb-4 ${styles.textGradient}`}>🎯 What Makes It Special</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span>Super customizable with solid colors, gradients, and blur effects</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span>Built-in smooth animations and transitions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span>No bloat - just 4 dependencies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <span>Fully accessible with keyboard navigation</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className={`${styles.glass} p-8 rounded-3xl`}>
                <h3 className={`text-3xl font-bold mb-4 ${styles.textGradient}`}>🛠 Challenges Faced</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Mobile Menu Animation</h4>
                    <p className="text-gray-300">Getting the hamburger menu to animate smoothly was harder than expected. Solved with Framer Motion's layout animations.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Sticky Navbar Flickering</h4>
                    <p className="text-gray-300">Early versions had weird flickering. Fixed by debouncing scroll events and optimizing re-renders.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">TypeScript Gradient Types</h4>
                    <p className="text-gray-300">Almost gave up on gradients due to TypeScript issues. Solved with union types for strings and gradient objects.</p>
                  </div>
                </div>
              </div>
              
              <div className={`${styles.glass} p-8 rounded-3xl`}>
                <h3 className={`text-3xl font-bold mb-4 ${styles.textGradient}`}>📚 Key Learnings</h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <span>TypeScript catches bugs early and saves debugging time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <span>Documentation matters - spent more time on README than coding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Performance > fancy features - cut unnecessary code</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>Publishing to npm isn't scary - just npm publish!</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="project-section py-24 px-8 bg-gradient-to-br from-secondary-500/5 to-primary-500/5">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-bold mb-16 text-center ${styles.textGradient}`}>
            How to Use
          </h2>
          
          <div className={`${styles.glass} p-8 rounded-3xl`}>
            <h3 className={`text-2xl font-bold mb-6 ${styles.textGradient}`}>Installation</h3>
            <div className={`${styles.codeBlock} mb-8`}>
              <code className={`${styles.codeText} ${styles.installCode}`}>
                npm install simple-navs styled-components framer-motion
              </code>
            </div>
            
            <h3 className={`text-2xl font-bold mb-6 ${styles.textGradient}`}>Basic Usage</h3>
            <div className={styles.codeBlock}>
              <pre className={styles.codeText}>
{`import { NavBar } from "simple-navs";

function App() {
  return (
    <NavBar
      variant={{ 
        background: { gradient: "linear-gradient(to right, #8e2de2, #4a00e0)" },
        textColor: "#fff"
      }}
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ]}
    />
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="project-section py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-16 ${styles.textGradient}`}>
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${styles.glass} p-8 rounded-3xl`}>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-4">Dropdown Menus</h3>
              <p className="text-lg">Adding support for nested navigation with smooth dropdown animations</p>
            </div>
            
            <div className={`${styles.glass} p-8 rounded-3xl`}>
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-2xl font-bold mb-4">Dark/Light Mode</h3>
              <p className="text-lg">Built-in theme toggle with automatic system preference detection</p>
            </div>
            
            <div className={`${styles.glass} p-8 rounded-3xl`}>
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-4">Animation Presets</h3>
              <p className="text-lg">More animation options and presets for different use cases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="project-section py-24 px-8 bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${styles.textGradient}`}>
            Try Simple-Navs Today!
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join hundreds of developers who are already using Simple-Navs in their projects
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.npmjs.com/package/simple-navs" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonPrimary} px-10 py-5 text-xl`}
            >
              Install from npm
            </a>
            <a 
              href="https://github.com/yourusername/simple-navs" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.ctaButton} ${styles.ctaButtonSecondary} px-10 py-5 text-xl`}
            >
              View Source Code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 