import FacultyUserProfile from "./FacultyUserProfile";
import StudentUserProfile from "./StudentUserProfile";

const UserProfile = () => {
  return (
    <div className="w-[23vw] h-screen  text-white border-r border-[#484D73]">
      {/* <StudentUserProfile /> */}
      <FacultyUserProfile/>
    </div>
  );
};

export default UserProfile;
