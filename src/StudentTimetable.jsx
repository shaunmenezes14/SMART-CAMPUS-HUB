import React from "react";
import { motion } from "framer-motion";
import { CalendarClock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = [
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 1:00",
  "1:00 - 2:00",
  "2:00 - 3:00",
  "3:00 - 4:00",
];

const SCHEDULE = {
  "Monday|9:00 - 10:00": { subject: "Data Structures", faculty: "Prof. Meera Rao", room: "204" },
  "Monday|10:00 - 11:00": { subject: "Operating Systems", faculty: "Prof. A. Kulkarni", room: "108" },
  "Monday|12:00 - 1:00": { lunch: true },
  "Monday|1:00 - 2:00": { subject: "DBMS Lab", faculty: "Prof. Meera Rao", room: "Lab 3" },

  "Tuesday|9:00 - 10:00": { subject: "Discrete Mathematics", faculty: "Prof. S. Iyer", room: "201" },
  "Tuesday|11:00 - 12:00": { subject: "Data Structures", faculty: "Prof. Meera Rao", room: "204" },
  "Tuesday|12:00 - 1:00": { lunch: true },
  "Tuesday|2:00 - 3:00": { subject: "Operating Systems", faculty: "Prof. A. Kulkarni", room: "108" },

  "Wednesday|9:00 - 10:00": { subject: "Computer Networks", faculty: "Prof. R. Nair", room: "210" },
  "Wednesday|10:00 - 11:00": { subject: "Data Structures", faculty: "Prof. Meera Rao", room: "204" },
  "Wednesday|12:00 - 1:00": { lunch: true },
  "Wednesday|1:00 - 2:00": { subject: "OS Lab", faculty: "Prof. A. Kulkarni", room: "Lab 1" },

  "Thursday|10:00 - 11:00": { subject: "Discrete Mathematics", faculty: "Prof. S. Iyer", room: "201" },
  "Thursday|11:00 - 12:00": { subject: "Computer Networks", faculty: "Prof. R. Nair", room: "210" },
  "Thursday|12:00 - 1:00": { lunch: true },
  "Thursday|2:00 - 3:00": { subject: "Operating Systems", faculty: "Prof. A. Kulkarni", room: "108" },

  "Friday|9:00 - 10:00": { subject: "Data Structures", faculty: "Prof. Meera Rao", room: "204" },
  "Friday|12:00 - 1:00": { lunch: true },
  "Friday|1:00 - 2:00": { subject: "Computer Networks", faculty: "Prof. R. Nair", room: "210" },

  "Saturday|9:00 - 10:00": { subject: "Discrete Mathematics", faculty: "Prof. S. Iyer", room: "201" },
  "Saturday|12:00 - 1:00": { lunch: true },
};

export default function StudentTimetable() {
  return (
    <div className="min-h-screen bg-[#F4F7FE] font-body text-[#0B1D3A]">
      <header className="sticky top-0 z-20 border-b border-[#0B1D3A]/8 bg-white/80 px-5 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Campus Hub</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-5 sm:p-8">
        <div>
          <div className="flex items-center gap-2 text-[#2563EB]">
            <CalendarClock className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              6th Semester - CSE - Section A
            </span>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold">Weekly Timetable</h1>
          <p className="mt-1 text-sm text-[#5B6B8C]">
            Your class schedule for this week. Room and faculty details are shown per slot.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-2xl border border-[#0B1D3A]/8 bg-white p-4 shadow-sm sm:p-5"
        >
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-32 border-b border-[#0B1D3A]/8 p-3 text-xs font-medium uppercase tracking-wide text-[#5B6B8C]">
                  Time
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="border-b border-[#0B1D3A]/8 p-3 text-xs font-medium uppercase tracking-wide text-[#5B6B8C]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot) => (
                <tr key={slot}>
                  <td className="border-b border-[#0B1D3A]/5 p-3 text-xs font-medium text-[#5B6B8C]">
                    {slot}
                  </td>
                  {DAYS.map((day) => {
                    const entry = SCHEDULE[`${day}|${slot}`];
                    return (
                      <td key={day} className="border-b border-[#0B1D3A]/5 p-2 align-top">
                        {entry?.lunch ? (
                          <div className="rounded-lg bg-[#0B1D3A]/5 px-2.5 py-2 text-center text-xs font-medium text-[#5B6B8C]">
                            Lunch Break
                          </div>
                        ) : entry ? (
                          <div className="rounded-lg border border-[#2563EB]/15 bg-[#2563EB]/5 px-2.5 py-2">
                            <p className="text-xs font-semibold text-[#0B1D3A]">{entry.subject}</p>
                            <p className="mt-0.5 text-[11px] text-[#5B6B8C]">{entry.faculty}</p>
                            <p className="text-[11px] text-[#5B6B8C]">Room {entry.room}</p>
                          </div>
                        ) : (
                          <div className="h-full rounded-lg border border-dashed border-[#0B1D3A]/8 px-2.5 py-2 text-center text-[11px] text-[#5B6B8C]/50">
                            Free
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}