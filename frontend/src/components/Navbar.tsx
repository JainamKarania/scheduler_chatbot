import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-tight">AI Scheduler</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-black transition"
            >
              {link.name}
            </a>
          ))}

          {/* CTA */}
          <Link to="/app">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white border-t">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <Link to="/app">
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Get Started
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
