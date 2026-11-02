import localAiImg from '../assets/images/local-ai.jpg';
import ragAiImg from '../assets/images/rag-ai.jpg';
import todoImg from '../assets/images/todo-app.jpg';
import ssmsImg from '../assets/images/ssms.jpg';

export const personalInfo = {
  name: 'Dhiraj Aglave',
  title: 'AI Full Stack Developer',
  tagline: 'Engineering Intelligent Digital Experiences with Full-Stack Development, AI & Modern Technology.',
  email: 'dhirajaglave007@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/mr-dhiraj-aglave-0645a7379',
    github: 'https://github.com/DhirajAglave223',
    instagram: 'https://www.instagram.com/mr_dhiraj_aglave/',
  },
};

export const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export const education = [
  {
    degree: 'Degree',
    field: 'Online BCA',
    period: 'August 2025',
    institution: 'University of Mysore, Karnataka',
  },
  {
    degree: 'HSC',
    field: 'Higher Secondary Certificate',
    period: 'Passed in 2025',
    institution: 'K. J. Somaiya College of Arts, Commerce and Science, Kopargaon',
  },
  {
    degree: 'SSC',
    field: 'Secondary School Certificate',
    period: 'Passed in 2023',
    institution: 'K. B. P. Secondary & Technical School, Kopargaon',
  },
];

export const skillCategories = [
  {
    title: 'Frontend & UI',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Python', 'FastAPI'],
  },
  {
    title: 'Database & Cloud',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase'],
  },
  {
    title: 'Mobile & Multi-platform',
    skills: ['Flutter', 'Dart'],
  },
  {
    title: 'DevOps & Version Control',
    skills: ['Git', 'GitHub', 'GitLab'],
  },
  {
    title: 'Build & Deployment',
    skills: ['Vite', 'Railway', 'Render', 'Vercel', 'Netlify'],
  },
];

export const projects = [
  {
    title: 'Local AI ChatBot',
    category: 'AI / Machine Learning',
    description: 'A locally hosted AI chatbot powered by large language models for private, offline conversational intelligence.',
    tech: ['Python', 'LLM', 'AI'],
    status: 'Completed',
    accent: '#00e5ff',
    accentName: 'blue',
    image: localAiImg,
    source: 'https://github.com/DhirajAglave223/demo-ai-chatbot',
    backendSource: null,
  },
  {
    title: 'RAG AI ChatBot',
    category: 'AI / Retrieval Augmented Generation',
    description: 'An AI chatbot using Retrieval Augmented Generation to provide context-aware responses from custom knowledge bases.',
    tech: ['Python', 'RAG', 'Vector DB', 'LLM'],
    status: 'Currently in development',
    accent: '#b580ff',
    accentName: 'violet',
    image: ragAiImg,
    source: null,
    backendSource: null,
  },
  {
    title: 'To-Do Web Application',
    category: 'Full Stack Web App',
    description: 'A clean and functional task management application with full CRUD operations and responsive design.',
    tech: ['React', 'JavaScript', 'CSS'],
    status: 'Completed',
    accent: '#ff9f43',
    accentName: 'orange',
    image: todoImg,
    source: 'https://gitlab.com/DhirajAglave223/to-do-website',
    backendSource: null,
  },
  {
    title: 'Smart Society Management System',
    category: 'Full Stack Platform',
    description: 'A comprehensive society management platform for residents, committees, and administrators with real-time features.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Supabase'],
    status: 'Currently in Development',
    team: true,
    accent: '#38bdf8',
    accentName: 'sky',
    image: ssmsImg,
    source: 'https://gitlab.com/ananyanaik123/ssms-frontend',
    backendSource: 'https://gitlab.com/ananyanaik123/ssms-backend',
  },
];

export const aiWorkflowSteps = [
  { label: 'USER', icon: 'user' },
  { label: 'PROMPT', icon: 'message' },
  { label: 'RETRIEVAL', icon: 'search' },
  { label: 'CONTEXT', icon: 'database' },
  { label: 'LLM', icon: 'brain' },
  { label: 'RESPONSE', icon: 'sparkles' },
];
