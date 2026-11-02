import { personalInfo } from '../data/portfolio';
import { LinkedinIcon, GithubIcon, InstagramIcon } from '../components/SocialIcons';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__name">{personalInfo.name}</span>
            <span className="footer__title">{personalInfo.title}</span>
          </div>

          <div className="footer__socials">
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={16} /></a>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={16} /></a>
            <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p>&copy; {year} {personalInfo.name}. All rights reserved.</p>
          <p className="footer__built">Built with React, Three.js & Motion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
