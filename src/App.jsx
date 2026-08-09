import { Routes, Route } from "react-router-dom";
import CampusHubLanding from "./CampusHubLanding";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampusHubLanding />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;