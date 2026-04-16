import AppointmentList from "../components/AppointmentList";

export default function Appointments() {
  return (
    <div className="p-6">
      <AppointmentList refresh={0} />
    </div>
  );
}