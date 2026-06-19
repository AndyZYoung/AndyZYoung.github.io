// Single source of truth for all on-screen content.
// Every string here names real information from Yang Zhang's resume,
// publication, course catalog, and project materials.

export const profile = {
  name: 'Yang Zhang',
  headline:
    'M.S. in Quantitative Finance & Risk Management @ University of Michigan | B.Eng. in Data Science and Big Data Technology',
  disciplines: ['AI Agent Engineering', 'LLM Applications', 'Data Science', 'Quantitative Finance'],
  location: 'Ann Arbor, MI / Shanghai, China',
  email: 'xinxin030316@gmail.com',
  resumePreview: '/Yang_Zhang_Resume.pdf',
  resumeDownload: '/Yang_Zhang_Resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/yang-zhang-154088307/',
    handshake: 'https://umich.joinhandshake.com/profiles/yang_zhang',
    github: 'https://github.com/AndyZYoung',
  },
}

export const about = {
  // LinkedIn-style summary, elevated and professional.
  summary: [
    'I build AI agents and LLM-driven applications, and I work at the intersection of data science and quantitative finance. My focus is turning research methods into systems people can actually use - from agentic retrieval pipelines to surveillance-video anomaly detection and customer-segmentation models.',
    'Most recently at EY, I built enterprise LLM applications: a self-built ReAct agent runtime with parallel multi-agent orchestration for AI-news intelligence, retrieval and memory modules with hybrid search over ChromaDB, and an Outlook Add-in that summarizes email and automates Teams meeting scheduling through Microsoft Graph.',
    'I am headed to the University of Michigan for an M.S. in Quantitative Finance and Risk Management, carrying a data-science and engineering foundation into markets and risk.',
  ],
}

export type Education = {
  school: string
  degree: string
  period: string
  detail?: string
  coursesLabel: string
  courses: string[]
  future?: boolean
}

export const education: Education[] = [
  {
    school: 'University of Michigan, Ann Arbor',
    degree: 'M.S. in Quantitative Finance & Risk Management',
    period: 'Sep 2026 - Jun 2028 (Expected)',
    coursesLabel: 'Core courses ahead',
    future: true,
    courses: [
      'Advanced Financial Mathematics I & II',
      'Discrete State Stochastic Processes',
      'Stochastic Analysis for Finance',
      'Numerical Analysis with Financial Applications',
      'Computational Finance',
      'Mathematical Methods for Algorithmic Trading',
      'Statistical Learning: Regression',
      'Statistical Analysis of Financial Data',
    ],
  },
  {
    school: 'Shanghai University',
    degree: 'B.Eng. in Data Science and Big Data Technology',
    period: 'Sep 2022 - Jun 2026 (Conferred)',
    detail: 'GPA 83.6 / 100',
    coursesLabel: 'Core courses taken',
    courses: [
      'Machine Learning',
      'Neural Networks & Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Data Mining',
      'Convex Optimization',
      'Operations Research & Optimization',
      'Data Structures & Algorithms',
      'Algorithm Design & Python',
      'Big Data & Cloud Computing',
      'Operating Systems & Database',
      'Probability & Statistics',
      'Numerical Computation',
      'Signals & Systems',
      'Information Theory & Coding',
    ],
  },
]

export type Project = {
  id: string
  index: string
  kind: string
  title: string
  role: string
  period: string
  blurb: string
  body: string[]
  stack: string[]
  media?: {
    type: 'youtube' | 'image'
    src: string
    alt?: string
    poster?: string
  }
  figure?: { src: string; alt: string; caption: string }
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'anomaly',
    index: '01',
    kind: 'Senior Thesis - Computer Vision / Deep Learning',
    title: 'Weakly Supervised Video Anomaly Detection',
    role: 'Computer Vision / Deep Learning Engineer',
    period: '2026',
    blurb:
      'A surveillance-video system that scores abnormal events from video-level labels only - no frame-by-frame annotation - and runs inference from the browser.',
    body: [
      'Surveillance footage rarely comes with frame-level labels. This system learns to flag anomalies (fights, accidents, theft) using only a single label per video, then maps its predictions back to the exact seconds where something goes wrong.',
      'Each video is turned into 32 segment features with a 3D-ResNet-101 extractor. A multiple-instance ranking model learns to push anomalous segments above normal ones, sharpened with magnitude-based top-k selection and multi-scale temporal convolutions.',
      'A web demo accepts an uploaded video and replays the per-segment anomaly score back onto the timeline, so a non-expert can simply watch where the model reacts.',
    ],
    stack: ['PyTorch', '3D-ResNet-101', 'MIL Ranking', 'Temporal Conv1d', 'OpenCV', 'UCF-Crime'],
    media: {
      type: 'youtube',
      src: '1MisUBesvr4',
      alt: 'Weakly Supervised Video Anomaly Detection demo',
    },
    figure: {
      src: '/projects/anomaly-model.png',
      alt: 'Improved model overall architecture: 3D-ResNet features, feature projection, multi-scale dilated temporal convolution, top-k selection, anomaly scoring head',
      caption:
        '3D-ResNet-101 features feed a projection layer, then a multi-scale dilated temporal convolution module; feature-magnitude top-k selection drives the anomaly scoring head to a per-segment score.',
    },
    links: [
      { label: 'Watch on YouTube', href: 'https://www.youtube.com/watch?v=1MisUBesvr4' },
      { label: 'Watch on Bilibili', href: 'https://www.bilibili.com/video/BV1fhjV6jEto/' },
    ],
  },
  {
    id: 'assistant',
    index: '02',
    kind: 'Full-Stack LLM Application',
    title: 'AI-Powered Course Assistant System',
    role: 'Full-Stack LLM Developer',
    period: 'Feb 2025 - May 2025',
    blurb:
      'An AI tutor that answers from your own course material - grounded retrieval, a knowledge graph of the syllabus, and a talking digital human front end.',
    body: [
      'Instead of generic chatbot answers, this assistant reads the actual lecture materials and responds only from what the course taught - local retrieval-augmented Q&A built on Ollama, DeepSeek-R1, and BGE embeddings.',
      'A LightRAG knowledge graph extracts entities and relationships from the syllabus, so the system can answer both detail questions and "how does this connect to that" questions, with the graph visualized for the student.',
      'The front end is a Vue 3 course portal wired to a Three.js digital human with Azure text-to-speech, holding ~30 FPS rendering and sub-3s responses in testing.',
    ],
    stack: ['Ollama', 'DeepSeek-R1', 'LightRAG', 'BGE Embeddings', 'Vue 3', 'Three.js', 'Azure TTS'],
    media: {
      type: 'image',
      src: '/projects/course-assistant.svg',
      alt: 'AI course assistant architecture',
    },
  },
  {
    id: 'publication',
    index: '03',
    kind: 'Publication - First Author, ICCSMT 2024 (EI-indexed)',
    title: 'Customer Segmentation: Data-Driven Research on Transaction-Level Data of JD.com',
    role: 'First Author',
    period: 'ICCSMT 2024',
    blurb:
      'A study of how JD.com customers really choose products - and how to predict their preferences without forcing every shopper into one rigid bucket.',
    body: [
      'Working from JD.com transaction-level data, I first grouped products into luxury / cost-effective / bargain / other. K-means produced lopsided clusters, so I designed a quartile-based manual scheme on discount and attribute features that gave balanced, explainable categories.',
      'To predict each user\'s preference I compared Logistic Regression, Decision Tree, Random Forest, and Stacking, tuned with Recursive Feature Elimination plus Grid and Randomized Search.',
      'The key idea is "boundary blurring": shoppers are rarely 100% one type, so I used click-ratio thresholds to let borderline users span categories. Accounting for that ambiguity lifted prediction accuracy to roughly 74% with Random Forest.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'K-means', 'Random Forest', 'Stacking'],
    media: {
      type: 'image',
      src: '/projects/segmentation.svg',
      alt: 'Customer segmentation pipeline',
    },
    links: [{ label: 'Read on ACM Digital Library', href: 'https://dl.acm.org/doi/10.1145/3708036.3708235' }],
  },
  {
    id: 'mindspore',
    index: '04',
    kind: 'MindSpore Innovation Camp - Second Prize',
    title: 'NLP & LLM Deployment with MindSpore',
    role: 'NLP / LLM Engineer',
    period: 'Mar 2024 - Apr 2024',
    blurb:
      'Hands-on Transformer and LLM training on Huawei MindSpore - including a deep dive into how positional encoding lets attention understand word order.',
    body: [
      'Trained and evaluated Transformer and BERT models with MindSpore and MindNLP on Huawei Cloud ModelArts, covering sequence modeling, sentiment classification, and BLEU-scored translation.',
      'Studied the Transformer internals in depth - the slide here is from my camp report, explaining sinusoidal positional encoding: why attention has no built-in sense of order, and how sine/cosine signals inject position back in.',
      'Deployed a local ChatGLM-6B chatbot through Gradio and explored PEFT, prompt tuning, and instruction tuning. The work earned Second Prize at the camp.',
    ],
    stack: ['MindSpore', 'MindNLP', 'BERT', 'Transformer', 'ChatGLM-6B', 'Gradio'],
    media: {
      type: 'image',
      src: '/projects/positional-encoding.png',
      alt: 'Positional encoding slide from MindSpore camp report',
    },
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    company: 'EY (Ernst & Young)',
    role: 'AI Agent / Full-Stack Developer Intern',
    period: 'Mar 2026 - Jun 2026',
    summary:
      'Built enterprise LLM applications for AI-news intelligence, agentic retrieval, Outlook email analysis, and Teams meeting automation.',
    highlights: [
      'Built an AI-news intelligence agent on a self-built ReAct runtime with parallel multi-agent orchestration - CollectorAgents used OpenAI function calling to pick RSS and web-search tools, with scoring, URL verification, and real-time tracing over FastAPI and Server-Sent Events.',
      'Implemented retrieval and memory with OpenAI embeddings, BM25, vector and hybrid search, semantic deduplication, and ChromaDB; persisted with SQLAlchemy/SQLite, exposed tools through MCP, and packaged with Docker.',
      'Built an Outlook Add-in (Office.js, Azure-hosted Python backend) to summarize emails, draft replies, and extract meeting details; wired Microsoft Entra ID, OAuth 2.0/OIDC, and Microsoft Graph to match attendees and create Teams meetings.',
    ],
    tags: ['OpenAI API', 'ReAct Agent', 'RAG', 'ChromaDB', 'MCP', 'FastAPI', 'Azure', 'Microsoft Graph'],
  },
  {
    company: 'China UnionPay Data Co., Ltd.',
    role: 'Data Analyst Intern',
    period: 'Jul 2024 - Aug 2024',
    summary:
      'Automated credit-card operating reports and bank-level benchmarking for monthly business analysis.',
    highlights: [
      'Built dashboards from SQL-derived BI exports and Excel with Python, Pandas, NumPy, Matplotlib, and Power BI - covering active cards, balances, utilization, customer segments, installments, and campaign performance.',
      'Built reusable monthly and annual benchmarking logic across 9 partner banks and 16 listed banks, spanning trends, account-age curves, value segments, credit limits, non-performing balances, delinquency, and complaint ratios.',
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'Power BI', 'SQL', 'ETL'],
  },
]

export type Activity = {
  org: string
  role: string
  period: string
  detail: string
}

export const activities: Activity[] = [
  {
    org: 'Artificial Intelligence Club - Organization Department',
    role: 'Officer',
    period: 'Jul 2023 - Jun 2025',
    detail:
      'Ran day-to-day operations and planned campus events, including the MindSpore Innovation Camp and the engineering soldering competition, drawing 100+ student participants.',
  },
  {
    org: 'Blue Ribbon Volunteer Association - Project Department',
    role: 'Officer',
    period: 'Aug 2023 - Jun 2024',
    detail:
      'Sourced and ran volunteer projects with the Zhijiang West Road community in Shanghai, organizing and promoting service activities that reached 100+ people.',
  },
]

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'anomaly', label: 'Anomaly Detection' },
  { id: 'assistant', label: 'Course Assistant' },
  { id: 'publication', label: 'Publication' },
  { id: 'mindspore', label: 'MindSpore' },
  { id: 'activities', label: 'Activities' },
]

// Each style preview shows the nav design plus the sections that exist in the
// preview: home, about, the sample project, and contact.
export const previewNav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'anomaly', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export const anomaly = projects[0]
