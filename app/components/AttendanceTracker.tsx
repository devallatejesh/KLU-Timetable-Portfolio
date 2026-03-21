"use client";
import { useState } from "react";

const subjectData = [
  { name: "Maths for Computing 2", attended: 37, total: 72 },
  { name: "User Interface Design", attended: 32, total: 60 },
  { name: "Intro to EEE", attended: 38, total: 66 },
  { name: "Elements of Computing Systems 2", attended: 37, total: 65 },
  { name: "Data Structures & Algorithms 1", attended: 40, total: 75 },
  { name: "OOP in Java", attended: 42, total: 77 },
  { name: "Glimpses of Glorious India", attended: 17, total: 31 },
];

export default function AttendanceTracker() {
  const [attendance, setAttendance] = useState(
    subjectData.reduce((acc, sub) => ({
      ...acc,
      [sub.name]: { present: sub.attended, total: sub.total, conducted: sub.attended }
    }), {} as Record<string, { present: number; total: number; conducted: number }>)
  );

  const mark = (subject: string, type: "present" | "absent" | "holiday") => {
    setAttendance((prev) => {
      const s = prev[subject];
      if (type === "holiday") {
        return {
          ...prev,
          [subject]: {
            ...s,
            total: s.total - 1,
          },
        };
      }
      return {
        ...prev,
        [subject]: {
          ...s,
          present: s.present + (type === "present" ? 1 : 0),
          conducted: s.conducted + 1,
        },
      };
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-blue-400 mb-1">Attendance Tracker</h2>
      <p className="text-gray-400 text-sm mb-4">Minimum required: 75% | Semester ends: May 8</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectData.map((sub) => {
          const { present, total, conducted } = attendance[sub.name];
          const percent = conducted === 0 ? 0 : Math.round((present / conducted) * 100);
          const remaining = total - conducted;

          // Classes needed to reach/maintain 75%
          const minRequired = Math.ceil(0.75 * total);
          const canBunk = Math.max(0, present - Math.ceil(0.75 * conducted) + Math.floor(remaining - 0.75 * remaining));
          const needToAttend = Math.max(0, minRequired - present);

          const color = percent >= 75 ? "text-green-400" : percent >= 60 ? "text-yellow-400" : "text-red-400";
          const bgColor = percent >= 75 ? "border-green-800" : percent >= 60 ? "border-yellow-800" : "border-red-800";

          // Accurate bunk calculation
          // Max classes you can miss = total - ceil(0.75 * total) - already absent
          const alreadyAbsent = conducted - present;
          const maxAbsent = Math.floor(total - 0.75 * total);
          const bunkLeft = Math.max(0, maxAbsent - alreadyAbsent);

          return (
            <div key={sub.name} className={`bg-gray-800 p-4 rounded-xl border ${bgColor}`}>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-white text-sm">{sub.name}</h3>
                <span className={`font-bold text-lg ${color}`}>{percent}%</span>
              </div>

              <p className="text-gray-400 text-xs mb-1">{present} / {conducted} classes attended</p>
              <p className="text-gray-400 text-xs mb-3">{remaining} classes remaining in semester</p>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${percent >= 75 ? "bg-green-500" : percent >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>

              {/* Bunk info */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                <div className="bg-gray-700 rounded-lg p-2">
                  <p className="text-green-400 font-bold text-lg">{bunkLeft}</p>
                  <p className="text-gray-400 text-xs">Can still bunk</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-2">
                  <p className="text-blue-400 font-bold text-lg">{needToAttend}</p>
                  <p className="text-gray-400 text-xs">Must attend</p>
                </div>
              </div>

              {percent < 75 && (
                <p className="text-red-400 text-xs mb-2 text-center">
                  ⚠️ Below 75% — attend {needToAttend} more to recover
                </p>
              )}
              {bunkLeft === 0 && percent >= 75 && (
                <p className="text-yellow-400 text-xs mb-2 text-center">
                  ⚠️ No more bunks left — attend all remaining classes
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => mark(sub.name, "present")}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white py-1 rounded-lg text-xs"
                >
                  ✓ Present
                </button>
                <button
                  onClick={() => mark(sub.name, "absent")}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1 rounded-lg text-xs"
                >
                  ✗ Absent
                </button>
                <button
                  onClick={() => mark(sub.name, "holiday")}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-1 rounded-lg text-xs"
                >
                  🎉 Holiday
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}