import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <Routes>
      {/* Default Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Main App */}
      <Route path="/app" element={<AppLayout />} />
    </Routes>
  );
}

export default App;