"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/contexts/ThemeContext';
import emailjs from '@emailjs/browser';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const sliderImages = [
  { src: "/images/js/1.png", alt: "JavaScript slide 1" },
  { src: "/images/j/1.png", alt: "JavaScript slide 2" },
  { src: "/images/t/1.png", alt: "JavaScript slide 3" },
  { src: "/images/r/1.png", alt: "JavaScript slide 4" },
  { src: "/images/c/1.png", alt: "JavaScript slide 5" },
  { src: "/images/h/1.png", alt: "JavaScript slide 6" },
];

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "A modern web application built with React and Node.js",
    image: "/images/js/1.png",
    category: "Web Development",
    link: "#"
  },
  {
    id: 2,
    title: "Project Beta",
    description: "Mobile app for iOS and Android using React Native",
    image: "/images/j/1.png",
    category: "Mobile Development",
    link: "#"
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "AI-powered data analytics platform",
    image: "/images/t/1.png",
    category: "AI/ML",
    link: "#"
  },
  {
    id: 4,
    title: "Project Delta",
    description: "E-commerce platform with advanced features",
    image: "/images/r/1.png",
    category: "E-commerce",
    link: "#"
  },
  {
    id: 5,
    title: "Project Epsilon",
    description: "Real-time collaboration tool",
    image: "/images/c/1.png",
    category: "Collaboration",
    link: "#"
  },
  {
    id: 6,
    title: "Project Zeta",
    description: "Blockchain-based decentralized application",
    image: "/images/h/1.png",
    category: "Blockchain",
    link: "#"
  }
];

// OOP Knowledge Game Questions
const oopQuestions = [
  {
    question: "What is the main principle of Object-Oriented Programming that allows a class to inherit properties and methods from another class?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correct: 1,
    explanation: "Inheritance allows a class to inherit properties and methods from a parent class, promoting code reuse and establishing a hierarchical relationship."
  },
  {
    question: "Which OOP concept allows you to hide the internal implementation details and show only the necessary features?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correct: 3,
    explanation: "Abstraction focuses on hiding complex implementation details and showing only the essential features to the user."
  },
  {
    question: "What is the term for the ability of different objects to respond to the same method call in different ways?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correct: 2,
    explanation: "Polymorphism allows objects of different classes to respond to the same method call in their own unique way."
  },
  {
    question: "Which OOP principle bundles data and methods that operate on that data within a single unit?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correct: 0,
    explanation: "Encapsulation bundles data and methods together, protecting the data from outside interference and misuse."
  },
  {
    question: "What is a blueprint or template for creating objects called in OOP?",
    options: ["Object", "Class", "Method", "Property"],
    correct: 1,
    explanation: "A class is a blueprint or template that defines the properties and methods that objects created from it will have."
  }
];

// Enhanced Particle Component with Tailwind
const Particles = () => {
  const particlesRef = useRef();

  useEffect(() => {
    const particles = particlesRef.current;
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-1 h-1 bg-white/50 rounded-full';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particles.appendChild(particle);
    }
  }, []);

  return <div ref={particlesRef} className="particles absolute inset-0 overflow-hidden z-10" />;
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const { mode } = useTheme();

  useGSAP(() => {
    // Enhanced card entrance animation
    gsap.fromTo(cardRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationY: 45,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        delay: index * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Enhanced hover animations
    const card = cardRef.current;
    const tl = gsap.timeline({ paused: true });
    
    tl.to(card, {
      scale: 1.05,
      rotationY: 5,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(card.querySelector('.project-image img'), {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());

    // Floating animation
    gsap.to(card, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: index * 0.2
    });
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef}
      className={`project-card ${mode === 'dark' ? 'dark' : 'light'} glow-effect hover-lift cursor-pointer group`}
      onClick={() => window.open(project.link, '_blank')}
    >
      <div className="project-image relative overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title} 
          width={400}
          height={300}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          loading={index < 3 ? "eager" : "lazy"}
          priority={index < 3}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
        <div className="project-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="project-info text-center text-white p-8">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-lg mb-4 opacity-90">{project.description}</p>
            <span className="category inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
              {project.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ id, children, className = "" }) => {
  const sectionRef = useRef();

  useGSAP(() => {
    // Enhanced section entrance animation
    gsap.fromTo(sectionRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect for sections
    gsap.to(sectionRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, { scope: sectionRef });

  return (
    <section id={id} ref={sectionRef} className={`section ${className} hover-lift`}>
      {children}
    </section>
  );
};

const HeroSlider = () => {
  const { mode } = useTheme();
  const sliderRef = useRef();
  const quantity = sliderImages.length;

  useGSAP(() => {
    // Enhanced parallax effect for slider
    gsap.to(sliderRef.current, {
      y: -50,
      rotationY: 5,
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Floating animation for slider
    gsap.to(sliderRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: sliderRef });

  return (
    <div className="hero-slider-container absolute inset-0 flex items-center justify-center z-20" ref={sliderRef}>
      <div className="slider-container w-48 h-60 relative perspective-1000 transition-all duration-300 hover:scale-110 hover:rotate-y-10">
        <div className="slider absolute inset-0 transform-style-preserve-3d animate-spin-slow" style={{ "--quantity": quantity }}>
          {sliderImages.map((image, index) => (
            <div 
              className="item absolute inset-0 overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-glow-lg" 
              style={{ "--position": index + 1 }} 
              key={index}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={300}
                height={300}
                className="w-full h-full object-cover transition-all duration-300 hover:brightness-110 hover:contrast-110"
                loading="lazy"
                sizes="(max-width: 768px) 200px, 300px"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Interactive Skill Tags Component with Tailwind
const SkillTags = ({ skills }) => {
  const tagsRef = useRef();

  useGSAP(() => {
    const tags = tagsRef.current.children;
    
    gsap.fromTo(tags,
      {
        y: 30,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: tagsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations for each tag
    Array.from(tags).forEach((tag, index) => {
      gsap.to(tag, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
        paused: true
      });

      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, { scope: tagsRef });

  return (
    <div ref={tagsRef} className="skill-tags flex flex-wrap gap-4">
      {skills.map((skill, index) => (
        <span 
          key={index} 
          className="floating-element px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow relative overflow-hidden"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

// OOP Knowledge Game Component
const OOPGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const gameRef = useRef();

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === oopQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < oopQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameCompleted(false);
  };

  useGSAP(() => {
    gsap.fromTo(gameRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gameRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: gameRef });

  const question = oopQuestions[currentQuestion];

  return (
    <div ref={gameRef} className="oop-game glass p-12 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl hover:shadow-glow-lg transition-all duration-500">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">🎯 OOP Knowledge Quiz</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Test your understanding of Object-Oriented Programming fundamentals
        </p>
      </div>
      
      {!gameCompleted ? (
        <div className="space-y-10">
          {/* Progress Section */}
          <div className="progress-section text-center space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Question {currentQuestion + 1} of {oopQuestions.length}
              </span>
              <span className="text-lg font-bold text-gradient">
                {Math.round(((currentQuestion + 1) / oopQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestion + 1) / oopQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Section */}
          <div className="question-section space-y-8">
            <div className="question-container bg-white/5 rounded-2xl p-8 border border-white/10">
              <h4 className="text-2xl md:text-3xl font-semibold text-center leading-relaxed mb-8">
                {question.question}
              </h4>

              <div className="options-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`option-btn p-6 rounded-2xl text-left transition-all duration-300 text-lg font-medium ${
                      selectedAnswer === index
                        ? index === question.correct
                          ? 'bg-green-500/20 border-2 border-green-500 text-green-100 shadow-lg'
                          : 'bg-red-500/20 border-2 border-red-500 text-red-100 shadow-lg'
                        : showResult && index === question.correct
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-100 shadow-lg'
                        : 'glass hover:bg-white/20 hover:scale-105 hover:shadow-glow border border-white/10'
                    } ${showResult ? 'cursor-default' : 'cursor-pointer hover-lift'}`}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="leading-relaxed text-sm">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Section */}
            {showResult && (
              <div className="result-container glass p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${
                    selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswer === question.correct ? '🎉' : '💡'}
                  </div>
                  <p className={`text-2xl font-bold mb-2 ${
                    selectedAnswer === question.correct ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect!'}
                  </p>
                </div>
                
                <div className="explanation bg-white/5 rounded-xl p-6">
                  <h5 className="text-lg font-semibold mb-3 text-gradient">Explanation:</h5>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {question.explanation}
                  </p>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-4 bg-gradient-primary text-white rounded-full text-xl font-semibold hover:scale-105 hover:shadow-glow transition-all duration-300"
                  >
                    {currentQuestion < oopQuestions.length - 1 ? 'Next Question →' : 'See Results →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="completion-section text-center space-y-8">
          <div className="score-display space-y-6">
            <div className="text-8xl mb-6">
              {score === oopQuestions.length ? '🏆' : 
               score >= oopQuestions.length * 0.8 ? '🎯' :
               score >= oopQuestions.length * 0.6 ? '👍' : '📚'}
            </div>
            
            <h4 className="text-3xl md:text-4xl font-bold text-gradient">Quiz Completed!</h4>
            
            <div className="score-container bg-white/5 rounded-2xl p-8 border border-white/10">
              <p className="text-2xl mb-4">
                Your Score: <span className="text-gradient font-bold text-4xl">{score}</span> out of {oopQuestions.length}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
                <div 
                  className="bg-gradient-primary h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${(score / oopQuestions.length) * 100}%` }}
                />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {score === oopQuestions.length ? 'Perfect! You have excellent OOP knowledge! 🎉' :
                 score >= oopQuestions.length * 0.8 ? 'Great job! You have solid OOP understanding! 🚀' :
                 score >= oopQuestions.length * 0.6 ? 'Good effort! Keep learning OOP concepts! 💪' :
                 'Keep practicing! OOP is fundamental to modern programming! 📖'}
              </p>
            </div>
          </div>
          
          <div className="action-buttons space-y-4">
            <button
              onClick={handleRestartGame}
              className="px-10 py-4 bg-gradient-primary text-white rounded-full text-xl font-semibold hover:scale-105 hover:shadow-glow transition-all duration-300"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Contact Form Component with EmailJS
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('Something went wrong. Please try again or contact me directly.');
  const formRef = useRef();

  // EmailJS Configuration - Replace these with your actual values
  const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_xkdwu0t',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_z70ih5p',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'bYa9JNcVpGNhyqbMV'
  };

  // Initialize EmailJS
  useEffect(() => {
    if (typeof window !== 'undefined' && emailjs) {
      emailjs.init(EMAILJS_CONFIG.publicKey);
      console.log('EmailJS initialized with config:', EMAILJS_CONFIG);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Starting EmailJS send...');
      console.log('Form data:', formData);
      console.log('EmailJS config:', EMAILJS_CONFIG);
      
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all fields');
      }

      // Validate EmailJS configuration
      if (!emailjs) {
        throw new Error('EmailJS not loaded');
      }

      // Check if EmailJS is properly configured
      if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
        throw new Error('EmailJS configuration is incomplete. Please check your environment variables.');
      }

      console.log('EmailJS object:', emailjs);
      
      // Use emailjs.send instead of sendForm for better compatibility
      const templateParams = {
        title: `New message from ${formData.name}`,
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      console.log('Template params:', templateParams);

      // EmailJS call with proper error handling
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('EmailJS Result:', result);
      console.log('Result status:', result.status);
      console.log('Result text:', result.text);
      
      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Success animation
        gsap.to('.submit-button', {
          scale: 1.05,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      } else {
        console.error('EmailJS returned non-200 status:', result.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error));
      console.error('Error message:', error.message);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // Show more specific error messages
      let newErrorMessage = 'Something went wrong. Please try again or contact me directly.';
      
      if (error.text && error.text.includes('service ID not found')) {
        newErrorMessage = 'Email service not configured. Please contact me directly at shenalgd@gmail.com';
      } else if (error.text && error.text.includes('template ID not found')) {
        newErrorMessage = 'Email template not configured. Please contact me directly at shenalgd@gmail.com';
      } else if (error.message && error.message.includes('configuration is incomplete')) {
        newErrorMessage = 'Email configuration incomplete. Please contact me directly at shenalgd@gmail.com';
      }
      
      setErrorMessage(newErrorMessage);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form glass p-8 rounded-3xl backdrop-blur-md border border-white/10">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleInputChange}
            required 
            className="w-full p-4 border-2 border-white/20 rounded-2xl glass text-lg transition-all duration-300 focus:border-primary-500 focus:bg-white/15 focus:-translate-y-1 focus:shadow-glow"
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
            className="w-full p-4 border-2 border-white/20 rounded-2xl glass text-lg transition-all duration-300 focus:border-primary-500 focus:bg-white/15 focus:-translate-y-1 focus:shadow-glow"
          />
        </div>
        <div className="form-group">
          <textarea 
            name="message"
            placeholder="Your Message" 
            rows="5" 
            value={formData.message}
            onChange={handleInputChange}
            required 
            className="w-full p-4 border-2 border-white/20 rounded-2xl glass text-lg transition-all duration-300 focus:border-primary-500 focus:bg-white/15 focus:-translate-y-1 focus:shadow-glow resize-none"
          />
        </div>
        
        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="success-message p-4 bg-green-500/20 border border-green-500 rounded-2xl text-green-100 text-center">
            ✅ Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="error-message p-4 bg-red-500/20 border border-red-500 rounded-2xl text-red-100 text-center">
            ❌ {errorMessage}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`submit-button w-full p-4 bg-gradient-primary text-white rounded-2xl text-xl font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-glow ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </div>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  const { mode } = useTheme();
  const heroRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (isLoading) return; // Don't run animations while loading

    // Enhanced hero title animation with character splitting
    const titleLines = heroRef.current?.querySelectorAll('.title-line');
    
    if (titleLines) {
      titleLines.forEach((line, lineIndex) => {
        const chars = line.textContent.split('');
        line.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');
        
        const charElements = line.querySelectorAll('.char');
        
        gsap.fromTo(charElements,
          {
            y: 100,
            opacity: 0,
            rotationX: 90,
            scale: 0
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            delay: lineIndex * 0.3 + 0.5,
            ease: "back.out(1.7)"
          }
        );
      });
    }

    // Enhanced subtitle animation
    gsap.fromTo('.hero-subtitle',
      {
        y: 50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 2,
        ease: "power2.out"
      }
    );

    // Enhanced CTA buttons animation
    gsap.fromTo('.cta-button',
      {
        y: 30,
        opacity: 0,
        scale: 0.8,
        rotationY: 45
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 2.5,
        ease: "back.out(1.7)"
      }
    );

    // Enhanced floating animation for hero elements
    gsap.to('.hero-content', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Mouse follow effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX - innerWidth / 2) / innerWidth;
        const y = (clientY - innerHeight / 2) / innerHeight;
        
        gsap.to('.hero-content', {
          x: x * 20,
          y: y * 20,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  }, { scope: heroRef, dependencies: [isLoading] });

  const skills = ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "MongoDB", "GraphQL"];

  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-screen fixed inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading Portfolio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`portfolio-container ${mode} min-h-screen`}>
      <Section id="home" className="hero-section relative flex items-center justify-center text-center p-0 overflow-hidden min-h-screen bg-gradient-radial from-primary-500/10 to-transparent">
        <Particles />
        <div 
          className="hero-background absolute inset-0 z-10 transition-all duration-300 filter brightness-80 contrast-110"
          style={{
            backgroundImage: mode === 'dark' 
              ? 'url(/images/dark.webp), url(/images/dark.png.jpg)' 
              : 'url(/images/light.webp), url(/images/light.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <HeroSlider />
        <div className="hero-content z-30 relative glass p-12 rounded-3xl backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer hover:bg-black/40 hover:-translate-y-2 hover:shadow-glow-lg" ref={heroRef}>
          <h1 className="hero-title text-6xl md:text-8xl font-black mb-4 leading-tight transition-all duration-300">
            <span className="title-line text-gradient block cursor-pointer transition-all duration-300 hover:text-gradient-secondary hover:scale-105">Shenal</span>
            <span className="title-line text-gradient block cursor-pointer transition-all duration-300 hover:text-gradient-secondary hover:scale-105">Gunaskera</span>
          </h1>
          <p className="hero-subtitle text-2xl mb-8 opacity-90 font-light text-white transition-all duration-300 hover:opacity-100 hover:scale-102">
            Full Stack Developer & Creative Technologist
          </p>
          <div className="hero-cta flex gap-4 justify-center flex-wrap">
            <button className="cta-button primary px-8 py-4 bg-gradient-primary text-white rounded-full text-lg font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-glow">
              View My Work
            </button>
            <button className="cta-button secondary px-8 py-4 glass text-white rounded-full text-lg font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-white/10 hover:border-white/50 hover:-translate-y-1">
              Get In Touch
            </button>
          </div>
        </div>
      </Section>

      <Section id="about" className="about-section bg-gradient-to-br from-primary-500/5 to-secondary-500/5">
        <div className="section-content max-w-6xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-bold mb-12 text-center text-gradient cursor-pointer transition-all duration-300 hover:after:w-24">
            About Me
          </h2>
          <div className="about-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="about-text">
              <p className="text-xl leading-relaxed mb-8 transition-all duration-300 cursor-pointer hover:translate-x-2 hover:text-primary-500">
                I&apos;m a passionate full-stack developer with expertise in modern web technologies. 
                I love creating beautiful, functional, and user-friendly applications that solve real-world problems.
              </p>
              <p className="text-xl leading-relaxed mb-8 transition-all duration-300 cursor-pointer hover:translate-x-2 hover:text-primary-500">
                With years of experience in React, Node.js, and various other technologies, 
                I bring ideas to life through clean code and innovative solutions.
              </p>
              <div className="skills">
                <h3 className="text-3xl mb-6 text-gradient">Skills</h3>
                <SkillTags skills={skills} />
              </div>
            </div>
            <div className="about-image flex justify-center items-center">
              <div className="image-container glow-effect relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-glow-lg">
                <Image 
                  src="/images/bg1.webp" 
                  alt="Shenal Gunaskera" 
                  width={500}
                  height={500}
                  className="w-full h-auto block transition-all duration-300 hover:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="work" className="work-section bg-gradient-to-br from-secondary-500/5 to-primary-500/5">
        <div className="section-content max-w-7xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-bold mb-12 text-center text-gradient cursor-pointer transition-all duration-300 hover:after:w-24">
            My Projects
          </h2>
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="game" className="game-section bg-gradient-to-br from-primary-500/5 to-secondary-500/5 py-24">
        <div className="section-content max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-6xl mb-4 block">🎮</span>
            </div>
            <h2 className="section-title text-5xl md:text-6xl font-bold mb-8 text-gradient cursor-pointer transition-all duration-300 hover:after:w-24">
              Test Your OOP Knowledge
            </h2>
          </div>
          
          <div className="game-container flex justify-center">
            <div className="w-full max-w-5xl">
              <OOPGame />
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact" className="contact-section bg-gradient-to-br from-secondary-500/5 to-primary-500/5">
        <div className="section-content max-w-6xl mx-auto">
          <h2 className="section-title text-5xl md:text-6xl font-bold mb-12 text-center text-gradient cursor-pointer transition-all duration-300 hover:after:w-24">
            Get In Touch
          </h2>
          <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="contact-info">
              <h3 className="text-4xl mb-6 text-gradient">Let&apos;s work together</h3>
              <p className="text-xl leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="contact-details flex flex-col gap-6">
                <div className="contact-item flex items-center gap-4 p-4 glass rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-2 hover:bg-white/15 hover:shadow-glow">
                  <span className="icon text-2xl transition-all duration-300 hover:scale-120 hover:rotate-12">📧</span>
                  <span className="text-lg">shenalgd@gmail.com</span>
                </div>
                <div className="contact-item flex items-center gap-4 p-4 glass rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-2 hover:bg-white/15 hover:shadow-glow">
                  <span className="icon text-2xl transition-all duration-300 hover:scale-120 hover:rotate-12">📱</span>
                  <span className="text-lg">234 234 2434</span>
                </div>
                <div className="contact-item flex items-center gap-4 p-4 glass rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-2 hover:bg-white/15 hover:shadow-glow">
                  <span className="icon text-2xl transition-all duration-300 hover:scale-120 hover:rotate-12">📍</span>
                  <span className="text-lg">Available for remote work worldwide</span>
                </div>
              </div>
            </div>
            <div className="contact-form glass p-8 rounded-3xl backdrop-blur-md border border-white/10">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
