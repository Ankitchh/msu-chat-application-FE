import { ChevronLeft } from "lucide-react";
import { useUser } from "../../contexts/userContext";
import FacultyUserProfile from "./FacultyUserProfile";
import StudentUserProfile from "./StudentUserProfile";

const UserProfile = ({settings, SetSettings}: {settings: boolean, SetSettings: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const { user } = useUser();


if (!user) {
    return (
       <div className="new-chat-head text-[#8A8BE4] px-2 w-full h-8 my-1 flex items-center gap-2  active:text-[#52526b] duration-700 hover:cursor-pointer ">
          <button className=" hover:cursor-pointer ">
            <ChevronLeft />
          </button>
          <div className="text-xl">Profile</div>
        </div>
    );
  }

  return (
    <div
      className={`h-screen ${
        settings ? "w-[23vw] p-2 " : "w-0 overflow-hidden opacity-0"
      }  bg-[#333657] text-white border-r border-[#484D73] 
          
          transition-all duration-500
          `}
    >
      <div onClick={()=>{SetSettings(false)}} className="new-chat-head text-[#8A8BE4] px-2 w-full h-8 my-1 flex items-center gap-2  active:text-[#52526b] duration-700 hover:cursor-pointer ">
        <button className=" hover:cursor-pointer ">
          <ChevronLeft />
        </button>
        <div className="text-xl">Profile</div>
      </div>
      {user?.userRole === "STUDENT" ? (
        <StudentUserProfile />
      ) : (
        <FacultyUserProfile />
      )}
    </div>
  );
};

export default UserProfile;
