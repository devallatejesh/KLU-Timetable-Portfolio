"use client";

type Period = {
  subject: string;
  time: string;
  isLab?: boolean;
};

type Timetable = {
  [key: string]: Period[];
};

const timetableData: Timetable = {
  Monday: [
    { subject: "Computational Foundation for AI", time: "7:10-8:50" },
    { subject: "Analog Electronic Circuit Design", time: "9:20-11:00" },
    { subject: "DSA", time: "11:10-12:50" },
  ],
  Tuesday: [
    { subject: "Computational Foundation for AI", time: "7:10-8:50" },
    { subject: "Analog Electronic Circuit Design", time: "9:20-11:00" },
    { subject: "DSA", time: "11:10-12:50" },
  ],
  Wednesday: [
    { subject: "Analog Electronic Circuit Design", time: "7:10-8:50" },
    { subject: "DSA", time: "9:20-11:00" },
    { subject: "Computational Foundation for AI", time: "11:10-12:50" },
  ],
  Thursday: [
    { subject: "MATHS", time: "7:10-8:50" },
    { subject: "Analog Electronic Circuit Design", time: "9:20-11:00" },
    { subject: "Computational Foundation for AI", time: "11:10-12:50" },
  ],
  Friday: [
    { subject: "Computational Foundation for AI", time: "7:10-8:50" },
    { subject: "MATHS", time: "9:20-11:00" },
    { subject: "JAPANESE", time: "11:10-12:50" },
  ],
  Saturday: [
    { subject: "DSA", time: "7:10-8:50" },
    { subject: "MATHS", time: "9:20-11:00" },
    { subject: "JAPANESE", time: "11:10-12:50" },
  ],
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export default function TimetableGrid() {
  const timetable = timetableData;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {days.map((day) => (
          <div
            key={day}
            className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            {/* Day Header */}
            <div className="bg-blue-900/50 border-b border-gray-700 p-3 text-center font-bold text-white text-sm">
              {day}
            </div>

            {/* Periods */}
            <div className="divide-y divide-gray-800">
              {timetable[day]?.length > 0 ? (
                timetable[day].map((period, i) => (
                  <div
                    key={i}
                    className={`p-3 ${
                      period.subject === "Free" ? "opacity-30" : ""
                    }`}
                  >
                    {/* Subject */}
                    <p
                      className={`font-semibold text-xs ${
                        period.subject === "DSA"
                          ? "text-green-400"
                          : period.subject.includes("AI")
                          ? "text-purple-400"
                          : period.subject === "MATHS"
                          ? "text-blue-400"
                          : period.subject === "JAPANESE"
                          ? "text-pink-400"
                          : period.isLab
                          ? "text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {period.subject}
                    </p>

                    {/* Time */}
                    <p className="text-gray-500 text-xs mt-0.5">
                      {period.time}
                    </p>

                    {/* Lab tag */}
                    {period.isLab && (
                      <span className="text-xs text-yellow-600">🧪 Lab</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-3 text-xs text-gray-500 text-center">
                  No Classes
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-3 text-center">
        Sunday: Holiday 😎
      </p>
    </div>
  );
}