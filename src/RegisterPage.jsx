import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  CalendarClock,
  BellRing,
  IdCard,
  Building2,
  Layers,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  LogIn,
} from "lucide-react";

const DEPARTMENTS = ["CSE", "ISE", "ECE", "Mechanical", "Civil", "MBA"];
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
const SECTIONS = ["A", "B", "C", "D"];
const DESIGNATIONS = ["Assistant Professor", "Associate Professor", "Professor", "HOD"];

const ROLES = [
  { key: "student", label: "Student", icon: User },
  { key: "faculty", label: "Faculty", icon: Users },
  { key: "admin", label: "Admin", icon: ShieldCheck },
];

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#0B1D3A]">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
          >
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconInput({ icon: Icon, error, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]" />
      <input
        {...props}
        className={`w-full rounded-xl border bg-white/80 py-3 pl-10 pr-4 text-sm text-[#0B1D3A] outline-none transition placeholder:text-[#5B6B8C]/60 focus:ring-2 focus:ring-[#2563EB]/30 ${
          error ? "border-red-400" : "border-[#0B1D3A]/10 focus:border-[#2563EB]"
        }`}
      />
    </div>
  );
}

function IconSelect({ icon: Icon, error, children, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]" />
      <select
        {...props}
        className={`w-full appearance-none rounded-xl border bg-white/80 py-3 pl-10 pr-4 text-sm text-[#0B1D3A] outline-none transition focus:ring-2 focus:ring-[#2563EB]/30 ${
          error ? "border-red-400" : "border-[#0B1D3A]/10 focus:border-[#2563EB]"
        }`}
      >
        {children}
      </select>
    </div>
  );
}

function PasswordField({ label, value, onChange, error, show, onToggleShow }) {
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6B8C]" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="********"
          className={`w-full rounded-xl border bg-white/80 py-3 pl-10 pr-11 text-sm text-[#0B1D3A] outline-none transition placeholder:text-[#5B6B8C]/60 focus:ring-2 focus:ring-[#2563EB]/30 ${
            error ? "border-red-400" : "border-[#0B1D3A]/10 focus:border-[#2563EB]"
          }`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6B8C] transition hover:text-[#2563EB]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  );
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const score = getStrength(password);
  const levels = [
    { label: "Very weak", color: "bg-red-400" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-amber-400" },
    { label: "Good", color: "bg-amber-400" },
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Very strong", color: "bg-emerald-500" },
  ];
  const current = levels[Math.min(score, levels.length - 1)];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < score ? current.color : "bg-[#0B1D3A]/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-[#5B6B8C]">{current.label}</p>
    </div>
  );
}

function SidePanel() {
  return (
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
          Join your campus, digitally.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
          Create your account to access timetables, faculty consultations,
          notices, and more, all in one place.
        </p>
      </motion.div>
    </div>
  );
}

function StudentForm({ onSubmit, loading }) {
  const [fullName, setFullName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [semester, setSemester] = useState(SEMESTERS[0]);
  const [section, setSection] = useState(SECTIONS[0]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!usn.trim()) next.usn = "USN is required for students.";
    if (!email.trim()) next.email = "College email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <Field label="Full Name" error={errors.fullName}>
        <IconInput
          icon={User}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          error={errors.fullName}
        />
      </Field>

      <Field label="USN" error={errors.usn}>
        <IconInput
          icon={IdCard}
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          placeholder="e.g. 1CS21CS001"
          error={errors.usn}
        />
      </Field>

      <Field label="College Email" error={errors.email}>
        <IconInput
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@college.edu"
          error={errors.email}
        />
      </Field>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Department">
          <IconSelect icon={Building2} value={department} onChange={(e) => setDepartment(e.target.value)}>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </IconSelect>
        </Field>
        <Field label="Semester">
          <IconSelect icon={Layers} value={semester} onChange={(e) => setSemester(e.target.value)}>
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </IconSelect>
        </Field>
        <Field label="Section">
          <IconSelect icon={Users} value={section} onChange={(e) => setSection(e.target.value)}>
            {SECTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </IconSelect>
        </Field>
      </div>

      <div>
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          show={showPassword}
          onToggleShow={() => setShowPassword((v) => !v)}
        />
        <PasswordStrengthMeter password={password} />
      </div>

      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        show={showPassword}
        onToggleShow={() => setShowPassword((v) => !v)}
      />

      <SubmitButton loading={loading} label="Register as Student" />
    </form>
  );
}

function FacultyForm({ onSubmit, loading }) {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [designation, setDesignation] = useState(DESIGNATIONS[0]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!employeeId.trim()) next.employeeId = "Employee ID is required for faculty.";
    if (!email.trim()) next.email = "College email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (confirmPassword !== password)
      next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <Field label="Full Name" error={errors.fullName}>
        <IconInput
          icon={User}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          error={errors.fullName}
        />
      </Field>

      <Field label="Employee ID" error={errors.employeeId}>
        <IconInput
          icon={IdCard}
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="e.g. FAC2026014"
          error={errors.employeeId}
        />
      </Field>

      <Field label="College Email" error={errors.email}>
        <IconInput
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@college.edu"
          error={errors.email}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Department">
          <IconSelect icon={Building2} value={department} onChange={(e) => setDepartment(e.target.value)}>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </IconSelect>
        </Field>
        <Field label="Designation">
          <IconSelect icon={ShieldCheck} value={designation} onChange={(e) => setDesignation(e.target.value)}>
            {DESIGNATIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </IconSelect>
        </Field>
      </div>

      <div>
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          show={showPassword}
          onToggleShow={() => setShowPassword((v) => !v)}
        />
        <PasswordStrengthMeter password={password} />
      </div>

      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        show={showPassword}
        onToggleShow={() => setShowPassword((v) => !v)}
      />

      <SubmitButton loading={loading} label="Register as Faculty" />
    </form>
  );
}

function AdminNotice() {
  const navigate = useNavigate();
  return (
    <div className="mt-6 rounded-2xl border border-amber-300/50 bg-amber-50 p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
        <ShieldAlert className="h-6 w-6 text-amber-600" />
      </div>
      <p className="text-sm font-medium text-[#0B1D3A]">
        Admin accounts are created by an authorized administrator.
      </p>
      <p className="mt-1.5 text-sm text-[#5B6B8C]">
        Self-registration isn't available for this role. If you already have
        admin credentials, log in below.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#1E4FCC]"
      >
        <LogIn className="h-4 w-4" />
        Admin Login
      </button>
    </div>
  );
}

function SubmitButton({ loading, label }) {
  return (
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
            Creating account...
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {label}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1400);
    }, 1600);
  };

  return (
    <div className="grid min-h-screen font-body lg:grid-cols-2">
      <SidePanel />

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
            Create your account
          </h2>
          <p className="mt-1.5 text-sm text-[#5B6B8C]">
            Choose your role to get started.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {ROLES.map(({ key, label, icon: Icon }) => {
              const active = role === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setRole(key);
                    setSuccess(false);
                  }}
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

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Account created. Redirecting to login...
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              {role === "student" && (
                <StudentForm onSubmit={handleSubmit} loading={loading} />
              )}
              {role === "faculty" && (
                <FacultyForm onSubmit={handleSubmit} loading={loading} />
              )}
              {role === "admin" && <AdminNotice />}
            </motion.div>
          </AnimatePresence>

          {role !== "admin" && (
            <p className="mt-6 text-center text-sm text-[#5B6B8C]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#2563EB] hover:underline">
                Log in
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}