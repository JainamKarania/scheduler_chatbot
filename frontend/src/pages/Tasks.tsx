import TaskList from "../components/TaskList";

export default function Tasks() {
  return (
    <div className="p-6">
      <TaskList refresh={0} />
    </div>
  );
}