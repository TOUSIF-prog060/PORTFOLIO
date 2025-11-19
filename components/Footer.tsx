import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import SocialIcon from './SocialIcon';
import FloatingParticles from './FloatingParticles';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%', // When footer top enters viewport
        end: 'bottom 100%',
        toggleActions: 'play none none reverse',
        scroller: '[data-scroll-container]',
      },
    });

    // Fade and slide up
    tl.fromTo(footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Mini nav links and social icons
    gsap.fromTo(footerRef.current?.querySelectorAll('a, .social-icon-wrapper'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
      '<0.3'
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === footerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 70 },
      ease: "power3.inOut",
    });
  };

  return (
    <footer id="footer" ref={footerRef} className="relative py-12 px-4 md:px-8 text-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-md overflow-hidden opacity-0">
      <FloatingParticles />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-tousif-blue transition duration-300 glowing-text-sm"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex space-x-4 social-icon-wrapper">
            {SOCIAL_LINKS.map((link) => (
              <SocialIcon key={link.name} link={link} />
            ))}
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-8">
          &copy; {new Date().getFullYear()} Tousif. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;