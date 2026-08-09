import { Routes, Route } from "react-router-dom";
import CampusHubLanding from "./CampusHubLanding";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import FacultyDashboard from "./FacultyDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampusHubLanding />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
    </Routes>
  );
}

export default App;