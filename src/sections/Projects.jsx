import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { projects } from '../data/portfolio';
import SectionHeading from '../components/SectionHeading';
import { Users, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  // 3D Perspective Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current || typeof window === 'undefined' || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`project-panel project-panel--${project.accentName}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--project-accent': project.accent,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
    >
      {/* 16:9 Cinematic Image Visual Area */}
      <div className="project-panel__visual">
        <div className="project-panel__glow" />
        <div className="project-panel__image-wrapper" style={{ transform: "translateZ(40px)" }}>
          <img
            src={project.image}
            alt={project.title}
            className="project-panel__image"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Details */}
      <div className="project-panel__content" style={{ transform: "translateZ(20px)" }}>
        <div className="project-panel__header">
          <div className="project-panel__top-row">
            <span className="project-panel__category">{project.category}</span>
            <span className={`project-panel__status ${project.status.toLowerCase().includes('development') ? 'project-panel__status--dev' : ''}`}>
              {project.status}
            </span>
          </div>
          <h3 className="project-panel__title">{project.title}</h3>
        </div>

        <p className="project-panel__description">{project.description}</p>

        <div className="project-panel__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-panel__tech-tag">{t}</span>
          ))}
        </div>

        <div className="project-panel__footer">
          <div className="project-panel__meta">
            {project.team && (
              <span className="project-panel__team">
                <Users size={13} />
                Team Collaboration
              </span>
            )}
          </div>

          <div className="project-panel__actions">
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="project-panel__link"
                aria-label={`View ${project.title} Source`}
              >
                <GithubIcon size={15} />
                <span>{project.backendSource ? 'Frontend Repo' : 'Repository'}</span>
                <ExternalLink size={13} />
              </a>
            )}

            {project.backendSource && (
              <a
                href={project.backendSource}
                target="_blank"
                rel="noopener noreferrer"
                className="project-panel__link"
                aria-label={`View ${project.title} Backend Source`}
              >
                <GithubIcon size={15} />
                <span>Backend Repo</span>
                <ExternalLink size={13} />
              </a>
            )}

            {!project.source && !project.backendSource && (
              <span className="project-panel__link project-panel__link--dev">
                <Sparkles size={14} />
                <span>Active R&D Phase</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <SectionHeading label="Showcase" title="Featured Projects" />

        <div className="projects__list">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
