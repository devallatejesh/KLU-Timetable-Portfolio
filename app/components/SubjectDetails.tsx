"use client";
import { useState } from "react";

const subjects = [
  {
    name: "Data Structures & Algorithms 1",
    faculty: "Anjali Patel",
    contact: "9461422750",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FDataStructures%20and%20Algorithms%2D1&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "User Interface Design",
    faculty: "Manju Khanna",
    contact: "9845176532",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FUser%20Interface%20Design&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "Glimpses of Glorious India",
    faculty: "Bhavya Suresh",
    contact: "8884235483",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FGlimpses%20of%20Glorious%20India&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "Mathematics for Computing 2",
    faculty: "Murali K",
    contact: "9845056124",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FMaths%20for%20Computing%2D2&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "Intro to Electrical & Electronics Engg",
    faculty: "Sailaja V",
    contact: "9008183849",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FIEEE&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "Object Oriented Programming in Java",
    faculty: "Dr. Reena Panwar",
    contact: "9650687776",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FObjected%20Oriented%20Programming%20in%20JAVA&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
  {
    name: "Elements of Computing Systems 2",
    faculty: "Ritesh Raj",
    contact: "7903631620",
    drive: "https://aseblr-my.sharepoint.com/my?id=%2Fpersonal%2Fbl%5Fsc%5Fu4aie25241%5Fbl%5Fstudents%5Famrita%5Fedu%2FDocuments%2FStudy%20Materials%28AIE%2DF%29%2FSEMESTER%2D2%2FElements%20of%20Computing%2D2&viewid=612165d7%2Dece6%2D40c0%2Dab0d%2D58fe433266f7",
  },
];

export default function SubjectDetails() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Subject & Faculty Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <div
            key={sub.name}
            onClick={() => setSelected(selected === sub.name ? null : sub.name)}
            className="bg-gray-800 p-4 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            <h3 className="font-semibold text-white">{sub.name}</h3>
            <p className="text-gray-400 text-sm mt-1">👨‍🏫 {sub.faculty}</p>
            {selected === sub.name && (
              <div className="mt-3 border-t border-gray-600 pt-3 space-y-2">
                <p className="text-sm text-gray-300">📞 <span className="text-white">{sub.contact}</span></p>
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(sub.drive, "_blank"); }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 rounded-lg mt-1"
                >
                  📂 Open Study Materials
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}