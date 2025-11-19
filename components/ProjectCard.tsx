import React, { useRef, useEffect } from 'react';
import { Project } from '../types';
import gsap from 'gsap';
import { ArrowSquareOut } from '@phosphor-icons/react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    // Hover animation for lift and glow
    gsap.to(cardElement, {
      y: -10,
      scale: 1.02,
      boxShadow: '0 0 25px rgba(0, 191, 255, 0.6), 0 0 50px rgba(138, 43, 226, 0.4)',
      duration: 0.3,
      ease: 'power2.out',
      paused: true,
      overwrite: true,
    });

    const handleMouseEnter = () => {
      gsap.getTweensOf(cardElement)[0].play();
    };
    const handleMouseLeave = () => {
      gsap.getTweensOf(cardElement)[0].reverse();
    };

    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(cardElement);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card relative flex-shrink-0 w-80 h-96 sm:w-96 glassmorphic rounded-xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer transform-gpu"
      data-scroll-section
    >
      <div className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm" style={{ backgroundImage: `url(${project.image})` }}></div>
      <div className="relative z-10 flex flex-col h-full">
        <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4 shadow-lg" />
        <h3 className="text-xl font-bold text-gray-800 mb-2 gradient-text-blue-violet glowing-text-sm">{project.title}</h3>
        <p className="text-gray-700 text-sm flex-grow mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-100 bg-opacity-70 rounded-full text-xs text-tousif-neon-blue font-medium shadow-neon-blue-xs">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-tousif-blue text-black font-semibold rounded-full hover:bg-tousif-neon-blue transition-all duration-300 self-start text-sm glowing-box-blue"
          onClick={(e) => e.stopPropagation()} // Prevent card hover effect from being interrupted by link click
        >
          View Project <ArrowSquareOut size={16} className="ml-2" weight="bold" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;