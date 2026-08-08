import React, { useState } from "react";
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
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
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
            <div