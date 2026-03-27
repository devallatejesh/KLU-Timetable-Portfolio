"use client";

type Subject = {
  name: string;
  faculty: string;
};

const subjectData: Subject[] = [
  { name: "DSA", faculty: "CH SURYA KIRAN - 8135" },
  { name: "Computational Foundation for AI", faculty: "MD MOULANA - 5046" },
  { name: "Analog Electronic Circuit Design", faculty: "P SYAM SUNDAR - 5368" },
  { name: "MATHS", faculty: "KASI PRASAD - 4958" },
  { name: "JAPANESE", faculty: "RAVI RANJAN - 9302" },
];

export default function SubjectDetails() {
  return (
    <div className="mt-6 mb-10">
      <h2 className="text-xl font-bold text-white mb-4">
        Subject & Faculty Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectData.map((sub) => (
          <div
            key={sub.name}
            className="bg-[#161b22] border border-gray-700 hover:border-gray-500 p-4 rounded-xl transition hover:scale-105"
          >
            {/* Subject */}
            <h3 className="font-semibold text-white text-sm">
              {sub.name}
            </h3>

            {/* Faculty */}
            <p className="text-gray-400 text-xs mt-1">
              👨‍🏫 {sub.faculty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}