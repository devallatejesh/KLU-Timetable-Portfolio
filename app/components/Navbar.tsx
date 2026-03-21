"use client";
import { useState } from "react";

const tabs = [
  { id: "home", label: "🏠 Home" },
  { id: "timetable", label: "📅 Timetable" },
  { id: "attendance", label: "✅ Attendance" },
  { id: "reminders", label: "🔔 Reminders" },
  { id: "subjects", label: "📚 Subjects" },
  { id: "about", label: "👤 About" },
];

export default function Navbar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-blue-400 font-bold text-lg leading-tight">Amrita University</p>
          <p className="text-gray-400 text-xs">Student Timetable Portal</p>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                active === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 grid grid-cols-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActive(tab.id); setMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                active === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}