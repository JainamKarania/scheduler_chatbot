import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api";

import { Card } from "@/components/ui/card";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string;
};

export default function TaskList({ refresh }: { refresh: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const user_id = 1;

  const fetchTasks = async () => {
    try {
      const data = await getTasks(user_id);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks");
    }
  };

  useEffect(() => {
  fetchTasks();
}, [refresh]);

  return (
    <Card className="p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">My Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks found</p>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded-lg bg-gray-50"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">
              {task.description}
            </p>

            <div className="text-sm mt-2 flex justify-between">
              <span>Priority: {task.priority}</span>
              <span>Status: {task.status}</span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Deadline: {new Date(task.deadline).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
