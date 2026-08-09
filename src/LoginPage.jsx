import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  GraduationCap,
  User,
  Users,
  ShieldCheck,
  ArrowRight,
  CalendarClock,
  BellRing,
} from "lucide-react";

const ROLES = [
  { key: "student", label: "Student", icon: User },
  { key: "faculty", label: "Faculty", icon: Users },
  { key: "admin", label: "Admin", icon: ShieldCheck },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "College email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(role === "faculty" ? "/faculty-dashboard" : "/dashboard", { state: { role } });
    }, 1600);
  };

  return (
    <div className="grid min-h-screen font-body lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#0B1D3A] via-[#12295C] to-[#2563EB] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#38BDF8]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#2563EB]/30 blur-3xl" />

        <div className="relative z-10 flex items-center gap-2 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">Campus Hub</span>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex h-64 w-64 items-center justify-center"
          >
            <div className="absolute h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute h-44 w-44 rounded-full border border-white/10" />

            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
            >
              <CalendarClock className="h-6 w-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 bottom-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
            >
              <BellRing className="h-6 w-6 text-white" />
            </motion.div>

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 shadow-[0_0_60px_rgba(56,189,248,0.35)] backdrop-blur-md">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-white"
        >
          <h1 className="font-display text-3xl font-bold leading-tight">
            Welcome back to your campus, online.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Sign in to check your timetable, notices, and faculty consultations all from one dashboard.
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center bg-[#F4F7FE] px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-blue-900/10 backdrop-blur-xl sm:p-10"
        >
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold text-[#0B1D3A]">
              Campus Hub
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold text-[#0B1D3A]">
            Sign in to your account
          </h2>
          <p className="mt-1.5 text-sm text-[#5B6B8C]">
            Choose your role and enter your details.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {ROLES.map(({ key, label, icon: Icon }) => {
              const active = role === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRole(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                    active
                      ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                      : "border-[#0B1D3A]/10 bg-white/60 text-[#5B6B8C] hover:border-[#2563EB]/30"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0B1D3A]">
                College Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@college.edu"
                  className={`w-full rounded-xl border bg-white/80 py-3 pl-10 pr-4 text-sm text-[#0B1D3A] outline-none transition placeholder:text-[#5B6B8C]/60 focus:ring-2 focus:ring-[#2563EB]/30 ${
                    errors.email ? "border-red-400" : "border-[#0B1D3A]/10 focus:border-[#2563EB]"
                  }`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 text-xs font-medium text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0B1D3A]">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className={`w-full rounded-xl border bg-white/80 py-3 pl-10 pr-11 text-sm text-[#0B1D3A] outline-none transition placeholder:text-[#5B6B8C]/60 focus:ring-2 focus:ring-[#2563EB]/30 ${
                    errors.password ? "border-red-400" : "border-[#0B1D3A]/10 focus:border-[#2563EB]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6B8C] transition hover:text-[#2563EB]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1.5 text-xs font-medium text-red-500"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex items-center gap-2 text-[#5B6B8C]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#0B1D3A]/20 text-[#2563EB] focus:ring-[#2563EB]/30"
                />
                Remember me
              </label>
              <a href="#" className="font-medium text-[#2563EB] hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-[#1E4FCC] disabled:cursor-not-allowed disabled:opacity-80"
            >
              <AnimatePresence mode="wait" initial={false}>
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </motion.span>
                ) : success ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Signed in
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Login as {ROLES.find((r) => r.key === role)?.label}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-3 pt-1">
              <div className="h-px flex-1 bg-[#0B1D3A]/10" />
              <span className="text-xs font-medium text-[#5B6B8C]">or</span>
              <div className="h-px flex-1 bg-[#0B1D3A]/10" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#0B1D3A]/10 bg-white py-3.5 text-sm font-semibold text-[#0B1D3A] transition hover:-translate-y-0.5 hover:border-[#2563EB]/30"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#34A853] text-[10px] font-bold text-white">
                G
              </span>
              Login with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#5B6B8C]">
            New here?{" "}
            <a href="#" className="font-semibold text-[#2563EB] hover:underline">
              Contact your admin
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}