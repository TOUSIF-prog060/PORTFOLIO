import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Animate text opacity and scale
    tl.fromTo(textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animate progress bar width
    tl.to(progressBarRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.3, // Start filling after text appears
    });

    // Fade out progress bar, scale and fade out preloader
    tl.to(progressBarRef.current, { opacity: 0, duration: 0.3 }, "+=0.3");
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
      },
    }, "-=0.2"); // Overlap with progress bar fade out

    // Ensure GSAP instance is cleaned up on unmount
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <h1 ref={textRef} className="text-6xl md:text-8xl font-extrabold gradient-text-blue-violet opacity-0">
        Tousif
      </h1>
      <div className="progress-bar-container">
        <div ref={progressBarRef} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Preloader;