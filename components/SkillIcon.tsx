import React from 'react';
import { Skill } from '../types';

interface SkillIconProps {
  skill: Skill;
}

const SkillIcon: React.FC<SkillIconProps> = ({ skill }) => {
  const IconComponent = skill.icon;
  return (
    <div className="flex flex-col items-center p-4 rounded-lg glassmorphic hover:shadow-glow-sm transition-all duration-300">
      <IconComponent size={48} className="text-tousif-blue glowing-text-sm mb-2" weight="light" />
      <span className="text-gray-700 text-sm font-medium">{skill.name}</span>
    </div>
  );
};

export default SkillIcon;