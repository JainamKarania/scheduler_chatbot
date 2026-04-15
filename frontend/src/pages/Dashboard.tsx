import { useState } from "react";

import Chat from "../components/Chat";
import TaskList from "../components/TaskList";
import AppointmentList from "../components/AppointmentList";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      
      {/* Chat */}
      <div>
        <Chat onTaskCreated={() => setRefresh((r) => r + 1)} />
      </div>

      {/* Tasks */}
      <div>
        <TaskList refresh={refresh} />
      </div>

      {/* Appointments */}
      <div>
        <AppointmentList refresh={refresh} />
      </div>

    </div>
  );
}