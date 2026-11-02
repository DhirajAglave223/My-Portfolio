import { motion } from 'motion/react';
import { fadeInUp, slideInLeft, slideInRight, perspectiveReveal, staggerContainer } from '../animations/variants';
import SectionHeading from '../components/SectionHeading';
import { Rocket } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import TechMarquee from '../components/TechMarquee';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <SectionHeading label="About Me" />

        <div className="about__grid">
          {/* Left: Profile Image Composition */}
          <motion.div
            className="about__image-area"
            variants={perspectiveReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            custom={0.1}
          >
            <div className="about__image-frame">
              <motion.div 
                className="about__image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden' }}
              >
                <img 
                  src={profileImg} 
                  alt="Dhiraj Aglave" 
                  className="about__image-element" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 5%' }} 
                />
                <div className="about__image-overlay" />
                <div className="about__image-border" />
                <div className="about__image-glow" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            className="about__bio"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h3 className="about__title" variants={perspectiveReveal}>
              Engineering intelligent solutions at the intersection of{' '}
              <span className="about__highlight--gradient">AI</span> and{' '}
              <span className="about__highlight--gradient-alt">Full-Stack Development</span>.
            </motion.h3>

            <motion.p className="about__text" variants={perspectiveReveal}>
              I specialize in crafting robust, scalable applications that bridge the gap between complex algorithms and seamless user experiences. With a strong foundation in <span className="about__highlight--gradient">Python</span> and <span className="about__highlight--gradient-alt">React</span>, I build end-to-end platforms that are as intelligent as they are intuitive.
            </motion.p>

            <motion.p className="about__text" variants={perspectiveReveal}>
              Currently focusing on advanced <span className="about__highlight--gradient">FastAPI</span> backends, optimized <span className="about__highlight--gradient-alt">PostgreSQL</span> architectures, and deeply integrated AI capabilities, my goal is to push the boundaries of modern digital products.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Tech Marquee directly below the content */}
      <motion.div 
        className="about__marquee-container"
        variants={perspectiveReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px' }}
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
};

export default About;
