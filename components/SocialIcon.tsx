import React, { useRef, useEffect } from 'react';
import { SocialLink } from '../types';
import gsap from 'gsap';

interface SocialIconProps {
  link: SocialLink;
}

const SocialIcon: React.FC<SocialIconProps> = ({ link }) => {
  const IconComponent = link.icon;
  const iconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const iconElement = iconRef.current;
    if (!iconElement) return;

    gsap.to(iconElement, {
      boxShadow: '0 0 15px rgba(0, 191, 255, 0.7), 0 0 30px rgba(138, 43, 226, 0.5)',
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
      overwrite: true,
    });

    const handleMouseEnter = () => {
      gsap.getTweensOf(iconElement)[0].play();
    };
    const handleMouseLeave = () => {
      gsap.getTweensOf(iconElement)[0].reverse();
    };

    iconElement.addEventListener('mouseenter', handleMouseEnter);
    iconElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      iconElement.removeEventListener('mouseenter', handleMouseEnter);
      iconElement.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(iconElement);
    };
  }, []);

  return (
    <a
      ref={iconRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 glassmorphic"
    >
      <IconComponent size={28} className="text-tousif-blue" weight="light" />
    </a>
  );
};

export default SocialIcon;