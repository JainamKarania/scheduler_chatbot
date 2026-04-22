import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-150 h-150 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center">

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Your AI-Powered{" "}
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Productivity Scheduler
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Automatically manage tasks, schedule meetings, and optimize your day
          using intelligent AI — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          
          <Link to="/app">
            <button className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>

          <button className="border px-6 py-3 rounded-xl text-lg hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>

        {/* Optional Trust Line */}
        <p className="mt-6 text-sm text-gray-500">
          No signup required • Instant AI scheduling
        </p>
      </div>
    </section>
  );
}