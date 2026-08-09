import { Routes, Route } from "react-router-dom";
import CampusHubLanding from "./CampusHubLanding";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import FacultyDashboard from "./FacultyDashboard";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampusHubLanding />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;