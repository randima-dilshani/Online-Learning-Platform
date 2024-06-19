import { Routes, Route } from "react-router-dom";
import Login from "./componenets/User/Login";
import LandingPage from "./pages/LandingPage";
import Signup from "./componenets/User/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
