import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import Dashboard from "./pages/DashboardPage/DashboardPage";
import ActivatePage from "./pages/ActivatePage/ActivatePage";

import "./App.css";

function App() {
 return (
  <Routes>
   <Route path="/" element={<LandingPage />} />
   <Route path="/auth" element={<AuthPage />} />
   <Route path="/activate/:link" element={<ActivatePage />} />
   <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
 );
}

export default App;
