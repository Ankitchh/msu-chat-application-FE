import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";
import TeacherRegister from "./pages/auth/TeacherRegister";
import ChatPage from "./pages/ChatPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/teacher-register"
          element={
            <PublicRoute>
              <TeacherRegister />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <VerifyOtp />
            </PublicRoute>
          }
        />

        {/* PRIVATE ROUTE */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
