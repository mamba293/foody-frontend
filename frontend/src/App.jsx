import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import Dashboard from "./pages/DashboardPage/DashboardPage";
import BusinessPage from "./pages/BusinessPage/BusinessPage.jsx";
import ClientPage from "./pages/ClientPage/ClientPage.jsx";

import "./App.css";

function App() {
 return (
  <Routes>
   <Route path="/" element={<LandingPage />} />
   <Route path="/auth" element={<AuthPage />} />
   <Route path="/dashboard" element={<Dashboard />} />
   <Route path="/business" element={<BusinessPage />} />
   <Route path="/client" element={<ClientPage />} />
  </Routes>
 );
}

export default App;
