/**
 * Portfolio Data File - Single Source of Truth
 * Color Philosophy: Architectural Warm Alabaster & Graphite Palette
 * #F5F2EA, #FFFFFF, #8C8A82, #E8E5DC, #6E6E6A, #1E1E1C
 */

export const PERSONAL_INFO = {
  name: "Piyush Ujgaokar",
  shortName: "Piyush",
  role: "Full Stack Web Developer",
  subRole: "MERN Stack + AI Integrations",
  headline: "Crafting High-Performance Scalable Web Apps with Tactile Design & AI Integrations",
  bio: "Full Stack Developer with strong hands-on expertise in the MERN stack and a passion for engineering scalable web applications with AI-driven features. Experienced in architecting clean 4-layer React systems, designing robust RESTful APIs, and bringing tactile, human-crafted web experiences to life.",
  email: "piyushujgaokar544@gmail.com",
  phone: "+91-9822070357",
  location: "Nagpur, India",
  timezone: "IST (UTC+5:30)",
  availability: "Available for Full-Time Roles & High-Impact Projects",
  avatar: "/profile.jpg",
  resumeUrl: "/Piyush_Ujgaokar_Resume.pdf",
  socialLinks: {
    github: "https://github.com/piyush-ujgaokar",
    linkedin: "https://www.linkedin.com/in/piyush-ujgaokar/",
    email: "mailto:piyushuj@gmail.com",
    phone: "tel:+919822070357",
  },
  stats: [
    { label: "Completed Projects", value: "10+", suffix: "" },
    { label: "BCA CGPA", value: "8.27", suffix: "/10" },
    { label: "Code Architecture", value: "4-Layer", suffix: " Clean" },
    { label: "AI Integrations", value: "Gemini", suffix: " & GenAI" },
  ]
};

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Building responsive, tactile, and high-conversion user interfaces with modern React ecosystems.",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "Code2", color: "#1E1E1C", badge: "Core" },
      { name: "React.js", level: "Advanced", icon: "Atom", color: "#2B2B28", badge: "Core" },
      { name: "TypeScript", level: "Proficient", icon: "FileCode", color: "#3A3A36", badge: "Type-Safe" },
      { name: "Redux Toolkit", level: "Advanced", icon: "Layers", color: "#1E1E1C", badge: "State" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette", color: "#2B2B28", badge: "Styling" },
      { name: "HTML5 & CSS3", level: "Advanced", icon: "Layout", color: "#3A3A36", badge: "Markup" },
      { name: "Sass / SCSS", level: "Proficient", icon: "Scissors", color: "#6E6E6A", badge: "Styling" },
    ]
  },
  {
    id: "backend",
    title: "Backend and DevOps",
    description: "Engineering scalable microservices, resilient RESTful APIs, caching layers, and containerized deployments.",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "Server", color: "#1E1E1C", badge: "Runtime" },
      { name: "Express.js", level: "Advanced", icon: "Cpu", color: "#2B2B28", badge: "Framework" },
      { name: "MongoDB", level: "Advanced", icon: "Database", color: "#3A3A36", badge: "Database" },
      { name: "Redis", level: "Proficient", icon: "Zap", color: "#6E6E6A", badge: "Caching" },
      { name: "REST APIs", level: "Advanced", icon: "Network", color: "#1E1E1C", badge: "Architecture" },
      { name: "Authentication (JWT & OAuth)", level: "Advanced", icon: "ShieldCheck", color: "#2B2B28", badge: "Security" },
      { name: "Docker", level: "Proficient", icon: "Container", color: "#3A3A36", badge: "DevOps" },
      { name: "Kubernetes", level: "Working Knowledge", icon: "Boxes", color: "#6E6E6A", badge: "Orchestration" },
      { name: "AWS", level: "Proficient", icon: "Cloud", color: "#1E1E1C", badge: "Cloud" },
    ]
  },
  {
    id: "frameworks-tools",
    title: "Frameworks and Tools",
    description: "Industry-standard tooling for automated workflows, performance diagnostics, and state synchronization.",
    skills: [
      { name: "Next.js", level: "Proficient", icon: "Globe", color: "#1E1E1C", badge: "SSR / SSG" },
      { name: "TanStack Query", level: "Advanced", icon: "RefreshCw", color: "#2B2B28", badge: "Async Cache" },
      { name: "Gemini AI & Gen-AI", level: "Advanced", icon: "Sparkles", color: "#3A3A36", badge: "AI Engine" },
      { name: "Socket.io", level: "Advanced", icon: "Radio", color: "#1E1E1C", badge: "Real-Time" },
      { name: "Puppeteer", level: "Advanced", icon: "FileText", color: "#2B2B28", badge: "Headless" },
      { name: "Postman", level: "Advanced", icon: "Send", color: "#3A3A36", badge: "API Testing" },
      { name: "Git & GitHub", level: "Advanced", icon: "GitBranch", color: "#1E1E1C", badge: "VCS" },
      { name: "Chrome DevTools", level: "Advanced", icon: "Terminal", color: "#6E6E6A", badge: "Profiling" },
    ]
  }
];

export const COMPACT_SKILLS = [
  "React.js", "Node.js", "MongoDB", "Express.js", "Gemini AI", 
  "TypeScript", "Tailwind CSS", "Redux Toolkit", "Socket.io", "Docker", "REST APIs"
];

export const PROJECTS = [
  {
    id: "interview-ai",
    slug: "interview-ai",
    title: "Interview-AI",
    subtitle: "Gen-AI Powered Smart Interview Preparation & ATS Resume Engine",
    category: "Gen-AI",
    featured: true,
    accentColor: "#1E1E1C",
    mockupType: "interview",
    liveUrl: "https://interview-ai-3t9d.onrender.com",
    githubUrl: "https://github.com/piyush-ujgaokar/Interview-AI",
    previewImage: "/projects/interview-ai.svg",
    overview: "A cutting-edge Gen-AI interview preparation platform built on the MERN stack that integrates Google Gemini to simulate hyper-realistic, role-tailored technical and behavioral interviews. Features an automated ATS-friendly resume builder and day-wise study roadmap generator.",
    keyMetrics: [
      { label: "Questions Generated", value: "10,000+" },
      { label: "ATS Pass Rate", value: "94%" },
      { label: "PDF Export Time", value: "<1.8s" },
      { label: "Role Coverage", value: "50+ Tech Roles" }
    ],
    features: [
      "Gemini AI Dynamic Role-Specific Question Engine based on custom job descriptions",
      "Automated ATS-friendly Resume Generator with instant PDF compilation powered by Puppeteer",
      "Comprehensive Skill-Gap Analysis that highlights missing keywords and weak concepts",
      "Day-wise personalized study planner with milestones, quizzes, and progress metrics",
      "Clean 4-layer client architecture with robust backend caching to reduce LLM token overhead"
    ],
    architecture: {
      ui: "React with Tailwind CSS, animated interactive questionnaire and radar skill-gap charts.",
      hooks: "Custom hooks for LLM stream ingestion, PDF generation progress, and speech-to-text recording.",
      state: "Redux Toolkit managing candidate profile, active session context, and generated question pool.",
      api: "Express REST endpoints connected to Gemini Flash API with rate-limiting, and Puppeteer headless renderer."
    },
    techStack: [
      "React.js", "Node.js", "Express.js", "MongoDB", "Puppeteer", "Google Gemini AI", "Tailwind CSS", "Redux Toolkit"
    ],
    challenges: [
      {
        problem: "Puppeteer PDF generation was slow and memory intensive during concurrent user requests.",
        solution: "Implemented an optimized worker pool with pre-warmed Chromium instances and streamlined HTML templates, reducing PDF render latency from 5.4s to under 1.8s."
      },
      {
        problem: "Gemini API token costs and hallucinated assessment questions.",
        solution: "Engineered strict system prompts with schema validation, caching recurring question sets in MongoDB to slash API calls by 45%."
      }
    ]
  },
  {
    id: "xhancy-ai",
    slug: "xhancy-ai",
    title: "Xhancy-AI",
    subtitle: "Real-Time AI Collaborative Chat Platform with 4-Layer React Architecture",
    category: "AI Chat",
    featured: true,
    accentColor: "#2A2A28",
    mockupType: "chat",
    liveUrl: "https://perplexity-ai-1-umbd.onrender.com",
    githubUrl: "https://github.com/piyush-ujgaokar/Xhancy-AI",
    previewImage: "/projects/xhancy-ai.svg",
    overview: "A high-performance conversational intelligence platform providing real-time streaming AI chat powered by Gemini and Socket.io. Built strictly around a scalable 4-layer React architecture to ensure modularity, predictable state flow, and zero UI stutter during high-speed token streaming.",
    keyMetrics: [
      { label: "Stream Latency", value: "<120ms" },
      { label: "Socket Uptime", value: "99.9%" },
      { label: "Architecture", value: "4-Layer" },
      { label: "Message History", value: "Instant MongoDB Sync" }
    ],
    features: [
      "Bi-directional WebSocket streaming via Socket.io for instantaneous token-by-token responses",
      "Strict 4-layer React architecture separating UI Components, Custom Hooks, Redux State, and Network Services",
      "Context-aware conversation history saved in MongoDB with quick session switching and search",
      "Markdown rendering with syntax highlighting, copy-code blocks, and LaTeX math expression support",
      "Tactile editorial interface with dark/light themes and customizable AI persona prompts"
    ],
    architecture: {
      ui: "Modular atomic design system with frosted white panels, markdown renderer, and auto-scrolling message feeds.",
      hooks: "useChatSocket, useTokenStream, useKeyboardShortcuts, and useAutoScroll custom abstractions.",
      state: "Redux slice managing active chats, streaming buffer, session IDs, and user settings.",
      api: "WebSocket event handlers backed by Express & Gemini streaming SDK with resilient reconnection logic."
    },
    techStack: [
      "React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Google Gemini AI", "Redux Toolkit", "Tailwind CSS"
    ],
    challenges: [
      {
        problem: "Frequent re-renders in React when high-frequency socket tokens flooded the client.",
        solution: "Decoupled the streaming buffer into a local ref hook with throttle batching (every 30ms) before committing to Redux state, maintaining smooth 60 FPS UI rendering."
      }
    ]
  },
  {
    id: "feeltune-ai",
    slug: "feeltune-ai",
    title: "FeelTune-AI",
    subtitle: "Emotion-Aware Music Discovery & Mood Harmonizer",
    category: "Gen-AI",
    featured: true,
    accentColor: "#3A3A36",
    mockupType: "music",
    liveUrl: "https://moody-songs.onrender.com",
    githubUrl: "https://github.com/piyush-ujgaokar/FeelTune-AI",
    previewImage: "/projects/feeltune-ai.svg",
    overview: "FeelTune-AI bridges emotional psychology and music discovery. Using an AI sentiment engine, it detects the user's current emotional state through conversational text prompts and generates synchronized musical recommendations tailored to uplift or resonate with their vibe.",
    keyMetrics: [
      { label: "Mood Accuracy", value: "91%" },
      { label: "Track Catalog", value: "Curated Global" },
      { label: "Themes", value: "Dark & Light" },
      { label: "Speed", value: "Sub-second AI" }
    ],
    features: [
      "AI sentiment and emotion classification mapping user prompts to acoustic mood vectors (Joy, Melancholy, Focus, Energy)",
      "Dynamic Spotify/SoundCloud integration with real-time audio sample previews and playlist generators",
      "Seamless dark and light mode toggle with smooth theme transition physics",
      "Interactive audio visualizer reacting to track tempo and mood colors",
      "Session history preserving user's musical journeys and emotional wellness trends"
    ],
    architecture: {
      ui: "Tactile audio deck, mood selector pills, dynamic subtle gradients responsive to mood.",
      hooks: "useAudioPlayer, useMoodDetection, useThemeSwitch.",
      state: "Context-based audio playback store and mood classification state.",
      api: "Express microservice connecting to AI sentiment API and music streaming endpoints."
    },
    techStack: [
      "React.js", "Node.js", "Express.js", "MongoDB", "AI Emotion API", "Tailwind CSS", "Web Audio API"
    ],
    challenges: [
      {
        problem: "Mapping nuanced colloquial human emotional inputs to distinct music genres without rigid keyword lookups.",
        solution: "Used natural language embedding models to map emotional text vectors into valence and arousal coordinates, pairing with appropriate tempo (BPM) ranges."
      }
    ]
  },
  {
    id: "cookz-recipe-website",
    slug: "cookz-recipe-website",
    title: "Cookz Recipe Website",
    subtitle: "Smart Recipe Organizer with Dynamic State & Auto-Generated UID",
    category: "Frontend",
    featured: false,
    accentColor: "#222220",
    mockupType: "recipe",
    liveUrl: "https://cookz-recipe-app.vercel.app",
    githubUrl: "https://github.com/piyush-ujgaokar/Cookz-Recipe-Website",
    previewImage: "/projects/cookz.svg",
    overview: "A sleek, responsive culinary management app built to organize recipes with speed. Built using pure React state management and Tailwind CSS, featuring an algorithmic unique ID generator for every culinary creation, full-text ingredient search, and offline localStorage caching.",
    keyMetrics: [
      { label: "Render Speed", value: "Instant 0ms" },
      { label: "Offline First", value: "100% Cache" },
      { label: "ID Algorithm", value: "Collision-Free" },
      { label: "Mobile Score", value: "99/100" }
    ],
    features: [
      "Algorithmic collision-free unique recipe ID generation for dependable data indexing and tracking",
      "Instant multi-criteria search filtering by cooking duration, dietary preference, and ingredients on hand",
      "Dynamic recipe creation modal with interactive step-by-step instruction builder",
      "Persistent offline storage with local cache fallback and JSON export/import",
      "Minimalist mobile-first editorial card layout with responsive image lazy loading"
    ],
    architecture: {
      ui: "Responsive Tailwind grid with recipe cards, nutrition drawer, and category tabs.",
      hooks: "useLocalStorage, useRecipeFilter, useUniqueID.",
      state: "React state management combined with memoized derived selectors for fast filtering.",
      api: "Mock service layer designed to effortlessly plug into Node.js / MongoDB backend."
    },
    techStack: [
      "React.js", "Tailwind CSS", "LocalStorage", "React Hooks", "Framer Motion"
    ],
    challenges: [
      {
        problem: "Managing deep nested recipe ingredient states without incurring unnecessary re-renders across long lists.",
        solution: "Normalized recipe state into flat entity maps and utilized React memoization hooks (useMemo, useCallback) to maintain instant filter response."
      }
    ]
  }
];

export const EDUCATION = [
  {
    institution: "G.H Raisoni University, Amravati",
    location: "Nagpur, India",
    degree: "Bachelor of Computer Application (BCA)",
    period: "Aug 2023 – May 2026",
    grade: "CGPA: 8.27",
    status: "Currently Pursuing (Final Year)",
    highlights: [
      "Strong foundation in Data Structures, Relational & NoSQL Databases, Computer Networks, and Object-Oriented Software Engineering.",
      "Consistently achieved top-tier academic standing with 8.27 CGPA.",
      "Lead developer for university tech events and web development workshops."
    ]
  },
  {
    institution: "Dada Saheb Dhanwate",
    location: "Nagpur, India",
    degree: "XII (Senior Secondary)",
    period: "April 2021 – March 2022",
    grade: "Completed",
    status: "Graduated",
    highlights: [
      "Specialized in Computer Science, Mathematics, and Physics with high academic performance."
    ]
  },
  {
    institution: "Sangita High School",
    location: "Nagpur, India",
    degree: "X (Secondary)",
    period: "March 2020",
    grade: "Completed",
    status: "Graduated",
    highlights: [
      "Graduated with distinction and active participation in science exhibitions."
    ]
  }
];

export const CERTIFICATIONS = [
  {
    title: "Full-Stack Development - Cohort Batch (1)",
    issuer: "",
    issueDate: "Nov 2025",
    credentialId: "SCS-FSD-2025-C1",
    description: "Intensive professional cohort covering modern Full-Stack development: MERN architecture, microservices, advanced asynchronous JavaScript, REST design, database modeling, and real-world system deployments.",
    badge: "Full-Stack Mastery"
  },
  {
    title: "Frontend Development Mastery",
    issuer: "",
    issueDate: "Nov 2025",
    credentialId: "SCS-FED-2025",
    description: "Deep dive into production-grade React.js, advanced CSS architecture, modern component design systems, state machines, and performant web animations.",
    badge: "Frontend Specialist"
  }
];
