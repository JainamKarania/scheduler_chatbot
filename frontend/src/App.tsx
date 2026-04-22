import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Default Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Main App */}
      <Route path="/app" element={<Dashboard />} />
    </Routes>
  );
}

export default App;