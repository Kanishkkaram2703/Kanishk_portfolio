// ============================================================
// Portfolio Data — Kanishk Karam
// ============================================================

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  image: string;
}

export interface UniverseProject {
  id: string;
  title: string;
  description: string;
  category: 'cv' | 'ml' | 'dl' | 'data';
  techStack: string[];
  github?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  board?: string;
  score: string;
  scoreLabel: string;
  year: string;
  current?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  badge?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface TimelineMilestone {
  title: string;
  description: string;
  icon: string;
  year: string;
}

// ============================================================
// HERO
// ============================================================

export const heroData = {
  name: 'KANISHK KARAM',
  roles: [
    'AI Engineer',
    'Data Science Student',
    'Computer Vision Developer',
    'Full Stack Builder',
  ],
  tagline: 'Building intelligent systems that see, learn, and create.',
  cta: {
    projects: 'Explore Projects',
    resume: 'Download Resume',
    contact: 'Contact Me',
  },
  resumeUrl: '/resume.pdf',
};

// ============================================================
// ABOUT — Journey Timeline
// ============================================================

export const journeyMilestones: TimelineMilestone[] = [
  {
    title: 'Student',
    description:
      'Started the journey with a deep curiosity for data, numbers, and how technology can solve real-world problems.',
    icon: '🎓',
    year: '2021',
  },
  {
    title: 'Machine Learning',
    description:
      'Dived into the world of supervised & unsupervised learning, building predictive models and uncovering patterns in data.',
    icon: '🧠',
    year: '2022',
  },
  {
    title: 'Computer Vision',
    description:
      'Explored how machines can see — building detection, recognition, and tracking systems using OpenCV, MediaPipe, and CNNs.',
    icon: '👁️',
    year: '2023',
  },
  {
    title: 'AI Applications',
    description:
      'Combined ML & CV to build real-world AI applications — from drowsiness detection to emotion analysis and beyond.',
    icon: '🤖',
    year: '2023',
  },
  {
    title: 'Full Stack Development',
    description:
      'Expanded into full-stack engineering — React, Next.js, Flask, Express — to bring AI models to production-grade products.',
    icon: '⚡',
    year: '2024',
  },
  {
    title: 'AI Product Builder',
    description:
      'Now building end-to-end AI products that combine intelligent backends with stunning frontends — shipping real value.',
    icon: '🚀',
    year: '2025',
  },
];

// ============================================================
// FEATURED PROJECTS
// ============================================================

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'smart-board',
    title: 'Smart Board Display System',
    description:
      'An intelligent digital signage system that dynamically manages and displays content across multiple screens with real-time updates and scheduling capabilities.',
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/smart-board.webp',
  },
  {
    id: 'purecious-ai',
    title: 'Purecious-AI',
    description:
      'An AI-powered platform leveraging large language models and retrieval-augmented generation to deliver intelligent, context-aware responses and insights.',
    techStack: ['Python', 'FAISS', 'Sentence Transformers', 'Ollama', 'Flask'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/purecious-ai.webp',
  },
  {
    id: 'mental-health',
    title: 'Mental Health Chatbot',
    description:
      'A compassionate AI chatbot designed to provide mental health support through empathetic conversations, mood tracking, and resource recommendations.',
    techStack: ['Python', 'NLP', 'TensorFlow', 'Flask', 'React'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/mental-health.webp',
  },
  {
    id: 'samarth-ai',
    title: 'Samarth AI',
    description:
      'A comprehensive AI assistant built for accessibility and productivity — helping users interact with complex data through natural language queries.',
    techStack: ['Python', 'LLM', 'React', 'Express', 'MongoDB'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/samarth-ai.webp',
  },
  {
    id: 'shivoham-crane',
    title: 'Shivoham Crane Services',
    description:
      'A full-stack business management platform for crane rental services featuring real-time booking, fleet tracking, and automated invoicing.',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/shivoham-crane.webp',
  },
  {
    id: 'air-canvas',
    title: 'Air Canvas',
    description:
      'A gesture-controlled virtual drawing application using computer vision and hand tracking — draw in mid-air with just your fingers.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    github: 'https://github.com/kanishkkaram',
    liveDemo: '#',
    image: '/images/projects/air-canvas.webp',
  },
];

// ============================================================
// PROJECT UNIVERSE (3D Galaxy)
// ============================================================

export const universeProjects: UniverseProject[] = [
  {
    id: 'drowsiness',
    title: 'Driver Drowsiness Detection',
    description: 'Real-time drowsiness detection system using facial landmark analysis and eye aspect ratio monitoring to alert drivers.',
    category: 'cv',
    techStack: ['Python', 'OpenCV', 'dlib', 'CNN'],
  },
  {
    id: 'emotion',
    title: 'Emotion Detection',
    description: 'Deep learning model that classifies facial expressions into distinct emotional states in real-time video streams.',
    category: 'cv',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'CNN'],
  },
  {
    id: 'senior-citizen',
    title: 'Senior Citizen Identification',
    description: 'Computer vision system for identifying and prioritizing senior citizens in public spaces using age estimation models.',
    category: 'cv',
    techStack: ['Python', 'OpenCV', 'Deep Learning'],
  },
  {
    id: 'plant-disease',
    title: 'Plant Disease Detection',
    description: 'CNN-based image classification model that identifies plant diseases from leaf images with high accuracy.',
    category: 'dl',
    techStack: ['Python', 'TensorFlow', 'Keras', 'CNN'],
  },
  {
    id: 'age-detection',
    title: 'Age Detection',
    description: 'Real-time age estimation system using deep learning and computer vision for demographic analysis.',
    category: 'cv',
    techStack: ['Python', 'OpenCV', 'Deep Learning'],
  },
  {
    id: 'car-color',
    title: 'Car Color Detection',
    description: 'Automated vehicle color classification system using image processing and machine learning techniques.',
    category: 'cv',
    techStack: ['Python', 'OpenCV', 'Scikit-learn'],
  },
  {
    id: 'credit-fraud',
    title: 'Credit Card Fraud Detection',
    description: 'Machine learning pipeline for detecting fraudulent credit card transactions using anomaly detection algorithms.',
    category: 'ml',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
  },
  {
    id: 'personality',
    title: 'Customer Personality Analysis',
    description: 'Clustering and segmentation analysis of customer behavior patterns for targeted marketing strategies.',
    category: 'data',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
  },
  {
    id: 'churn',
    title: 'Customer Churn Prediction',
    description: 'Predictive model to identify customers likely to churn, enabling proactive retention strategies.',
    category: 'ml',
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
  },
  {
    id: 'car-price',
    title: 'Car Price Prediction',
    description: 'Regression model for predicting used car prices based on multiple features including mileage, brand, and condition.',
    category: 'ml',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
  },
  {
    id: 'housing',
    title: 'Housing Price Prediction',
    description: 'Advanced regression analysis for real estate price prediction using ensemble methods and feature engineering.',
    category: 'ml',
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
  },
  {
    id: 'titanic',
    title: 'Titanic Survival Prediction',
    description: 'Classic ML classification problem — predicting passenger survival on the Titanic using logistic regression and random forests.',
    category: 'ml',
    techStack: ['Python', 'Scikit-learn', 'Pandas'],
  },
  {
    id: 'wine',
    title: 'Red Wine Quality Prediction',
    description: 'Quality classification model for red wine using physicochemical properties and ensemble learning methods.',
    category: 'data',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
  },
];

// ============================================================
// SKILLS
// ============================================================

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: '💻',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 85 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    title: 'AI & ML',
    icon: '🧠',
    skills: [
      { name: 'TensorFlow', level: 90 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'Keras', level: 85 },
      { name: 'FAISS', level: 75 },
      { name: 'Sentence Transformers', level: 80 },
      { name: 'Ollama', level: 75 },
    ],
  },
  {
    title: 'Computer Vision',
    icon: '👁️',
    skills: [
      { name: 'OpenCV', level: 92 },
      { name: 'MediaPipe', level: 85 },
      { name: 'CNN', level: 88 },
    ],
  },
  {
    title: 'Web',
    icon: '🌐',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Flask', level: 82 },
      { name: 'Express', level: 78 },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
    ],
  },
  {
    title: 'Tools',
    icon: '🔧',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 92 },
      { name: 'Docker', level: 75 },
      { name: 'Prisma', level: 80 },
    ],
  },
];

// ============================================================
// EDUCATION
// ============================================================

export const education: Education[] = [
  {
    degree: 'B.Sc Data Science & Analytics',
    institution: "Vivekanand Education Society's College",
    board: 'University of Mumbai',
    score: '8.86',
    scoreLabel: 'CGPA',
    year: '2023 – 2026',
    current: true,
  },
  {
    degree: 'HSC (Higher Secondary)',
    institution: 'TSBIE Telangana',
    score: '87.60%',
    scoreLabel: 'Percentage',
    year: '2021 – 2023',
  },
  {
    degree: 'SSC (Secondary School)',
    institution: 'Oxford High School',
    score: '95%',
    scoreLabel: 'Percentage',
    year: '2021',
  },
];

// ============================================================
// CERTIFICATIONS
// ============================================================

export const certifications: Certification[] = [
  {
    title: 'Google Advanced Data Analytics',
    issuer: 'Coursera',
    year: '2025',
    badge: '🏅',
  },
  {
    title: 'GenAI-Powered Data Analytics',
    issuer: 'Forage',
    year: '2025',
    badge: '🏅',
  },
  {
    title: 'Artificial Intelligence & Machine Learning',
    issuer: 'ISRO',
    year: '2024',
    badge: '🏅',
  },
  {
    title: 'Cloud Computing Certification',
    issuer: 'University',
    year: '2024',
    badge: '🏅',
  },
];

// ============================================================
// ACHIEVEMENTS
// ============================================================

export const achievements: Achievement[] = [
  {
    title: 'Finalist — Data Science & Data Analytics Hackathon',
    description:
      'Competed against top teams and reached the finals with an innovative data-driven solution.',
    icon: '🏆',
  },
  {
    title: 'Multiple Analytics Workshops',
    description:
      'Participated in industry-leading analytics workshops to sharpen data science skills.',
    icon: '📊',
  },
  {
    title: 'Industry Workshop Participant',
    description:
      'Engaged with industry experts in hands-on workshops covering cutting-edge technologies.',
    icon: '🎯',
  },
  {
    title: 'Academic & Applied Data Analysis Projects',
    description:
      'Delivered multiple high-impact academic and applied data analysis projects with real-world datasets.',
    icon: '🔬',
  },
];

// ============================================================
// CONTACT & SOCIAL
// ============================================================

export const contactData = {
  email: 'kanishkkaram@gmail.com',
  linkedin: 'https://linkedin.com/in/kanishkkaram',
  github: 'https://github.com/kanishkkaram',
  resumeUrl: '/resume.pdf',
};

// ============================================================
// NAV ITEMS
// ============================================================

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];
