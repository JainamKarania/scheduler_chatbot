import { useState, useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import TaskList from "@/components/TaskList";

import { getTasks } from "@/lib/api";

export type ViewType =
  | "chat"
  | "tasks-pending"
  | "tasks-completed"
  | "tasks-scheduled"
  | "appointments-scheduled"
  | "appointments-canceled"
  | "appointments-delayed"
  | "meetings-scheduled"
  | "meetings-canceled"
  | "meetings-delayed";

export default function AppLayout() {
  const [view, setView] = useState<ViewType>("chat");

  const [taskCounts, setTaskCounts] = useState({
    pending: 0,
    completed: 0,
    in_progress: 0,
  });

  // 🔄 Load task counts
  const loadTaskCounts = async () => {
    const tasks = await getTasks(1);

    setTaskCounts({
      pending: tasks.filter((t: any) => t.status === "pending").length,
      completed: tasks.filter((t: any) => t.status === "completed").length,
      in_progress: tasks.filter((t: any) => t.status === "in_progress").length,
    });
  };

  useEffect(() => {
    loadTaskCounts();
  }, []);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar
        setView={setView}
        taskCounts={taskCounts}
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">

        {/* Chat */}
        {view === "chat" && (
          <Chat />
        )}

        {/* Tasks */}
        {view.startsWith("tasks") && (
          <TaskList
            filter={view}
            refreshCounts={loadTaskCounts}
          />
        )}

        {/* Appointments (placeholder) */}
        {view.startsWith("appointments") && (
          <div className="p-6 text-lg">
            Appointments View: {view}
          </div>
        )}

        {/* Meetings (placeholder) */}
        {view.startsWith("meetings") && (
          <div className="p-6 text-lg">
            Meetings View: {view}
          </div>
        )}

      </div>
    </div>
  );
}