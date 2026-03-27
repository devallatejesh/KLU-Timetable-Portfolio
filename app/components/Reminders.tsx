"use client";
import { useState, useEffect } from "react";

const timetable: Record<string, { time: string; subject: string }[]> = {
  Monday: [
    { time: "07:10", subject: "Computational Foundation for AI" },
    { time: "09:20", subject: "Analog Electronic Circuit Design" },
    { time: "11:10", subject: "DSA" },
  ],
  Tuesday: [
    { time: "07:10", subject: "Computational Foundation for AI" },
    { time: "09:20", subject: "Analog Electronic Circuit Design" },
    { time: "11:10", subject: "DSA" },
  ],
  Wednesday: [
    { time: "07:10", subject: "Analog Electronic Circuit Design" },
    { time: "09:20", subject: "DSA" },
    { time: "11:10", subject: "Computational Foundation for AI" },
  ],
  Thursday: [
    { time: "07:10", subject: "MATHS" },
    { time: "09:20", subject: "Analog Electronic Circuit Design" },
    { time: "11:10", subject: "Computational Foundation for AI" },
  ],
  Friday: [
    { time: "07:10", subject: "Computational Foundation for AI" },
    { time: "09:20", subject: "MATHS" },
    { time: "11:10", subject: "JAPANESE" },
  ],
  Saturday: [
    { time: "07:10", subject: "DSA" },
    { time: "09:20", subject: "MATHS" },
    { time: "11:10", subject: "JAPANESE" },
  ],
};

export default function Reminders() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  const todaySchedule = timetable[today] || [];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatus = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, 0, 0);
    const end = new Date();
    end.setHours(h, m + 100, 0, 0); // longer class (1h40m approx)

    if (currentTime >= start && currentTime <= end) return "ongoing";
    if (currentTime < start) return "upcoming";
    return "done";
  };

  const getTimeLeft = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, 0, 0);
    const diff = start.getTime() - currentTime.getTime();

    if (diff <= 0) return null;

    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);

    return hrs > 0 ? `${hrs}h ${mins % 60}m away` : `${mins}m away`;
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      setStatus("❌ Notifications not supported");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setEnabled(true);
      setStatus("✅ Reminders enabled!");

      todaySchedule.forEach(({ time, subject }) => {
        const [h, m] = time.split(":").map(Number);
        const notifyTime = new Date();
        notifyTime.setHours(h, m - 5, 0, 0);

        const delay = notifyTime.getTime() - new Date().getTime();

        if (delay > 0) {
          setTimeout(() => {
            new Notification("📚 Class Reminder", {
              body: `${subject} starts in 5 minutes (${time})`,
            });
          }, delay);
        }
      });
    } else {
      setStatus("❌ Permission denied");
    }
  };

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl font-bold text-blue-400 mb-1">
        Class Reminders
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        Today: <span className="text-white font-semibold">{today}</span> •{" "}
        {currentTime.toLocaleTimeString("en-IN")}
      </p>

      {todaySchedule.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-xl text-center">
          🎉 No classes today!
        </div>
      ) : (
        <div className="space-y-3 mb-5">
          {todaySchedule.map(({ time, subject }) => {
            const s = getStatus(time);
            const left = getTimeLeft(time);

            return (
              <div
                key={time}
                className={`p-4 rounded-xl border ${
                  s === "ongoing"
                    ? "bg-green-900 border-green-500"
                    : s === "upcoming"
                    ? "bg-gray-800 border-gray-600"
                    : "bg-gray-900 border-gray-700 opacity-50"
                }`}
              >
                <p className="text-white font-semibold">{subject}</p>
                <p className="text-gray-400 text-xs">{time}</p>

                {s === "ongoing" && (
                  <span className="text-green-400 text-xs">🟢 Ongoing</span>
                )}
                {s === "upcoming" && left && (
                  <span className="text-blue-400 text-xs">{left}</span>
                )}
                {s === "done" && (
                  <span className="text-gray-500 text-xs">✓ Done</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!enabled ? (
        <button
          onClick={enableReminders}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl"
        >
          🔔 Enable Reminders
        </button>
      ) : (
        <button className="w-full bg-gray-700 text-white py-3 rounded-xl">
          🔔 Active
        </button>
      )}

      {status && (
        <p className="text-center text-sm text-gray-300 mt-3">{status}</p>
      )}
    </div>
  );
}