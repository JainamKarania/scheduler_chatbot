// import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">AI Scheduler</h2>
          <p className="text-gray-400 mt-3 text-sm">
            Smart AI-powered scheduling and task management to help you stay productive and organized.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="/app" className="hover:text-white transition">
                App
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        {/* <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white transition">
              <FiGithub />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiLinkedin />
            </a>
            <a href="#" className="hover:text-white transition">
              <FiTwitter />
            </a>
          </div>
        </div> */}
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Scheduler. All rights reserved.
      </div>
    </footer>
  );
}