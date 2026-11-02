import { motion, useReducedMotion } from 'motion/react';
import { personalInfo } from '../data/portfolio';
import { staggerContainer } from '../animations/variants';
import { ArrowDown, ExternalLink, Download } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/SocialIcons';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { TechEcosystem } from '../three/TechEcosystem';
import './Hero.css';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const textReveal = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20, 
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const handleHeroMouseMove = (e) => {
    const heroEl = e.currentTarget;
    const rect = heroEl.getBoundingClientRect();
    heroEl.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    heroEl.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="hero" className="hero" onMouseMove={handleHeroMouseMove}>
      {/* Removed 3D Scene Background from here */}

      {/* VFX Background Layers */}
      <div className="hero__bg">
        <div className="hero__spotlight" />
        <div className="hero__glow hero__glow--center" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      {/* Local 3D Scene for the Tech Tree (scrolls naturally with Hero) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.5] : [1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={45} />
          {/* Static camera lookat */}
          <ambientLight intensity={0.6} />
          <pointLight position={[8, 8, 8]} intensity={1.2} color="#00e5ff" distance={35} />
          <pointLight position={[-8, -6, -4]} intensity={0.8} color="#0ea5e9" distance={25} />
          <TechEcosystem shouldReduceMotion={shouldReduceMotion} />
        </Canvas>
      </div>

      <div className="hero__container">
        {/* Content */}
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={textReveal}>
            <span className="hero__badge-dot" />
            Available for Opportunities
          </motion.div>

          <motion.p className="hero__role" variants={textReveal}>
            AI FULL STACK DEVELOPER
          </motion.p>

          <motion.h1 className="hero__name" variants={staggerItem}>
            <motion.span className="hero__name-first" variants={textReveal}>
              Dhiraj
            </motion.span>
            <motion.span className="hero__name-last" variants={textReveal}>
              Aglave
            </motion.span>
          </motion.h1>

          <motion.p className="hero__tagline" variants={textReveal}>
            {personalInfo.tagline}
          </motion.p>

          <motion.div className="hero__ctas" variants={textReveal}>
            <a
              href="#projects"
              className="hero__cta hero__cta--primary"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('projects');
                if (target) {
                  const top = target.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                }
              }}
            >
              <ExternalLink size={16} />
              View Projects
            </a>
            <a
              href="/Dhiraj_Aglave_Resume.pdf"
              download="Dhiraj_Aglave_Resume.pdf"
              className="hero__cta hero__cta--secondary"
              title="Download Dhiraj Aglave Resume PDF"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          <motion.div className="hero__socials" variants={textReveal}>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="Instagram Profile"
            >
              <InstagramIcon size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Visual Area (Reserved Grid Space) */}
        {/* The actual 3D rendering is now handled by the local Canvas above */}
        <div className="hero__visual" style={{ pointerEvents: 'none' }} aria-hidden="true" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} className="hero__scroll-arrow" />
      </motion.div>
    </section>
  );
};

export default Hero;
