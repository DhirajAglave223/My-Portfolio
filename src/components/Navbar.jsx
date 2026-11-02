import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks, personalInfo } from '../data/portfolio';
import { Menu, X, Download, Sun, Moon, Send } from 'lucide-react';
import './Navbar.css';

const NAVBAR_HEIGHT = 80; // px — approximate navbar + top margin
const SECTION_IDS = ['hero', 'about', 'skills', 'education', 'projects', 'contact'];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef(null);

  // Theme toggle
  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [isLight]);

  // Lightweight scrolled state — uses ref to avoid re-rendering on every pixel
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 40;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver — zero-lag, no scroll listener overhead
  useEffect(() => {
    const observerOptions = {
      root: null,
      // rootMargin: top offset (negative, so we trigger after clearing navbar) and bottom
      rootMargin: `-${NAVBAR_HEIGHT + 40}px 0px -45% 0px`,
      threshold: 0,
    };

    const observerCallback = (entries) => {
      // Don't update active state during programmatic click-scroll
      if (isClickScrolling.current) return;

      // Find which sections are intersecting
      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (intersecting.length > 0) {
        setActiveSection(intersecting[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Fallback: detect hero when at very top of page
  useEffect(() => {
    let ticking = false;
    const handleTop = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY < 100 && !isClickScrolling.current) {
          setActiveSection('hero');
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleTop, { passive: true });
    return () => window.removeEventListener('scroll', handleTop);
  }, []);

  // Scroll to section — uses window.scrollTo which works harmoniously with Lenis
  const scrollToSection = useCallback((targetId) => {
    if (targetId === 'hero') {
      // Immediately set active state
      setActiveSection('hero');
      isClickScrolling.current = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Release the click-scroll lock after animation settles
      clearTimeout(clickScrollTimer.current);
      clickScrollTimer.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 900);
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) return;

    // Immediately set active state for instant visual feedback
    setActiveSection(targetId);
    isClickScrolling.current = true;

    // Calculate precise scroll position: element top - navbar clearance
    const elementTop = target.getBoundingClientRect().top + window.scrollY;
    // Add 32px offset to scroll slightly deeper into the section's top padding,
    // bringing the section content perfectly snug below the navbar.
    const scrollTarget = elementTop - NAVBAR_HEIGHT + 32;

    window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });

    // Release the click-scroll lock after animation settles
    clearTimeout(clickScrollTimer.current);
    clickScrollTimer.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    scrollToSection(targetId);
  }, [scrollToSection]);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Left Brand */}
          <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-text">{personalInfo.name}</span>
            <span className="navbar__logo-bracket"> /&gt;</span>
          </a>

          {/* Centered Navigation */}
          <div className="navbar__links">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="navbar__link-indicator"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Controls: CONNECT | RESUME | Theme Toggle */}
          <div className="navbar__actions">
            <a
              href="#contact"
              className="navbar__connect-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <Send size={13} />
              <span>CONNECT</span>
            </a>

            <a
              href="/Dhiraj_Aglave_Resume.pdf"
              download="Dhiraj_Aglave_Resume.pdf"
              className="navbar__resume-btn"
              title="Download Dhiraj Aglave Resume PDF"
            >
              <Download size={13} />
              <span>RESUME</span>
            </a>

            <button
              className="navbar__theme-btn"
              onClick={() => setIsLight(!isLight)}
              aria-label="Toggle theme"
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              className="navbar__menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(28px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-nav__links">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav__link ${activeSection === link.href.slice(1) ? 'mobile-nav__link--active' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="mobile-nav__link-number">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mobile-nav__actions">
              <a
                href="#contact"
                className="navbar__connect-btn mobile-nav__connect"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                <Send size={15} />
                <span>CONNECT</span>
              </a>

              <a
                href="/Dhiraj_Aglave_Resume.pdf"
                download="Dhiraj_Aglave_Resume.pdf"
                className="navbar__resume-btn mobile-nav__resume"
                onClick={() => setMobileOpen(false)}
              >
                <Download size={15} />
                <span>DOWNLOAD RESUME</span>
              </a>

              <button
                className="navbar__theme-btn mobile-nav__theme"
                onClick={() => { setIsLight(!isLight); setMobileOpen(false); }}
                aria-label="Toggle theme"
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
                <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
