"use client";
import { useState } from "react";

const subjects = [
  { name: "DSA", total: 46 },
  { name: "Computational Foundation for AI", total: 58 },
  { name: "Analog Electronic Circuit Design", total: 46 },
  { name: "MATHS", total: 22 },
  { name: "JAPANESE", total: 22 },
];

export default function AttendanceTracker() {
  const [data, setData] = useState(
    subjects.reduce((acc, sub) => ({
      ...acc,
      [sub.name]: { conducted: "", attended: "" }
    }), {} as Record<string, { conducted: string; attended: string }>)
  );

  const update = (subject: string, field: string, value: string) => {
    if (value !== "" && (isNaN(Number(value)) || Number(value) < 0)) return;
    setData((prev) => ({
      ...prev,
      [subject]: { ...prev[subject], [field]: value }
    }));
  };

  const calculate = (subject: string, total: number) => {
    const { conducted, attended } = data[subject];
    const c = Number(conducted);
    const a = Number(attended);

    if (!c || c <= 0) return null;
    if (a > c) return null;

    const percent = Math.round((a / c) * 100);
    const remaining = total - c;
    const alreadyAbsent = c - a;
    const maxAbsent = Math.floor(total * 0.25);
    const bunkLeft = Math.max(0, maxAbsent - alreadyAbsent);
    const minRequired = Math.ceil(total * 0.75);
    const needToAttend = Math.max(0, minRequired - a);

    return { percent, bunkLeft, needToAttend, remaining };
  };

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-xl font-bold text-white mb-1">
        Attendance Calculator
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Minimum required:{" "}
        <span className="text-yellow-400 font-semibold">75%</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub) => {
          const result = calculate(sub.name, sub.total);
          const percent = result?.percent ?? 0;

          const border =
            !result
              ? "border-gray-800"
              : percent >= 75
              ? "border-green-600"
              : percent >= 60
              ? "border-yellow-600"
              : "border-red-600";

          const color =
            !result
              ? "text-gray-500"
              : percent >= 75
              ? "text-green-400"
              : percent >= 60
              ? "text-yellow-400"
              : "text-red-400";

          const barColor =
            !result
              ? "bg-gray-600"
              : percent >= 75
              ? "bg-green-500"
              : percent >= 60
              ? "bg-yellow-500"
              : "bg-red-500";

          return (
            <div
              key={sub.name}
              className={`bg-[#161b22] border ${border} rounded-2xl p-5`}
            >
              {/* Header */}
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-white text-sm font-semibold">
                    {sub.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Total: {sub.total}
                  </p>
                </div>

                <span className={`text-xl font-bold ${color}`}>
                  {result ? `${percent}%` : "--"}
                </span>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <input
                  type="number"
                  placeholder="Conducted"
                  value={data[sub.name].conducted}
                  onChange={(e) =>
                    update(sub.name, "conducted", e.target.value)
                  }
                  className="bg-gray-900 text-white p-2 rounded-lg text-sm"
                />

                <input
                  type="number"
                  placeholder="Attended"
                  value={data[sub.name].attended}
                  onChange={(e) =>
                    update(sub.name, "attended", e.target.value)
                  }
                  className="bg-gray-900 text-white p-2 rounded-lg text-sm"
                />
              </div>

              {/* Result */}
              {result && (
                <div className="text-xs text-gray-300 space-y-1">
                  <p>✅ Can bunk: {result.bunkLeft}</p>
                  <p>📌 Must attend: {result.needToAttend}</p>
                  <p>📅 Remaining: {result.remaining}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}