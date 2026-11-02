import { motion } from 'motion/react';
import { skillCategories } from '../data/portfolio';
import { staggerContainer, perspectiveReveal } from '../animations/variants';
import SectionHeading from '../components/SectionHeading';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="skills__container">
        <SectionHeading label="Skills" title="Technology Stack" align="center" />

        <motion.div
          className="skills__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skills__category"
              variants={perspectiveReveal}
            >
              <h3 className="skills__category-title">{category.title}</h3>
              <div className="skills__tags">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skills__tag"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                    whileHover={{ scale: 1.1, y: -8, boxShadow: "0 10px 20px rgba(0,229,255,0.25)", borderColor: "rgba(0,229,255,0.5)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
