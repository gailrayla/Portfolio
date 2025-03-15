import React from "react";
import { FaReact } from "react-icons/fa";
import OM_Farm from "@/public/OM_Farm.jpg";
import BountyEx2 from "@/public/BountyEx2.png";
import ReplyIntelligence from "@/public/ReplyIntelligence.png";
import { GoBook } from "react-icons/go";
import { FaWordpressSimple } from "react-icons/fa6";
import { VscVr } from "react-icons/vsc";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Human-Computer Interaction Intern",
    location: "Ulsan, South Korea",
    company: "Interactions Lab",
    description:
      "I contributed to interactive VR application components with a focus on enhancing user experience and immersion, utilizing C# and Unity to develop innovative features for touch typing with VR",
    icon: React.createElement(VscVr),
    date: "Jul 2022 - Dec 2022",
  },
  {
    title: "Service Design Intern",
    location: "Ulsan, South Korea",
    company: "New Design Studio",
    description:
      "I contributed to the UI/UX design and frontend development of the university design department's website, implementing responsive frontend solutions to enhance website accessibility and user engagement.",
    icon: React.createElement(FaWordpressSimple),
    date: "Sep 2023 - Dec 2023",
  },
  {
    title: "Software Research Intern",
    location: "Ulsan, South Korea",
    company: "Human-AI Interaction and Visualization Lab",
    description:
      "I contributed to research on AI-assisted coding tools by analyzing the SWE-Bench dataset and conducting user studies on code comprehension, which included performing thematic analysis of qualitative data and co-authoring a conference paper submission.",
    icon: React.createElement(GoBook),
    date: "Jul 2024 - Dec 2024",
  },
  {
    title: "Software Engineer Intern",
    location: "Washington, USA",
    company: "OM Farm",
    description:
      "As a software engineer on the livestock leasing platform, I contributed to the full-stack development, employing GraphQL, JavaScript, TypeScript, and React for the front-end, alongside PostgreSQL and Firebase databases, while implementing SOLID principles and CQRS architecture for scalability and maintainability; I actively participated in agile ceremonies like standups, sprint planning, and retrospectives, and contributed to debugging, code reviews, and performance optimization using GCP tools.",
    icon: React.createElement(FaReact),
    date: "Jan 2024 - Dec 2024",
  },
] as const;

export const projectsData = [
  {
    title: "OM Farm Portal and Microservices",
    description:
      "I built the OM Farm Portal with TypeScript, featuring CQRS-designed article and agreement microservices. I also integrated Google services for a complete full-stack experience.",
    tags: ["React", "Next.js", "PostgreSQL", "GraphQL", "GCP"],
    imageUrl: OM_Farm,
    url: "https://www.om.farm/",
  },
  {
    title: "BountyEX",
    description:
      "I developed the BountyEX frontend, a decentralized Ethereum bounty platform with smart contract integration.",
    tags: ["React", "TypeScript", "NestJS", "ShadCN/UI", "Blockchain"],
    imageUrl: BountyEx2,
    url: "https://www.bountyex.org/change",
  },
  {
    title: "Reply Intelligence",
    description:
      "I refactored legacy code of Reply Intelligence to a NestJS microservices architecture and developed its full-stack features using React, Firebase, PostgreSQL, and Google Cloud Functions.",
    tags: ["NestJS", "React", "PostgreSQL", "Firebase", "GCP"],
    imageUrl: ReplyIntelligence,
    url: "https://app.replyintelligence.com/",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Firebase",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "C++",
  "Google Cloud Platform",
  "Framer Motion",
] as const;
