import { Routes, Route } from "react-router-dom";
import Login from "./componenets/User/Login";
import LandingPage from "./pages/LandingPage";
import Signup from "./componenets/User/Signup";
import Dashboard from "./pages/Dashboard";
import CourseView from './componenets/User/CourseView';
import AdminDashboard from './componenets/User/admindashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses/:courseId" element={<CourseView />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
