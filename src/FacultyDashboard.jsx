import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CalendarClock,
  CalendarCheck2,
  Inbox,
  BellRing,
  CalendarDays,
  UserCircle,
  Settings,
  LogOut,
  Search,
  Bell,
  MessageCircle,
  Moon,
  Sun,
  GraduationCap,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Timetable", icon: CalendarClock },
  { label: "Consultation Slots", icon: CalendarCheck2 },
  { label: "Consultation Requests", icon: Inbox },
  { label: "Notices", icon: BellRing },
  { label: "Academic Calendar", icon: CalendarDays },
  { label: "Profile", icon: UserCircle },
  { label: "Settings", icon: Settings },
];

const TODAYS_CLASSES = [
  { time: "9:00 AM", subject: "Database Management Systems", room: "Room 204", batch: "6th Sem CSE" },
  { time: "11:00 AM", subject: "Advanced Algorithms", room: "Room 108", batch: "8th Sem CSE" },
  { time: "2:00 PM", subject: "DBMS Lab", room: "Lab 3", batch: "6th Sem CSE" },
];

const UPCOMING_BOOKINGS = [
  { student: "Ananya Sharma", topic: "Project guidance - final year", date: "Aug 12", time: "3:30 PM" },
  { student: "Rohan Verma", topic: "Doubt: Normalization (DBMS)", date: "Aug 13", time: "11:00 AM" },
  { student: "Priya Nair", topic: "Internship recommendation letter", date: "Aug 14", time: "4:00 PM" },
];

const RECENT_NOTICES = [
  { title: "Faculty meeting rescheduled to Aug 15", date: "Aug 9" },
  { title: "Mid-sem question papers due Aug 18", date: "Aug 8" },
  { title: "New library resource portal live", date: "Aug 6" },
];

const UPCOMING_EVENTS = [
  { date: "Aug 12", title: "Mid-Sem Exams Begin" },
  { date: "Aug 15", title: "Independence Day (Holiday)" },
  { date: "Aug 22", title: "Faculty Development Program" },
];

const INITIAL_SLOTS = [
  { id: 1, day: "Monday", start: "3:00 PM", end: "4:00 PM", status: "available" },
  { id: 2, day: "Wednesday", start: "11:00 AM", end: "12:00 PM", status: "booked" },
  { id: 3, day: "Thursday", start: "2:00 PM", end: "3:00 PM", status: "available" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

function AvailabilityManager({ dark, cardBorder, panelBg, subText }) {
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [day, setDay] = useState(DAYS[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  const addSlot = () => {
    if (!start.trim() || !end.trim()) {
      setError("Please enter both a start and end time.");
      return;
    }
    setError("");
    setSlots((prev) => [
      ...prev,
      { id: Date.now(), day, start: start.trim(), end: end.trim(), status: "available" },
    ]);
    setStart("");
    setEnd("");
  };

  const removeSlot = (id) => setSlots((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}>
      <h3 className="mb-4 font-display text-base font-semibold">
        Manage Consultation Availability
      </h3>

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={`rounded-xl border px-3 py-2.5 text-sm outline-none ${
            dark
              ? "border-white/10 bg-white/5 text-white"
              : "border-[#0B1D3A]/10 bg-[#F4F7FE] text-[#0B1D3A]"
          }`}
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="Start (e.g. 3:00 PM)"
          className={`rounded-xl border px-3 py-2.5 text-sm outline-none placeholder:text-current placeholder:opacity-40 ${
            dark
              ? "border-white/10 bg-white/5 text-white"
              : "border-[#0B1D3A]/10 bg-[#F4F7FE] text-[#0B1D3A]"
          }`}
        />
        <input
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="End (e.g. 4:00 PM)"
          className={`rounded-xl border px-3 py-2.5 text-sm outline-none placeholder:text-current placeholder:opacity-40 ${
            dark
              ? "border-white/10 bg-white/5 text-white"
              : "border-[#0B1D3A]/10 bg-[#F4F7FE] text-[#0B1D3A]"
          }`}
        />
        <button
          onClick={addSlot}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E4FCC]"
        >
          <Plus className="h-4 w-4" />
          Add Slot
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="space-y-2.5">
        <AnimatePresence>
          {slots.map((slot) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                dark ? "border-white/10" : "border-[#0B1D3A]/8"
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className={`h-4 w-4 ${subText}`} />
                <span className="font-medium">{slot.day}</span>
                <span className={subText}>
                  {slot.start} - {slot.end}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    slot.status === "booked"
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {slot.status === "booked" ? (
                    <XCircle className="h-3.5 w-3.5" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                  {slot.status === "booked" ? "Booked" : "Available"}
                </span>
                <button
                  onClick={() => removeSlot(slot.id)}
                  className={`rounded-lg p-1.5 transition ${
                    dark ? "hover:bg-white/10" : "hover:bg-red-50"
                  }`}
                  aria-label="Remove slot"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function FacultyDashboard() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const bg = dark ? "bg-[#0B1D3A]" : "bg-[#F4F7FE]";
  const text = dark ? "text-white" : "text-[#0B1D3A]";
  const cardBorder = dark ? "border-white/10" : "border-[#0B1D3A]/8";
  const panelBg = dark ? "bg-white/5" : "bg-white";
  const subText = dark ? "text-white/50" : "text-[#5B6B8C]";

  const availableCount = INITIAL_SLOTS.filter((s) => s.status === "available").length;

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${bg} ${text}`}>
      <div className="flex">
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

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          />
        )}

        <div className="flex-1 lg:ml-64">
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
                P
              </div>
            </div>
          </header>

          <main className="space-y-6 p-5 sm:p-8">
            <div>
              <h1 className="font-display text-2xl font-bold">
                Welcome back, Prof. Meera Rao
              </h1>
              <p className={`mt-1 text-sm ${subText}`}>
                Here's your teaching and consultation overview for today.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Today's Classes"
                value={TODAYS_CLASSES.length}
                sub="Next at 9:00 AM"
                icon={CalendarClock}
                delay={0}
                dark={dark}
              />
              <StatCard
                title="Upcoming Bookings"
                value={UPCOMING_BOOKINGS.length}
                sub="Next in 2 days"
                icon={CalendarCheck2}
                delay={0.05}
                dark={dark}
              />
              <StatCard
                title="Available Slots"
                value={availableCount}
                sub="This week"
                icon={Clock}
                delay={0.1}
                dark={dark}
              />
              <StatCard
                title="Notices"
                value={RECENT_NOTICES.length}
                sub="1 new today"
                icon={BellRing}
                delay={0.15}
                dark={dark}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-4 font-display text-base font-semibold">
                    Today's Classes
                  </h3>
                  <div className="space-y-3">
                    {TODAYS_CLASSES.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <Clock className={`h-4 w-4 ${subText}`} />
                          <div>
                            <p className="font-medium">{c.subject}</p>
                            <p className={`text-xs ${subText}`}>
                              {c.time} - {c.room} - {c.batch}
                            </p>
                          </div>
                        </div>
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
                    Upcoming Consultation Bookings
                  </h3>
                  <div className="space-y-4">
                    {UPCOMING_BOOKINGS.map((b, i) => (
                      <div key={i} className="flex items-start justify-between text-sm">
                        <div>
                          <p className="font-medium">{b.student}</p>
                          <p className={`text-xs ${subText}`}>{b.topic}</p>
                        </div>
                        <span className={`whitespace-nowrap text-xs ${subText}`}>
                          {b.date} - {b.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <AvailabilityManager
                    dark={dark}
                    cardBorder={cardBorder}
                    panelBg={panelBg}
                    subText={subText}
                  />
                </motion.div>
              </div>

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
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-3 font-display text-base font-semibold">
                    Recent Notices
                  </h3>
                  <div className="space-y-3">
                    {RECENT_NOTICES.map((n, i) => (
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
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
                >
                  <h3 className="mb-3 font-display text-base font-semibold">
                    Upcoming Academic Events
                  </h3>
                  <div className="space-y-3">
                    {UPCOMING_EVENTS.map((e, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <CalendarDays className={`h-4 w-4 ${subText}`} />
                        <div>
                          <p className="font-medium">{e.title}</p>
                          <p className={`text-xs ${subText}`}>{e.date}</p>
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