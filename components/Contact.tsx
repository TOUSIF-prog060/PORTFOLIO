import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_LINKS } from '../constants';
import SocialIcon from './SocialIcon';
import GlowOrb from './GlowOrb';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Simulate send animation
    gsap.to(submitButtonRef.current, {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
      onComplete: () => {
        alert('Message sent successfully!');
        setFormState({ name: '', email: '', message: '' }); // Clear form
      },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        scroller: '[data-scroll-container]',
      },
    });

    // Section fade + blur-clear
    tl.fromTo(sectionRef.current,
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
    );

    // Inputs fade from left
    tl.fromTo(formRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      '<0.3'
    );

    // Social icons fade in
    tl.fromTo(socialIconsRef.current?.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.7)' },
      '<0.3'
    );

    // Submit button hover glow and pulse is handled directly via Tailwind classes and GSAP for active state.
    gsap.to(submitButtonRef.current, {
        boxShadow: '0 0 15px rgba(0, 191, 255, 0.7), 0 0 30px rgba(138, 43, 226, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
        paused: true,
        overwrite: true,
    });

    const handleButtonMouseEnter = () => {
        gsap.getTweensOf(submitButtonRef.current)[0].play();
    };
    const handleButtonMouseLeave = () => {
        gsap.getTweensOf(submitButtonRef.current)[0].reverse();
    };

    const submitButtonElement = submitButtonRef.current;
    if (submitButtonElement) {
        submitButtonElement.addEventListener('mouseenter', handleButtonMouseEnter);
        submitButtonElement.addEventListener('mouseleave', handleButtonMouseLeave);
    }

    return () => {
      tl.kill();
      if (submitButtonElement) {
        submitButtonElement.removeEventListener('mouseenter', handleButtonMouseEnter);
        submitButtonElement.removeEventListener('mouseleave', handleButtonMouseLeave);
      }
      gsap.killTweensOf(submitButtonRef.current);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 px-4 md:px-8 min-h-screen flex items-center justify-center overflow-hidden opacity-0">
      <GlowOrb size="180px" position={{ top: '5%', left: '50%' }} color="rgba(0,255,255,0.4)" delay={0.2} duration={3.8} />
      <GlowOrb size="200px" position={{ bottom: '0%', right: '20%' }} color="rgba(255,0,255,0.4)" delay={1.5} duration={3} />

      <div className="container mx-auto relative z-10 text-center glassmorphic p-8 rounded-xl max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text-blue-violet mb-8">Get In Touch</h2>
        <p className="text-gray-700 text-lg mb-8">
          Have a project in mind or just want to say hi? Feel free to reach out!
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mb-8 text-left">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 bg-opacity-70 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tousif-blue glassmorphic"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 bg-opacity-70 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tousif-blue glassmorphic"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formState.message}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 bg-opacity-70 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tousif-blue glassmorphic"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            ref={submitButtonRef}
            type="submit"
            className="w-full px-6 py-3 bg-tousif-blue text-black text-lg font-semibold rounded-full hover:bg-tousif-neon-blue active:scale-95 transition-all duration-300 relative overflow-hidden group glowing-box-blue"
          >
            <span className="relative z-10">Send Message</span>
            <span className="absolute inset-0 bg-tousif-neon-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </button>
        </form>

        <div ref={socialIconsRef} className="flex justify-center space-x-4 mt-8">
          {SOCIAL_LINKS.map((link) => (
            <SocialIcon key={link.name} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;