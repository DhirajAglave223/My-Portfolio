import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { Mail, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/SocialIcons';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      {/* Background glow */}
      <div className="contact__glow" />

      <motion.div
        className="contact__container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span className="contact__label" variants={staggerItem}>
          Get In Touch
        </motion.span>

        <motion.h2 className="contact__heading" variants={staggerItem}>
          Let's Build Something<br />
          <span className="contact__heading-accent">Intelligent.</span>
        </motion.h2>

        <motion.p className="contact__subtext" variants={staggerItem}>
          Open to collaborations, full-time opportunities, and interesting projects.
        </motion.p>

        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="contact__email-btn"
          variants={staggerItem}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Mail size={18} />
          {personalInfo.email}
          <ArrowUpRight size={14} />
        </motion.a>

        <motion.div className="contact__socials" variants={staggerItem}>
          <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
            <span>LinkedIn</span>
          </a>
          <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="GitHub">
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>
          <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Instagram">
            <InstagramIcon size={18} />
            <span>Instagram</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
