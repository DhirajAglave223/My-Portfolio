import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { education } from '../data/portfolio';
import { perspectiveReveal } from '../animations/variants';
import TiltCard from '../components/TiltCard';
import SectionHeading from '../components/SectionHeading';
import { GraduationCap } from 'lucide-react';
import './Education.css';

const Education = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="education" ref={containerRef}>
      <div className="education__container">
        <SectionHeading label="Education" title="EDUCATION & LEARNING" />

        <div className="education__timeline">
          <div className="education__line">
            <motion.div className="education__line-fill" style={{ height: fillHeight }} />
          </div>

          {education.map((item, index) => (
            <motion.div
              key={index}
              className="education__item"
              variants={perspectiveReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              custom={index * 0.15}
            >
              <div className="education__dot">
                <div className="education__dot-pulse" />
              </div>

              <TiltCard>
                <motion.div 
                  className="education__card"
                  whileHover={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: -2, scale: 1.01 } : { y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                <div className="education__card-header">
                  <div className="education__icon-wrap">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="education__degree">{item.degree}</h3>
                    <p className="education__field">{item.field}</p>
                  </div>
                </div>
                <div className="education__details">
                  <p className="education__institution">{item.institution}</p>
                  <p className="education__period">{item.period}</p>
                </div>
                <div className="education__glow"></div>
              </motion.div>
            </TiltCard>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
