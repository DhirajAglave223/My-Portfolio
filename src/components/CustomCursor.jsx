import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hoverState, setHoverState] = useState('normal');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches ||
        prefersReducedMotion
      );
    };
    checkTouch();
    if (isTouchDevice || prefersReducedMotion) return;

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    let animationId;
    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 20}px, ${ring.y - 20}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    const determineHoverState = (el) => {
      if (el.closest('.project-panel')) return 'project';
      if (el.tagName === 'A' && el.getAttribute('target') === '_blank') return 'link';
      return 'button';
    };

    const handleHoverStart = (e) => {
      setHoverState(determineHoverState(e.currentTarget));
    };
    const handleHoverEnd = () => setHoverState('normal');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .project-panel');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
      return interactiveElements;
    };

    let elements = attachListeners();
    animationId = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      elements = attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isVisible ? 'visible' : ''} state-${hoverState}`} />
      <div ref={ringRef} className={`cursor-ring ${isVisible ? 'visible' : ''} state-${hoverState}`}>
        {hoverState === 'project' && <span className="cursor-text">VIEW</span>}
        {hoverState === 'image' && <span className="cursor-text">EXPLORE</span>}
        {hoverState === 'link' && <ArrowUpRight size={16} className="cursor-icon" />}
      </div>
    </>
  );
};

export default CustomCursor;
