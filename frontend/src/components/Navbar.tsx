import { Link, useLocation } from "react-router-dom";
import { FiHome, FiCheckSquare, FiCalendar } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
    { name: "Appointments", path: "/appointments", icon: <FiCalendar /> },
  ];

  return (
    <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
      <h1 className="text-lg font-bold">AI Scheduler</h1>

      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-2 ${
              location.pathname === item.path
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            } hover:text-blue-500`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}