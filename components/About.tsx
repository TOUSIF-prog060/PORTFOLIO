import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../constants';
import SkillIcon from './SkillIcon';
import GlowOrb from './GlowOrb';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        scroller: '[data-scroll-container]',
      },
    });

    // Section fade + blur-clear
    tl.fromTo(sectionRef.current,
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Image enters from left
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -100, rotate: -15 },
      { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out' },
      '<0.3' // Start slightly after section fade
    );

    // Bio and skill icons appear
    tl.fromTo(bioRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '<0.2'
    );

    gsap.fromTo(skillIconsRef.current?.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' },
      '<0.2'
    );

    // Image hover effect
    gsap.to(imageRef.current, {
      rotation: 5,
      y: -5,
      ease: 'power1.inOut',
      duration: 0.5,
      paused: true,
      onStart: () => {
        if (imageRef.current) {
          imageRef.current.style.filter = 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.7))';
        }
      },
      onReverseComplete: () => {
        if (imageRef.current) {
          imageRef.current.style.filter = 'none';
        }
      }
    });

    const handleMouseEnter = () => {
      gsap.getTweensOf(imageRef.current)[0].play();
    };
    const handleMouseLeave = () => {
      gsap.getTweensOf(imageRef.current)[0].reverse();
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('mouseenter', handleMouseEnter);
      imageElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(imageRef.current);
      if (imageElement) {
        imageElement.removeEventListener('mouseenter', handleMouseEnter);
        imageElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 px-4 md:px-8 min-h-screen flex items-center justify-center overflow-hidden opacity-0">
      <GlowOrb size="220px" position={{ top: '15%', right: '15%' }} color="rgba(138,43,226,0.5)" delay={0.5} duration={4} />
      <GlowOrb size="180px" position={{ bottom: '10%', left: '20%' }} color="rgba(0,255,255,0.4)" delay={1.8} duration={3.5} />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 glassmorphic p-8 rounded-xl max-w-6xl">
        {/* Left: Profile Image */}
        <div className="flex justify-center items-center">
          <div
            ref={imageRef}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full glowing-box-blue p-2 transform-gpu origin-center"
          >
            <img
              src="https://picsum.photos/seed/tousif/400/400" // Placeholder image for Tousif's profile
              alt="Tousif's Profile"
              className="w-full h-full object-cover rounded-full border-4 border-gray-200"
            />
            <div className="absolute inset-0 rounded-full border-2 border-tousif-blue opacity-50 pointer-events-none"></div>
          </div>
        </div>

        {/* Right: Bio and Skills */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-blue-violet mb-6">About Me</h2>
          <div ref={bioRef}>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Hi, I'm Tousif, a passionate and innovative AI developer specializing in creating dynamic,
              user-centric digital experiences. With a keen eye for design and a strong foundation in modern
              frontend technologies, I transform complex ideas into intuitive and visually stunning applications.
              I thrive on challenging projects that allow me to explore new tools and push the boundaries of AI-powered web development.
            </p>
          </div>

          <div ref={skillIconsRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {SKILLS.map((skill) => (
              <SkillIcon key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;