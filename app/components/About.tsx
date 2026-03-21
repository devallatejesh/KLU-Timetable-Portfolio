"use client";

export default function About() {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mt-6 mb-10 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">About</h2>

      {/* College Card */}
      <div className="bg-[#161b22] border border-gray-700 rounded-2xl p-6 mb-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
          🎓
        </div>
        <h3 className="text-white font-bold text-lg">Amrita Vishwa Vidyapeetham</h3>
        <p className="text-gray-400 text-sm mt-1">Bengaluru Campus</p>
        <p className="text-gray-400 text-sm">B.Tech Artificial Intelligence & Engineering</p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-3 py-1 rounded-full">Section F</span>
          <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs px-3 py-1 rounded-full">2026-27 Even Sem</span>
        </div>
      </div>

      {/* Developer Card */}
      <div className="bg-[#161b22] border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            D
          </div>
          <div>
            <p className="text-white font-bold text-lg">Dhanush Rongali</p>
            <p className="text-gray-400 text-sm">Student Developer • Amrita University</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => openLink("mailto:bl.sc.u4aie25241@bl.students.amrita.edu")}
            className="w-full flex items-center gap-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 p-3 rounded-xl transition"
          >
            <div className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center text-lg">📧</div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">Email</p>
              <p className="text-gray-400 text-xs">bl.sc.u4aie25241@bl.students.amrita.edu</p>
            </div>
          </button>

          <button
            onClick={() => openLink("https://github.com/rongalidhanush")}
            className="w-full flex items-center gap-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 p-3 rounded-xl transition"
          >
            <div className="w-9 h-9 bg-gray-500/20 rounded-lg flex items-center justify-center text-lg">🐙</div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">GitHub</p>
              <p className="text-gray-400 text-xs">github.com/rongalidhanush</p>
            </div>
          </button>

          <button
            onClick={() => openLink("https://www.linkedin.com/in/dhanushrongali/")}
            className="w-full flex items-center gap-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 p-3 rounded-xl transition"
          >
            <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center text-lg">💼</div>
            <div className="text-left">
              <p className="text-white text-sm font-medium">LinkedIn</p>
              <p className="text-gray-400 text-xs">linkedin.com/in/dhanushrongali</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}