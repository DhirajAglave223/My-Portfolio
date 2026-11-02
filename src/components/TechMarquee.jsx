import React from 'react';
import './TechMarquee.css';
import {
  FaReact, FaPython, FaJs, FaHtml5, FaCss3Alt, FaBootstrap,
  FaGitAlt, FaGithub, FaGitlab,
} from 'react-icons/fa';
import {
  SiFastapi, SiMysql, SiPostgresql, SiMongodb,
  SiSupabase, SiFirebase, SiFlutter, SiDart,
  SiRender, SiNetlify, SiVercel,
  SiTailwindcss, SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const technologies = [
  { name: 'Python', Icon: FaPython, color: '#38bdf8' },
  { name: 'Flutter', Icon: SiFlutter, color: '#02569b' },
  { name: 'React JS', Icon: FaReact, color: '#00e5ff' },
  { name: 'HTML', Icon: FaHtml5, color: '#e34f26' },
  { name: 'JavaScript', Icon: FaJs, color: '#facc15' },
  { name: 'Bootstrap', Icon: FaBootstrap, color: '#7952b3' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'CSS', Icon: FaCss3Alt, color: '#38bdf8' },
  { name: 'Render', Icon: SiRender, color: '#46e3b7' },
  { name: 'Vercel', Icon: SiVercel, color: '#e2e8f0' },
  { name: 'MySQL', Icon: SiMysql, color: '#0ea5e9' },
  { name: 'Netlify', Icon: SiNetlify, color: '#00c7b7' },
  { name: 'GitHub', Icon: FaGithub, color: '#e2e8f0' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#2dd4bf' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3fcf8e' },
  { name: 'Git', Icon: FaGitAlt, color: '#fb923c' },
  { name: 'Firebase', Icon: SiFirebase, color: '#ffca28' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#60a5fa' },
  { name: 'Postman', Icon: SiPostman, color: '#ff6c37' },
  { name: 'GitLab', Icon: FaGitlab, color: '#fc6d26' },
  { name: 'Dart', Icon: SiDart, color: '#0175c2' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#4ade80' },
  { name: 'VS Code', Icon: VscVscode, color: '#007acc' },
];

const TechMarquee = () => {
  // We duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [...technologies, ...technologies];

  return (
    <div className="tech-marquee-wrapper">
      <div className="tech-marquee-track">
        {marqueeItems.map((tech, index) => {
          const Icon = tech.Icon;
          return (
            <div key={`${tech.name}-${index}`} className="tech-marquee-item">
              <div className="tech-marquee-icon" style={{ color: tech.color }}>
                <Icon />
              </div>
              <span className="tech-marquee-name">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechMarquee;
