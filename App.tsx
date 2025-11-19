import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin
import LocomotiveScroll from 'locomotive-scroll';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Corrected path
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Register ScrollTrigger AND ScrollToPlugin

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollInstance = useRef<LocomotiveScroll | null>(null);
  const scrollProgressBarRef = useRef<HTMLDivElement>(null); // Ref for the scroll progress bar

  const initLocomotiveScroll = useCallback(() => {
    if (scrollRef.current && !locomotiveScrollInstance.current) {
      locomotiveScrollInstance.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true, // Enable smooth scroll on mobile too
        multiplier: 1, // Adjust scroll speed
        class: 'is-reveal',
        getDirection: true,
      });

      locomotiveScrollInstance.current.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          if (locomotiveScrollInstance.current) {
            return arguments.length
              ? locomotiveScrollInstance.current.scrollTo(value, { duration: 0, disableLerp: true })
              : locomotiveScrollInstance.current.scroll.instance.scroll.y;
          }
          return 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
      });

      ScrollTrigger.addEventListener('refresh', () => locomotiveScrollInstance.current?.update());
      ScrollTrigger.refresh();
      console.log('Locomotive Scroll and ScrollTrigger initialized.');

      // Setup Scroll Progress Bar's ScrollTrigger AFTER Locomotive Scroll is ready
      if (scrollProgressBarRef.current) {
        gsap.to(scrollProgressBarRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            id: "progressBar", // Assign an ID for easier killing on cleanup
            trigger: scrollRef.current, // Trigger on the main scroll container
            start: "top top", // Start when the top of the container hits the top of the viewport
            end: "bottom bottom", // End when the bottom of the container leaves the bottom of the viewport
            scrub: true, // Link animation directly to scroll position
            scroller: '[data-scroll-container]', // Tell ScrollTrigger to use Locomotive Scroll's scroller
          },
        });
      }
    }
  }, []); // Dependencies: empty, as scrollRef.current is only accessed after it's set on mount.

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    document.body.style.overflow = 'auto'; // Allow scrolling after preloader

    // Give a small delay for preloader to fully fade before initializing Locomotive Scroll
    setTimeout(() => {
      initLocomotiveScroll();
      gsap.to(".main-content", {
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: "power2.out",
        delay: 0.2
      });
    }, 500); // Small delay to ensure preloader is gone
  }, [initLocomotiveScroll]);

  useEffect(() => {
    // Initial body overflow hidden to prevent scroll before preloader finishes
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      locomotiveScrollInstance.current?.destroy();
      locomotiveScrollInstance.current = null;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.removeEventListener('refresh', () => locomotiveScrollInstance.current?.update());
      ScrollTrigger.getById('progressBar')?.kill(); // Kill the specific progress bar ScrollTrigger
    };
  }, []);

  return (
    <div className="gradient-bg min-h-screen">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Scroll Progress Bar */}
      <div
        ref={scrollProgressBarRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-tousif-blue to-tousif-violet z-[100] w-0"
      ></div>

      <div className={`main-content ${!loading ? 'loaded' : ''}`} data-scroll-container ref={scrollRef}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;