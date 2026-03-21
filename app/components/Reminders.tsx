"use client";
import { useState, useEffect } from "react";

const timetable: Record<string, { time: string; subject: string }[]> = {
  Monday: [
    { time: "08:10", subject: "OOP in Java" },
    { time: "09:00", subject: "Maths for Computing 2" },
    { time: "09:50", subject: "Glimpses of Glorious India" },
    { time: "10:50", subject: "User Interface Design (Lab)" },
    { time: "14:00", subject: "Free Period" },
    { time: "14:50", subject: "Free Period" },
  ],
  Tuesday: [
    { time: "08:10", subject: "Elements of Computing Systems 2" },
    { time: "09:00", subject: "Data Structures & Algorithms 1" },
    { time: "09:50", subject: "User Interface Design" },
    { time: "11:00", subject: "Free Period" },
    { time: "11:50", subject: "Intro to EEE" },
    { time: "13:25", subject: "Maths for Computing 2 (Lab)" },
  ],
  Wednesday: [
    { time: "08:10", subject: "Glimpses of Glorious India" },
    { time: "09:00", subject: "Data Structures & Algorithms 1" },
    { time: "09:50", subject: "Free Period" },
    { time: "10:50", subject: "OOP in Java (Lab)" },
    { time: "13:25", subject: "Elements of Computing Systems 2 (Lab)" },
  ],
  Thursday: [
    { time: "08:10", subject: "Maths for Computing 2" },
    { time: "09:00", subject: "Free Period" },
    { time: "09:50", subject: "OOP in Java" },
    { time: "11:00", subject: "Elements of Computing Systems 2" },
    { time: "11:50", subject: "Intro to EEE" },
    { time: "13:25", subject: "Data Structures & Algorithms 1 (Lab)" },
  ],
  Friday: [
    { time: "08:10", subject: "Data Structures & Algorithms 1" },
    { time: "09:00", subject: "User Interface Design" },
    { time: "09:50", subject: "OOP in Java" },
    { time: "10:50", subject: "Intro to EEE (Lab)" },
    { time: "14:00", subject: "Maths for Computing 2" },
    { time: "14:50", subject: "Free Period" },
  ],
};

export default function Reminders() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const todaySchedule = timetable[today] || [];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatus = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const classStart = new Date();
    classStart.setHours(h, m, 0, 0);
    const classEnd = new Date();
    classEnd.setHours(h, m + 50, 0, 0);
    const now = currentTime;

    if (now >= classStart && now <= classEnd) return "ongoing";
    if (now < classStart) return "upcoming";
    return "done";
  };

  const getTimeLeft = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const classStart = new Date();
    classStart.setHours(h, m, 0, 0);
    const diff = classStart.getTime() - currentTime.getTime();
    if (diff <= 0) return null;
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ${mins % 60}m away`;
    return `${mins}m away`;
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      setStatus("❌ Browser does not support notifications.");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setEnabled(true);
      setStatus("✅ Reminders enabled for today's classes!");
      todaySchedule.forEach(({ time, subject }) => {
        const [h, m] = time.split(":").map(Number);
        const classTime = new Date();
        classTime.setHours(h, m - 5, 0, 0);
        const delay = classTime.getTime() - new Date().getTime();
        if (delay > 0) {
          setTimeout(() => {
            new Notification("📚 Class Reminder", {
              body: `${subject} starts in 5 minutes! (${time})`,
            });
          }, delay);
        }
      });
    } else {
      setStatus("❌ Permission denied.");
    }
  };

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl font-bold text-blue-400 mb-1">Class Reminders</h2>
      <p className="text-gray-400 text-sm mb-4">
        Today is <span className="text-white font-semibold">{today}</span> •{" "}
        {currentTime.toLocaleTimeString("en-IN")}
      </p>

      {todaySchedule.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-white font-bold text-lg">No classes today!</p>
          <p className="text-gray-400 text-sm mt-1">Enjoy your {today}!</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {todaySchedule.map(({ time, subject }) => {
            const status = getStatus(time);
            const timeLeft = getTimeLeft(time);
            return (
              <div
                key={time}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  status === "ongoing"
                    ? "bg-green-900 border-green-500"
                    : status === "upcoming"
                    ? "bg-gray-800 border-gray-600"
                    : "bg-gray-900 border-gray-700 opacity-50"
                }`}
              >
                <div>
                  <p className={`font-semibold ${subject === "Free Period" ? "text-gray-400" : "text-white"}`}>
                    {subject}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{time}</p>
                </div>
                <div className="text-right">
                  {status === "ongoing" && (
                    <span className="text-green-400 text-xs font-bold animate-pulse">🟢 Ongoing</span>
                  )}
                  {status === "upcoming" && timeLeft && (
                    <span className="text-blue-400 text-xs">{timeLeft}</span>
                  )}
                  {status === "done" && (
                    <span className="text-gray-500 text-xs">✓ Done</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {todaySchedule.length > 0 && (
        <>
          {!enabled ? (
            <button
              onClick={enableReminders}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold"
            >
              🔔 Enable 5-min Reminders for Today
            </button>
          ) : (
            <button className="w-full bg-gray-700 text-white py-3 rounded-xl font-semibold cursor-not-allowed">
              🔔 Reminders Active
            </button>
          )}
          {status && <p className="mt-3 text-sm text-center text-gray-300">{status}</p>}
        </>
      )}
    </div>
  );
}