import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import TeacherRegister from "./pages/auth/TeacherRegister";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </div>
  );
}

export default App;
