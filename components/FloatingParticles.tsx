import React from 'react';

const FloatingParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-tousif-neon-blue opacity-20 blur-md"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite alternate-reverse ${Math.random() * 5}s`,
          }}
        ></div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(${Math.random() * 40 - 20}px) translateX(${Math.random() * 40 - 20}px) scale(${1 + Math.random() * 0.5});
          }
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;