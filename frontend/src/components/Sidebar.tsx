import { FiMessageSquare, FiSettings } from "react-icons/fi";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Sidebar() {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.from(sidebarRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="w-16 md:w-64 h-screen bg-black text-white flex flex-col p-4"
    >
      <h1 className="hidden md:block text-xl font-bold mb-10">
        AI Scheduler
      </h1>

      <div className="flex flex-col gap-6">
        <button className="flex items-center gap-3 hover:text-blue-400">
          <FiMessageSquare />
          <span className="hidden md:inline">Chat</span>
        </button>

        <button className="flex items-center gap-3 hover:text-blue-400">
          <FiSettings />
          <span className="hidden md:inline">Settings</span>
        </button>
      </div>
    </div>
  );
}