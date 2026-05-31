import {
  mobile,
  backend,
  web,
  fullstack,
  javascript,
  reactjs,
  tailwind,
  mongodb,
  python,
  cplusplus,
  mockmate,
  expensetracker,
  github,
  ideas,
  concepts,
  designs,
  code
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Developer",
    icon: fullstack,
  },
  {
    title: "Problem Solver (DSA)",
    icon: backend,
  },
  {
    title: "Data Analyst",
    icon: mobile,
  },
  {
    title: "Cloud Enthusiast",
    icon: web,
  },
];

const education = [
  {
    title: "B.Tech in Computer Science & Engineering",
    company_name: "IIIT Dharwad",
    icon: web,
    iconBg: "#fff",
    date: "2024 - 2028",
    location: "Dharwad, Karnataka",
    cgpa: "8.12 CGPA",
    coursework: ["Data Structures & Algorithms", "Computer Networks", "Database Management Systems", "Software Engineering"],
    achievements: ["Active core technical team member", "Exploring scalable cloud systems"],
    status: "ongoing",
    points: [
      "Currently pursuing with a CGPA of approximately 8.12.",
      "Actively exploring full stack development, modern frontend engineering, cybersecurity, and scalable technologies.",
    ],
  },
  {
    title: "Higher Secondary Education",
    company_name: "Sri Chaitanya College",
    icon: mobile,
    iconBg: "#fff",
    date: "2022 - 2024",
    location: "Vijayawada, AP",
    cgpa: "95.7%",
    coursework: ["Mathematics", "Physics", "Chemistry"],
    achievements: ["Scored 957/1000 on state intermediate board exams"],
    status: "completed",
    points: [
      "Completed Intermediate education with a score of 957/1000.",
      "Strengthened analytical thinking, competitive mindset, and academic focus toward technology and engineering.",
    ],
  },
  {
    title: "Secondary Education",
    company_name: "Keshava Reddy Residential School",
    icon: backend,
    iconBg: "#fff",
    date: "2021 - 2022",
    location: "Nandyal, AP",
    cgpa: "95.3%",
    coursework: ["General Sciences", "Mathematics", "Social Studies"],
    achievements: ["Scored 572/600 in SSC board exams"],
    status: "completed",
    points: [
      "Completed 10th grade with a score of 572/600.",
      "Built discipline, consistency, and strong academic foundations.",
    ],
  },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
];

// Re-using some structures to avoid crashing components if they expect specific arrays
const itTools = [];
const cybersecurityTools = [];
const designTools = [];
const extracurricular = [];

const experiences = [
  {
    title: "Intern",
    company_name: "Cyart",
    icon: backend,
    iconBg: "#fff",
    date: "Current",
    location: "Hybrid",
    highlights: [
      "Contributing to commercial web application development workflows.",
      "Writing modern, modular React components following style guides.",
      "Collaborating closely with senior frontend engineers to refine UX."
    ],
    technologies: ["React", "JavaScript", "CSS3", "Tailwind CSS"],
    impact: "Contributing to features used by team members daily",
    status: "current",
    points: [
      "Currently interning at Cyart company.",
      "Working on modern web development and software engineering tasks.",
      "Will update with the certificate upon completion.",
    ],
  },
  {
    title: "Data Analyst Intern",
    company_name: "TBD",
    icon: web,
    iconBg: "#fff",
    date: "Current",
    location: "Remote",
    highlights: [
      "Leveraging python libraries (Pandas, NumPy) to analyze raw experimental data.",
      "Utilizing generative AI tools to assist in parsing data summaries and generating reports.",
      "Formulating insights to help streamline business decision workflows."
    ],
    technologies: ["Python", "Pandas", "NumPy", "OpenAI API"],
    impact: "Uncovered key database insights to optimize pipeline efficiency",
    status: "ongoing",
    points: [
      "Actively working as a Data Analyst Intern.",
      "Leveraging AI and data tools to solve analytical problems.",
    ],
  },
  {
    title: "Full Stack Development Journey",
    company_name: "Personal & Academic",
    icon: fullstack,
    iconBg: "#fff",
    date: "2025 - Present",
    location: "Self-paced",
    highlights: [
      "Building full stack applications integrating React, Node.js, and MongoDB.",
      "Implementing elegant animations and responsive grids with Framer Motion and Tailwind CSS.",
      "Studying clean coding standards, REST APIs, and Git version control."
    ],
    technologies: ["React JS", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Git"],
    impact: "Built 5+ responsive applications with rich UI and animations",
    status: "ongoing",
    points: [
      "Building modern web applications using React, Tailwind CSS, Node.js, and JavaScript.",
      "Strong focus on responsive UI design, clean architecture, and practical product development.",
    ],
  },
  {
    title: "Cricket Team Member & Sports Lead",
    company_name: "IIIT Dharwad Cricket Team",
    icon: "sports",
    iconBg: "#fff",
    date: "2024 - 2025",
    location: "Dharwad, Karnataka",
    highlights: [
      "Active member of the IIIT Dharwad Cricket Team, contributing to and organizing team setups.",
      "Won Silver medal in Cricket at the IIIT Dharwad intra-sports competition.",
      "Represented the institution in Karate, Cricket, and Volleyball tournaments."
    ],
    technologies: ["Leadership", "Teamwork", "Sportsmanship", "Strategy"],
    impact: "Contributed to winning a Silver medal and multiple awards in intra-college sports",
    status: "completed",
    points: [
      "Served as a member of the Cricket Team.",
      "Achieved Silver in Cricket at the IIIT Dharwad intra-sports competition.",
      "Represented IIIT Dharwad in multiple tournaments."
    ],
  },
];

const projects = [
  {
    name: "MockMate",
    description:
      "MockMate is an AI-powered mock interview platform designed to help students improve technical interview preparation through realistic interactive sessions. Focuses on responsive UI, smooth user experience, and practical interview-oriented workflows.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
    ],
    image: mockmate,
    source_code_link: "https://github.com/tharun77714/mock.git",
    live_project_link: "https://mock-amber.vercel.app",
  },
  {
    name: "Expense Tracker",
    description:
      "Expense Tracker is a smart personal finance management application inspired by real-life financial tracking needs. Features include secure authentication, voice-based expense entry, smart budget alerts, and spending analysis.",
    tags: [
      {
        name: "Full Stack",
        color: "blue-text-gradient",
      },
      {
        name: "AI-Powered",
        color: "green-text-gradient",
      },
    ],
    image: expensetracker,
    source_code_link: "#",
    live_project_link: "#",
  },
];

const achievements = [
  {
    title: "Cricket Awards",
    category: "sports",
    description: "Member of the IIIT Dharwad Cricket Team. Earned multiple medals at internal sports tournaments.",
    date: "2024 - 2025",
    icon: "sports",
    points: [
      "Member of the IIIT Dharwad Cricket Team, contributing to team setups and organization.",
      "Won Silver medal in Cricket at the IIIT Dharwad intra-sports competition.",
      "Represented school in Karate, Cricket, and Volleyball tournaments."
    ],
    color: "emerald"
  },
  {
    title: "Competitive Programming",
    category: "coding",
    description: "Solved 60+ algorithmic problems across major platforms. Actively refining skills in data structures and problem solving.",
    date: "2024 - Present",
    icon: "coding",
    points: [
      "Solved 60+ data structures & algorithms problems on LeetCode, GFG, and HackerRank.",
      "Actively practicing core computer science concepts including DSA, Computer Networks, and OS.",
      "Consistently studying and solving competitive programming challenges to optimize code efficiency."
    ],
    color: "blue"
  },
  {
    title: "Cybersecurity Projects",
    category: "security",
    description: "Developed scripting-based security utilities to explore networks and data protection workflows.",
    date: "2024",
    icon: "security",
    points: [
      "Built an automated Port Scanner and Password Strength Checker using Python.",
      "Developed a custom File Encryption/Decryption utility utilizing cryptography libraries.",
      "Explored fundamental networking, script-based automation, and secure coding practices."
    ],
    color: "purple"
  },
  {
    title: "Data Analyst Intern",
    category: "internship",
    description: "Currently gaining practical hands-on experience in data interpretation and analytical problem solving.",
    date: "2025 - Present",
    icon: "internship",
    points: [
      "Collaborating on data analysis, data handling, and analytical workflows using diverse datasets.",
      "Gaining practical exposure to data visualization, interpretation, and processing pipelines.",
      "Leveraging Python and analytical techniques to extract valuable insights from raw data."
    ],
    color: "amber"
  }
];

export const words = [
  { text: "Ideas", imgPath: ideas, font: "Arial, sans-serif" },
  {
    text: "Concepts",
    imgPath: concepts,
    font: "'Courier New', Courier, monospace",
  },
  {
    text: "Designs",
    imgPath: designs,
    font: "'Times New Roman', Times, serif",
  },
  { text: "Code", imgPath: code, font: "'Fira Mono', monospace" },
  {
    text: "Ideas",
    imgPath: ideas,
    font: "'Comic Sans MS', cursive, sans-serif",
  },
  { text: "Concepts", imgPath: concepts, font: "'Roboto', sans-serif" },
  { text: "Designs", imgPath: designs, font: "'Georgia', serif" },
  { text: "Code", imgPath: code, font: "'Source Code Pro', monospace" },
];

export {
  services,
  technologies,
  itTools,
  cybersecurityTools,
  designTools,
  experiences,
  extracurricular,
  projects,
  education,
  achievements,
};
