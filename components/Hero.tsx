import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GlowOrb from './GlowOrb';

const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5' // Overlap with headline animation
    );

    tl.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' },
      '-=0.3' // Overlap with subtitle
    );

    tl.fromTo(splineRef.current,
      { opacity: 0, x: '100%' },
      { opacity: 1, x: '0%', duration: 1.2, ease: 'power3.out' },
      '-=0.8' // Overlap with CTA
    );

    // CTA hover pulse
    gsap.to(ctaRef.current, {
      scale: 1.05,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      paused: true,
      onStart: () => {
        if (ctaRef.current) {
          ctaRef.current.style.filter = 'drop-shadow(0 0 8px rgba(0, 191, 255, 0.8))';
        }
      },
      onReverseComplete: () => {
        if (ctaRef.current) {
          ctaRef.current.style.filter = 'none';
        }
      }
    });

    const handleMouseEnter = () => {
      gsap.getTweensOf(ctaRef.current)[0].play();
    };
    const handleMouseLeave = () => {
      gsap.getTweensOf(ctaRef.current)[0].reverse();
    };

    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.addEventListener('mouseenter', handleMouseEnter);
      ctaElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(ctaRef.current);
      if (ctaElement) {
        ctaElement.removeEventListener('mouseenter', handleMouseEnter);
        ctaElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Glow Orbs */}
      <GlowOrb size="200px" position={{ top: '10%', left: '5%' }} color="rgba(0,191,255,0.7)" delay={0} />
      <GlowOrb size="300px" position={{ bottom: '20%', right: '10%' }} color="rgba(138,43,226,0.7)" delay={1.5} />
      <GlowOrb size="250px" position={{ top: '30%', right: '20%' }} color="rgba(0,255,255,0.6)" delay={0.8} />
      <GlowOrb size="180px" position={{ bottom: '5%', left: '30%' }} color="rgba(255,0,255,0.6)" delay={2.2} />

      {/* Spline 3D Model */}
      <div ref={splineRef} className="absolute inset-0 w-full h-full opacity-0 md:opacity-100 flex items-center justify-center">
        <iframe src='https://my.spline.design/nexbotrobotcharacterconcept-uusSLEUbozj8HVU1caYXnFMA/'
          frameBorder='0' width='100%' height='100%'
          className="pointer-events-none md:pointer-events-auto scale-[0.8] md:scale-100 lg:scale-[1.2]">
        </iframe>
      </div>


      <div className="relative z-10 p-4 md:p-8 max-w-2xl mx-auto">
        <h1 ref={headlineRef} className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight gradient-text-blue-violet opacity-0">
          Hi, I’m Tousif – AI Developer
        </h1>
        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-700 mb-8 opacity-0">
          Crafting immersive digital experiences with cutting-edge technologies.
        </p>
        <button
          ref={ctaRef}
          className="px-8 py-3 bg-tousif-blue text-black text-lg font-semibold rounded-full hover:bg-tousif-neon-blue transition-all duration-300 shadow-glow-md opacity-0 relative overflow-hidden group"
          onClick={() => {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: '#contact', offsetY: 70 },
              ease: "power3.inOut",
            });
          }}
        >
          <span className="relative z-10">Hire Me</span>
          <span className="absolute inset-0 bg-tousif-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </div>
    </section>
  );
};

export default Hero;