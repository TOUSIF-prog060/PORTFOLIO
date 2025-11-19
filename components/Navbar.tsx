import React, { useState, useEffect, useRef } from 'react';
import { List, X } from '@phosphor-icons/react';
import { NAV_LINKS } from '../constants';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      });
      gsap.fromTo(navLinksRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    }
  }, [isOpen]);

  // Close menu on route change (or link click)
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsOpen(false);
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: href, offsetY: 70 }, // Offset for fixed header
      ease: "power3.inOut",
    });
  };

  return (
    <nav className="fixed w-full z-50 p-4 bg-white bg-opacity-80 backdrop-filter backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold gradient-text-blue-violet glowing-text-sm"
           onClick={(e) => handleLinkClick(e, '#hero')}>
          TOUSIF
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
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

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isOpen ? <X size={32} /> : <List size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-full h-screen bg-white bg-opacity-95 backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center transform translate-x-full opacity-0 md:hidden`}
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-800 focus:outline-none">
          <X size={36} />
        </button>
        <div ref={navLinksRef} className="flex flex-col space-y-8 text-3xl font-bold">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-tousif-blue transition duration-300 glowing-text-sm"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;