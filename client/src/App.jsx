import { Routes, Route } from "react-router-dom";
import Login from "./componenets/User/Login";
import LandingPage from "./pages/LandingPage";
import Signup from "./componenets/User/Signup";
import Dashboard from "./pages/Dashboard";
import CourseView from './componenets/User/CourseView';
import AdminDashboard from './componenets/Admin/AdminDashboard';
import CreateCourses from './componenets/Courses/CreateCourses';
import EditCourses from './componenets/Courses/EditCourses';
import SpecificCourse from "./componenets/Courses/SpecificCourse";
import DisplayAllStudents from "./componenets/Student/DisplayAllStudents";
import DisplayAllEnrollments from "./componenets/Enrollments/DisplayAllEnrollments";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses/:courseId" element={<CourseView />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/createcourses" element={<CreateCourses />} />
      <Route path="/editcourses/:courseId" element={<EditCourses />} />
      <Route path="/specificcourse/:courseId" element={<SpecificCourse />} />
      <Route path="/students" element={<DisplayAllStudents />} />
      <Route path="/enrollments" element={<DisplayAllEnrollments />} />
    </Routes>
  );
}

export default App;
