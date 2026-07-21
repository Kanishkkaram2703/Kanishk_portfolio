"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { BrainCircuit, Cpu, Eye, Bot, Database, Server, LayoutDashboard, Cloud, Moon, Sun, Send, Loader2, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react";


/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

const HERO_ROLES = [
  "AI ENGINEER",
  "DATA SCIENTIST",
  "DATA ANALYST",
  "ML ENGINEER",
  "COMPUTER VISION ENGINEER",
  "AI PRODUCT BUILDER",
  "LLM ENGINEER",
];

const HERO_STATS = [
  { value: "25+", label: "PROJECTS" },
  { value: "8+", label: "AI SOLUTIONS" },
  { value: "12+", label: "TECH STACKS" },
  { value: "100%", label: "PASSION" },
];

const ROLES = [
  "AI Engineer",
  "Data Scientist",
  "Data Analyst",
  "ML Engineer",
  "Computer Vision Engineer",
  "BI Analyst",
  "LLM Engineer",
];

const STORY_PHASES = [
  {
    phase: "01",
    title: "THE BEGINNING",
    tagline: "Where curiosity met technology.",
    description: "Started with an insatiable curiosity about how things work. Explored programming fundamentals, fell in love with logic, and discovered that code could bring ideas to life. Every line written was a step toward something bigger.",
    highlights: ["First lines of code", "Problem-solving mindset", "Self-taught foundations"],
  },
  {
    phase: "02",
    title: "DATA SCIENCE DISCOVERY",
    tagline: "Learning how data becomes decisions.",
    description: "Entered the world of Data Science and Analytics. Mastered Python, SQL, and data visualization. Learned to extract meaning from noise, turning raw datasets into actionable insights that drive real decisions.",
    highlights: ["Python & SQL mastery", "Statistical analysis", "Data visualization"],
  },
  {
    phase: "03",
    title: "DATA ANALYTICS",
    tagline: "Turning data into decisions.",
    description: "Discovered how data tells business stories through Power BI, SQL, Excel, and Python. Built dashboards, customer insights, forecasting models, business reports, and predictive analytics that transformed raw datasets into actionable business decisions.",
    highlights: ["Power BI & Dashboards", "SQL & Excel", "Business Intelligence"],
  },
  {
    phase: "04",
    title: "MACHINE LEARNING & DEEP LEARNING",
    tagline: "Teaching machines to see and think.",
    description: "Built predictive models and dived deep into Deep Learning and Computer Vision. Created detection, recognition, and tracking systems. Discovered the power of CNNs, OpenCV, and MediaPipe to solve real-world visual problems.",
    highlights: ["Predictive models", "Computer Vision systems", "Deep Learning architectures"],
  },
  {
    phase: "05",
    title: "AI ENGINEERING",
    tagline: "From models to production systems.",
    description: "Started building real-world AI systems at scale. Developed intelligent chatbots, RAG-powered platforms, and end-to-end AI applications. Combined Full Stack Development with AI to ship products that solve real problems.",
    highlights: ["RAG & LLM systems", "Full-stack AI apps", "Production deployment"],
  },
  {
    phase: "06",
    title: "THE VISION AHEAD",
    tagline: "Building impactful AI for tomorrow.",
    description: "Focused on creating AI products that make a meaningful difference. The goal isn't just to build technology — it's to build technology that matters. Every project is a step toward solving problems that impact real lives.",
    highlights: ["AI product thinking", "Real-world impact", "Continuous evolution"],
  },
];

const EDUCATION = [
  { degree: "Secondary School (SSC)", institution: "Oxford High School", score: "95%", year: "2021" },
  { degree: "Junior College (HSC)", institution: "TSBIE Telangana", score: "87.6%", year: "2023" },
  { degree: "B.Sc Data Science & Analytics", institution: "VES College, University of Mumbai", score: "CGPA 8.86", year: "Completed in 2026" },
];

const FEATURED_PROJECTS = [
  // Data Analytics Projects
  { title: "Customer Personality Analysis", desc: "Customer segmentation using clustering and dimensionality reduction for targeted marketing strategies.", tech: ["Python", "Pandas", "Scikit-learn", "Seaborn"], image: "/projects/1.png" },
  { title: "Credit Card Fraud Detection", desc: "Machine learning pipeline detecting fraudulent transactions with high precision using imbalanced data techniques.", tech: ["Python", "Scikit-learn", "XGBoost", "SMOTE"], image: "/projects/2.png" },
  { title: "Housing Price Regression", desc: "Predictive regression model for housing prices with advanced feature engineering and ensemble methods.", tech: ["Python", "Scikit-learn", "XGBoost", "Pandas"], image: "/projects/3.png" },
  // AI Projects
  { title: "Smart Board Display System", desc: "Intelligent digital signage with real-time content management and scheduling.", tech: ["React", "Next.js", "Node.js", "PostgreSQL"], image: "/projects/4.png" },
  { title: "Purecious-AI", desc: "RAG-powered AI platform using LLMs and vector search for context-aware intelligence.", tech: ["Python", "FAISS", "Ollama", "Flask"], image: "/projects/5.png" },
  { title: "Mental Health Chatbot", desc: "Empathetic AI chatbot providing mental health support through NLP conversations.", tech: ["Python", "NLP", "TensorFlow", "Flask"], image: "/projects/6.png" },
  { title: "Samarth AI", desc: "Comprehensive AI assistant for accessibility and natural language data interaction.", tech: ["Python", "LLM", "React", "Express"], image: "/projects/7.png" },
  { title: "Plant Disease Detection", desc: "Deep learning based plant disease detection system using CNN for accurate crop health analysis.", tech: ["Python", "TensorFlow", "CNN", "OpenCV"], image: "/projects/8.png" },
  { title: "Air Canvas", desc: "Gesture-controlled virtual drawing using computer vision and hand tracking.", tech: ["Python", "OpenCV", "MediaPipe"], image: "/projects/9.png" },
];

const UNIVERSE_PROJECTS = [
  // Computer Vision
  { title: "Driver Drowsiness Detection", cat: "CV", desc: "Real-time driver alertness monitoring using facial landmarks and eye aspect ratio.", tech: ["Python", "OpenCV", "dlib"], highlight: "95.2% Accuracy", size: "large" },
  { title: "Emotion Detection", cat: "CV", desc: "Facial emotion recognition from live webcam feed using deep learning.", tech: ["Python", "TensorFlow", "OpenCV"], highlight: "7 Emotions", size: "medium" },
  { title: "Age Detection", cat: "CV", desc: "Deep learning model to predict age from facial features.", tech: ["Python", "CNN", "OpenCV"], highlight: "MAE: 4.2 yrs", size: "small" },
  { title: "Car Color Detection", cat: "CV", desc: "Automated vehicle color classification using computer vision.", tech: ["Python", "OpenCV", "KNN"], highlight: "12 Colors", size: "small" },
  { title: "Senior Citizen ID", cat: "CV", desc: "Age-based identification system for senior citizen verification.", tech: ["Python", "OpenCV", "MediaPipe"], highlight: "Real-time", size: "small" },
  // Analytics & ML
  { title: "Customer Personality", cat: "BI", desc: "Customer segmentation using clustering and dimensionality reduction.", tech: ["Python", "Pandas", "KMeans"], highlight: "5 Segments", size: "medium" },
  { title: "Customer Churn", cat: "ML", desc: "Predicting customer attrition using gradient boosting.", tech: ["Python", "XGBoost", "SMOTE"], highlight: "91% F1", size: "small" },
  { title: "Credit Card Fraud", cat: "ML", desc: "Anomaly detection in financial transactions using ensemble methods.", tech: ["Python", "Scikit-learn", "XGBoost"], highlight: "99.1% AUC", size: "medium" },
  { title: "Housing Price", cat: "ML", desc: "Housing price prediction with feature engineering.", tech: ["Python", "Pandas", "LinearReg"], highlight: "RMSE: 3.4", size: "small" },
  { title: "Car Price Prediction", cat: "ML", desc: "Regression model for used car price estimation.", tech: ["Python", "Scikit-learn", "Flask"], highlight: "R²: 0.92", size: "small" },
  { title: "Wine Quality", cat: "DATA", desc: "Wine quality prediction from physicochemical properties.", tech: ["Python", "RandomForest"], highlight: "88% Acc", size: "small" },
  { title: "Titanic Survival", cat: "ML", desc: "Classic survival prediction with feature engineering.", tech: ["Python", "Scikit-learn"], highlight: "82% Acc", size: "small" },
  { title: "Linear Regression", cat: "ML", desc: "Fundamental regression analysis with gradient descent optimization.", tech: ["Python", "NumPy", "Matplotlib"], highlight: "Core ML", size: "small" },
  { title: "Logistic Regression", cat: "ML", desc: "Binary classification using logistic regression with feature scaling.", tech: ["Python", "Scikit-learn", "Pandas"], highlight: "Classification", size: "small" },
];

const SKILLS_OS: { category: string; iconName: string; skills: string[] }[] = [
  { category: "Machine Learning", iconName: "BrainCircuit", skills: ["Python", "Scikit-learn", "NumPy", "Pandas", "XGBoost", "Random Forest", "LightGBM", "Feature Engineering"] },
  { category: "Deep Learning", iconName: "Cpu", skills: ["TensorFlow", "Keras", "PyTorch", "CNN", "RNN", "LSTM", "Transformers", "Transfer Learning"] },
  { category: "Computer Vision", iconName: "Eye", skills: ["OpenCV", "MediaPipe", "YOLO", "dlib", "Image Processing", "Object Detection", "Pose Detection"] },
  { category: "Data Analytics", iconName: "BarChart3", skills: ["Python", "SQL", "Excel", "Power BI", "Pandas", "NumPy", "Statistics", "EDA", "Matplotlib", "Seaborn", "Business Intelligence", "Dashboarding"] },
  { category: "Data Engineering", iconName: "Database", skills: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Spark", "PySpark", "ETL", "Apache Airflow", "HDFS"] },
  { category: "LLMs & Generative AI", iconName: "Bot", skills: ["LangChain", "LangGraph", "RAG", "FAISS", "ChromaDB", "Ollama", "OpenAI API", "Prompt Engineering"] },
  { category: "Backend", iconName: "Server", skills: ["Flask", "FastAPI", "Express.js", "Node.js", "REST APIs", "JWT", "Authentication"] },
  { category: "Frontend", iconName: "LayoutDashboard", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"] },
  { category: "Cloud & DevOps", iconName: "Cloud", skills: ["Docker", "AWS", "Git", "GitHub", "GitHub Actions", "Linux", "CI/CD", "Vercel"] },
];

const SKILL_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BrainCircuit, Cpu, Eye, Bot, Database, Server, LayoutDashboard, Cloud, BarChart3,
};

const CERTS = [
  { title: "Google Advanced Data Analytics", issuer: "Coursera", year: "2025", image: "/certificates/Google_advanced_analytics.jpg" },
  { title: "GenAI-Powered Data Analytics", issuer: "Forage", year: "2025", image: "/certificates/GenAl-analytics.jpg" },
  { title: "AI & Machine Learning", issuer: "ISRO", year: "2024", image: "/certificates/AIML_ISRO_certificate.jpg" },
  { title: "Cloud Computing", issuer: "University", year: "2024", image: "/certificates/cloud computing.jpg" },
];

const ACHIEVEMENTS = [
  { year: "2025", title: "Google Advanced Analytics Certification", desc: "Completed Google's professional certification in advanced data analytics.", impact: "Industry-recognized credential", skills: ["Data Analytics", "Python", "Statistics"] },
  { year: "2025", title: "GenAI Analytics — Forage", desc: "Completed virtual experience in generative AI-powered analytics.", impact: "Applied GenAI to real analytics", skills: ["GenAI", "Data Analysis", "LLMs"] },
  { year: "2024", title: "Finalist — Data Science Hackathon", desc: "Competed against top teams with an innovative data-driven solution.", impact: "Top finalist among 50+ teams", skills: ["Problem Solving", "ML", "Teamwork"] },
  { year: "2024", title: "AI & ML Certification — ISRO", desc: "Certified by ISRO in artificial intelligence and machine learning.", impact: "Government-backed credential", skills: ["AI", "ML", "Deep Learning"] },
  { year: "2024", title: "Industry Analytics Workshops", desc: "Multiple hands-on workshops with cutting-edge AI technologies.", impact: "Practical industry exposure", skills: ["Analytics", "Visualization", "Cloud"] },
  { year: "2023", title: "Academic Data Analysis Projects", desc: "Multiple high-impact projects with real-world datasets and published results.", impact: "8.66 CGPA in Data Science", skills: ["Research", "Analysis", "Python"] },
];

const NAV_ITEMS = ["Home", "Journey", "Projects", "Skills", "Certificates", "Achievements", "Contact"];

/* ══════════════════════════════════════════════
   CLIP SEQUENCE HOOK — Smooth 300-frame playback
   ══════════════════════════════════════════════ */
function useClipSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollProgress: number
) {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef(new Set<number>());
  const TOTAL = 300;

  // Progressive frame preloading
  useEffect(() => {
    const loadFrame = (n: number) => {
      if (imagesRef.current[n]) return;
      const img = new window.Image();
      img.src = `/clips/${String(n).padStart(5, "0")}.png`;
      img.onload = () => loadedRef.current.add(n);
      imagesRef.current[n] = img;
    };

    // Phase 1: key frames for instant display
    [1, 50, 100, 150, 200, 250, 300].forEach(loadFrame);

    // Phase 2: every 10th frame
    setTimeout(() => {
      for (let i = 1; i <= TOTAL; i += 10) loadFrame(i);
    }, 50);

    // Phase 3: every 2nd frame
    setTimeout(() => {
      for (let i = 1; i <= TOTAL; i += 2) loadFrame(i);
    }, 200);

    // Phase 4: ALL remaining frames in batches
    let batchIdx = 1;
    const loadBatch = () => {
      for (let i = 0; i < 20 && batchIdx <= TOTAL; batchIdx++) {
        if (!imagesRef.current[batchIdx]) {
          loadFrame(batchIdx);
          i++;
        }
      }
      if (batchIdx <= TOTAL) setTimeout(loadBatch, 32);
    };
    setTimeout(loadBatch, 500);
  }, []);

  // ISSUE #4 FIX: Set canvas size ONCE from first loaded frame — fixed render box
  // Fixed canvas resolution for consistent rendering
  const sizeSetRef = useRef(false);
  const CANVAS_W = 800;
  const CANVAS_H = 1000;
  // Zoom factor — crops transparent padding, makes character fill the frame
  const ZOOM = 1.6;

  // Render current frame inside fixed bounding box
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution once
    if (!sizeSetRef.current) {
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      sizeSetRef.current = true;
    }

    const targetFrame = Math.max(
      1,
      Math.min(TOTAL, Math.round(scrollProgress * (TOTAL - 1)) + 1)
    );

    // Find nearest loaded frame
    let frame = targetFrame;
    if (!loadedRef.current.has(frame)) {
      let below = frame - 1;
      let above = frame + 1;
      while (below >= 1 || above <= TOTAL) {
        if (below >= 1 && loadedRef.current.has(below)) {
          frame = below;
          break;
        }
        if (above <= TOTAL && loadedRef.current.has(above)) {
          frame = above;
          break;
        }
        below--;
        above++;
      }
    }

    const img = imagesRef.current[frame];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Calculate scaled draw dimensions with ZOOM to crop transparent padding
      const scaleX = CANVAS_W / img.naturalWidth;
      const scaleY = CANVAS_H / img.naturalHeight;
      const baseScale = Math.min(scaleX, scaleY);
      const zoomedScale = baseScale * ZOOM;

      const drawW = img.naturalWidth * zoomedScale;
      const drawH = img.naturalHeight * zoomedScale;
      // Center horizontally, shift slightly down vertically to keep head visible
      const offsetX = (CANVAS_W - drawW) / 2;
      const offsetY = (CANVAS_H - drawH) / 2 + CANVAS_H * 0.08;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }
  }, [scrollProgress, canvasRef]);
}

/* ══════════════════════════════════════════════
   NAVBAR — ISSUE #9: Premium minimal glassmorphism
   ══════════════════════════════════════════════ */
function Navbar({ active, theme, onToggleTheme }: { active: string; theme: "dark" | "light"; onToggleTheme: () => void }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        padding: "10px 32px",
      }}
    >
      <div
        className="navbar-glass"
        style={{
          padding: "9px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <img className="navbar-logo" src="/icon/icon.png" alt="Kanishk" width={36} height={36} style={{ objectFit: 'contain' }} />
        </a>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${active === item.toLowerCase() ? "nav-link-active" : ""}`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="theme-toggle-btn"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: 8,
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              color: "var(--text3)", cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Resume button */}
          <a href="/resume/resume.pdf" download className="resume-btn">
            RESUME
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════ */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, #D1001F, #ff4444, #D1001F)",
        transformOrigin: "left",
        zIndex: 9999,
      }}
    />
  );
}

/* ══════════════════════════════════════════════
   CHAPTER HEADER
   ══════════════════════════════════════════════ */
function ChapterHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: "center", marginBottom: 64 }}
    >
      <span style={{ display: "inline-block", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D1001F", marginBottom: 12, fontWeight: 600 }}>{label}</span>
      <h2 className="text-chapter" style={{ color: "var(--text)", marginBottom: 16 }}>{title}</h2>
      {subtitle && <p className="text-body" style={{ maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNav, setActiveNav] = useState("home");
  const [displayedRole, setDisplayedRole] = useState(0);
  const lastRoleRef = useRef(0);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
  const [certModal, setCertModal] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Theme persistence — read saved preference on mount
  const themeInitialized = useRef(false);
  useEffect(() => {
    const saved = localStorage.getItem("kp-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
    themeInitialized.current = true;
  }, []);

  // Sync theme to DOM + localStorage (skip initial default write)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeInitialized.current) {
      localStorage.setItem("kp-theme", theme);
    }
  }, [theme]);

  // Scroll progress for hero clip sequence
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const [heroScroll, setHeroScroll] = useState(0);

  useEffect(() => {
    return heroProgress.on("change", (v) => {
      setHeroScroll(v);
    });
  }, [heroProgress]);

  useClipSequence(canvasRef, heroScroll);

  // Scroll-synced role transition
  useEffect(() => {
    const newRole = Math.min(
      Math.floor(heroScroll * HERO_ROLES.length),
      HERO_ROLES.length - 1
    );
    if (newRole !== lastRoleRef.current) {
      lastRoleRef.current = newRole;
      setDisplayedRole(newRole);
    }
  }, [heroScroll]);

  // Active nav detection
  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map((n) => n.toLowerCase());
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
      }
      setActiveNav(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll-linked character scale: 100% at start → 120% at end
  const characterScale = 1 + heroScroll * 0.2;

  /* ── Education flight path state ── */
  const eduSectionRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const [planeState, setPlaneState] = useState({ x: 460, y: 50, angle: -45, progress: 0 });
  const [pathTotalLength, setPathTotalLength] = useState(0);

  // The organic bezier flight path: SSC(top-left) → HSC(mid-right) → Degree(bottom-left)
  // Path 1: SSC top-right → sweep far right above viewbox → curve down right edge → arrive HSC left-bottom
  // Path 2: HSC → sweep far left and below → curve right to arrive Degree upper-right
  const FLIGHT_PATH = "M 450 40 C 700 -80, 1120 20, 1080 260 C 1040 500, 820 580, 580 520 C 280 440, -120 480, -60 680 C 0 880, 360 820, 560 620";

  const { scrollYProgress: eduScroll } = useScroll({
    target: eduSectionRef,
    offset: ["start 70%", "end 30%"],
  });

  // Measure path total length on mount
  useEffect(() => {
    const path = flightPathRef.current;
    if (path) {
      setPathTotalLength(path.getTotalLength());
    }
  }, []);

  // Update airplane position + rotation based on scroll
  useEffect(() => {
    return eduScroll.on("change", (progress) => {
      const path = flightPathRef.current;
      if (!path) return;
      const totalLen = path.getTotalLength();
      if (totalLen === 0) return;

      const currentLen = progress * totalLen;
      const point = path.getPointAtLength(currentLen);

      // Calculate tangent for rotation
      const delta = 2;
      const ahead = path.getPointAtLength(Math.min(currentLen + delta, totalLen));
      const behind = path.getPointAtLength(Math.max(currentLen - delta, 0));
      const angle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * (180 / Math.PI);

      setPlaneState({ x: point.x, y: point.y, angle, progress });
    });
  }, [eduScroll]);

  // Milestone detection for glow effects
  const hscReached = planeState.progress > 0.42 && planeState.progress < 0.58;
  const degreeReached = planeState.progress > 0.92;
  const isFlying = planeState.progress > 0.05 && planeState.progress < 0.95;


  return (
    <>
      <ScrollProgressBar />
      <Navbar active={activeNav} theme={theme} onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")} />

      {/* ════════════ HERO ════════════ */}
      <section id="home" ref={heroRef} style={{ position: "relative", minHeight: "300vh" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            background: "var(--bg, #050505)",
          }}
        >
          {/* Background: radial gradient + ambient glow (no grid) */}
          <div className="hero-bg-gradient" />
          {/* Ambient red glow behind name area */}
          <div style={{ position: 'absolute', top: '30%', right: '20%', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(209,0,31,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          {/* ── Left sidebar: Social ── */}
          <div
            className="hero-sidebar"
            style={{
              position: "absolute",
              left: 28,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              zIndex: 20,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text3)",
                fontWeight: 500,
              }}
            >
              Social
            </span>
            <div style={{ width: 1, height: 24, background: "var(--glass-border)" }} />
            {/* GitHub */}
            <a
              href="https://github.com/Kanishkkaram2703"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kanishk-karam/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:kanishk.karam.28@gmail.com" className="social-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
            </a>
          </div>

          {/* ── Right sidebar: Scroll to Explore ── */}
          <div
            className="hero-sidebar"
            style={{
              position: "absolute",
              right: 28,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              zIndex: 20,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text3)",
                fontWeight: 500,
              }}
            >
              Scroll to Explore
            </span>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#D1001F",
                boxShadow: "0 0 12px rgba(209,0,31,0.5), 0 0 24px rgba(209,0,31,0.2)",
              }}
            />
          </div>

          {/* ── Main hero content ── */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              maxWidth: 1440,
              margin: "0 auto",
              padding: "0 80px",
              paddingLeft: 90,
              gap: 32,
              height: "100%",
            }}
          >
            {/* ══ LEFT COLUMN: Character Image Sequence ══ */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{
                flex: "0 0 42%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* Fixed bounding box — 25-30% larger, all 300 frames render inside */}
              <div
                style={{
                  width: "42vw",
                  height: "82vh",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 2,
                    transform: `scale(${characterScale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.1s ease-out",
                  }}
                />
              </div>
            </motion.div>

            {/* ══ RIGHT COLUMN: Text content ══ */}
            <div style={{ flex: 1, minWidth: 0, paddingLeft: 16, paddingTop: 140 }}>
              {/* HELLO, I'M */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  display: "block",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--text3)",
                  marginBottom: 18,
                }}
              >
                Hello, I&apos;m
              </motion.span>

              {/* ISSUE #5: NAME — Reduced sizes, KARAM slightly smaller than KANISHK */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ color: "var(--text)", lineHeight: 0.9, marginBottom: 0 }}
              >
                <span className="text-hero-kanishk" style={{ fontStyle: 'italic' }}>KANISHK</span>
                <span className="text-hero-karam" style={{ paddingLeft: '0.35em' }}>KARAM</span>
              </motion.h1>

              {/* ISSUE #6 + #7 + #8: Role text — 2x larger, below name, 3D rotateX flip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="role-flip-container"
                style={{
                  height: 48,
                  marginTop: 28,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={displayedRole}
                    className="role-flip-inner"
                    initial={{ rotateX: displayedRole % 2 !== 0 ? -180 : 180, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: displayedRole % 2 !== 0 ? 180 : -180, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="hero-role-text">
                      {HERO_ROLES[displayedRole]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>



              {/* Separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                style={{
                  width: 60,
                  height: 1,
                  background: "var(--glass-hover)",
                  transformOrigin: "left",
                  marginTop: 16,
                  marginBottom: 18,
                }}
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  color: "var(--text3)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  maxWidth: 440,
                  marginBottom: 32,
                }}
              >
                I build intelligent systems that solve real-world problems.
                Transforming ideas into impactful AI-powered products.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}
              >
                <a href="#projects" className="hero-cta hero-cta-primary">
                  Explore My Work
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a href="#contact" className="hero-cta hero-cta-secondary">
                  Contact Me
                  <svg className="arrow-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </motion.div>

            </div>
          </div>



          {/* Corner accent lines */}
          <div style={{ position: "absolute", top: 80, left: 32, width: 50, height: 1, background: "linear-gradient(to right, rgba(209,0,31,0.4), transparent)" }} />
          <div style={{ position: "absolute", top: 80, left: 32, width: 1, height: 50, background: "linear-gradient(to bottom, rgba(209,0,31,0.4), transparent)" }} />
          <div style={{ position: "absolute", bottom: 80, right: 32, width: 50, height: 1, background: "linear-gradient(to left, rgba(209,0,31,0.4), transparent)" }} />
          <div style={{ position: "absolute", bottom: 80, right: 32, width: 1, height: 50, background: "linear-gradient(to top, rgba(209,0,31,0.4), transparent)" }} />
        </div>
      </section>

      {/* ════════════ STATISTICS BAR ════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "48px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat" style={{ padding: "20px 24px", textAlign: "center", flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#D1001F",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text3)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ════════════ MY STORY — THE EVOLUTION ════════════ */}
      <section id="journey" className="section-wrapper" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="section-inner">
          <ChapterHeader label="The Evolution" title="My Story" subtitle="From curious student to AI product builder — a journey of relentless growth." />

          <div style={{ display: "flex", flexDirection: "column", gap: 120, maxWidth: 1100, margin: "0 auto" }}>
            {STORY_PHASES.map((phase, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  style={{
                    display: "flex",
                    flexDirection: isReversed ? "row-reverse" : "row",
                    alignItems: "center",
                    gap: 64,
                  }}
                >
                  {/* Visual / Phase Number Side */}
                  <div style={{ flex: "0 0 40%", position: "relative" }}>
                    <div
                      style={{
                        position: "relative",
                        padding: "48px 40px",
                        borderRadius: 16,
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border)",
                        backdropFilter: "blur(12px)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Large phase number */}
                      <div
                        style={{
                          fontSize: "clamp(5rem, 10vw, 8rem)",
                          fontWeight: 900,
                          color: "rgba(209,0,31,0.08)",
                          lineHeight: 0.85,
                          letterSpacing: "-0.04em",
                          position: "absolute",
                          top: -10,
                          right: 16,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {phase.phase}
                      </div>

                      {/* Red accent line */}
                      <div
                        style={{
                          width: 40,
                          height: 3,
                          background: "#D1001F",
                          borderRadius: 2,
                          marginBottom: 24,
                        }}
                      />

                      {/* Phase label */}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "#D1001F",
                          display: "block",
                          marginBottom: 12,
                        }}
                      >
                        Phase {phase.phase}
                      </span>

                      {/* Tagline */}
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          fontStyle: "italic",
                          color: "var(--text3)",
                          lineHeight: 1.5,
                        }}
                      >
                        &ldquo;{phase.tagline}&rdquo;
                      </p>

                      {/* Corner glow */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 120,
                          height: 120,
                          background: "radial-gradient(circle at top left, rgba(209,0,31,0.08), transparent 70%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Text Content Side */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                        fontWeight: 800,
                        color: "var(--text)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 20,
                        lineHeight: 1.1,
                      }}
                    >
                      {phase.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 15,
                        color: "var(--text3)",
                        lineHeight: 1.8,
                        marginBottom: 28,
                        maxWidth: 480,
                      }}
                    >
                      {phase.description}
                    </p>

                    {/* Highlight badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {phase.highlights.map((h) => (
                        <span
                          key={h}
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--text3)",
                            padding: "6px 14px",
                            borderRadius: 999,
                            border: "1px solid var(--glass-border)",
                            background: "var(--glass)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ LEARNING JOURNEY — PAPER AIRPLANE ════════════ */}
      <section id="education" ref={eduSectionRef} className="section-wrapper" style={{ paddingTop: 100, paddingBottom: 120 }}>
        <div className="section-inner">
          <ChapterHeader label="Learning Journey" title="Education" subtitle="The academic flight path that shaped my evolution." />

          {/* Airplane journey container */}
          <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto", minHeight: 900, perspective: 800 }}>

            {/* ── SVG Flight Path Layer (behind cards) ── */}
            <svg
              viewBox="0 0 1000 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
                overflow: "visible",
              }}
            >
              <defs>
                {/* Mask for progressive trail reveal */}
                <mask id="trail-reveal-mask">
                  <path
                    d={FLIGHT_PATH}
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={pathTotalLength || 3000}
                    strokeDashoffset={pathTotalLength ? pathTotalLength - planeState.progress * pathTotalLength : 3000}
                    style={{ transition: "stroke-dashoffset 0.05s linear" }}
                  />
                </mask>
              </defs>

              {/* Hidden reference path for getPointAtLength calculations */}
              <path
                ref={flightPathRef}
                d={FLIGHT_PATH}
                stroke="transparent"
                strokeWidth="0"
                fill="none"
              />

              {/* Visible dotted trail — revealed by mask */}
              <path
                className="flight-trail-visible"
                d={FLIGHT_PATH}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
                strokeDasharray="10 18"
                strokeLinecap="round"
                fill="none"
                mask="url(#trail-reveal-mask)"
                style={{ opacity: 0.45 }}
              />

              {/* Faint guide path (full, very subtle) */}
              <path
                className="flight-trail-guide"
                d={FLIGHT_PATH}
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
                strokeDasharray="4 20"
                fill="none"
              />
            </svg>

            {/* ── Paper Airplane (PNG, above everything) ── */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <div
                className="flight-plane-container"
                style={{
                  position: "absolute",
                  /* Position airplane at calculated point, offset by half its size to center it */
                  left: `${(planeState.x / 1000) * 100}%`,
                  top: `${(planeState.y / 900) * 100}%`,
                  /* The PNG points top-right (~45°), so subtract 45 from calculated angle */
                  transform: `translate(-50%, -50%) rotate(${planeState.angle - 45}deg) translateZ(40px)`,
                  width: 64,
                  height: 64,
                  transition: "left 0.06s linear, top 0.06s linear, transform 0.06s linear",
                  filter: `drop-shadow(0 0 20px rgba(255,0,0,0.25)) ${isFlying ? 'blur(0.3px)' : 'blur(0px)'}`,
                  willChange: "transform, left, top",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/paper_plane.png"
                  alt="Paper airplane"
                  width={64}
                  height={64}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

                {/* Soft red glow beneath airplane */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 40,
                    height: 20,
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(209,0,31,0.2), transparent 70%)",
                    filter: "blur(6px)",
                    opacity: planeState.progress < 0.05 ? 0.8 : 0.4,
                    transition: "opacity 0.3s",
                  }}
                />
              </div>
            </div>

            {/* ── Milestone Glow Effects ── */}
            {/* HSC arrival glow */}
            <div
              style={{
                position: "absolute",
                top: "48%",
                right: "8%",
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(209,0,31,0.15), transparent 70%)",
                filter: "blur(20px)",
                opacity: hscReached ? 0.8 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {/* Degree landing glow */}
            <div
              style={{
                position: "absolute",
                bottom: "8%",
                left: "42%",
                width: 140,
                height: 140,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(209,0,31,0.18), transparent 70%)",
                filter: "blur(24px)",
                opacity: degreeReached ? 0.9 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />


            {/* Education Cards — positioned along flight path */}
            <div style={{ position: "relative", zIndex: 2 }}>

              {/* Card 1 — SSC — Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{
                  position: "relative",
                  maxWidth: 380,
                  marginLeft: "5%",
                  marginBottom: 100,
                }}
              >
                <div
                  className="edu-card-glass"
                  style={{
                    position: "relative",
                    padding: "36px 32px",
                    borderRadius: 20,
                    background: "var(--glass)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                  }}
                >
                  {/* Red glow */}
                  <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "radial-gradient(circle, rgba(209,0,31,0.1), transparent 70%)", pointerEvents: "none" }} />

                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D1001F", display: "block", marginBottom: 14 }}>
                    {EDUCATION[0].year}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.2 }}>
                    {EDUCATION[0].degree}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>
                    {EDUCATION[0].institution}
                  </p>
                  <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)" }}>Score</span>
                      <p style={{ fontSize: 32, fontWeight: 800, color: "#D1001F", lineHeight: 1, marginTop: 4 }}>{EDUCATION[0].score}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 — HSC — Middle Right */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{
                  position: "relative",
                  maxWidth: 380,
                  marginLeft: "auto",
                  marginRight: "5%",
                  marginBottom: 100,
                }}
              >
                <div
                  className="edu-card-glass"
                  style={{
                    position: "relative",
                    padding: "36px 32px",
                    borderRadius: 20,
                    background: "var(--glass)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: -30, left: -30, width: 120, height: 120, background: "radial-gradient(circle, rgba(209,0,31,0.1), transparent 70%)", pointerEvents: "none" }} />

                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D1001F", display: "block", marginBottom: 14 }}>
                    {EDUCATION[1].year}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.2 }}>
                    {EDUCATION[1].degree}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>
                    {EDUCATION[1].institution}
                  </p>
                  <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)" }}>Score</span>
                      <p style={{ fontSize: 32, fontWeight: 800, color: "#D1001F", lineHeight: 1, marginTop: 4 }}>{EDUCATION[1].score}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 — B.Sc — Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{
                  position: "relative",
                  maxWidth: 420,
                  marginLeft: "10%",
                }}
              >
                <div
                  className="edu-card-glass"
                  style={{
                    position: "relative",
                    padding: "40px 36px",
                    borderRadius: 20,
                    background: "var(--glass)",
                    border: "1px solid rgba(209,0,31,0.12)",
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(209,0,31,0.12), transparent 70%)", pointerEvents: "none" }} />

                  {/* Current badge */}
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D1001F", display: "block", marginBottom: 14 }}>
                    {EDUCATION[2].year}
                  </span>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 6, lineHeight: 1.2 }}>
                    {EDUCATION[2].degree}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>
                    {EDUCATION[2].institution}
                  </p>
                  <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <span style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text3)" }}>CGPA</span>
                      <p style={{ fontSize: 36, fontWeight: 800, color: "#D1001F", lineHeight: 1, marginTop: 4 }}>{EDUCATION[2].score}</p>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(209,0,31,0.25)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(209,0,31,0.06)" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D1001F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CHAPTER 3: FEATURED PROJECTS ════════════ */}
      <section id="projects" className="section-wrapper" style={{ paddingBottom: 0 }}>
        <div className="section-inner">
          <ChapterHeader label="Chapter 03" title="Featured Projects" subtitle="Building intelligent systems, not just ML models." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {FEATURED_PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass"
                style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16, cursor: "default" }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(209,0,31,0.12)" }}
              >
                {/* Project image area */}
                <div style={{ width: "100%", height: 200, borderRadius: 12, position: "relative", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                  <div style={{ position: "absolute", top: 12, left: 12, fontSize: 10, letterSpacing: "0.2em", color: "#fff", fontWeight: 600, background: "rgba(0,0,0,0.5)", padding: "3px 8px", borderRadius: 6, backdropFilter: "blur(4px)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6, flex: 1 }}>{p.desc}</p>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ padding: "4px 12px", fontSize: 11, borderRadius: 999, border: "1px solid var(--glass-border)", color: "var(--text2)" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CHAPTER 4: PROJECT UNIVERSE — BENTO GRID ════════════ */}
      <section className="section-wrapper">
        <div className="section-inner">
          <ChapterHeader label="Chapter 04" title="Project Universe" subtitle="Every AI & ML project, from concept to deployment." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }} className="bento-grid">
            {UNIVERSE_PROJECTS.map((p, i) => {
              const span = p.size === "large" ? "span 6" : p.size === "medium" ? "span 4" : "span 3";
              const catColor = p.cat === "CV" ? "#D1001F" : p.cat === "ML" ? "#ff4444" : p.cat === "DL" ? "#ff6666" : "#cc2222";
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  whileHover={{ y: -6, boxShadow: `0 8px 40px rgba(209,0,31,0.12)` }}
                  className="glass bento-card"
                  style={{ gridColumn: span, padding: p.size === "large" ? 32 : p.size === "medium" ? 24 : 20, display: "flex", flexDirection: "column", gap: 12, cursor: "default", position: "relative", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  {/* Category badge */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: catColor, background: `${catColor}15`, padding: "4px 10px", borderRadius: 999, border: `1px solid ${catColor}25` }}>{p.cat}</span>
                    {p.highlight && <span style={{ fontSize: 11, fontWeight: 700, color: catColor }}>{p.highlight}</span>}
                  </div>

                  <h3 style={{ fontSize: p.size === "large" ? 20 : p.size === "medium" ? 17 : 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{p.title}</h3>

                  {p.size !== "small" && <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.6, flex: 1 }}>{p.desc}</p>}

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ padding: "3px 10px", fontSize: 10, borderRadius: 999, border: "1px solid var(--glass-border)", color: "var(--text2)" }}>{t}</span>
                    ))}
                  </div>

                  {/* Corner glow */}
                  <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, background: `radial-gradient(circle, ${catColor}10, transparent 70%)`, pointerEvents: "none" }} />
                </motion.div>
              );
            })}
          </div>

          {/* Category legend */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 32, fontSize: 11, color: "var(--text3)" }}>
            {[{ label: "Computer Vision", c: "#D1001F" }, { label: "Machine Learning", c: "#ff4444" }, { label: "Analytics", c: "#ff8800" }, { label: "Data", c: "#cc2222" }].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.c }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CHAPTER 5: SKILLS — AI OS DASHBOARD ════════════ */}
      <section id="skills" className="section-wrapper">
        <div className="section-inner">
          <ChapterHeader label="Chapter 05" title="AI Operating System" subtitle="An interactive dashboard of my technical capabilities." />

          <div className="skills-grid" style={{ display: "flex", flexWrap: "wrap", gap: 12, maxWidth: 900, margin: "0 auto", alignItems: "flex-start" }}>
            {SKILLS_OS.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setExpandedSkill(expandedSkill === i ? null : i)}
                className="glass"
                style={{ padding: 0, cursor: "pointer", overflow: "hidden", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", flex: "0 0 calc(33.33% - 8px)", minWidth: 260 }}
                whileHover={{ borderColor: "rgba(209,0,31,0.25)" }}
              >
                {/* Header */}
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(209,0,31,0.08)", border: "1px solid rgba(209,0,31,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{(() => { const Icon = SKILL_ICONS[cat.iconName]; return Icon ? <Icon size={16} color="#D1001F" strokeWidth={1.8} /> : null; })()}</div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{cat.category}</h3>
                      <span style={{ fontSize: 11, color: "var(--text3)" }}>{cat.skills.length} technologies</span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: expandedSkill === i ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: "var(--text3)", fontSize: 18 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </motion.div>
                </div>

                {/* Expandable skills */}
                <AnimatePresence>
                  {expandedSkill === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 20px", display: "flex", flexWrap: "wrap", gap: 6, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                        {cat.skills.map((skill, si) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: si * 0.04 }}
                            style={{ padding: "6px 14px", fontSize: 12, borderRadius: 8, background: "rgba(209,0,31,0.06)", border: "1px solid rgba(209,0,31,0.12)", color: "var(--text2)", fontWeight: 500 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CHAPTER 6: CERTIFICATIONS — IMAGE CARDS ════════════ */}
      <section id="certificates" className="section-wrapper">
        <div className="section-inner">
          <ChapterHeader label="Chapter 06" title="Certifications" subtitle="Industry-recognized credentials validating expertise." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
            {CERTS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 8px 40px rgba(209,0,31,0.1)" }}
                onClick={() => setCertModal(c.image)}
                className="glass"
                style={{ padding: 0, cursor: "pointer", overflow: "hidden" }}
              >
                {/* Certificate preview image */}
                <div style={{ width: "100%", height: 180, overflow: "hidden", position: "relative", background: "#0a0a0a" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                    className="cert-img"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.8), transparent 60%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "var(--text3)", background: "rgba(0,0,0,0.5)", padding: "4px 10px", borderRadius: 6, backdropFilter: "blur(8px)" }}>VIEW</div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4, lineHeight: 1.3 }}>{c.title}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 12, color: "var(--text2)" }}>{c.issuer}</p>
                    <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#D1001F", fontWeight: 600 }}>{c.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Fullscreen Modal */}
      <AnimatePresence>
        {certModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCertModal(null)}
            style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, cursor: "zoom-out" }}
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={certModal} alt="Certificate" style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
            </motion.div>
            <div style={{ position: "absolute", top: 24, right: 32, color: "var(--text)", fontSize: 14, fontWeight: 500, cursor: "pointer", opacity: 0.6 }}>ESC to close</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════ CHAPTER 7: ACHIEVEMENTS — ANIMATED TIMELINE ════════════ */}
      <section id="achievements" className="section-wrapper">
        <div className="section-inner">
          <ChapterHeader label="Chapter 07" title="Achievements" subtitle="Milestones that shaped my journey." />

          <div className="timeline-alt" style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
            {/* Vertical timeline line — centered */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, transform: "translateX(-50%)", background: "linear-gradient(to bottom, transparent, rgba(209,0,31,0.3) 10%, rgba(209,0,31,0.3) 90%, transparent)" }} />

            {ACHIEVEMENTS.map((a, i) => {
              const isLeft = i % 2 === 1;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ position: "relative", display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", marginBottom: 40, paddingLeft: isLeft ? 0 : "calc(50% + 28px)", paddingRight: isLeft ? "calc(50% + 28px)" : 0 }}
                  className="timeline-item"
                >
                  {/* Timeline dot — centered */}
                  <div className="timeline-dot" style={{ position: "absolute", left: "50%", top: 12, width: 13, height: 13, borderRadius: "50%", background: "#D1001F", boxShadow: "0 0 16px rgba(209,0,31,0.4)", border: "2px solid #050505", zIndex: 2, transform: "translateX(-50%)" }} />

                  {/* Card */}
                  <motion.div
                    className="glass"
                    style={{ padding: 24, width: "100%" }}
                    whileHover={{ borderColor: "rgba(209,0,31,0.2)", boxShadow: "0 4px 30px rgba(209,0,31,0.08)" }}
                  >
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", color: "#D1001F", marginBottom: 8 }}>{a.year}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.6, marginBottom: 12 }}>{a.desc}</p>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <CheckCircle2 size={14} color="#D1001F" strokeWidth={2} />
                      <span style={{ fontSize: 12, color: "var(--text3)", fontWeight: 500 }}>{a.impact}</span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {a.skills.map((s) => (
                        <span key={s} style={{ padding: "3px 10px", fontSize: 10, borderRadius: 999, background: "rgba(209,0,31,0.06)", border: "1px solid rgba(209,0,31,0.12)", color: "var(--text3)" }}>{s}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ CHAPTER 8: CONTACT — TERMINAL + PREMIUM CTA ════════════ */}
      <section id="contact" className="section-wrapper" style={{ paddingBottom: 60, position: "relative" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(209,0,31,0.06) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="section-inner" style={{ textAlign: "center" }}>
          {/* Large heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}
          >
            Let&apos;s Build Something{" "}
            <span style={{ color: "#D1001F", fontStyle: "italic" }}>Extraordinary</span>
          </motion.h2>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass"
            style={{ maxWidth: 520, margin: "0 auto 48px", padding: 0, overflow: "hidden", textAlign: "left" }}
          >
            {/* Terminal header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D1001F" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
              <span style={{ marginLeft: 8, fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono, monospace)" }}>kanishk@ai ~ $</span>
            </div>
            {/* Terminal body */}
            <div style={{ padding: "20px 24px", fontFamily: "var(--font-mono, 'SF Mono', monospace)", fontSize: 13, lineHeight: 2.2 }}>
              <div><span style={{ color: "#D1001F" }}>&gt; STATUS</span> <span style={{ color: "var(--text2)" }}>Available for opportunities</span></div>
              <div><span style={{ color: "#D1001F" }}>&gt; EMAIL</span> <span style={{ color: "var(--text2)" }}>kanishk.karam.28@gmail.com</span></div>
              <div><span style={{ color: "#D1001F" }}>&gt; LOCATION</span> <span style={{ color: "var(--text2)" }}>India</span></div>
              <div><span style={{ color: "#D1001F" }}>&gt; RESPONSE</span> <span style={{ color: "var(--text2)" }}>Within 24 Hours</span></div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: "var(--text3)" }}>$</span>{" "}
                <span style={{ color: "var(--text3)", animation: "terminal-blink 1s infinite" }}>▌</span>
              </div>
            </div>
          </motion.div>

          {/* Premium CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 60 }}
          >
            {[
              { label: "GitHub", href: "https://github.com/Kanishkkaram2703", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/kanishk-karam/", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
              { label: "Email", href: "mailto:kanishk.karam.28@gmail.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg> },
              { label: "Resume", href: "/resume/resume.pdf", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(209,0,31,0.15)" }}
                className="contact-cta-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", fontSize: 13, fontWeight: 600, color: "var(--text)", textDecoration: "none", borderRadius: 10, border: "1px solid var(--glass-border)", background: "var(--glass)", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)" }}
              >
                {link.icon}
                {link.label}
                <svg className="arrow-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Premium Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass"
            style={{ maxWidth: 600, margin: "0 auto 60px", padding: 32, textAlign: "left" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary, #fff)", marginBottom: 24, textAlign: "center", letterSpacing: "-0.02em" }}>
              Send a Message
            </h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const errors: Record<string, string> = {};
                if (!formData.name.trim()) errors.name = "Name is required";
                if (!formData.email.trim()) errors.email = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email";
                if (!formData.subject.trim()) errors.subject = "Subject is required";
                if (!formData.message.trim()) errors.message = "Message is required";
                else if (formData.message.trim().length < 15) errors.message = "Minimum 15 characters";
                setFormErrors(errors);
                if (Object.keys(errors).length > 0) return;

                setFormStatus("sending");
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                  });
                  if (res.ok) {
                    setFormStatus("success");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                    setTimeout(() => setFormStatus("idle"), 4000);
                  } else {
                    setFormStatus("error");
                    setTimeout(() => setFormStatus("idle"), 4000);
                  }
                } catch {
                  setFormStatus("error");
                  setTimeout(() => setFormStatus("idle"), 4000);
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Name + Email row */}
              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    aria-label="Name"
                    value={formData.name}
                    onChange={(e) => { setFormData(d => ({ ...d, name: e.target.value })); setFormErrors(er => ({ ...er, name: "" })); }}
                    className="contact-input"
                  />
                  {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    aria-label="Email"
                    value={formData.email}
                    onChange={(e) => { setFormData(d => ({ ...d, email: e.target.value })); setFormErrors(er => ({ ...er, email: "" })); }}
                    className="contact-input"
                  />
                  {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  aria-label="Subject"
                  value={formData.subject}
                  onChange={(e) => { setFormData(d => ({ ...d, subject: e.target.value })); setFormErrors(er => ({ ...er, subject: "" })); }}
                  className="contact-input"
                />
                {formErrors.subject && <span className="form-error">{formErrors.subject}</span>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Your message (min 15 characters)"
                  aria-label="Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => { setFormData(d => ({ ...d, message: e.target.value })); setFormErrors(er => ({ ...er, message: "" })); }}
                  className="contact-input"
                  style={{ resize: "vertical", minHeight: 120 }}
                />
                {formErrors.message && <span className="form-error">{formErrors.message}</span>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={formStatus === "sending"}
                whileHover={{ scale: formStatus === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="contact-submit-btn"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  width: "100%", padding: "14px 0", fontSize: 14, fontWeight: 600,
                  color: "var(--text)", border: "none", borderRadius: 10, cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                  background: "linear-gradient(135deg, #D1001F, #a00018)",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  opacity: formStatus === "sending" ? 0.7 : 1,
                }}
              >
                {formStatus === "sending" && <Loader2 size={16} className="spin" />}
                {formStatus === "idle" && <><Send size={14} /> Send Message</>}
                {formStatus === "sending" && "Sending..."}
                {formStatus === "success" && <><CheckCircle2 size={16} /> Message Sent!</>}
                {formStatus === "error" && <><AlertCircle size={16} /> Failed — Try Again</>}
              </motion.button>
            </form>

            {/* Toast */}
            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ marginTop: 16, padding: "12px 20px", borderRadius: 10, background: "rgba(0,180,80,0.1)", border: "1px solid rgba(0,180,80,0.2)", textAlign: "center", fontSize: 13, color: "#00b450" }}
                >
                  ✓ Message sent successfully. I&apos;ll get back to you soon.
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ marginTop: 16, padding: "12px 20px", borderRadius: 10, background: "rgba(209,0,31,0.08)", border: "1px solid rgba(209,0,31,0.15)", textAlign: "center", fontSize: 13, color: "#D1001F" }}
                >
                  Unable to send message. Please try again later.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontSize: 13, color: "var(--text3)" }}>
              Designed & Built by <span style={{ color: "#D1001F" }}>Kanishk Karam</span>
            </p>
            <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>© 2026 All Rights Reserved</p>
            <p style={{ fontSize: 10, color: "var(--text3)", marginTop: 8 }}>Built with Next.js • React • Tailwind CSS • Framer Motion</p>
          </div>
        </div>
      </section>
    </>
  );
}
