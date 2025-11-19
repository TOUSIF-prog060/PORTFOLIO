import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GlowOrbProps } from '../types';

const GlowOrb: React.FC<GlowOrbProps> = ({ size, position, color, delay = 0, duration = 3 }) => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(orbRef.current, {
      y: -20,
      x: 10, // Add a slight horizontal movement for more natural float
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: delay,
    });

    return () => {
      gsap.killTweensOf(orbRef.current);
    };
  }, [delay, duration]);

  const orbStyle = {
    width: size,
    height: size,
    background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
    ...position,
  };

  return (
    <div
      ref={orbRef}
      className="absolute rounded-full opacity-40 filter blur-xl pointer-events-none z-0"
      style={orbStyle}
    ></div>
  );
};

export default GlowOrb;