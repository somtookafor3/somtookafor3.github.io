export const profile = {
  name: "Somtochukwu Ofentse Okafor",
  shortName: "Somto Okafor",
  title: "Software Engineer",
  tagline:
    "I build backend systems, trading infrastructure, and practical automation — with the guardrails designed in first.",
  location: "Johannesburg, South Africa",
  email: "somtookafor3@gmail.com",
  github: "https://github.com/somtookafor3",
  // Earlier university coursework was pushed under a second account, which is
  // where the Big Data and mobile-app repositories still live.
  githubCoursework: "https://github.com/okafors",
  cvFile: "/Somto-Okafor-CV.pdf",
  summary: [
    "I'm a Computer Science graduate (Coventry University, 2024) working across backend engineering, full-stack development, and applied AI. My recent work centres on financial systems: a 16,000-line asynchronous crypto-arbitrage engine with a full cost model, circuit breakers, chaos testing, and 228 automated tests, alongside its TypeScript trading terminal.",
    "My path into engineering wasn't a straight line. In July 2023 I was pasting LSTM tutorials I didn't fully understand; a month later I shipped a no-code chatbot that served real users; three years later I design dependency-injected async architectures with Prometheus observability and layered safety gates. Every project on this site is real work from my machine — analysed, ranked, and presented honestly, including what's prototype-grade and what isn't.",
    "I care most about the failure modes. The engineering decisions I'm proudest of are guardrails: rejecting implausible spreads as data errors rather than free money, refusing half-real trade execution, and writing agent runbooks whose first rule is what the system must never do.",
  ],
  philosophy: [
    {
      title: "Design the guardrails first",
      body: "Paper-trading by default with triple-gated live modes; automation runbooks that forbid fabrication before they describe capability. Safety is architecture, not an afterthought.",
    },
    {
      title: "Data integrity over optimism",
      body: "A spread that looks too good is a stale feed, a wrong pair, or a decimal slip — not free money. Systems should distrust their inputs at every boundary.",
    },
    {
      title: "Honest maturity labels",
      body: "Production shape is not production history. I label what has been battle-tested and what hasn't, because that distinction is the first thing a good engineer asks about.",
    },
    {
      title: "Add a tool only when its absence breaks something",
      body: "From my own learning plan: you may not add X until you can say 'without it, Y breaks'. Minimal dependencies, deliberate complexity.",
    },
  ],
  education: [
    {
      institution: "Coventry University, UK",
      qualification: "BSc Computer Science",
      period: "Sep 2021 – Jun 2024",
      detail:
        "Modules spanning parallel & distributed computing (5011CEM), machine learning, web API development, mobile app development, and applied security.",
    },
    {
      institution: "UTC Swindon, UK",
      qualification: "Double Diploma in Information Technology (BTEC)",
      period: "Sep 2019 – Jun 2021",
      detail: "Foundation in IT systems, networking, and software development.",
    },
  ],
  certifications: [
    { name: "CompTIA IT Fundamentals+", issuer: "ITCertify", year: "2024" },
    { name: "CompTIA Network+ (N10-008)", issuer: "ITCertify", year: "2024" },
    { name: "CompTIA Cloud+", issuer: "ITCertify", year: "2024" },
    { name: "CompTIA A+ (Core 1 & 2)", issuer: "In progress", year: "—" },
  ],
  experience: [
    {
      role: "Director",
      company: "Custom AI",
      period: "Dec 2023 – Aug 2024",
      bullets: [
        "Designed and deployed AI-powered virtual assistants for small businesses, including a Botpress-based booking and FAQ chatbot for a hairstyling business that served real users (18 sessions, 49 messages in its first launch window).",
        "Converted unstructured business content (price lists, FAQs) into machine-readable knowledge-base schemas for conversational flows.",
        "Ran client engagement end-to-end: requirements, iteration, delivery, and technical recommendations.",
      ],
    },
    {
      role: "IT Support Technician",
      company: "Flamming Patties",
      period: "Jun 2023 – Sep 2025",
      bullets: [
        "First-line technical support across hardware, software, networking, and peripherals with a high first-time fix rate.",
        "Network troubleshooting including VPN configuration and access management on Windows 10/11, Microsoft 365, and Active Directory.",
      ],
    },
  ],
};
