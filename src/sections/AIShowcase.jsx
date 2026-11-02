import { motion } from 'motion/react';
import { aiWorkflowSteps } from '../data/portfolio';
import { staggerContainer, staggerItem, fadeInUp } from '../animations/variants';
import SectionHeading from '../components/SectionHeading';
import { User, MessageSquare, Search, Database, Brain, Sparkles, ChevronDown } from 'lucide-react';
import './AIShowcase.css';

const iconMap = {
  user: User,
  message: MessageSquare,
  search: Search,
  database: Database,
  brain: Brain,
  sparkles: Sparkles,
};

const AIShowcase = () => {
  return (
    <section id="ai-showcase" className="ai-showcase">
      <div className="ai-showcase__container">
        <SectionHeading label="AI Workflow" title="How I Build AI Systems" align="center" />

        <motion.div
          className="ai-showcase__pipeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {aiWorkflowSteps.map((step, index) => {
            const IconComp = iconMap[step.icon];
            return (
              <motion.div key={step.label} variants={staggerItem}>
                <motion.div 
                  className="ai-showcase__step"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px rgba(181, 128, 255, 0.2)" }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="ai-showcase__step-icon">
                    <IconComp size={20} />
                  </div>
                  <span className="ai-showcase__step-label">{step.label}</span>
                </motion.div>
                {index < aiWorkflowSteps.length - 1 && (
                  <div className="ai-showcase__connector">
                    <motion.div 
                      className="ai-showcase__energy-flow"
                      animate={{ y: [0, 40] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="ai-showcase__note"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          From user prompts to intelligent responses — building end-to-end AI-powered applications.
        </motion.p>
      </div>
    </section>
  );
};

export default AIShowcase;
