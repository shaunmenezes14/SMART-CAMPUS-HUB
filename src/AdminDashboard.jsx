import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap as FacultyIcon,
  Building2,
  BookOpen,
  DoorOpen,
  CalendarClock,
  BellRing,
  CalendarDays,
  FileBarChart2,
  Settings,
  LogOut,
  Search,
  Bell,
  MessageCircle,
  Moon,
  Sun,
  GraduationCap,
  Filter,
} from "lucide-react";

/* ----------------------------------------------------------------
   Same brand palette as the rest of Campus Hub.
   Navy: #0B1D3A | Blue: #2563EB | Sky: #38BDF8 | Off-white: #F4F7FE
   ---------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Students", icon: Users },
  { label: "Faculty", icon: FacultyIcon },
  { label: "Departments", icon: Building2 },
  { label: "Subjects", icon: BookOpen },
  { label: "Rooms", icon: DoorOpen },
  { label: "Timetable", icon: CalendarClock },
  { label: "Notices", icon: BellRing },
  { label: "Academic Calendar", icon: CalendarDays },
  { label: "Reports", icon: FileBarChart2 },
  { label: "Settings", icon: Settings },
];

const SUMMARY = {
  students: 10482,
  faculty: 512,
  departments: 8,
  subjects: 146,
  rooms: 64,
  upcomingEvents: 5,
};

const DEPARTMENTS = ["All", "CSE", "ISE", "ECE", "Mechanical", "Civil", "MBA"];

const STUDENTS = [
  { name: "Ananya Sharma", roll: "1CS21CS001", dept: "CSE", sem: 6, attendance: 92, status: "Active" },
  { name: "Rohan Verma", roll: "1CS21CS014", dept: "CSE", sem: 6, attendance: 78, status: "Active" },
  { name: "Priya Nair", roll: "1IS21IS022", dept: "ISE", sem: 8, attendance: 95, status: "Active" },
  { name: "Kiran Patil", roll: "1EC21EC009", dept: "ECE", sem: 4, attendance: 65, status: "Warning" },
  { name: "Sneha Reddy", roll: "1ME21ME031", dept: "Mechanical", sem: 6, attendance: 88, status: "Active" },
  { name: "Arjun Gowda", roll: "1CV21CV017", dept: "Civil", sem: 4, attendance: 55, status: "Warning" },
  { name: "Meera Iyer", roll: "1CS21CS045", dept: "CSE", sem: 8, attendance: 97, status: "Active" },
  { name: "Vikram Singh", roll: "1IS21IS008", dept: "ISE", sem: 6, attendance: 73, status: "Active" },
];

const UPCOMING_EVENTS = [
  { date: "Aug 12", title: "Mid-Sem Exams Begin", audience: "All Departments" },
  { date: "Aug 15", title: "Independence Day (Holiday)", audience: "Campus-wide" },
  { date: "Aug 20", title: "Placement Drive — Infosys", audience: "8th Sem" },
  { date: "Aug 22", title: "Faculty Development Program", audience: "All Faculty" },
  { date: "Aug 28", title: "Tech Fest Committee Meeting", audience: "Organizers" },
];

// ---------- Stat card ----------

function StatCard({ title, value, icon: Icon, delay = 0, dark }) {
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
      <div className="font-display text-2xl font-bold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </motion.div>
  );
}

// ---------- Page ----------

export default function AdminDashboard() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const bg = dark ? "bg-[#0B1D3A]" : "bg-[#F4F7FE]";
  const text = dark ? "text-white" : "text-[#0B1D3A]";
  const cardBorder = dark ? "border-white/10" : "border-[#0B1D3A]/8";
  const panelBg = dark ? "bg-white/5" : "bg-white";
  const subText = dark ? "text-white/50" : "text-[#5B6B8C]";
  const rowBorder = dark ? "border-white/5" : "border-[#0B1D3A]/5";

  const filteredStudents = useMemo(() => {
    return STUDENTS.filter((s) => {
      const matchesDept = deptFilter === "All" || s.dept === deptFilter;
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.roll.toLowerCase().includes(query.toLowerCase());
      return matchesDept && matchesQuery;
    });
  }, [query, deptFilter]);

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 ${bg} ${text}`}>
      <div className="flex">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 -translate-x-full overflow-y-auto border-r p-5 transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : ""
          } ${dark ? "border-white/10 bg-[#0B1D3A]" : "border-[#0B1D3A]/8 bg-white"}`}
        >
          <div className="mb-8 flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Campus Hub</span>
          </div>

          <nav className="space-y-1 pb-16">
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
                A
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="space-y-6 p-5 sm:p-8">
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
              <p className={`mt-1 text-sm ${subText}`}>
                Campus-wide snapshot for administrators.
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard title="Total Students" value={SUMMARY.students} icon={Users} delay={0} dark={dark} />
              <StatCard title="Total Faculty" value={SUMMARY.faculty} icon={FacultyIcon} delay={0.04} dark={dark} />
              <StatCard title="Departments" value={SUMMARY.departments} icon={Building2} delay={0.08} dark={dark} />
              <StatCard title="Subjects" value={SUMMARY.subjects} icon={BookOpen} delay={0.12} dark={dark} />
              <StatCard title="Rooms" value={SUMMARY.rooms} icon={DoorOpen} delay={0.16} dark={dark} />
              <StatCard title="Upcoming Events" value={SUMMARY.upcomingEvents} icon={CalendarDays} delay={0.2} dark={dark} />
            </div>

            {/* Two-column layout */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: table with filters */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className={`rounded-2xl border p-5 lg:col-span-2 ${cardBorder} ${panelBg}`}
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-base font-semibold">
                    Student Records
                  </h3>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                      <Search
                        className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${subText}`}
                      />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name or roll no..."
                        className={`w-full rounded-lg border py-2 pl-8 pr-3 text-xs outline-none sm:w-52 ${
                          dark
                            ? "border-white/10 bg-white/5 placeholder:text-white/30"
                            : "border-[#0B1D3A]/10 bg-[#F4F7FE] placeholder:text-[#5B6B8C]/60"
                        }`}
                      />
                    </div>
                    <div className="relative">
                      <Filter
                        className={`pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${subText}`}
                      />
                      <select
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                        className={`w-full appearance-none rounded-lg border py-2 pl-8 pr-6 text-xs outline-none sm:w-36 ${
                          dark
                            ? "border-white/10 bg-white/5 text-white"
                            : "border-[#0B1D3A]/10 bg-[#F4F7FE] text-[#0B1D3A]"
                        }`}
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr
                        className={`border-b text-xs uppercase tracking-wide ${rowBorder} ${subText}`}
                      >
                        <th className="py-2.5 pr-4 font-medium">Name</th>
                        <th className="py-2.5 pr-4 font-medium">Roll No</th>
                        <th className="py-2.5 pr-4 font-medium">Dept</th>
                        <th className="py-2.5 pr-4 font-medium">Sem</th>
                        <th className="py-2.5 pr-4 font-medium">Attendance</th>
                        <th className="py-2.5 pr-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((s, i) => (
                        <tr key={i} className={`border-b last:border-0 ${rowBorder}`}>
                          <td className="py-3 pr-4 font-medium">{s.name}</td>
                          <td className={`py-3 pr-4 ${subText}`}>{s.roll}</td>
                          <td className={`py-3 pr-4 ${subText}`}>{s.dept}</td>
                          <td className={`py-3 pr-4 ${subText}`}>{s.sem}</td>
                          <td className={`py-3 pr-4 ${subText}`}>{s.attendance}%</td>
                          <td className="py-3 pr-4">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                s.status === "Warning"
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "bg-emerald-500/10 text-emerald-500"
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={6} className={`py-6 text-center text-sm ${subText}`}>
                            No students match your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Right: upcoming events */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`rounded-2xl border p-5 ${cardBorder} ${panelBg}`}
              >
                <h3 className="mb-4 font-display text-base font-semibold">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {UPCOMING_EVENTS.map((e, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div
                        className={`flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg text-[10px] font-semibold ${
                          dark ? "bg-white/10 text-[#38BDF8]" : "bg-[#2563EB]/10 text-[#2563EB]"
                        }`}
                      >
                        {e.date}
                      </div>
                      <div>
                        <p className="font-medium">{e.title}</p>
                        <p className={`text-xs ${subText}`}>{e.audience}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}