import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Temporary placeholder */}
      <div className="pt-24 text-center">
        <Hero />
      </div>
    </div>
  );
}