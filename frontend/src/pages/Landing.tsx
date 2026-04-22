// import Chat from "@/components/Chat";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Temporary placeholder */}
      <div className="pt-24 text-center">
        <Hero />
      </div>
      <div className="">
        <Services />
        <CTA />
        <Footer/>
      </div>
    </div>
  );
}