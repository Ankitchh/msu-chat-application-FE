import { ChevronLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import FacultyUserProfile from "./FacultyUserProfile";
import StudentUserProfile from "./StudentUserProfile";
import CurrentChatProfile from "./CurrentChatProfile";
import { useProfileType } from "../../contexts/profileTypeContext";
import { logoutApi } from "../../api/auth";

const UserProfile = ({
  settings,
  SetSettings,
}: {
  settings: boolean;
  SetSettings: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, setUser } = useUser(); // ✅ IMPORTANT
  const { profileType } = useProfileType();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();

      // ✅ CLEAR STORAGE
      localStorage.removeItem("token");

      // ✅ CLEAR USER CONTEXT
      setUser(null);

      // ✅ REDIRECT TO LOGIN
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <div className="new-chat-head text-[#8A8BE4] px-2 w-full h-8 my-1 flex items-center gap-2">
        <ChevronLeft />
        <div className="text-xl">Profile</div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen ${
        settings ? "w-[23vw] p-2" : "w-0 overflow-hidden opacity-0"
      } bg-[#333657] text-white border-r border-[#484D73] transition-all duration-500`}
    >
      {/* HEADER */}
      <div
        onClick={() => SetSettings(false)}
        className="text-[#8A8BE4] px-2 w-full h-8 my-1 flex items-center gap-2 cursor-pointer"
      >
        <ChevronLeft />
        <div className="text-xl">Profile</div>
      </div>

      {/* PROFILE CONTENT */}
      {profileType === "own" ? (
        user.userRole === "STUDENT" ? (
          <StudentUserProfile />
        ) : (
          <FacultyUserProfile />
        )
      ) : (
        <CurrentChatProfile />
      )}

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="w-full flex items-center text-[#8A8BE4] justify-end mt-2 p-2 cursor-pointer"
      >
        <div className="flex items-center gap-2 shadow-xl p-2">
          <LogOut strokeWidth={1} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
