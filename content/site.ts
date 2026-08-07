/**
 * ============================================
 * EDITABLE SITE CONTENT
 * ============================================
 * Change text, links, dates, and lists here.
 * Resume PDFs live in: content/resumes/ (also copied to public/resumes/)
 * After editing resume PDFs, copy them to public/resumes/ or run: npm run sync:resumes
 */

/** Prefix public assets for GitHub Pages (`/Portfolio_New/`) and local `/`. */
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const site = {
  name: "Aaron",
  legalName: "Chun Kiat Lwi",
  tagline: "Aaron — a little bit of everything.",
  subtitle:
    "Curious learner. Clear communicator. Flexible builder across web and operations.",
  locationNote: "Based in Johor, Malaysia", // not shown in dossier; optional elsewhere
  nav: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "wakatime", label: "WakaTime" },
    { id: "contact", label: "Contact" },
  ],
  ctas: {
    primary: "Download Resume",
    resumes: [
      {
        label: "IT Resume",
        href: asset("resumes/Aaron_Lwi_Resume_IT.pdf"),
        filename: "Aaron_Lwi_Resume_IT.pdf",
      },
      {
        label: "Customer Service Resume",
        href: asset("resumes/Aaron_Lwi_Resume_CS.pdf"),
        filename: "Aaron_Lwi_Resume_CS.pdf",
      },
    ],
    secondary: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/chun-kiat-lwi-058308287/",
      },
      { label: "Contact", href: "#contact" },
    ],
  },
  social: {
    email: "Work.aaron0320@gmail.com",
    linkedin: "https://www.linkedin.com/in/chun-kiat-lwi-058308287/",
    github: "https://github.com/AaaaaaaaaronL",
    wakatime: "https://wakatime.com/@Aaron_Lwi",
    whatsapp: "https://wa.me/60193410320",
    phoneDisplay: "+60 19-341 0320",
    phone: "+60193410320",
  },
  desk: {
    objects: [
      { id: "dossier", label: "Dossier", modal: "dossier", hint: "About me" },
      { id: "laptop", label: "Laptop", modal: "projects", hint: "Projects" },
      {
        id: "folder",
        label: "Folder",
        modal: "experience",
        hint: "Experience",
      },
      {
        id: "certs",
        label: "Certificates",
        modal: "certificates",
        hint: "Certificates",
      },
      {
        id: "envelope",
        label: "Envelope",
        modal: "contact",
        hint: "Contact card",
      },
    ],
  },
  about: {
    headline: "Hi, I'm Aaron.",
    body: "I like learning new things and turning unclear problems into clear next steps — whether that means shipping web features or guiding someone through a tough support case. I am not limited to one lane: I build, I listen, and I communicate under pressure.",
    photo: asset("images/aaron-portrait.png"),
    dossier: [
      { label: "Nickname", value: "Aaron" },
      { label: "Legal name", value: "Chun Kiat Lwi" },
      { label: "Birthday", value: "20 March 2004" },
      { label: "Blood type", value: "A" },
      { label: "Languages", value: "Chinese, Malay, English" },
      { label: "MBTI", value: "INFJ" },
      { label: "Interests", value: "Travel" },
    ],
  },
  experience: {
    headline: "Experience",
    subhead: "Filter by path — IT, customer service, or everything together.",
    filters: [
      { id: "all", label: "All" },
      { id: "it", label: "IT" },
      { id: "cs", label: "Customer Service" },
    ] as const,
    items: [
      {
        id: "kunzz",
        category: "it" as const,
        title: "Technical Engineer",
        company: "Kunzz Holding Sdn Bhd",
        employmentType: "Full-time",
        location: "Ulu Tiram, Johor, Malaysia · On-site",
        start: "Jun 2026",
        end: "Jul 2026",
        bullets: [
          "Supported web feature delivery using React.js and React Hooks.",
          "Collaborated with the team to implement and refine frontend interfaces.",
          "Debugged UI issues and improved day-to-day development workflows.",
        ],
        skills: ["React.js", "React Hooks"],
      },
      {
        id: "tp",
        category: "cs" as const,
        title: "Operations Customer Expert",
        company: "TP",
        employmentType: "Full-time",
        location: "Malaysia · Remote",
        start: "Nov 2025",
        end: "Jun 2026",
        bullets: [
          "Acted as the main point of contact between buyers and sellers, facilitating issue resolution and maintaining service quality.",
          "Reviewed and communicated case decision outcomes in accordance with company guidelines.",
          "Served as a Senior Teammate in the Buddy Program, mentoring new colleagues and assisting with onboarding.",
          "Consistently met performance targets, achieving full performance scores from the second month onward.",
        ],
        skills: ["Customer Operations", "Mentoring", "Case Handling"],
      },
      {
        id: "wincom",
        category: "it" as const,
        title: "Software Engineer",
        company: "Wincom ERP",
        employmentType: "Full-time",
        location: "Malaysia · On-site",
        start: "Jun 2025",
        end: "Oct 2025",
        bullets: [
          "Developed and maintained backend solutions using C# ASP.NET.",
          "Designed and implemented inquiry pages (.aspx) with ASP.NET.",
          "Created and customized reports using DevExpress.",
          "Wrote and optimized SQL queries for reporting and data analysis.",
          "Utilized Visual Studio and SSMS for development and database management.",
          "Conducted debugging and troubleshooting to improve system stability.",
          "Strengthened expertise in ASP.NET backend development and SQL programming.",
        ],
        skills: ["C#", "ASP.NET", "SQL", "DevExpress"],
      },
      {
        id: "gpis",
        category: "it" as const,
        title: "Software Developer Intern",
        company: "GPIS Solutions Sdn Bhd",
        employmentType: "Full-time · Internship",
        location: "Johor, Malaysia · On-site",
        start: "Mar 2025",
        end: "May 2025",
        bullets: [
          "Developed real-world Python projects, including automation scripts, web scraping tools, and a gesture-based calculator using MediaPipe and OpenCV.",
          "Built a clinic subscription management system using Laravel (CRUD, authentication, and SQL Server integration).",
          "Created a Flutter mobile app connected to a Laravel backend, focusing on responsive UI and smooth user experience.",
          "Gained experience in full-stack development, API integration, and solving practical technical challenges.",
        ],
        skills: ["Python", "Laravel", "Flutter", "SQL Server"],
      },
      {
        id: "startek-uk",
        category: "cs" as const,
        title: "Customer Service Representative",
        company: "Startek Malaysia",
        employmentType: "Full-time",
        location: "Johor, Malaysia · On-site",
        start: "Nov 2022",
        end: "Mar 2023",
        bullets: [
          "Handled outbound calls to merchants in the UK and Ireland to confirm information and assist when support was needed.",
          "Maintained clear, professional communication across international cases and time-sensitive requests.",
          "Adapted quickly to a new regional queue after transitioning from the Taiwan line.",
          "Used BLISS as part of daily operations tooling.",
        ],
        skills: ["BLISS", "Outbound", "UK & Ireland"],
      },
      {
        id: "startek-taiwan",
        category: "cs" as const,
        title: "Customer Service Representative",
        company: "Startek Malaysia",
        employmentType: "Full-time",
        location: "Johor, Malaysia · On-site",
        start: "May 2022",
        end: "Nov 2022",
        bullets: [
          "Provided inbound support for customers in Taiwan via written messages and phone calls.",
          "Resolved issues with patience and clarity while keeping service quality consistent under volume.",
          "Built a foundation in empathy-led communication and case handling.",
          "Worked with Salesforce Sales Cloud in day-to-day operations.",
        ],
        skills: ["Salesforce Sales Cloud", "Inbound", "Taiwan"],
      },
    ],
  },
  projects: {
    headline: "Projects",
    subhead: "A small selection of work that shows how I build and collaborate.",
    items: [
      {
        id: "fyp",
        title: "Grievance Management System (FYP)",
        description:
          "A full grievance ticketing platform developed with teammates Mr. Foo and Mr. Teo for our Final Year Project. The system lets users submit feedback or complaints, while admins review, categorize, and resolve cases with role-based access. I owned the web frontend UI — shaping clear submission flows, readable case views, and admin screens so both sides could move through the process without confusion. The project later earned Gold awards at InIIC and the Virtual Innovation Competition.",
        stack: ["Flutter", "Laravel", "Tailwind CSS", "Frontend UI"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/yxiang921/Grievance-Management-System",
          },
        ],
      },
      {
        id: "clinic",
        title: "Clinic Subscription System",
        description:
          "Built during my internship at GPIS Solutions as a practical clinic subscription management web app. It supports core CRUD workflows, user authorization, and history viewing so staff can track subscription records over time. I focused on making everyday actions reliable and understandable — create, update, review past activity — while integrating with SQL Server on a Laravel backend. This project strengthened my full-stack habits around auth, data handling, and real workplace requirements.",
        stack: ["Laravel", "SQL Server", "CRUD", "Auth"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/AaaaaaaaaronL/Powerclinic-subscription",
          },
        ],
      },
      {
        id: "python",
        title: "Python Experiments",
        description:
          "A set of hands-on Python experiments for learning by shipping small, usable tools. One track covers automation and web scraping with Selenium for repetitive browser tasks. Another explores computer vision: a finger-tracking calculator built with MediaPipe and OpenCV, where hand gestures drive the interface. Together they reflect how I learn — start with curiosity, then turn it into something interactive I can demo and improve.",
        stack: ["Python", "Selenium", "MediaPipe", "OpenCV"],
        links: [
          {
            label: "Automation",
            href: "https://github.com/AaaaaaaaaronL/python-automation",
          },
          {
            label: "Hand Tracking",
            href: "https://github.com/AaaaaaaaaronL/Hand-Tracking",
          },
        ],
      },
    ],
  },
  certificates: {
    headline: "Certificates",
    items: [
      {
        id: "efset",
        title: "EF SET English Certificate — 65/100 (C1 Advanced)",
        issuer: "EF SET",
        date: "Jul 2026",
        href: "https://cert.efset.org/en/Thduxz",
      },
      {
        id: "vic2025",
        title: "Gold Award — Virtual Innovation Competition 2025",
        issuer: "Universiti Teknologi MARA",
        date: "Jun 2025",
        credentialId: "ST1231",
        href: "https://southernuniversitycollege-my.sharepoint.com/personal/lc9738_sc_edu_my/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Flc9738%5Fsc%5Fedu%5Fmy%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FeCERT%5FGOLD%5F%2D%5FST1231%2Epdf&parent=%2Fpersonal%2Flc9738%5Fsc%5Fedu%5Fmy%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files&ga=1",
      },
      {
        id: "iniic2024",
        title: "Gold Award — International Invention & Innovative Competition (InIIC) 2024",
        issuer: "MNNF Network",
        date: "Oct 2024",
        credentialId: "Ref.No.2127",
        href: "https://drive.google.com/file/d/1foHe1wIleTraCk3sFCCnrWp55al70Oqd/view",
      },
      {
        id: "lcci",
        title:
          "Distinction — Pearson LCCI Book-keeping & Accounts (assessed in Bahasa Melayu)",
        issuer: "Pearson Education Ltd",
        date: "Mar 2023",
        credentialId: "2203060002598",
        href: null,
      },
    ],
  },
  education: {
    headline: "Education",
    secondary: {
      school: "SMK Taman Universiti",
      focus: "Economics & Accounting",
      summary:
        "SPM: 1 A+ and 4 A's — including Accounting (A+), Economics, Science, Mathematics, and History. Also earned Pearson LCCI Book-keeping & Accounts Level 2 with Distinction.",
      subjects: [
        { name: "Accounting (Prinsip Perakaunan)", grade: "A+" },
        { name: "Economics (Ekonomi)", grade: "A" },
        { name: "Science", grade: "A" },
        { name: "Mathematics", grade: "A" },
        { name: "Sejarah (History)", grade: "A" },
        { name: "Bahasa Melayu", grade: "B" },
        { name: "English", grade: "C" },
        { name: "Moral", grade: "B" },
      ],
    },
    university: {
      school: "Southern University College",
      program: "Diploma in Information Technology",
      years: "2023 – 2025",
      highlights: [
        "Dean’s List — Semester 5 (GPA 3.93)",
        "Dean’s List — Semester 6 (GPA 3.84)",
        "Gold Award — Final Year Project at InIIC 2024",
        "Gold Award — Virtual Innovation Competition 2025",
      ],
      semesters: [
        { term: "1st Semester", gpa: "3.45" },
        { term: "2nd Semester", gpa: "3.45" },
        { term: "3rd Semester", gpa: "3.33" },
        { term: "4th Semester", gpa: "3.33" },
        { term: "5th Semester", gpa: "3.93", note: "Dean’s List" },
        { term: "6th Semester", gpa: "3.84", note: "Dean’s List" },
      ],
      leadership: [
        {
          term: "2nd Semester",
          roles: ["E-Commerce Club — Treasurer"],
        },
        {
          term: "3rd Semester",
          roles: ["E-Commerce Club — Vice President"],
        },
        {
          term: "4th Semester",
          roles: [
            "E-Commerce Club — President",
            "Faculty of Engineering and Information Technology — Treasurer",
          ],
        },
        {
          term: "5th Semester",
          roles: [
            "E-Commerce Club — President",
            "Faculty of Engineering and Information Technology — Treasurer",
          ],
        },
        {
          term: "6th Semester",
          roles: [
            "E-Commerce Club — President",
            "Faculty of Engineering and Information Technology — Treasurer",
          ],
        },
      ],
    },
  },
  skills: {
    headline: "Skills",
    groups: [
      {
        title: "Website Development",
        items: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "PHP",
          "Tailwind CSS",
          "Bootstrap",
          "Node.js",
        ],
      },
      {
        title: "Framework",
        items: ["React", "Laravel", "Flutter"],
      },
      {
        title: "Backend",
        items: ["Python", "Java", "C#", "ASP.NET"],
      },
      {
        title: "Database",
        items: ["MySQL", "SQL Server"],
      },
      {
        title: "Tools",
        items: [
          "VS Code",
          "Visual Studio",
          "Git",
          "GitHub",
          "Postman",
          "DevExpress",
          "SSMS",
        ],
      },
      {
        title: "Others",
        items: ["Figma", "Selenium", "Salesforce", "MediaPipe", "OpenCV"],
      },
    ],
  },
  wakatime: {
    headline: "WakaTime",
    subhead: "A living snapshot of how I spend time learning and building.",
    username: "Aaron_Lwi",
    profileUrl: "https://wakatime.com/@Aaron_Lwi",
    note: "Language and editor charts are generated from WakaTime at deploy time and shown on this page.",
  },
  contact: {
    headline: "Let’s explore how we can grow.",
    body: "Reach out if you want to collaborate, talk through an idea, or learn more about my work.",
    tone: "neutral-professional",
  },
  footer: {
    text: "© {year} Chun Kiat Lwi (Aaron). Built with care.",
  },
} as const;

export type ExperienceFilter = (typeof site.experience.filters)[number]["id"];
export type ExperienceCategory = "it" | "cs";
