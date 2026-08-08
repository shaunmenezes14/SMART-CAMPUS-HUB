import { Routes, Route } from "react-router-dom";
import CampusHubLanding from "./CampusHubLanding";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CampusHubLanding />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;