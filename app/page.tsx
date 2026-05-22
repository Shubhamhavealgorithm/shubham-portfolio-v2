"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string; external?: boolean };

type Project = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  accent: string;
};

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/18GXKNt5-TjgRpPST7_x_N8C9GVhU0IX7/view?usp=sharing",
    external: true,
  },
];

const projects: Project[] = [
  {
    title: "VULISCAN",
    subtitle: "AI Security Command Center",
    description:
      "Flagship vulnerability intelligence system focused on secure-by-design analysis workflows.",
    bullets: [
      "AI vulnerability scanner",
      "SQLi/SSRF/RCE/secrets detection",
      "Structured outputs for engineering workflows",
      "High precision and low false positives",
    ],
    accent: "from-cyan-300/40 to-violet-400/40",
  },
  {
    title: "INTELLI",
    subtitle: "AI Platform / Operating Layer",
    description:
      "A premium AI orchestration platform for prompt pipelines, guardrails, and model observability.",
    bullets: [
      "LLM API integration",
      "Prompt engineering pipelines",
      "Prompt injection mitigation",
      "Operational observability",
    ],
    accent: "from-violet-300/40 to-indigo-400/40",
  },
  {
    title: "Blockchain Chat",
    subtitle: "Decentralized Communication Grid",
    description:
      "A decentralized chat experience with trustless communication primitives and network topology-inspired visuals.",
    bullets: [
      "React, Solidity, Web3",
      "wagmi and ethers integration",
      "Decentralized chat architecture",
      "Network topology visualization aesthetic",
    ],
    accent: "from-blue-300/40 to-cyan-300/40",
  },
];

const skills = [
  {
    title: "Full Stack Engineering",
    points: ["Next.js + React", "TypeScript systems", "FastAPI / APIs", "Product architecture"],
  },
  {
    title: "Agentic AI Systems",
    points: ["LangChain orchestration", "LLM workflow design", "Guardrails", "Prompt optimization"],
  },
  {
    title: "Cybersecurity Engineering",
    points: ["Application security", "Vulnerability intelligence", "Threat-aware design", "Secure coding"],
  },
  {
    title: "Cloud Infrastructure",
    points: [
      "Vercel deployment",
      "Containerized services",
      "Scalable architecture",
      "Operational reliability",
    ],
  },
];

const experience = [
  {
    period: "Engineering Journey",
    title: "AI + Cybersecurity Focused Builder",
    description:
      "Building intelligent, secure, and scalable systems with a product mindset and execution velocity.",
  },
  {
    period: "Achievement",
    title: "IIT Bombay e-Yantra Semi-finalist",
    description:
      "Recognized for problem-solving, technical depth, and system-level engineering capabilities.",
  },
  {
    period: "Leadership",
    title: "Coordinator and Community Contributor",
    description:
      "Led events and peer initiatives, combining technical craft with high-accountability leadership.",
  },
];

function MagneticButton({
  href,
  children,
  external,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors ${
        variant === "primary"
          ? "border border-violet-300/40 bg-violet-400/10 text-white"
          : "border border-white/20 bg-white/5 text-slate-200"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("boot-sequence-complete") === "true";
    const duration = reduceMotion || alreadySeen ? 250 : 2400;
    const timeout = window.setTimeout(() => {
      setBooting(false);
      sessionStorage.setItem("boot-sequence-complete", "true");
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  const heroTiltStyle = useMemo(
    () => ({
      transform: `perspective(1000px) rotateX(${pointer.y * -2.8}deg) rotateY(${pointer.x * 3.2}deg)`,
    }),
    [pointer.x, pointer.y],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05060d] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,40,217,0.20),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.13),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.07),transparent_45%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_top,black,transparent_70%)]" />

      <motion.div
        initial={false}
        animate={{ opacity: booting ? 1 : 0, pointerEvents: booting ? "auto" : "none" }}
        transition={{ duration: reduceMotion ? 0.15 : 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#03040a]"
        aria-hidden={!booting}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.6 }}
          className="w-[min(680px,90vw)] rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <p className="mb-3 text-xs tracking-[0.3em] text-cyan-200/70">AI IDENTITY INITIALIZATION</p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>&gt; Booting cinematic profile modules…</p>
            <p>&gt; Synchronizing engineering + AI + security narrative…</p>
            <p>&gt; Founder signal: SHUBHAM DESHMUKH</p>
          </div>
          <motion.div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-300 via-violet-300 to-indigo-300"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: reduceMotion ? 0.2 : 2.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070912]/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#home" className="text-sm font-semibold tracking-[0.22em] text-white">
            SD
          </a>
          <ul className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="home" className="relative z-10">
        <section
          className="mx-auto grid min-h-[86vh] w-full max-w-6xl place-items-center px-4 py-20 md:px-8"
          onMouseMove={(event) => {
            const { innerWidth, innerHeight } = window;
            const x = (event.clientX / innerWidth - 0.5) * 2;
            const y = (event.clientY / innerHeight - 0.5) * 2;
            setPointer({ x, y });
          }}
        >
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.8 }}
            style={reduceMotion ? undefined : heroTiltStyle}
            className="w-full rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 shadow-[0_0_80px_rgba(76,29,149,0.30)] backdrop-blur-xl md:p-14"
          >
            <p className="text-xs tracking-[0.3em] text-slate-300">CINEMATIC PORTFOLIO EXPERIENCE</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[0.04em] text-white md:text-7xl">
              SHUBHAM DESHMUKH
            </h1>
            <p className="mt-5 max-w-3xl text-base text-slate-200 md:text-xl">
              Full Stack Engineer · Agentic AI Developer · Cybersecurity Engineer
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Building intelligent products with founder-level execution, secure architecture, and immersive digital storytelling.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="#projects">Explore Projects</MagneticButton>
              <MagneticButton
                href="https://drive.google.com/file/d/18GXKNt5-TjgRpPST7_x_N8C9GVhU0IX7/view?usp=sharing"
                external
                variant="secondary"
              >
                Open Resume
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 md:p-10"
          >
            <p className="text-xs tracking-[0.3em] text-slate-300">ABOUT</p>
            <h2 className="mt-3 text-2xl font-medium text-white md:text-4xl">
              Engineering cinematic products with secure intelligence.
            </h2>
            <p className="mt-5 max-w-4xl text-slate-300">
              I design and ship premium digital systems at the intersection of full stack engineering, agentic AI, and cybersecurity. My work emphasizes clarity, precision, and resilient execution.
            </p>
          </motion.div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">PROJECTS</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Product-style showcases</h2>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.7, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/70 p-6 md:p-8"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-35`} />
                <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <p className="text-xs tracking-[0.25em] text-cyan-100/80">{project.subtitle}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white md:text-4xl">{project.title}</h3>
                    <p className="mt-4 max-w-2xl text-slate-200">{project.description}</p>
                  </div>
                  <ul className="space-y-2 rounded-2xl border border-white/15 bg-black/30 p-4 text-sm text-slate-200">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">SKILLS</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Capability modules</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.55, delay: index * 0.04 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-xl font-medium text-white">{skill.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {skill.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">EXPERIENCE</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Cinematic timeline</h2>
          </div>
          <div className="relative ml-4 space-y-6 border-l border-white/15 pl-8">
            {experience.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.6, delay: index * 0.04 }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="absolute -left-[39px] top-8 h-4 w-4 rounded-full border border-cyan-200/60 bg-[#05060d]" />
                <p className="text-xs tracking-[0.22em] text-cyan-100/75">{item.period}</p>
                <h3 className="mt-2 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 pb-24 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.7 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-slate-900 to-cyan-500/10 p-8 md:p-12"
          >
            <p className="text-xs tracking-[0.3em] text-slate-300">CONTACT COMMAND CENTER</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">Let’s build something category-defining.</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Open for high-impact engineering opportunities, AI product collaborations, and cybersecurity-focused builds.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton href="mailto:shubhamdeshmukh843@gmail.com">Email Shubham</MagneticButton>
              <MagneticButton href="https://linkedin.com/in/shubham-deshmukh/" external variant="secondary">
                LinkedIn
              </MagneticButton>
              <MagneticButton href="https://github.com/Shubhamhavealgorithm" external variant="secondary">
                GitHub
              </MagneticButton>
              <MagneticButton
                href="https://drive.google.com/file/d/18GXKNt5-TjgRpPST7_x_N8C9GVhU0IX7/view?usp=sharing"
                external
                variant="secondary"
              >
                Open Resume
              </MagneticButton>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
