"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TimetableGrid from "./components/TimetableGrid";
import AttendanceTracker from "./components/AttendanceTracker";
import Reminders from "./components/Reminders";
import SubjectDetails from "./components/SubjectDetails";
import About from "./components/About";

export default function Home() {
  const [active, setActive] = useState("home");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ Correct semester dates
  const semStart = new Date("2026-04-06");
  const semEnd = new Date("2026-06-27");
  const now = new Date();

  const totalDays = Math.ceil(
    (semEnd.getTime() - semStart.getTime()) / 86400000
  );

  // ✅ FIX: prevent negative days
  const passedDays = Math.max(
    0,
    Math.ceil((now.getTime() - semStart.getTime()) / 86400000)
  );

  // ✅ FIX: clamp percentage between 0–100
  const semProgress = Math.max(
    0,
    Math.min(100, Math.round((passedDays / totalDays) * 100))
  );

  const daysLeft = Math.max(
    0,
    Math.ceil((semEnd.getTime() - now.getTime()) / 86400000)
  );

  useEffect(() => {
    if (!window.history.state?.page) {
      window.history.replaceState({ page: "home" }, "", "");
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.page) {
        setActive(e.state.page);
      } else {
        window.history.replaceState({ page: "home" }, "", "");
        setActive("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (page: string) => {
    window.history.pushState({ page }, "", "");
    setActive(page);
  };

  const cards = [
    {
      id: "timetable",
      icon: "📅",
      label: "Timetable",
      desc: "Weekly class schedule",
      border: "border-blue-500",
      glow: "hover:shadow-blue-500/20",
    },
    {
      id: "attendance",
      icon: "✅",
      label: "Attendance",
      desc: "Track & manage attendance",
      border: "border-green-500",
      glow: "hover:shadow-green-500/20",
    },
    {
      id: "reminders",
      icon: "🔔",
      label: "Reminders",
      desc: "Today's class alerts",
      border: "border-yellow-500",
      glow: "hover:shadow-yellow-500/20",
    },
    {
      id: "subjects",
      icon: "📚",
      label: "Subjects & Faculty",
      desc: "Faculty details",
      border: "border-purple-500",
      glow: "hover:shadow-purple-500/20",
    },
    {
      id: "about",
      icon: "👤",
      label: "About",
      desc: "Developer info",
      border: "border-pink-500",
      glow: "hover:shadow-pink-500/20",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <Navbar active={active} setActive={navigate} />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {active === "home" && (
          <div>
            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-4 py-1 rounded-full mb-4">
                B.Tech Honours • 2026-27 3rd Sem
              </span>
              <h1 className="text-3xl font-bold mb-1">
                Student Timetable Portal
              </h1>
              <p className="text-gray-500 text-sm">{today}</p>
            </div>

            {/* Semester Progress */}
            <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-5 mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-300">
                  Semester Progress
                </p>
                <span className="text-xs text-gray-500">
                  {daysLeft} days left • June 27, 2026
                </span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                  style={{ width: `${semProgress}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {now < semStart
                  ? "Semester not started yet 🚀"
                  : `${semProgress}% of semester completed`}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cards.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`bg-[#161b22] border ${item.border} border-opacity-40 hover:border-opacity-100 ${item.glow} hover:shadow-lg p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1`}
                >
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <p className="text-center text-gray-700 text-xs mt-10">
              Built by Devalla Tejesh • Amrita University
            </p>
          </div>
        )}

        {active === "timetable" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              📅 Weekly Timetable
            </h2>
            <TimetableGrid />
          </div>
        )}

        {active === "attendance" && <AttendanceTracker />}
        {active === "reminders" && <Reminders />}
        {active === "subjects" && <SubjectDetails />}
        {active === "about" && <About />}

      </div>
    </main>
  );
}