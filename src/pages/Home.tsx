import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeProvider";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dark:bg-zinc-700 min-h-screen p-4 text-center dark:text-white">
      <h1>Home</h1>
      <button
        className="py-2 my-3 px-2 rounded bg-blue-600"
        onClick={() => setTheme(!theme)}
      >
        Change theme
      </button>
      <div>
        <div>
          <label>Login</label>
          <Link to="/login" className="text-blue-700 font-semibold mx-3">
            Login Page
          </Link>
        </div>
        <div>
          <label>Register</label>
          <Link to="/register" className="text-blue-700 font-semibold mx-3 ">
            Register Page
          </Link>
        </div>
        <div>
          <label>otp-verify</label>
          <Link to="/verify-otp" className="text-blue-700 font-semibold mx-3">
            Otp Verification Page
          </Link>
        </div>
        <div>
          <label>staff-register</label>
          <Link
            to="/teacher-register"
            className="text-blue-700 font-semibold mx-3"
          >
            Staff Register Page
          </Link>
        </div>
      </div>
    </div>
  );
}
