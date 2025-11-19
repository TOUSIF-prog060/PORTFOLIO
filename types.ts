import { Icon } from '@phosphor-icons/react';

export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  techStack: string[];
  ctaLink: string;
}

export interface Skill {
  name: string;
  icon: Icon;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: Icon;
}

export interface GlowOrbProps {
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  color: string;
  delay?: number;
  duration?: number;
}
