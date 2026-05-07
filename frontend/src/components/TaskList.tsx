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
  description?: string;
  priority: string;
  status: string;
  deadline?: string;
};

type Props = {
  filter: string;
  refreshCounts: () => void;
};

export default function TaskList({
  filter,
  refreshCounts,
}: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const user_id = 1;

  // LOAD TASKS
  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks(user_id);

      setTasks(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // COMPLETE TASK
  const handleComplete = async (id: number) => {
    try {
      await updateTaskStatus(id, "completed");

      toast.success("Task completed");

      loadTasks();
      refreshCounts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  // DELETE TASK
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);

      toast.success("Task deleted");

      loadTasks();
      refreshCounts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "tasks-pending") {
      return task.status === "pending";
    }

    if (filter === "tasks-completed") {
      return task.status === "completed";
    }

    if (filter === "tasks-in-progress") {
      return task.status === "in_progress";
    }

    return true;
  });

  // STATUS COLORS
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";

      case "completed":
        return "text-green-500";

      case "in_progress":
        return "text-blue-500";

      default:
        return "text-gray-500";
    }
  };

  // PRIORITY COLORS
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-500";

      case "medium":
        return "bg-yellow-500/10 text-yellow-500";

      case "low":
        return "bg-green-500/10 text-green-500";

      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="p-6 w-full min-h-screen bg-[#0f0f0f] text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold capitalize">
          {filter.replace("tasks-", "").replace("-", " ")} Tasks
        </h2>

        <p className="text-gray-400 mt-1 text-sm">
          Manage and track your tasks efficiently
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-gray-400">
          Loading tasks...
        </div>
      ) : filteredTasks.length === 0 ? (

        /* EMPTY STATE */
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-10 text-center">
          <h3 className="text-lg font-semibold">
            No tasks found
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Create a new task using the AI chat assistant.
          </p>
        </div>

      ) : (

        /* TASK GRID */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-5 shadow-lg hover:border-gray-700 transition"
            >

              {/* TITLE */}
              <div className="flex justify-between items-start gap-3">
                <h3 className="text-lg font-semibold">
                  {task.title}
                </h3>

                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-400 mt-3 line-clamp-3">
                {task.description || "No description provided"}
              </p>

              {/* DEADLINE */}
              <div className="mt-4 text-sm text-gray-500">
                {task.deadline
                  ? `Deadline: ${new Date(
                      task.deadline
                    ).toLocaleString()}`
                  : "No deadline"}
              </div>

              {/* STATUS */}
              <div
                className={`mt-2 text-sm font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                Status: {task.status.replace("_", " ")}
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex gap-3">

                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-sm font-medium transition"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium transition"
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