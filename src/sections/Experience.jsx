import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { experience } from '../data/portfolio';
import { fadeInUp } from '../animations/variants';
import SectionHeading from '../components/SectionHeading';
import { Briefcase } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="experience" ref={containerRef}>
      <div className="experience__container">
        <SectionHeading label="Experience" title="Professional Journey" />

        <div className="experience__timeline">
          <div className="experience__line">
            <motion.div className="experience__line-fill" style={{ height: fillHeight }} />
          </div>

          {experience.map((item, index) => (
            <motion.div
              key={index}
              className="experience__item"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={index * 0.15}
            >
              <div className="experience__dot">
                {item.current && <div className="experience__dot-pulse" />}
              </div>

              <motion.div 
                className="experience__card"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="experience__card-header">
                  <div className="experience__icon-wrap">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h3 className="experience__role">{item.role}</h3>
                    <p className="experience__company">{item.company}</p>
                  </div>
                </div>
                <p className="experience__period">{item.period}</p>
                <p className="experience__description">{item.description}</p>
                {item.current && (
                  <span className="experience__current-badge">Current</span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
