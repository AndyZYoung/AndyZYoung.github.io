// Single source of truth for all on-screen content.
// Every string here names real information from Yang Zhang's resume,
// publication, course catalog, and project materials.

export const profile = {
  name: 'Yang Zhang',
  credentials: [
    {
      degree: 'M.S. Quantitative Finance & Risk Management',
      school: 'University of Michigan',
    },
    {
      degree: 'B.Eng. Data Science and Big Data Technology',
      school: 'Shanghai University',
    },
  ],
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
    detail: 'GPA 86.1 / 100',
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

type ProjectMedia =
  | {
      type: 'youtube'
      src: string
      alt?: string
      poster?: string
    }
  | {
      type: 'image'
      src: string
      alt?: string
      poster?: string
    }
  | {
      type: 'diagram'
      variant: 'assistant-linear' | 'mindspore-research' | 'segmentation-research'
      placement: 'project-grid' | 'media-column'
    }

export type Project = {
  id: string
  layout: 'sticky-left' | 'compact-right' | 'balanced-left' | 'balanced-right'
  kind: string
  title: string
  role: string
  period: string
  blurb: string
  body: string[]
  stack: string[]
  media?: ProjectMedia
  figure?: { src: string; alt: string; caption: string }
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'anomaly',
    layout: 'sticky-left',
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
    layout: 'compact-right',
    kind: 'Full-Stack LLM Application',
    title: 'AI-Powered Course Assistant System',
    role: 'Full-Stack LLM Developer',
    period: 'Feb 2025 - May 2025',
    blurb:
      'An AI tutor that answers from your own course material - grounded retrieval, a knowledge graph of the syllabus, and a talking digital human front end.',
    body: [
      'Instead of generic chatbot answers, this assistant reads the actual lecture materials and responds only from what the course taught - local retrieval-augmented Q&A built on Ollama, DeepSeek API (R1), and BGE embeddings.',
      'A LightRAG knowledge graph extracts entities and relationships from the syllabus, so the system can answer both detail questions and "how does this connect to that" questions, with the graph visualized for the student.',
      'The front end is a Vue 3 course portal wired to a Three.js digital human with Azure text-to-speech, holding ~30 FPS rendering and sub-3s responses in testing.',
    ],
    stack: ['Ollama', 'DeepSeek API (R1)', 'LightRAG', 'BGE Embeddings', 'Vue 3', 'Three.js', 'Azure TTS'],
    media: {
      type: 'diagram',
      variant: 'assistant-linear',
      placement: 'project-grid',
    },
  },
  {
    id: 'publication',
    layout: 'balanced-left',
    kind: 'Publication - First Author, ICCSMT 2024 (EI-indexed)',
    title: 'Customer Segmentation: Data-Driven Research on Transaction-Level Data of JD.com',
    role: 'First Author',
    period: 'ICCSMT 2024',
    blurb:
      'A study of how JD.com customers really choose products - and how to predict their preferences without forcing every shopper into one rigid bucket.',
    body: [
      'I analyzed JD.com transaction-level clicks together with discount, price, and SKU attributes. Because K-means produced strongly imbalanced clusters, I replaced it with quartile-based rules that define four interpretable product tiers: Luxury, Cost-effective, Bargain, and Other. This converted an unstable partition into a balanced taxonomy that could be inspected, explained, and reused as the target for downstream preference modeling.',
      'To avoid forcing ambiguous shoppers into one segment, I excluded the catch-all “Other” group and modeled two overlapping click-share signals: Luxury + Cost-effective and Cost-effective + Bargain. A difference above 0.20 indicates a decisive preference; smaller gaps remain ambiguous. This boundary-aware rule keeps uncertain users visible instead of hiding them inside a hard label, better reflecting how purchasing behavior moves between adjacent price-value tiers.',
      'I compared Logistic Regression, Decision Tree, Random Forest, and Stacking with RFE plus grid and randomized search. Logistic Regression established a stable linear baseline, the Decision Tree exposed nonlinear feature interactions, and Random Forest provided the strongest balance of generalization and robustness after tuning. Treating model comparison as a diagnostic exercise helped separate the effects of feature quality, decision boundaries, and parameter selection.',
      'The final taxonomy preserves interpretability without treating preference as permanent or mutually exclusive, making the segments useful for recommendation and marketing analysis across city tier and education. My main takeaway is that segmentation is most useful when uncertainty remains explicit: stable categories organize the analysis, while overlapping signals acknowledge that customers can move between value orientations as context changes.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'K-means', 'Random Forest', 'Stacking'],
    media: {
      type: 'diagram',
      variant: 'segmentation-research',
      placement: 'media-column',
    },
    links: [{ label: 'Read on ACM Digital Library', href: 'https://dl.acm.org/doi/10.1145/3708036.3708235' }],
  },
  {
    id: 'mindspore',
    layout: 'balanced-right',
    kind: 'MindSpore Innovation Camp - Second Prize',
    title: 'NLP & LLM Deployment with MindSpore',
    role: 'NLP / LLM Engineer',
    period: 'Mar 2024 - Apr 2024',
    blurb:
      'Hands-on Transformer and LLM training on Huawei MindSpore - including a deep dive into how positional encoding lets attention understand word order.',
    body: [
      'Trained and evaluated Transformer and BERT models with MindSpore and MindNLP on Huawei Cloud ModelArts, covering sequence classification, sentiment analysis, and BLEU-scored translation.',
      'Built a local ChatGLM-6B demo with Gradio and explored PEFT, prompt tuning, and instruction tuning. The project received Second Prize at the MindSpore Innovation Camp.',
      'My key finding is that sinusoidal positional encoding acts as a multi-frequency coordinate system. High-frequency dimensions distinguish nearby tokens, while lower-frequency dimensions preserve order across longer spans.',
      'Because relative phase shifts depend on positional distance, self-attention can infer displacement from deterministic absolute encodings. Adding them to token embeddings supplies sequence order without recurrence or learned positional parameters.',
    ],
    stack: ['MindSpore', 'MindNLP', 'BERT', 'Transformer', 'ChatGLM-6B', 'Gradio'],
    media: {
      type: 'diagram',
      variant: 'mindspore-research',
      placement: 'project-grid',
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
  { id: 'home', index: '00', label: 'Home' },
  { id: 'about', index: '01', label: 'About' },
  { id: 'experience', index: '02', label: 'Experience' },
  { id: 'anomaly', index: '03', label: 'Anomaly Detection' },
  { id: 'assistant', index: '04', label: 'Course Assistant' },
  { id: 'publication', index: '05', label: 'Publication' },
  { id: 'mindspore', index: '06', label: 'MindSpore' },
  { id: 'activities', index: '07', label: 'Activities' },
]

// Each style preview shows the nav design plus the sections that exist in the
// preview: home, about, the sample project, and contact.
export const previewNav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'anomaly', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export const previewProjectIndex = '01'

export const anomaly = projects[0] as Project & {
  media: Extract<ProjectMedia, { type: 'youtube' }>
}
