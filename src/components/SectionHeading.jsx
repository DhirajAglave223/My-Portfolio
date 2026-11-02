import { motion } from 'motion/react';
import { fadeInUp } from '../animations/variants';
import './SectionHeading.css';

const SectionHeading = ({ label, title, align = 'left' }) => {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <motion.span
        className="section-heading__label"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
      >
        {label}
      </motion.span>
      {title && (
        <motion.h2
          className="section-heading__title"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={0.1}
        >
          {title}
        </motion.h2>
      )}
    </div>
  );
};

export default SectionHeading;
