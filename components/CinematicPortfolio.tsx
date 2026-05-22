"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { label: string; href: string; external?: boolean };
type Scene = { id: string; label: string; title: string; body: string };
type Project = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  accent: string;
};

type Skill = { title: string; points: string[] };

type ExperienceItem = { period: string; title: string; description: string };

const HeroThreeCanvas = dynamic(() => import("@/components/HeroThreeCanvas"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_40%_30%,rgba(103,232,249,0.14),transparent_50%)]" />,
});

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

const storyScenes: Scene[] = [
  {
    id: "about",
    label: "ABOUT",
    title: "Engineering cinematic products with secure intelligence.",
    body: "I design and ship premium digital systems across full stack engineering, agentic AI, and cybersecurity—with founder-level speed and quality.",
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "Real product modules, not portfolio cards.",
    body: "Every showcase below is presented as a visual control surface to demonstrate behavior, architecture intent, and user-facing impact.",
  },
  {
    id: "skills",
    label: "SKILLS",
    title: "Capability modules built for execution.",
    body: "From backend systems to AI orchestration and secure development, these capabilities are built to ship ambitious products reliably.",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    title: "A timeline shaped by systems thinking.",
    body: "Each milestone reflects technical depth, leadership under responsibility, and a practical bias for delivery.",
  },
  {
    id: "contact",
    label: "CONTACT",
    title: "Command center open for high-impact builds.",
    body: "Ready for product engineering, AI platform work, and cybersecurity-led collaborations.",
  },
];

const projects: Project[] = [
  {
    title: "VULISCAN",
    subtitle: "Security Command Center",
    description: "Flagship vulnerability intelligence system focused on secure-by-design analysis workflows.",
    bullets: ["AI vulnerability scanner", "SQLi/SSRF/RCE/secrets detection", "Structured engineering outputs", "High precision, low false positives"],
    accent: "from-cyan-300/40 via-blue-400/30 to-violet-500/35",
  },
  {
    title: "INTELLI",
    subtitle: "AI Platform OS",
    description: "A premium AI orchestration layer for prompt pipelines, guardrails, and model observability.",
    bullets: ["LLM API routing", "Prompt orchestration pipelines", "Prompt injection mitigation", "Observability + policy controls"],
    accent: "from-violet-300/40 via-fuchsia-400/30 to-indigo-500/35",
  },
  {
    title: "Blockchain Chat",
    subtitle: "Decentralized Network Visualization",
    description: "A trustless communication experience presented with network-topology-inspired interaction patterns.",
    bullets: ["React + Solidity + Web3", "wallet + contract integration", "decentralized messaging", "node-link interaction model"],
    accent: "from-blue-300/40 via-cyan-300/30 to-emerald-400/30",
  },
];

const skills: Skill[] = [
  {
    title: "Full Stack Engineering",
    points: ["Next.js + TypeScript systems", "Backend API architecture", "Performance-aware UI engineering", "Product-focused execution"],
  },
  {
    title: "Agentic AI Systems",
    points: ["LLM orchestration", "Prompt pipeline design", "Guardrails and eval loops", "Operational AI observability"],
  },
  {
    title: "Cybersecurity Engineering",
    points: ["Application security", "Threat-aware design", "Vulnerability intelligence", "Secure coding standards"],
  },
  {
    title: "Cloud Infrastructure",
    points: ["Vercel deployment", "Scalable architecture", "Resilience and reliability", "Production delivery workflows"],
  },
];

const experience: ExperienceItem[] = [
  {
    period: "Engineering Journey",
    title: "AI + Cybersecurity Focused Builder",
    description: "Building intelligent, secure, and scalable systems with product clarity and execution velocity.",
  },
  {
    period: "Achievement",
    title: "IIT Bombay e-Yantra Semi-finalist",
    description: "Recognized for systems thinking, technical depth, and high-quality problem-solving.",
  },
  {
    period: "Leadership",
    title: "Coordinator and Community Contributor",
    description: "Led technical initiatives and peer programs while balancing delivery and mentorship.",
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
          ? "border border-violet-300/45 bg-violet-400/12 text-white"
          : "border border-white/20 bg-white/5 text-slate-200"
      }`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

function BootSequence({ booting, reduceMotion }: { booting: boolean; reduceMotion: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: booting ? 1 : 0, pointerEvents: booting ? "auto" : "none" }}
      transition={{ duration: reduceMotion ? 0.15 : 0.85 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#03040a]"
      aria-hidden={!booting}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.65 }}
        className="w-[min(760px,92vw)] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
      >
        <p className="mb-3 text-xs tracking-[0.3em] text-cyan-200/70">AI IDENTITY INITIALIZATION</p>
        <div className="space-y-2 text-sm text-slate-300">
          <p>&gt; Loading cinematic interface kernel…</p>
          <p>&gt; Calibrating engineering + AI + security profile…</p>
          <p>&gt; Founder signal locked: SHUBHAM DESHMUKH</p>
        </div>
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-300 via-violet-300 to-indigo-300"
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: reduceMotion ? 0.2 : 2.1, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionStory({ scene, canAnimate }: { scene: Scene; canAnimate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 20%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -16]);

  return (
    <motion.article
      id={scene.id}
      ref={ref}
      style={canAnimate ? { opacity, y } : undefined}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10"
    >
      <p className="text-xs tracking-[0.3em] text-slate-300">{scene.label}</p>
      <h2 className="mt-3 text-2xl font-medium text-white md:text-4xl">{scene.title}</h2>
      <p className="mt-5 max-w-4xl text-slate-300">{scene.body}</p>
    </motion.article>
  );
}

function ProjectShowcase({ project, index, canAnimate }: { project: Project; index: number; canAnimate: boolean }) {
  return (
    <motion.article
      initial={canAnimate ? { opacity: 0, y: 26 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/72 p-6 md:p-8"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.2),transparent_35%)]" />
      <div className="relative z-10 grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs tracking-[0.25em] text-cyan-100/80">{project.subtitle}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white md:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-slate-200">{project.description}</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-black/35 p-4">
          <div className="mb-4 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((bar) => (
              <div key={`${project.title}-${bar}`} className="h-8 rounded-md border border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Hero({ canAnimate }: { canAnimate: boolean }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [portraitReady, setPortraitReady] = useState(true);

  const heroTiltStyle = useMemo(
    () => ({
      transform: `perspective(1100px) rotateX(${pointer.y * -2}deg) rotateY(${pointer.x * 2.4}deg)`,
    }),
    [pointer.x, pointer.y],
  );

  return (
    <section
      className="mx-auto grid min-h-[92vh] w-full max-w-6xl place-items-center px-4 py-20 md:px-8"
      onMouseMove={(event) => {
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth - 0.5) * 2;
        const y = (event.clientY / innerHeight - 0.5) * 2;
        setPointer({ x, y });
      }}
      id="home"
    >
      <motion.div
        initial={canAnimate ? { opacity: 0, y: 30 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        style={canAnimate ? heroTiltStyle : undefined}
        className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-7 shadow-[0_0_90px_rgba(76,29,149,0.28)] backdrop-blur-xl md:p-12"
      >
        {canAnimate ? (
          <div className="hidden lg:block">
            <HeroThreeCanvas />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.08)_50%,transparent)] [background-size:100%_4px] animate-[scanline_8s_linear_infinite]" />
        <div className="pointer-events-none absolute -inset-[30%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(103,232,249,0.18),rgba(167,139,250,0.18),transparent_60%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_15%,rgba(255,255,255,0.18),transparent_32%)]" />

        <div className="relative z-10 grid gap-8 md:grid-cols-[1.35fr_1fr] md:items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-slate-300">CINEMATIC PORTFOLIO EXPERIENCE</p>
            <motion.h1
              initial={canAnimate ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 text-4xl font-semibold leading-tight tracking-[0.04em] text-white md:text-7xl"
            >
              SHUBHAM DESHMUKH
            </motion.h1>
            <motion.p
              initial={canAnimate ? { opacity: 0, y: 14 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-5 max-w-3xl text-base text-slate-200 md:text-xl"
            >
              Full Stack Engineer · Agentic AI Developer · Cybersecurity Engineer
            </motion.p>
            <motion.p
              initial={canAnimate ? { opacity: 0, y: 14 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base"
            >
              Building intelligent products with founder-level execution, secure architecture, and immersive digital storytelling.
            </motion.p>
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
          </div>

          <motion.div
            initial={canAnimate ? { opacity: 0, scale: 0.96 } : false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-300/20 via-transparent to-violet-400/20 blur-sm" />
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/20 bg-[#090d1e]">
              {portraitReady ? (
                <Image
                  src="/image1.jpg"
                  alt="Portrait of Shubham Deshmukh"
                  className="h-[420px] w-full object-cover"
                  width={680}
                  height={840}
                  priority
                  onError={() => setPortraitReady(false)}
                />
              ) : (
                <div className="grid h-[420px] w-full place-items-center bg-[radial-gradient(circle_at_50%_25%,rgba(103,232,249,0.25),rgba(10,12,24,0.95)_62%)]">
                  <span className="text-4xl font-semibold tracking-[0.18em] text-cyan-100/85">SD</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.28),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.16)_55%,transparent)] [background-size:100%_5px]" />
              <motion.div
                initial={canAnimate ? { x: "-130%" } : false}
                animate={{ x: "130%" }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default function CinematicPortfolio() {
  const reduceMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("boot-sequence-complete") === "true";
    const duration = reduceMotion || alreadySeen ? 280 : 2500;
    const timeout = window.setTimeout(() => {
      setBooting(false);
      sessionStorage.setItem("boot-sequence-complete", "true");
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  const canAnimate = mounted && !reduceMotion;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05060d] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,40,217,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(99,102,241,0.12),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]" />

      <BootSequence booting={booting} reduceMotion={!!reduceMotion} />

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

      <main className="relative z-10">
        <Hero canAnimate={canAnimate} />

        <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-[220px_1fr] md:px-8">
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="mb-3 text-xs tracking-[0.24em] text-slate-300">SCENE FLOW</p>
              <ul className="space-y-2 text-sm text-slate-300">
                {storyScenes.map((scene) => (
                  <li key={scene.id}>
                    <a href={`#${scene.id}`} className="transition hover:text-white">
                      {scene.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-6">
            {storyScenes.map((scene) => (
              <SectionStory key={scene.id} scene={scene} canAnimate={canAnimate} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" id="project-showcases">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">PROJECT SHOWCASES</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Product modules</h2>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectShowcase key={project.title} project={project} index={index} canAnimate={canAnimate} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" id="skills-modules">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">SKILLS</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Premium capability modules</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={canAnimate ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-8" id="experience-timeline">
          <div className="mb-8">
            <p className="text-xs tracking-[0.3em] text-slate-300">EXPERIENCE</p>
            <h2 className="mt-3 text-3xl font-medium text-white md:text-5xl">Cinematic timeline</h2>
          </div>
          <div className="relative ml-4 space-y-6 border-l border-white/15 pl-8">
            {experience.map((item, index) => (
              <motion.article
                key={item.title}
                initial={canAnimate ? { opacity: 0, x: -16 } : false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
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

        <section className="mx-auto max-w-6xl px-4 py-16 pb-24 md:px-8" id="contact-command">
          <motion.div
            initial={canAnimate ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
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
