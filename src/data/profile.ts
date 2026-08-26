export const profile = {
  name: "Somtochukwu Ofentse Okafor",
  shortName: "Somto Okafor",
  title: "Software Engineer",
  tagline:
    "Computer Science graduate building backend systems and trading tools, mostly in Python and TypeScript.",
  location: "Johannesburg, South Africa",
  email: "somtookafor3@gmail.com",
  github: "https://github.com/somtookafor3",
  // Earlier university coursework was pushed under a second account, which is
  // where the Big Data and mobile-app repositories still live.
  githubCoursework: "https://github.com/okafors",
  cvFile: "/Somto-Okafor-CV.pdf",
  summary: [
    "I graduated from Coventry University in 2024 with a BSc in Computer Science. Since then most of my time has gone into backend work in Python, with some full-stack TypeScript alongside it.",
    "The project I've put the most into is an arbitrage engine that watches South African crypto exchanges against international ones. It's about 16,000 lines of async Python. The interesting part isn't spotting a price gap, it's working out whether the gap survives trading fees, withdrawal fees, network fees, FX spread, bank charges and slippage. Usually it doesn't. I also built a separate terminal-style front end for it in Next.js.",
    "Before that I was doing IT support and building chatbots for small businesses. My first attempt at machine learning in 2023 was an LSTM tutorial I copied and didn't really understand. I've kept that in mind while building things since.",
    "What I tend to focus on is what happens when something goes wrong. In the arbitrage engine that meant rejecting price spreads that look too large, because in practice a huge spread is almost always a stale price feed or a decimal error rather than free money. It also means the thing paper-trades by default and needs several explicit confirmations before it will touch real funds.",
  ],
  howIWork: [
    {
      title: "Assume the data is wrong",
      body: "Most of the bugs I've hit came from trusting an input. The engine checks prices for plausibility before it does anything with them, and refuses to run on simulated data when it thinks it's live.",
    },
    {
      title: "Make failure boring",
      body: "Circuit breakers, retries with backoff, a dead-letter queue for anything that fails, and a watchdog that restarts stuck workers. None of it is clever, but it means one bad response doesn't take the whole scan down.",
    },
    {
      title: "Don't add a dependency you can't justify",
      body: "I try not to reach for a tool until I can say what breaks without it. The polling API I built has two dependencies. The front end has a list virtualiser I wrote in about 60 lines instead of pulling in a library.",
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
