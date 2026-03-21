const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timetable: Record<string, { subject: string; time: string; isLab?: boolean }[]> = {
  Monday: [
    { subject: "OOP in Java", time: "8:10-9:00" },
    { subject: "Maths for Computing 2", time: "9:00-9:50" },
    { subject: "Glimpses of Glorious India", time: "9:50-10:40" },
    { subject: "User Interface Design (Lab)", time: "10:50-1:05", isLab: true },
    { subject: "Free", time: "2:00-2:50" },
    { subject: "Free", time: "2:50-3:40" },
  ],
  Tuesday: [
    { subject: "Elements of Computing Systems 2", time: "8:10-9:00" },
    { subject: "Data Structures & Algorithms 1", time: "9:00-9:50" },
    { subject: "User Interface Design", time: "9:50-10:40" },
    { subject: "Free", time: "11:00-11:50" },
    { subject: "Intro to EEE", time: "11:50-12:40" },
    { subject: "Maths for Computing 2 (Lab)", time: "1:25-3:40", isLab: true },
  ],
  Wednesday: [
    { subject: "Glimpses of Glorious India", time: "8:10-9:00" },
    { subject: "Data Structures & Algorithms 1", time: "9:00-9:50" },
    { subject: "Free", time: "9:50-10:40" },
    { subject: "OOP in Java (Lab)", time: "10:50-1:05", isLab: true },
    { subject: "Elements of Computing Systems 2 (Lab)", time: "1:25-3:40", isLab: true },
  ],
  Thursday: [
    { subject: "Maths for Computing 2", time: "8:10-9:00" },
    { subject: "Free", time: "9:00-9:50" },
    { subject: "OOP in Java", time: "9:50-10:40" },
    { subject: "Elements of Computing Systems 2", time: "11:00-11:50" },
    { subject: "Intro to EEE", time: "11:50-12:40" },
    { subject: "Data Structures & Algorithms 1 (Lab)", time: "1:25-3:40", isLab: true },
  ],
  Friday: [
    { subject: "Data Structures & Algorithms 1", time: "8:10-9:00" },
    { subject: "User Interface Design", time: "9:00-9:50" },
    { subject: "OOP in Java", time: "9:50-10:40" },
    { subject: "Intro to EEE (Lab)", time: "10:50-1:05", isLab: true },
    { subject: "Maths for Computing 2", time: "2:00-2:50" },
    { subject: "Free", time: "2:50-3:40" },
  ],
};

export default function TimetableGrid() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {days.map((day) => (
          <div key={day} className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-blue-900 p-3 text-center font-bold text-white">{day}</div>
            <div className="divide-y divide-gray-700">
              {timetable[day].map((period, i) => (
                <div key={i} className={`p-3 ${period.subject === "Free" ? "opacity-40" : ""}`}>
                  <p className={`font-semibold text-sm ${period.isLab ? "text-yellow-400" : "text-white"}`}>
                    {period.subject}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{period.time}</p>
                  {period.isLab && <span className="text-xs text-yellow-500">🧪 Lab</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Saturday: No classes 🎉</p>
    </div>
  );
}