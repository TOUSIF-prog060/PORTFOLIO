import { FileHtml, TagChevron, Cube, GithubLogo, LinkedinLogo, DribbbleLogo, Code, Sparkle, BracketsCurly } from '@phosphor-icons/react';
import { Skill, Project, SocialLink } from './types';

export const SKILLS: Skill[] = [
  { name: 'HTML5', icon: FileHtml }, // Replaced Html5 with FileHtml
  { name: 'CSS3', icon: TagChevron }, // Replaced CssThree with TagChevron as CssThree export is reported missing
  { name: 'JavaScript', icon: BracketsCurly }, // Replaced JavascriptLogo with BracketsCurly
  { name: 'React', icon: Cube }, // Replaced ReactLogo with Cube
  { name: 'GSAP', icon: Sparkle }, // Replaced Heart with Sparkle for GSAP
  { name: 'TypeScript', icon: Code },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/project1/800/600',
    title: 'Futuristic Dashboard',
    description: 'A sleek, interactive dashboard built with React and D3.js for real-time data visualization.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js'],
    ctaLink: '#',
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/project2/800/600',
    title: 'E-commerce Platform',
    description: 'Developed a robust e-commerce solution with dynamic product listings and secure payment integration.',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    ctaLink: '#',
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/project3/800/600',
    title: 'AI Chatbot Integration',
    description: 'Integrated a custom AI chatbot using Gemini API for enhanced customer support and interaction.',
    techStack: ['React', 'Python', 'Gemini API', 'Flask'],
    ctaLink: '#',
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/project4/800/600',
    title: 'Mobile Game Development',
    description: 'A cross-platform mobile game built with React Native, featuring engaging mechanics and smooth performance.',
    techStack: ['React Native', 'Expo', 'TypeScript'],
    ctaLink: '#',
  },
  {
    id: '5',
    image: 'https://picsum.photos/seed/project5/800/600',
    title: 'Personal Blog System',
    description: 'A content-rich personal blog with a custom CMS, Markdown support, and responsive design.',
    techStack: ['Gatsby', 'GraphQL', 'Contentful', 'Tailwind CSS'],
    ctaLink: '#',
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/project6/800/600',
    title: 'Interactive Portfolio v2',
    description: 'An upgraded version of my portfolio, pushing boundaries with cutting-edge animations and 3D elements.',
    techStack: ['React', 'GSAP', 'Spline', 'Locomotive Scroll'],
    ctaLink: '#',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/your-github', icon: GithubLogo },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tousif-shiekh-a06776367', icon: LinkedinLogo },
  { name: 'Dribbble', url: 'https://dribbble.com/your-dribbble', icon: DribbbleLogo }, // Placeholder
];

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];