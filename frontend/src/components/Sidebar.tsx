import { useState } from "react";
import {
  FiChevronDown,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";

type Props = {
  setView: (view: any) => void;
  taskCounts: {
    pending: number;
    completed: number;
    in_progress: number;
  };
};

export default function Sidebar({ setView, taskCounts }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-4 flex flex-col">

      {/* Logo */}
      <h1
        className="text-xl font-bold mb-8 cursor-pointer"
        onClick={() => setView("chat")}
      >
        AI Scheduler
      </h1>

      <div className="space-y-4">

        {/* CHAT */}
        <button
          onClick={() => setView("chat")}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg"
        >
          <FiMessageSquare />
          Chat
        </button>

        {/* TASKS */}
        <div>
          <button
            onClick={() => toggle("tasks")}
            className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FiCheckSquare />
              Tasks
            </div>

            <FiChevronDown
              className={`transition ${
                openSection === "tasks" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "tasks" && (
            <div className="ml-6 mt-2 space-y-2 text-sm">

              {/* Pending */}
              <div
                onClick={() => setView("tasks-pending")}
                className="flex justify-between cursor-pointer hover:text-white"
              >
                <span>Pending</span>
                <span className="bg-red-500 text-white px-2 rounded text-xs">
                  {taskCounts.pending}
                </span>
              </div>

              {/* Completed */}
              <div
                onClick={() => setView("tasks-completed")}
                className="flex justify-between cursor-pointer hover:text-white"
              >
                <span>Completed</span>
                <span className="bg-green-500 text-white px-2 rounded text-xs">
                  {taskCounts.completed}
                </span>
              </div>

              {/* In Progress */}
              <div
                onClick={() => setView("tasks-scheduled")}
                className="flex justify-between cursor-pointer hover:text-white"
              >
                <span>In Progress</span>
                <span className="bg-yellow-500 text-black px-2 rounded text-xs">
                  {taskCounts.in_progress}
                </span>
              </div>

            </div>
          )}
        </div>

        {/* APPOINTMENTS */}
        <div>
          <button
            onClick={() => toggle("appointments")}
            className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FiCalendar />
              Appointments
            </div>

            <FiChevronDown
              className={`transition ${
                openSection === "appointments" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "appointments" && (
            <div className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
              <p
                onClick={() => setView("appointments-scheduled")}
                className="cursor-pointer hover:text-white"
              >
                Scheduled
              </p>
              <p
                onClick={() => setView("appointments-canceled")}
                className="cursor-pointer hover:text-white"
              >
                Canceled
              </p>
              <p
                onClick={() => setView("appointments-delayed")}
                className="cursor-pointer hover:text-white"
              >
                Delayed
              </p>
            </div>
          )}
        </div>

        {/* MEETINGS */}
        <div>
          <button
            onClick={() => toggle("meetings")}
            className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FiUsers />
              Meetings
            </div>

            <FiChevronDown
              className={`transition ${
                openSection === "meetings" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openSection === "meetings" && (
            <div className="ml-6 mt-2 space-y-2 text-sm text-gray-300">
              <p
                onClick={() => setView("meetings-scheduled")}
                className="cursor-pointer hover:text-white"
              >
                Scheduled
              </p>
              <p
                onClick={() => setView("meetings-canceled")}
                className="cursor-pointer hover:text-white"
              >
                Canceled
              </p>
              <p
                onClick={() => setView("meetings-delayed")}
                className="cursor-pointer hover:text-white"
              >
                Delayed
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}