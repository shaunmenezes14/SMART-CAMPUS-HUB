import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  LogIn,
  CalendarClock,
  MessagesSquare,
  BellRing,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

function CountUp({ end, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();
  const isDecimal = !Number.isInteger(end);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(end);
      return;
    }
    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setValue(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration, reduceMotion, isDecimal]);

  return (
    <span ref={ref} className="font-mono">
      {isDecimal ? value.toFixed(1) : value.toLocaleString()}
      {suffix}
    </span>
  );
}

function HubNetwork() {
  const reduceMotion = useReducedMotion();

  const nodes = [
    { label: "Timetable", angle: -55, icon: CalendarClock },
    { label: "Consultation", angle: 35, icon: MessagesSquare },
    { label: "Notice Board", angle: 145, icon: BellRing },
    { label: "VTU Calendar", angle: 215, icon: CalendarDays },
  ];

  const radius = 150;

  return (
    <div className="relative mx-auto flex h-[380px] w-[380px] items-center justify-center sm:h-[440px] sm:w-[440px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 440 440"
        fill="none"
      >
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x2 = 220 + radius * Math.cos(rad);
          const y2 = 220 + radius * Math.sin(rad);
          return (
            <motion.line
              key={n.label}
              x1="220"
              y1="220"
              x2={x2}
              y2={y2}
              stroke="#93C5FD"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.15 }}
            />
          );
        })}
      </svg>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#0B1D3A] text-white shadow-[0_0_40px_rgba(37,99,235,0.45)] sm:h-36 sm:w-36"
      >
        <GraduationCap className="mb-1 h-8 w-8" />
        <span className="text-xs font-semibold tracking-wide">Campus Hub</span>
      </motion.div>

      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);
        const Icon = n.icon;
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: reduceMotion ? y : [y - 6, y + 6, y - 6],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
              scale: { duration: 0.5, delay: 0.6 + i * 0.15 },
              y: reduceMotion
                ? { duration: 0 }
                : {
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              x,
              marginLeft: -56,
              marginTop: -34,
            }}
            className="z-10 flex w-28 flex-col items-center gap-1.5 rounded-xl border border-white/60 bg-white/70 px-2 py-2.5 text-center shadow-lg backdrop-blur-md"
          >
            <Icon className="h-5 w-5 text-[#2563EB]" />
            <span className="text-[11px] font-medium leading-tight text-[#0B1D3A]">
              {n.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold text-[#0B1D3A]">
            Campus Hub
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#5B6B8C] md:flex">
          <a href="#features" className="transition hover:text-[#2563EB]">
            Features
          </a>
          <a href="#stats" className="transition hover:text-[#2563EB]">
            About
          </a>
          <a href="#footer" className="transition hover:text-[#2563EB]">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-[#0B1D3A] transition hover:bg-[#0B1D3A]/5 sm:flex">
            <LogIn className="h-4 w-4" />
            Login
          </button>
          <button className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1E4FCC]">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F4F7FE] pt-32 sm:pt-40">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#38BDF8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#2563EB] backdrop-blur-sm">
            One platform, every campus system
          </span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] text-[#0B1D3A] sm:text-6xl">
            Campus Hub
          </h1>
          <h2 className="mt-3 font-display text-2xl font-semibold text-[#2563EB] sm:text-3xl">
            Smart Digital Platform for Campus Management
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5B6B8C] sm:text-lg">
            Timetables, faculty consultations, notices, and academic calendars unified into one clean dashboard so students and staff spend less time searching and more time doing.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button className="group flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-[#1E4FCC]">
              Get Started
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[#0B1D3A]/15 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#0B1D3A] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#2563EB]/40">
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center"
        >
          <HubNetwork />
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { end: 10000, suffix: "+", label: "Students" },
    { end: 500, suffix: "+", label: "Faculty" },
    { end: 50, suffix: "+", label: "Departments" },
    { end: 99.9, suffix: "%", label: "Uptime" },
  ];

  return (
    <section id="stats" className="relative bg-[#F4F7FE] px-6 pb-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/60 p-10 shadow-xl shadow-blue-900/5 backdrop-blur-md sm:p-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-mono text-3xl font-bold text-[#0B1D3A] sm:text-4xl">
                <CountUp end={s.end} suffix={s.suffix} duration={1.4} />
              </div>
              <div className="mt-2 text-sm font-medium text-[#5B6B8C]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: CalendarClock,
      title: "Automated Timetable",
      desc: "Conflict-free schedules generated automatically and kept in sync for every department.",
    },
    {
      icon: MessagesSquare,
      title: "Faculty Consultation",
      desc: "Book consultation slots with professors directly, no more waiting outside office doors.",
    },
    {
      icon: BellRing,
      title: "Notice Board",
      desc: "Every campus announcement in one feed, filtered by department and relevance.",
    },
    {
      icon: CalendarDays,
      title: "VTU Calendar",
      desc: "Academic deadlines, exam dates, and holidays synced straight from the university calendar.",
    },
  ];

  return (
    <section id="features" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#2563EB]">
            What's inside
          </span>
          <h3 className="mt-3 font-display text-3xl font-bold text-[#0B1D3A] sm:text-4xl">
            Everything campus life needs, in one place
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-[#0B1D3A]/8 bg-gradient-to-b from-white to-[#F4F7FE] p-7 shadow-sm transition hover:shadow-xl hover:shadow-blue-900/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-display text-lg font-semibold text-[#0B1D3A]">
                  {f.title}
                </h4>
                <p className="text-sm leading-relaxed text-[#5B6B8C]">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "About",
      links: ["Our Mission", "How It Works", "For Institutions"],
    },
    {
      title: "Contact",
      links: ["support@campushub.edu", "+91 00000 00000", "Help Center"],
    },
    {
      title: "Privacy",
      links: ["Privacy Policy", "Terms of Service", "Data Security"],
    },
  ];

  const socials = [
    { label: "X", href: "#" },
    { label: "IG", href: "#" },
    { label: "in", href: "#" },
    { label: "FB", href: "#" },
  ];

  return (
    <footer id="footer" className="bg-[#0B1D3A] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold">Campus Hub</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Smart digital platform for campus management.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href }, i) => (
                
                 <a key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold transition hover:bg-[#2563EB]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/90">
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    
                     <a href="#"
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Campus Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function CampusHubLanding() {
  return (
    <div className="font-body min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </div>
  );
}