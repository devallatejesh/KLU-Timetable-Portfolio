"use client";
 
const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "timetable", label: "Timetable", icon: "📅" },
  { id: "attendance", label: "Attendance", icon: "✅" },
  { id: "reminders", label: "Reminders", icon: "🔔" },
  { id: "subjects", label: "Subjects", icon: "📚" },
  { id: "about", label: "About", icon: "👤" },
];
 
export default function Navbar({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <nav className="bg-[#0d1117] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between h-16">
        
        {/* Left: Title */}
        <div>
          <p className="text-blue-400 font-bold text-base leading-tight">KL University</p>
          <p className="text-gray-500 text-xs">Student Timetable Portal</p>
        </div>
 
        {/* Right: Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
 
      </div>
    </nav>
  );
}