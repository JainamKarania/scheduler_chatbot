import { useEffect, useState } from "react";
import { getAppointments } from "@/lib/api";

import { Card } from "@/components/ui/card";

type Appointment = {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: string;
};

export default function AppointmentList({
  refresh,
}: {
  refresh: number;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const user_id = 1;

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments(user_id);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refresh]);

  return (
    <Card className="p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>

      {appointments.length === 0 && (
        <p className="text-gray-500">No appointments found</p>
      )}

      <div className="space-y-3">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="p-3 border rounded-lg bg-gray-50"
          >
            <h3 className="font-semibold">{appt.title}</h3>
            <p className="text-sm text-gray-600">
              {appt.description}
            </p>

            <div className="text-sm mt-2">
              <p>
                Start:{" "}
                {new Date(appt.start_time).toLocaleString()}
              </p>
              <p>
                End:{" "}
                {new Date(appt.end_time).toLocaleString()}
              </p>
            </div>

            <p className="text-sm mt-1">
              Status: {appt.status}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}