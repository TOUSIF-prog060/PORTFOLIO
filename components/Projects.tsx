import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';
import GlowOrb from './GlowOrb';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionElement = sectionRef.current;
    const cardsContainerElement = cardsContainerRef.current;
    const scrollWrapperElement = scrollWrapperRef.current;

    if (!sectionElement || !cardsContainerElement || !scrollWrapperElement) return;

    // Fade in section
    gsap.fromTo(sectionElement,
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          scroller: '[data-scroll-container]',
        },
      }
    );

    // Cards fade/scale/y position with stagger on initial appearance
    gsap.fromTo(cardsContainerElement.children,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerElement,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          scroller: '[data-scroll-container]',
        },
      }
    );

    // Horizontal scroll for projects on larger screens
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop) {
      const scrollWidth = cardsContainerElement.scrollWidth - scrollWrapperElement.offsetWidth;

      if (scrollWidth > 0) {
        gsap.to(cardsContainerElement, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionElement,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            scroller: '[data-scroll-container]',
            markers: false,
          },
        });
      }
    } else {
        // Ensure no GSAP horizontal scroll on mobile, rely on CSS overflow
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === sectionElement && trigger.pin) {
                trigger.kill();
            }
        });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionElement || trigger.trigger === cardsContainerElement) {
          trigger.kill();
        }
      });
    };
  }, []); // Re-run on mount, window resize handled by ScrollTrigger.refresh()

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 px-4 md:px-8 min-h-screen flex flex-col justify-center overflow-hidden opacity-0">
      <GlowOrb size="250px" position={{ top: '5%', left: '-5%' }} color="rgba(0,191,255,0.6)" delay={0} duration={3} />
      <GlowOrb size="300px" position={{ bottom: '15%', right: '-5%' }} color="rgba(138,43,226,0.6)" delay={1} duration={4} />

      <div className="container mx-auto relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text-blue-violet mb-4">My Projects</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          A collection of my recent works, showcasing my skills in modern web development and design.
        </p>
      </div>

      <div ref={scrollWrapperRef} className="relative w-full overflow-hidden">
        {/* Desktop: Horizontal Scroll, Mobile: Stacked Cards with swipe */}
        <div
          ref={cardsContainerRef}
          className="flex flex-col md:flex-row gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto
                     md:overflow-hidden /* GSAP handles desktop horizontal scroll */
                     overflow-x-auto snap-x snap-mandatory scrollbar-hide
                     mx-auto md:mx-0 justify-start"
        >
          {PROJECTS.map((project) => (
            <div key={project.id} className="snap-center flex-shrink-0 mb-4 md:mb-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;