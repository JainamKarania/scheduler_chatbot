import { FiCheckSquare, FiCalendar, FiZap } from "react-icons/fi";

export default function Services() {
  const services = [
    {
      icon: <FiCheckSquare size={28} />,
      title: "Smart Task Management",
      description:
        "Create, prioritize, and manage tasks effortlessly using AI-driven insights.",
    },
    {
      icon: <FiCalendar size={28} />,
      title: "Intelligent Scheduling",
      description:
        "Automatically schedule meetings and avoid conflicts with smart time suggestions.",
    },
    {
      icon: <FiZap size={28} />,
      title: "AI Automation",
      description:
        "Let AI handle repetitive planning so you can focus on what truly matters.",
    },
  ];

  return (
    <section id="services" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Powerful Features to Boost Your Productivity
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Everything you need to organize your work, manage time, and stay focused — powered by AI.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border hover:shadow-lg transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-black text-white mb-4 mx-auto">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}