import { useState } from "react";
import {
  FiChevronDown,
  FiCheckSquare,
  FiMessageSquare,
} from "react-icons/fi";

type Props = {
  setView: (view: string) => void;
  taskCounts: {
    pending: number;
    completed: number;
    in_progress: number;
  };
};

export default function Sidebar({ setView, taskCounts }: Props) {
  const [openSection, setOpenSection] = useState<string | null>("tasks");

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-4 flex flex-col border-r border-gray-800">

      {/* Logo */}
      <h1
        className="text-2xl font-bold mb-8 cursor-pointer tracking-wide"
        onClick={() => setView("chat")}
      >
        AI Task Manager
      </h1>

      <div className="space-y-3">

        {/* CHAT */}
        <button
          onClick={() => setView("chat")}
          className="flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-800 rounded-xl transition"
        >
          <FiMessageSquare size={18} />
          <span>Chat</span>
        </button>

        {/* TASKS */}
        <div>

          <button
            onClick={() => toggle("tasks")}
            className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-xl transition"
          >
            <div className="flex items-center gap-3">
              <FiCheckSquare size={18} />
              <span>Tasks</span>
            </div>

            <FiChevronDown
              className={`transition-transform duration-300 ${
                openSection === "tasks" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "tasks" && (
            <div className="ml-5 mt-3 space-y-3 text-sm text-gray-300">

              {/* Pending */}
              <div
                onClick={() => setView("tasks-pending")}
                className="flex justify-between items-center cursor-pointer hover:text-white transition"
              >
                <span>Pending</span>

                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs min-w-6 text-center">
                  {taskCounts.pending}
                </span>
              </div>

              {/* Completed */}
              <div
                onClick={() => setView("tasks-completed")}
                className="flex justify-between items-center cursor-pointer hover:text-white transition"
              >
                <span>Completed</span>

                <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs min-w-6 text-center">
                  {taskCounts.completed}
                </span>
              </div>

              {/* In Progress */}
              <div
                onClick={() => setView("tasks-in-progress")}
                className="flex justify-between items-center cursor-pointer hover:text-white transition"
              >
                <span>In Progress</span>

                <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs min-w-6 text-center">
                  {taskCounts.in_progress}
                </span>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}