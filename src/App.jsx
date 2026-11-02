import { useState } from 'react';
import { motion } from 'motion/react';
import { useLenis } from './hooks/useLenis';

import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import { GlobalSpaceScene } from './three/GlobalSpaceScene';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Projects from './sections/Projects';
import AIShowcase from './sections/AIShowcase';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Initialize smooth scrolling
  useLenis();

  return (
    <>
      <CustomCursor />
      <PageLoader onLoadComplete={() => setLoaded(true)} />
      
      {/* Global 3D Space Background spanning all sections */}
      <GlobalSpaceScene />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ pointerEvents: loaded ? 'auto' : 'none' }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <AIShowcase />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
