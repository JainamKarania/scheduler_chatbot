import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "@/lib/api";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string;
};

type Props = {
  filter: string;
  refreshCounts: () => void;
};

export default function TaskList({ filter, refreshCounts }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const user_id = 1;

  const loadTasks = async () => {
    const data = await getTasks(user_id);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ✅ COMPLETE
  const handleComplete = async (id: number) => {
    await updateTaskStatus(id, "completed");

    toast.success("Task completed");

    loadTasks();
    refreshCounts();
  };

  // ❌ DELETE
  const handleDelete = async (id: number) => {
    await deleteTask(id);

    toast.error("Task deleted");

    loadTasks();
    refreshCounts();
  };

  // 🔍 FILTER
  const filteredTasks = tasks.filter((task) => {
    if (filter === "tasks-pending") return task.status === "pending";
    if (filter === "tasks-completed") return task.status === "completed";
    if (filter === "tasks-scheduled")
      return task.status === "in_progress";

    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === "pending") return "text-yellow-600";
    if (status === "completed") return "text-green-600";
    if (status === "in_progress") return "text-blue-600";
    return "text-gray-500";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {filter.replace("tasks-", "")} Tasks
      </h2>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl border shadow-sm"
            >
              <h3 className="font-semibold text-lg">{task.title}</h3>

              <p className="text-sm text-gray-600 mt-1">
                {task.description}
              </p>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-blue-600">
                  {task.priority}
                </span>

                <span className="text-gray-500">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleString()
                    : "No deadline"}
                </span>
              </div>

              <div className={`mt-2 text-sm ${getStatusColor(task.status)}`}>
                Status: {task.status}
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex gap-2">
                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}