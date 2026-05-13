import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center rounded-3xl p-10 md:p-16 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Take Control of Your Time?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Let AI handle your scheduling, tasks, and planning — so you can focus on what truly matters.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          
          <Link to="/app">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
              Start Scheduling
            </button>
          </Link>

          {/* <button className="border border-white px-6 py-3 rounded-xl hover:bg-white/10 transition">
            Learn More
          </button> */}
        </div>

        {/* Trust line */}
        {/* <p className="mt-6 text-sm text-white/80">
          Free to use
        </p> */}
      </div>
    </section>
  );
}