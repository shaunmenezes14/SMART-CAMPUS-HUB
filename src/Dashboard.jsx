import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarClock,
  MessagesSquare,
  BellRing,
  CalendarDays,
  Settings,
  LogOut,
  UserCircle,
  Search,
  Bell,
  MessageCircle,
  Moon,
  Sun,
  GraduationCap,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  ClipboardList,
  UserPlus,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ----------------------------------------------------------------
   Same brand palette as landing + login pages.
   Navy: #0B1D3A | Blue: #2563EB | Sky: #38BDF8 | Off-white: #F4F7FE
   ---------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Timetable", icon: CalendarClock },
  { label: "Faculty Consultation", icon: MessagesSquare },
  { label: "Notices", icon: BellRing },
  { label: "Academic Calendar", icon: CalendarDays },
  { label: "Profile", icon: UserCircle },
  { label: "Settings", icon: Settings },
];

const ATTENDANCE_DATA = [
  { day: "Mon", attendance: 92 },
  { day: "Tue", attendance: 88 },
  { day: "Wed", attendance: 95 },
  { day: "Thu", attendance: 90 },
  { day: "Fri", attendance: 97 },
  { day: "Sat", attendance: 85 },
];

const TODAYS_CLASSES = [
  { time: "9:00 AM", subject: "Data Structures", room: "Room 204" },
  { time: "11:00 AM", subject: "Operating Systems", room: "Room 108" },
  { time: "2:00 PM", subject: "Database Lab", room: "Lab 3" },
];

const UPCOMING_EVENTS = [
  { date: "Aug 12", title: "Mid-Sem Exam — CS301" },
  { date: "Aug 15", title: "Independence Day (Holiday)" },
  { date: "Aug 20", title: "Tech Fest Registrations Close" },
];
const UPCOMING_CONSULTATION = {
  faculty: "Prof. Meera Rao",
  subject: "Database Management Systems",
  date: "Aug 12, 2026",
  time: "3:30 PM",
  room: "Faculty Room 2",
};

const LATEST_NOTICES = [
  { title: "Library extended hours during exam week", date: "Aug 9" },
  { title: "Fee payment deadline extended to Aug 20", date: "Aug 8" },
  { title: "Tech Fest volunteer sign-ups open", date: "Aug 7" },
];
const NOTIFICATIONS = [
  { title: "New notice: Library timing update", time: "2h ago" },
  { title: "Faculty consultation slot confirmed", time: "5h ago" },
  { title: "Assignment 3 deadline extended", time: "1d ago" },
];

const RECENT_ACTIVITY = [
  { icon: CheckCircle2, text: "Marked present — Data Structures", time: "9:05 AM" },
  { icon: FileText, text: "Submitted Assignment 2 — OS", time: "Yesterday" },
  { icon: ClipboardList, text: "Booked consultation with Prof. Rao", time: "2 days ago" },
  { icon: UserPlus, text: "Joined Tech Fest committee group", time: "3 days ago" },
];

const QUICK_ACTIONS = [
  { label: "View Timetable", icon: CalendarClock },
  { label: "Book Consultation", icon: MessagesSquare },
  { label: "Download ID Card", icon: Download },
  { label: "Raise a Query", icon: MessageCircle },
];

// ---------- Small mini calendar (no external library) ----------

function MiniCalendar({ dark }) {
  const [cursor, setCursor] = useState(new Date());

  const { daysInMonth, firstDayIndex, today, monthLabel } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const now = new Date();
    return {
      daysInMonth: days,
      firstDayIndex: first.getDay(),
      today:
        now.getFullYear() === year && now.getMonth() === month
          ? now.getDate()
          : null,
      monthLabel: cursor.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [cursor]);

  const cells = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const changeMonth = (delta) =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));

  return (
    <div
      className={`rounded-2xl border p-5 ${
        dark ? "border-white/10 bg-white/5" : "border-[#0B1D3A]/8 bg-white"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className={`rounded-lg p-1.5 transition ${
            dark ? "hover:bg-white/10" : "hover:bg-[#0B1D3A]/5"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold">{monthLabel}</span>
        <button
          onClick={() => changeMonth(1)}
          className={`rounded-lg p-1.5 transition ${
            dark ? "hover:bg-white/10" : "hover:bg-[#0B1D3A]/5"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div
        className={`mb-2 grid grid-cols-7 text-center text-[11px] font-medium ${
          dark ? "text-white/40" : "text-[#5B6B8C]"
        }`}
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs">
        {cells.map((day, i) => (
          <span
            key={i}
            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
              day === today
                ? "bg-[#2563EB] font-semibold text-white"
                : day
                ? dark
                  ? "text-white/70"
                  : "text-[#0B1D3A]"
                : ""
            }`}
          >
            {day || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- Stat card ----------

function StatCard({ title, value, sub, icon: Icon, delay = 0, dark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        dark
          ? "border-white/10 bg-white/5 hover:bg-white/[0.07]"
          : "border-[#0B1D3A]/8 bg-white"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`text-xs font-medium uppercase tracking-wide ${
            dark ? "text-white/50" : "text-[#5B6B8C]"
          }`}
        >
          {title}
        </span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            dark ? "bg-[#2563EB]/20 text-[#38BDF8]" : "bg-[#2563EB]/10 text-[#2563EB]"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className={`mt-1 text-xs ${dark ? "text-white/40" : "text-[#5B6B8C]"}`}>
        {sub}
      </div>
    </motion.div>
  );
}

// ---------- Page ----------

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const bg = dark ? "bg-[#0B1D3A]" : "bg-[#F4F7FE]";
  const text = dark ? "text-white" : "text-[#0B1D3A]";
  const cardBorder = dark ? "border-white/10" : "border-[#0B1D3A]/8";
  const panelBg = dark ? "bg-white/5" : "bg-white";
  const subText = dark ? "text-white/50" : "text-[#5B6B8C]";

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${bg} ${text}`}>
      <div className="flex">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r p-5 transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : ""
          } ${dark ? "border-white/10 bg-[#0B1D3A]" : "border-[#0B1D3A]/8 bg-white"}`}
        >
          <div className="mb-8 flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Campus Hub</span>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ label, icon: Icon }) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                      : dark
                      ? "text-white/60 hover:bg-white/5 hover:text-white"
                      : "text-[#5B6B8C] hover:bg-[#0B1D3A]/5 hover:text-[#0B1D3A]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </nav>

          <button
            className={`absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              dark
                ? "text-white/60 hover:bg-white/5 hover:text-white"
                : "text-[#5B6B8C] hover:bg-[#0B1D3A]/5 hover:text-[#0B1D3A]"
            }`}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        {/* mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        {/* ---------------- MAIN ---------------- */}
        <div className="flex-1 lg:ml-64">
          {/* Topbar */}
          <header
            className={`sticky top-0 z-20 flex items-center justify-between gap-4 border-b px-5 py-4 backdrop-blur-md ${cardBorder} ${
              dark ? "bg-[#0B1D3A]/80" : "bg-white/80"
            }`}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 lg:hidden"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>

            <div className="relative hidden max-w-xs flex-1 sm:block">
              <Search
                className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${subText}`}
              />
              <input
                placeholder="Search..."
                className={`w-full rounded-xl border py-2 pl-9 pr-3 text-sm outline-none transition ${
                  dark
                    ? "border-white/10 bg-white/5 placeholder:text-white/30 focus:border-[#38BDF8]/50"
                    : "border-[#0B1D3A]/10 bg-[#F4F7FE] placeholder:text-[#5B6B8C]/60 focus:border-[#2563EB]/40"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setDark((d) => !d)}
                className={`rounded-lg p-2 transition ${
                  dark ? "hover:bg-white/10" : "hover:bg-[#0B1D3A]/5"
                }`}
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
              <button
                className={`relative rounded-lg p-2 transition ${
                  dark ? "hover:bg-white/10" : "hover:bg-[#0B1D3A]/5"
                }`}
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#38BDF8]" />
              </button>
              <button
                className={`hidden rounded-lg p-2 transition sm:block ${
                  dark ? "hover:bg-white/10" : "hover:bg-[#0B1D3A]/5"
                }`}
              >
                <MessageCircle className="h-4.5 w-4.5" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#0B1D3A] text-sm font-semibold text-white">
                S
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="space-y-6 p-5 sm:p-8">
            <div>
              <h1 className="font-display text-2xl font-bold">Welcome back, Shaun 👋</h1>
              <p className={`mt-1 text-sm ${subText}`}>
                Here's what's happening with your campus today.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Attendance"
                value="92%"
                sub="This semester"
                icon={TrendingUp}
                delay={0}
                dark={dark}
              />
              <StatCard
                title="Today's Classes"
                value={TODAYS_CLASSES.length}
                sub="Next at 9:00 AM"
                icon={CalendarClock}
                delay={0.05}
                dark={dark}
              />
              <StatCard
                title="Upcoming Events"
                value={UPCOMING_EVENTS.length}
                sub="Next in 4 days"
                icon={CalendarDays}
                delay={0.1}
                dark={dark}
              />
              <StatCard
                title="Notifications"
                value={NOTIFICATIONS.length}
                sub="1 unread"
                icon={BellRing}
                delay={0.15}
                dark={dark}
              />
            </div>

            {/* Two-column layout */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: chart + activity */}
              <div className="space-y-6 lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-base font-semibold">
                      Weekly Attendance
                    </h3>
                    <span className={`text-xs ${subText}`}>Last 6 days</span>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ATTENDANCE_DATA}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={dark ? "rgba(255,255,255,0.08)" : "#E5EAF5"}
                        />
                        <XAxis
                          dataKey="day"
                          tick={{ fontSize: 12, fill: dark ? "#94A3B8" : "#5B6B8C" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: dark ? "#94A3B8" : "#5B6B8C" }}
                          axisLine={false}
                          tickLine={false}
                          domain={[70, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: "none",
                            fontSize: 12,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="attendance"
                          stroke="#2563EB"
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: "#2563EB" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-4 font-display text-base font-semibold">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {RECENT_ACTIVITY.map(({ icon: Icon, text, time }, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            dark ? "bg-white/10 text-[#38BDF8]" : "bg-[#2563EB]/10 text-[#2563EB]"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">{text}</p>
                          <p className={`text-xs ${subText}`}>{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: calendar + quick actions + lists */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MiniCalendar dark={dark} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-3 font-display text-base font-semibold">
                    Upcoming Consultation
                  </h3>
                  <p className="text-sm font-medium">{UPCOMING_CONSULTATION.faculty}</p>
                  <p className={`text-xs ${subText}`}>{UPCOMING_CONSULTATION.subject}</p>
                  <p className={`mt-2 text-xs ${subText}`}>
                    {UPCOMING_CONSULTATION.date} · {UPCOMING_CONSULTATION.time} ·{" "}
                    {UPCOMING_CONSULTATION.room}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-3 font-display text-base font-semibold">
                    Latest Notices
                  </h3>
                  <div className="space-y-3">
                    {LATEST_NOTICES.map((n, i) => (
                      <div key={i} className="text-sm">
                        <p>{n.title}</p>
                        <p className={`text-xs ${subText}`}>{n.date}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-4 font-display text-base font-semibold">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center text-xs font-medium transition hover:-translate-y-0.5 ${
                          dark
                            ? "border-white/10 text-white/70 hover:bg-white/5"
                            : "border-[#0B1D3A]/8 text-[#5B6B8C] hover:bg-[#F4F7FE]"
                        }`}
                      >
                        <Icon className="h-5 w-5 text-[#2563EB]" />
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-4 font-display text-base font-semibold">
                    Today's Classes
                  </h3>
                  <div className="space-y-3">
                    {TODAYS_CLASSES.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <Clock className={`h-4 w-4 ${subText}`} />
                        <div>
                          <p className="font-medium">{c.subject}</p>
                          <p className={`text-xs ${subText}`}>
                            {c.time} · {c.room}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}